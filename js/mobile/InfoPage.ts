/// <reference path="../kiosk/registry.ts" />
/// <reference path="../typing/jquery.d.ts" />
module uplight {
    
    export class InfoPageMobile {
        private view:JQuery;
        isHidden:boolean;
        getView():JQuery{
            if(!this.view) this.view=$('<div>').addClass('container').load(this.item.url);
            return this.view;
        }

        constructor(private item:any) {
        }
    }

   
}