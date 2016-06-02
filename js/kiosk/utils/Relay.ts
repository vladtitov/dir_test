/**
 * Created by VladHome on 9/16/2015.
 */
    /// <reference path="../Registry.ts" />
module uplight{
    export class Relay{
        constructor(delay:number,count?:number){
            if(isNaN(delay) || delay<2) delay = 2;
            this.timer =(new Date()).getTime();
            this.startTime = Math.round(this.timer/1000);
           this.interval =  setInterval(()=>this.relay(),delay*1000);
            this.count = 1000000;
            if(count) this.count = count;

        }

        private interval:number;
        private stamp:number=0;
        private ping:number=0;
        private timer:number;
        private startTime:number;
        private count:number;

        private relay():void{
            this.count--;
            if(this.count < 0) clearInterval(this.interval);
            var self=this;
            var now=(new Date()).getTime();
            var timer=now - this.timer;
            this.timer=now;
            var out={
                stamp:this.stamp,
                now:Math.round(now/1000),
                ping:this.ping,
                timer:timer,
                start:this.startTime
            }

            Registry.getInstance().connector.relay(out).done(function(res:string){
                self.ping=(new Date()).getTime()-now;
                var vo:VOResult;
                try{
                    vo = JSON.parse(res)
                }catch(e){
                    console.warn('relay doesnt work '+ res);
                    return;
                }

                if(vo.success == 'success'){
                    var stamp = Number(vo.result);

                    if(self.stamp === 0) self.stamp = stamp;
                    else if(self.stamp && self.stamp != stamp) window.location.reload();
                }


            })
        }
    }

}