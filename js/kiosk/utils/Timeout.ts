/**
 * Created by VladHome on 9/18/2015.
 */
    /// <reference path="../Kiosk.ts" />

module uplight{
    export class Timeout{
        timer:number;
        onTimeout:Function
        timeout:number
        constructor(timeout:number){
            console.log(timeout);
            if(isNaN(timeout)){
                console.log('error setting timeout ',timeout);
                timeout=60;
            }

            this.timeout = timeout;
            document.addEventListener(CLICK, (evt: MouseEvent) => this.startTimer());
            }

        private startTimer():void{
            clearTimeout(this.timer);
            this.timer = setTimeout(()=>{if(this.onTimeout) this.onTimeout(this.timeout)},this.timeout*1000);
        }
    }
}