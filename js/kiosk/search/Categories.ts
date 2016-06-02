/**
 * Created by VladHome on 7/9/2015.
 */
    /// <reference path="../Registry.ts" />
module uplight{
    export class CategoriesCheck{
        private list:JQuery
        R:Registry;
        view:JQuery;
        private data:VOCategory[];

        private selected:number[];
        constructor(el:HTMLElement){
            this.view =$(el);
            this.R=Registry.getInstance();
            this.list=this.view.find('.list:first');
            this.R.model.dispatcher.on(this.R.model.READY,()=>this.onDataReady());
            this.R.events.on(this.R.TIMEOUT,()=>this.reset());
            this.addListeners();

        }
        private addListeners():void{
            this.list.on(CLICK,'li',(evt)=>this.onListChanged(evt));
            this.R.events.on(this.R.TIMEOUT,()=>this.reset());
        }

        reset():void{
            this.list.scrollTop(0);
            this.render();
        }
        private addCategory(id:number):void{
            var ind= this.selected.indexOf(id);
            if(ind==-1){
                this.selected.push(id);
                this.R.connector.Stat('cp',id.toString());
                this.R.events.triggerHandler(this.R.CATEGORIES_CHANGE,[this.selected]);
            }
        }
        private removeCategory(id:number):void{
            var ind= this.selected.indexOf(id);
            if(ind!==-1){
                this.selected.splice(ind,1);
                this.R.connector.Stat('cm',id.toString());
                this.R.events.triggerHandler(this.R.CATEGORIES_CHANGE,[this.selected]);
            }
        }
        private onListChanged(evt:JQueryEventObject):void{
           var el:JQuery =  $(evt.currentTarget);

            var id:number = Number(el.data('id'));
            if(isNaN(id)) return;

            if(Number(el.data('checked'))==1){
                el.data('checked',0);
                console.log('removing category '+id);
                this.removeCategory(id);
                el.find('.check').removeClass('fa-check-square-o').addClass('fa-square-o');
            }else{
                el.data('checked',1);
                console.log('adding  category '+id);
                this.addCategory(id);
                el.find('.check').removeClass('fa-square-o').addClass('fa-check-square-o');
            }
        }

        private onDataReady():void{
            this.data = this.R.model.getCategories();
            this.render();
        }
        renderItem(vo:VOCategory,i):string{
            return '<li data-checked="1" data-id="'+vo.id+'" class="btn" ><span class="check fa fa-check-square-o" data-id="'+vo.id+'" ></span><span class="icon '+vo.icon+'"></span> <span class="name">'+vo.label+'</span></label></li>';

          //  return '<li data-checked="1" data-id="'+vo.id+'" class="btn" ><span class="id">'+vo.id+'</span><span class="check fa fa-check-square-o" data-id="'+vo.id+'" ></span><span class="icon '+vo.icon+'"></span> <span class="name">'+vo.label+'</span></label></li>';

        }
        private render():void{
            var ar = this.data;
            var out='<ul>'
            var idis:number[]=[];
            for(var i=0,n=ar.length;i<n;i++){
               out+= this.renderItem(ar[i],i);
                idis.push(ar[i].id)
            }
            out+='</ul>';

            this.selected=idis;
            this.list.html(out);
        }


    }
}