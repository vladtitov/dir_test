/**
 * Created by VladHome on 9/5/2015.
 */
    /// <reference path="Kiosk.ts" />
module uplight{
    export  class MainMenu{
        onSelect:Function;
        private list:JQuery;
        private data:any[];
        private R:Registry;
        private view:JQuery;
        constructor(el:HTMLElement){
            this.view = $(el);
            this.R=Registry.getInstance();
            var d2 = $.Deferred();
            var d1 = Registry.getInstance().connector.getData('pages');
            var cats:VOCategory[]= Registry.getInstance().model.getCategories();
            if(cats)d2.resolve(cats);
            else this.R.model.dispatcher.on(this.R.model.READY,()=>{d2.resolve(this.R.model.getCategories());});
            $.when(d1,d2).then((pgs,cts)=>{
                var pages:VOPage[] = JSON.parse(pgs[0]);

                var cats:VOCategory[] = cts;
                this.onData(pages,cats);
            });
            this.list = $('#MainMenuList');// this.view.find('[data-id=list]');
            this.list.on(CLICK,'a',(evt)=>this.onMenuClick(evt));
            this.R.events.on(this.R.TIMEOUT,()=>this.reset());

        }

        private onData(pages:VOPage[],categories:VOCategory[]):void{

            pages = _.sortBy(pages,'seq');
            categories = _.sortBy(categories,'seq');
            var ar:any[]=[]
            this.data =ar.concat(pages).concat(categories);
            this.render();
        }

        reset():void{
            this.list.scrollTop(0)
        }
        render():void{
            var ar = this.data
            var out='<ul class="nano-content">';
            for(var i=0,n=ar.length;i<n;i++){
                var item = ar[i];
                if(item.enable || item.enabled)out+='<li class="item btn-menu"><a data-i="'+i+'"><span class="'+item.icon+'"></span> <span> '+(item.name || item.label)+'</span></a></li>';
            }
            out+='</ul>'
            this.list.html(out);
        }

        private onMenuClick(evt:JQueryEventObject):void {
          //  console.log(evt);
            evt.preventDefault();
            var i:number  = Number($(evt.currentTarget).data('i'));
          //  console.log(i);
            if (isNaN(i)) return
            var item = this.data[i];
            if (!item) return;
            if(item.url)this.R.events.triggerHandler(this.R.PAGE_SELECED,item.id);
            else this.R.events.triggerHandler(this.R.CATEGORY_SELECTED,item.id);
            if (this.onSelect)this.onSelect(item);

        }

    }

    export class PagesMenu{
        R:Registry
        data:VOPage[];
        list:JQuery;
        private view:JQuery
        onSelect:Function;

        pages:InfoPagesModel;
        constructor(el:HTMLElement){

            this.view = $(el);
            this.R=Registry.getInstance();
            this.R.connector.getData('pages').done((data)=>this.onData(data))
            this.list = this.view.find('[data-id=list]');
            this.list.on(CLICK,'a',(evt)=>this.onMenuClick(evt))

        }

        private onMenuClick(evt:JQueryEventObject):void{
           // console.log(evt);
            evt.preventDefault();
            var i:number = Number($(evt.currentTarget).data('i'));
          //  console.log(i);
            if(isNaN(i)) return
            var item= this.data[i];
            if(!item) return;
           // this.pages.showPage(i);
            if(this.onSelect)this.onSelect(item);
            this.R.events.triggerHandler(this.R.PAGE_SELECED,item.id);
        }
        private removeDisabled(ar:VOPage[]):VOPage[]{
            var out:VOPage[]=[];
            for(var i=0,n= ar.length;i<n;i++)if(ar[i].enabled)out.push(new VOPage(ar[i]));
            return out;
        }


        onData(res):void{
            var ar:any =  JSON.parse(res);
            var out:VOPage[]=[];
            for(var i=0,n= ar.length;i<n;i++)out.push(new VOPage(ar[i]));
            out = this.removeDisabled(out);
            if(!out.length){
                this.R.events.triggerHandler(this.R.PAGES_0);
            }
           else{
                this.data =_.sortBy(out,'seq');

                // this.pages = new InfoPagesModel($('[data-id=Pages]:first'));
                // this.pages.setData(this.data);
                this.render();
            }
        }

        render():void{
            var ar = this.data
            var out='<ul class="nano-content">';
            for(var i=0,n=ar.length;i<n;i++){
                var item:VOPage = ar[i];
              out+='<li class="item btn-menu"><a data-i="'+i+'">'+item.name+'</a></li>';
            }
            out+='</ul>'
            this.list.html(out);
        }


    }
}