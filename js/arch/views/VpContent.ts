/// <reference path="registry.ts" />
/// <reference path="listview.ts" />
/// <reference path="../../../libs/typings/jquery.d.ts" />
module app{
   export  class VpContent { 

       view: JQuery;
       width = 700;
       height = 700;

       private currentView:JQuery
      
       
       showView(view:JQuery): boolean {
           if (view === this.currentView) return;
           console.log('new view:' + view.attr('id'));           
           if (this.currentView) this.currentView.hide('fast');
           this.currentView = view;
           this.currentView.show('fast');
           return true;
           this.view.children().each((index: number, el: HTMLDivElement) => {
              
               var elj: JQuery = $(el);
               if (view.is(elj)) {
                   elj.show(200);
                   
                      // if(this.currentView)this.currentView.hide(200);
                  console.log('showing: ' + el.id);
                  // this.scrollToNewView(el, index, this.currentView);
                   this.currentView = elj;
                   return;
               }

           });            
        
           return true;

       }
       constructor() {
           this.view = $('#ViewPort1')          
            this.view.css('width', this.width);
            this.view.css('height', this.height);
            this.view.children('div').hide();
        }
        private init(): void {
          
        }

       
    }
}

