/// <reference path="Registry.ts" />

module uplight {
    export class MainView {
        private current: JQuery;       
      
        private slider: JQuery;
        private container: JQuery;
        private homeView: JQuery;
        
        private inTransition: boolean

        showView(el: JQuery): void{
            console.log('inTransition ',this.inTransition); 
            if (this.inTransition) return; 
            if (!this.homeView) this.homeView = el;                          
            el.show();       
            this.current = el;    
            this.container.append(el); 
            if (this.container.children().length == 1) return;
            this.inTransition = true; 
            this.slider.animate({ scrollLeft: this.width }, 500, () => {
                this.addToHistory(el.siblings());         
                this.slider.scrollLeft(0);
                this.inTransition = false;
            });
        }
       
        showViewBack(el: JQuery) {
            console.log('inTransition  back ', this.inTransition); 
            if (this.inTransition) return;

            if (this.container.children().length > 1) {
                console.log('CHIDREN more then 1');
                this.current.siblings().remove();
            }  
            el.show();          
            this.current = el;          
            this.container.prepend(el);
            if (this.container.children().length == 1) return;
            this.slider.scrollLeft(this.width);
            this.inTransition = true; 
            this.slider.animate({ scrollLeft: 0 }, this.width, () => {
                el.siblings().remove();   
                this.inTransition = false;
                if (this.count == 0) this.showViewBack(this.homeView);
               
            });

        } 

        showHistory():void{          
            this.showViewBack(this.getFromHistory());
            this.btnBack.attr('href', '#back=' + this.count++);
            if (this.history.children().length == 0)     this.reset();           
           
        }
        reset(): void {          
            this.history.html('');           
            this.count = 0;
            this.btnBack.hide('fast');
            this.showViewBack(this.homeView);
        }

        private addToHistory(el: JQuery): void {
            this.count++;
            this.history.append(el);
            this.btnBack.show();
            if (this.history.children().length > 20) this.history.children().first().remove();
        }

        private getFromHistory(): JQuery {                      
            return this.history.children().last();
        }
        public view: JQuery; 
        private history: JQuery;
        private btnBack: JQuery;
        private count: number = 0;
        constructor(id:string, private width, private height) {
            this.view = $(id);
            //view.html('');                        
            this.slider = $('<div class="myslider"></div>').width(this.width).css('overflow', 'hidden').appendTo(this.view);           
            this.container = $('<div class="container"></div>').width(this.width * 2 + 20).appendTo(this.slider);
           this.btnBack =  $(id +' .redbutton').hide().appendTo(this.view);

            this.history = $('#History');               
            
        }

    }
}