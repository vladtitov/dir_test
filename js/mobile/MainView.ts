/// <reference path="Mobile.ts" />

module uplight {
    export class MainViewMobile {
        private current: JQuery;       
        private content: JQuery;
        private container: JQuery;
       // private library: JQuery;

        private header: JQuery;
        private footer: JQuery;
        private slider: JQuery;
        /*
                showView(el: JQuery): void {
                   
                    this.current = el;           
                    this.content.append(el);
                    if (this.content.children().length > 1) {
                      //  console.log('animate   scrollLeft:' + this.width);     
                        this.slider.animate({ scrollLeft: this.width }, 500, () => {
                            el.siblings().remove();                              
                            this.slider.scrollLeft(0);
                        });
                    }                    
                }

              */
        setHeader(str: string): MainViewMobile {

            return this;
        }
        addFooter(footer): void {
            if (this.footer) this.footer.remove();
            if (footer) this.view.append(footer);
            this.footer = footer;
        }
        addHeader(header): void {
            if (this.header) this.header.remove();
            if (header) this.view.prepend(header);
            this.header = header;
        }
        showView(el:JQuery, header?: JQuery): void {
            // this.addHeader(header); 
            // this.addFooter(footer); 
            if (this.header) this.header.prependTo(this.current);
            this.header = null;
            this.current = el;    
            this.content.append(el);
           // var el = this.current;
            this.slider.animate({ scrollLeft: this.width }, 500, () => {
                el.siblings().remove();
                if (header) {
                    this.header = header;
                    header.prependTo(this.view);
                }
                this.slider.scrollLeft(0);
            });
        }
       
        showViewBack(el: JQuery, header?: JQuery) {
            if (this.header) this.header.prependTo(this.current);
            this.header = null;

           // this.addHeader(header);
           // this.addFooter(footer); 
            if (this.content.children().length > 1) {
                console.log('CHIDREN more then 1');
                this.current.siblings().remove();
            }  
            el.show();          
            this.current = el;          
            this.content.prepend(el);
            this.slider.scrollLeft(this.width);
            this.slider.animate({ scrollLeft: 0 }, this.width, () => {
                el.siblings().remove();    
                if (header) {
                    this.header = header;
                    header.prependTo(this.view);
                }
            });

        } 
          
        constructor(public view: JQuery, private width, private height) { 
                       
            this.slider = $('<div class="myslider"></div>').width(this.width).css('overflow-x', 'hidden').css('overflow-y', 'auto').height(this.height).appendTo(this.view);           
            this.content = $('<div class="mycontent"></div>').width(this.width * 2 + 20).appendTo(this.slider);               
            
        }

    }
}