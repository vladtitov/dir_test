/// <reference path="../Registry.ts" />
module kiosk {
    export class KeyboardView {   

        showKeyboard(): void {
            if (this.isShown) return;
            this.isShown = true;
            this.inTransition = true;           
            this.keyboard.show();           
            this.btnSearch.addClass(DISABLED);
            this.keyboard.animate({ top: '80px' }, 500, () => {
                this.inTransition = false;
            });
           // TweenLite.to(this.keyboard, 0.5, { css: { top: 0 } });
        }
         setBack(): void {             
             this.inTransition = false; 
        }
        hideKeyboard(): void {
            //console.log('hide keyboard ' + this.isShown );
            if (!this.isShown || this.inTransition) return;
            this.isShown = false;
            this.inTransition = true; 
            $('#kb_close').triggerHandler(CLICK);

            this.keyboard.animate({ top: '400px' }, 500, () => {
                this.inTransition = false;
                this.btnSearch.removeClass(DISABLED);
                this.keyboard.hide();
            });
           // TweenLite.to(this.keyboard, 0.5, {top: '400px' , onComplete: () => { $(this.keyboard).hide() } });
        }
        private btnSearch: JQuery
        private view: JQuery;
        private keyboard: JQuery;
       // private R: Registry;
        private isShown: boolean = true;

        constructor(id:string) {
           // this.R = Registry.getInstance();
            this.view = $(id);
            this.keyboard = $('#Keyboard');
            this.keyboard.on(CLOSE, (evt) => this.onKeyboardClose(evt));
            this.btnSearch = $(id + ' .redbutton');
            this.btnSearch.on(CLICK,()=>this.onButtonClick());

        }
    private onButtonClick():void{
        if(this.btnSearch.hasClass(DISABLED)) return;
        this.btnSearch.addClass(DISABLED);
        this.showKeyboard();

    }
        private onKeyboardClose(evt:JQueryEventObject): void {
            this.btnSearch.removeClass(DISABLED);
            this.hideKeyboard();
        }
        
      
        private inTransition: boolean;
       
    }

}