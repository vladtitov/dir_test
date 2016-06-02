/**
 * Created by VladHome on 8/23/2015.
 */
  /// <reference path="../Registry.ts" />
    /// <reference path="AttractLoop.ts" />
module uplight{

    export class GalleryDisplay{
        private selector:string
        view:JQuery
        private list:JQuery;
        private data:any;
        private galley:JQuery[];
        private timeout:number=20;
        private current=-1;
        private  interval:number=0;
        private prev:JQuery;
        private cur:JQuery;
        private isActive:boolean;

        constructor(private props:ALProps,i:number){
            this.view = $('<div>').addClass(props.url+' gallery');
            this.list=$('<div>').appendTo(this.view);
            var delay:number = Number(props.delay);
            if(isNaN(delay) || delay<5) delay = this.timeout;
            this.timeout =  delay;
            Registry.getInstance().events.on( Registry.getInstance().AL_START,()=>this.start());
            Registry.getInstance().events.on( Registry.getInstance().AL_STOP,()=>this.stop());
            Registry.getInstance().connector.getData(props.url).done((res)=>this.onData(res))
        }

        appendTo(container:JQuery):void{
            this.view.appendTo(container);
        }
        private onData(res:string){
            var data = JSON.parse(res);
            var ar = data;
            var out:JQuery[]=[];
            for(var i=0,n=ar.length;i<n;i++){
                out.push(this.createImage(ar[i]));
            }
            this.galley = out;
            this.current=-1;
            this.goNext();
        }


        private goNext():void{
         console.log('next');
            if(!this.isActive || !this.galley) return;
            this.current++;
            if(this.current>=this.galley.length) this.current=0;
          var next = this.galley[this.current];
            if( this.list.children().length>1){
                this.list.children().detach();
                this.cur=null;
            }
            this.list.append(next);
            if(this.cur){
                var prev = this.cur;
                this.list.addClass('move');
                setTimeout(()=>{
                    prev.detach();
                    this.list.removeClass('move');

                },2000)
                /*
               var p = this.view.animate({scrollLeft:650},5000).promise();
                console.log('animate');
                p.done(()=>{
                    console.log('done');
                    this.prev.remove();
                })
                */
            }
           this.cur=next;
        }
        private createImage(url:string):JQuery{
            return $('<div>').addClass('item').html('<img src="'+url+'" />');
        }

        start():void{
            this.isActive = true;
            if(this.interval===0) this.interval = setInterval(()=>{this.goNext()},this.timeout*1000);
            this.goNext();
        }
        stop():void{
            this.isActive = false;
            clearInterval(this.interval);
            this.interval=0;

        }
    }
}