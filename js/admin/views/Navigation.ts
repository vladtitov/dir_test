/**
 * Created by VladHome on 11/1/2015.
 */
    /// <reference path="../DirsAdmin.ts" />
module uplight{
    export class Navigation{
        constructor(private view:JQuery){
            //dropdown-toggle
            $(document).click((evt)=>this.onClick(evt));

        }
        private selected:JQuery
        private onClick(evt:JQueryEventObject):void{
            var el = $(evt.target);
            if(this.selected){
                this.selected.removeClass('selected');
                this.selected = null;
            }
            if(el.hasClass('dropdown-toggle')){

                el=el.parent();
                el.addClass('selected')
                this.selected = el;
            }
        }
    }

}