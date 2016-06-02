/**
 * Created by VladHome on 6/7/2015.
 */

    /// <reference path="../RegA.ts" />
/// <reference path="../../typing/jquery.d.ts" />
module uplight{

    export class AdminMenu{
        R:RegA;
        btnOn:JQuery;
        content:JQuery

        constructor(view:JQuery){
            this.R = RegA.getInstance();
           if(view.length) this.init(view);
            this.btnOn=$('#menu-on').hide();
        }

        private init(view:JQuery){
            this.content = view.find('[data-id=content]:first')
                view.find('[data-id=btnMenu]:first').on(CLICK,()=>{
                this.toggle();
            })
            this.content.find('[data-id=btnClose]').click(()=>{this.content.addClass('closed')});

        }


        toggle():void{
            if(this.content.hasClass('closed'))this.content.removeClass('closed');
            else this.content.addClass('closed');
        }

    }
}