/// <reference path="../Registry.ts" />


module uplight {
    export class Details {
        private cache: {} = {};
        private current: VODestination;

        view:JQuery;
        content:JQuery;
        list:JQuery;
        pages:JQuery;

        setData(dest:VODestination):void{
            this.current = dest;
           //if(dest.details)   this.content.html(this.renderDetails(dest.details))
            //this.pages.empty();
            //if(dest.pages) this.loadPages(dest.pages);
        }


        constructor(view:JQuery,connector:Connector) {
                this.view = view;
                this.content = $('<div>').addClass('details').appendTo(view);
                this.pages =$('<div>').addClass('pages').appendTo(view);


        }


        private renderItem(item:any):string{

            return '<tr><td>'+item.label+'</td><td>'+item.value+'</td></tr>';
        }
        private renderDetails(dest: string): string {
            var details = JSON.parse(dest);
            var out: string = '<table><tbody>'
            var ar:any[] = details
            for(var i=0,n=ar.length;i<n;i++){
                out+= this.renderItem(ar[i]);
            }
            out += '</tbody></table>';
            return out;
        }

        private loadPages(source:string) {
            this.pages.load(source,function(){
                console.log(' on pages loaded');
            })

        }

    }

}