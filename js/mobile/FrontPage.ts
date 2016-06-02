/**
 * Created by VladHome on 9/28/2015.
 */
    /// <reference path="Mobile.ts" />
module uplight{
    export class FrontPage{


        hide():void{
            this.view.hide();
        }
        show():void{
            this.view.show();
        }
        getView():JQuery{
            return this.view;
        }
        private pages:any[];
        private list:JQuery
        constructor(public view:JQuery){

            this.list= view.find('[data-id=list]:first');
            this.pages = u_pages;
           // this.renderList();
        }

        private init():void{
            console.log(this.view);
        }


        private renderList():void{
            var ar= this.pages;
            var out='<a href="#SearchDirectories" class="list-group-item"><span class="fa fa-search"></span> <span> Search Directory</span></a>';
            out+='<div id="PagesListFront">';
            for(var i=0,n=ar.length;i<n;i++){
                var item = ar[i];
                item.seq=i+1;
                out+='<a href="#page/'+item.id+'/'+item.name+'" class="list-group-item"><span class="'+item.icon+'"></span> <span> '+item.name+'</span></a>';
            }
            out+='</div>';
            this.list.html(out);

        }
    }
}