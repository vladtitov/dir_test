/// <reference path="../Registry.ts" />

module uplight {
    export class ScreenSaver2 {
        $view:JQuery;
        private timeON:string;
        private timeOFF:string;
        //private attratLoop:AttractLoop;
        R:Registry;

        constructor() {
            this.init();
        }

        init():void {
            this.R = Registry.getInstance();


           // this.attratLoop = new AttractLoop($('#AttractLoop'),this.R.settings.attract_loop);
            this.isActive = true;
        }

        private timer:number

        private startTimer():void {
            clearTimeout(this.timer);

        }

        private onViewClick():void {
            if (this.isActive) this.stopScreenSaver();
        }


        private onClick(evt:MouseEvent):void {
            this.startTimer();
            if (this.isActive) this.stopScreenSaver();
        }

        private isActive;

        startScreenSaver():void {
            if (this.isActive) return;
            this.isActive = true;
            console.log('start ss');

          //  this.R.events.triggerHandler(this.R.SS_START);

        }

        private stopScreenSaver():void {
            this.isActive = false;

            console.log('stop ss');
           // this.R.events.triggerHandler(this.R.SS_STOP);
        }


    }

}


