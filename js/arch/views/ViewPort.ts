/// <reference path="../Registry.ts" />
module uplight{
    export class ViewPort{

        onListClick: Function;
       // view: JQuery;

      private R: Registry;
      private current: JQuery;
      private prev: JQuery;     

      private slider: JQuery;     
      public width: number;
      private height: number;
      
     
      reset(): void {
          this.view.scrollTop(0);
      }

      private lastPosition: number;

      pushViewAhead(el: JQuery) {         
          this.lastPosition = -Math.round(this.slider.position().top) + 50;
          if (this.slider.children().length > 1) {              
             this.current.siblings().remove();             
              console.log(' more  then one child in slider');
              
          }
          //this.prev = this.current;
          //if (this.prev)

          this.btnBack.removeClass(DISABLED);
          this.current = el;
          el.css('margin-top', this.lastPosition );
          this.slider.append(el); 
          var view: JQuery = this.view;             
          this.view.animate({ scrollLeft: this.width }, 500, () => {
              el.siblings().hide();
              view.scrollLeft(0);
              view.scrollTop(0);
              el.css('margin-top', 0);
          });         
      }
      private rollBack(): void {         
          //if (!this.prev) return;          
          var el: JQuery = this.current.prevAll().show(); 
                      
          this.view.scrollLeft(this.width);
          this.view.scrollTop(this.lastPosition);
          this.current.css('margin-top', this.lastPosition);
          this.current = this.prev;
          this.btnBack.addClass(DISABLED);
          this.prev = null;
          this.view.animate({ scrollLeft: 0 }, 500, () => {
              el.siblings().remove();             
          });  
        
          /// this.current.on(CLICK, 'li', (evt) => this.R.onSearchResultClick2(evt));
      }

     showView(el:JQuery) {   
          if (this.prev == el) {
              this.showViewBack(el);
              return;
          }
                  
          el.show();         
          this.prev = this.current;  
          if(this.prev)this.btnBack.removeClass(DISABLED);        
         this.current = el;
         el.off(CLICK);
         el.on(CLICK, 'li', (evt) => this.onListClick(evt));
          this.view.scrollTop(0);
          this.slider.append(el);        
       
          if (this.slider.children().length > 1) {
             // console.log('animate   scrollLeft:' + this.width);     
              this.view.animate({ scrollLeft: this.width }, 500,  () =>{
                  el.siblings().remove();
                  this.view.scrollLeft(0);
              });
          }
      }
    
     showViewBack(el: JQuery) {
          if (this.slider.children().length > 1) {
              console.log('CHIDREN more then 1');
              this.current.siblings().remove();
          }
        el.on(CLICK, 'li', (evt) => this.onListClick(evt));
          this.btnBack.addClass(DISABLED);
          this.current = el;
          this.prev = null;        
          this.view.scrollTop(0);
          el.show();
          this.slider.prepend(el);        
          this.view.scrollLeft(this.width);          
          this.view.animate({ scrollLeft: 0}, 500, () => {
              el.siblings().remove();         
              });  

      }     
       

      private btnBack: JQuery;

        constructor(public view:JQuery) {          
          this.view.css('overflow-x', 'hidden');
          this.view.css('overflow-y', 'scroll');          
          this.width = this.view.width();
          this.view.width(this.width + 20);
         this.height = this.view.height();
            this.slider = $('<div class="listHolder"></div>').appendTo(this.view); 
          this.slider.css('float', 'left');        
          this.slider.width(this.width * 2 + 20);
          this.slider.height(this.height);
          this.R = kiosk.Registry.getInstance();
          this.R.mainView = this;                
          this.btnBack = $('#contentBack').on(CLICK, () => this.onContentBack()).addClass(DISABLED);
      }


      private onContentBack(): void {
          if (this.btnBack.hasClass(DISABLED)) return;         
          if (this.slider.children().length == 1) {             
              this.showViewBack(this.prev);            
          }
          else  this.rollBack();         
          
      }

     

        
    }
}