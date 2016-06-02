/// <reference path="Registry.ts" />
/// <reference path="../typing/jquery.d.ts" />
/// <reference path="../typing/underscore.d.ts" />
module uplight {

    export class VOPage{
       view:JQuery;
        name:string;
        url:string;
        id:number;
        enabled:boolean;
        private icon:string;
        private header:JQuery
        private content:JQuery;
        constructor(obj:any){
            for (var str in obj)this[str] = obj[str];
            this.id=Number(this.id);
            this.view =$('<div>').addClass('page');
            this.header = $('<div>').addClass('header').appendTo(this.view).html('<span class="'+this.icon+'"> </span> <span> '+this.name+'</span>');
            this.content = $('<div>').addClass('content').appendTo(this.view);

            if(this.url)  Registry.getInstance().connector.get(this.url).done((data)=>{ this.content.html(data);});
        }
    }


    export class InfoPagesModel {
        static PAGE_SELECED:string = 'PAGE_SELECED';
        private content: JQuery;
        private list:JQuery;
        private width:number;
        private data:VOPage[];
        private prev:number=-2;

        private dataInd:any;


        private R:Registry;

        private view:JQuery

        constructor(el:HTMLElement) {
       console.log('InfoPagesModel')

            this.view = $(el);
            this.R=Registry.getInstance();
            this.R.connector.getData('pages').done((data)=>this.onData(data));
            this.R.events.on(this.R.PAGE_SELECED,(evt,pageid)=>{this.showPage(pageid)});
            this.view.css('overfow','hidden');
            this.width = this.view.width();
            this.list=$('<div>').appendTo(this.view);
        }

        private onData(res:string):void{
            var out:VOPage[]=[];
            var ar = JSON.parse(res);
            for(var i=0,n=ar.length;i<n;i++){
                out.push(new VOPage( ar[i]));
            }
            this.data = out;
            this.dataInd =_.indexBy(out,'id');
        }
        /*
        loadData(item:any):void {

            $.get(item.url).done(function(data){
             //   console.log(data);
               item.$div=$('<div>').html(data);
          })
        }

        setData(data:any[]):void{
                var ar = data
                for(var i=0,n=ar.length;i<n;i++){
                      this.loadData(ar[i]);
                }
            this.data = data
        }
*/
        current:number=-1



        inTrans:boolean

        showPage(id:number):void{
            if(this.inTrans)return;
            console.log('showing page '+id);
            if(id==this.current) return
            var item:VOPage=this.dataInd[id];
            if(!item){
                console.log('Error cant find page with id '+id);
                return;
            }
            this.current = id;
            this.list.append(item.view)
            if(this.list.children().length>1){
                this.inTrans=true;
                this.view.animate({scrollLeft:this.width},()=>{
                    this.list.children().first().remove();
                    this.view.scrollLeft(0);
                    this.inTrans=false;
                })
            }

        }

        /*
        getPage(page:VOItem): JQuery {
            if (!this.cache[page.id]) this.cache[page.id] = this.createPage(page);           
            return this.cache[page.id];
        }
      
        private createPage(page: VOItem): JQuery {
            var p:JQuery = $('<div class="view"><div class="mytitle">'+page.label+'</div></div>');
            this.content = $('<div class="view-content">Loading</div>').appendTo(p);
            this.loadPage(page.id.toString());
            return p;

        }

        */

        
        private onPageLoaded(res: string): void {          
           // this.content.html(res);

        }




    }

   
}