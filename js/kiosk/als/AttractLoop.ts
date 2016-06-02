/**
 * Created by VladHome on 8/23/2015.
 */
    /// <reference path="../Registry.ts" />
    /// <reference path="TouchClip.ts" />
    /// <reference path="GalleryDisplay.ts" />
module uplight{
    export class ALProps{
        id:number;
        templateid:number;
        url:string;
        delay:number;
    }
    export class ALoop{
        id:number;
        TC:boolean;
        type:string;
        props:ALProps[];
        constructor(obj:any){ for(var str in obj) this[str]=obj[str];}
    }

    export class AttractLoop{
        al:ALoop;
        body:JQuery;
        private view:JQuery;
        private R:Registry;
        private cover:JQuery;

        private timer:number;
        private timeout:number=60000;

        private tc:TouchClip;
        width:number;

        constructor(el:HTMLElement){

            this.R=Registry.getInstance();
            this.view = $(el);
            this.view.on(CLICK,()=>{
                this.stop();
            })
             this.width= this.view.width();

            this.al = new ALoop(this.R.getSettings('attract_loop'));





            this.cover = this.view.find('[data-id=cover]:first');
           this.initAL();
            this.start();
            this.R.events.on(this.R.TIMEOUT,()=>this.start());

        }


      private isActive;
        private hide():void{
                this.view.addClass(HIDDEN);
        }
        private start():void{
            if(!this.isActive) {
                this.isActive = true;
                this.show();
                this.R.events.triggerHandler(Registry.getInstance().AL_START);
            }
        }

        private show():void{
            this.isActive = true;
            this.view.removeClass(HIDDEN);
        }

        private stop():void{
            if(this.isActive){
                this.R.events.triggerHandler(this.R.AL_STOP);
                this.isActive =false;
                this.hide();
            }
        }

        initAL():void{
            var vo:ALoop = this.al;
            var ar:ALProps[] = vo.props
            for(var i=0,n=ar.length;i<n;i++){
                var item = ar[i];
                if(item.url.substr(0,3)==='gal'){
                    var gal:GalleryDisplay = new GalleryDisplay(item,i);
                    gal.appendTo(this.cover);
                }
            }

            if(vo.TC){
                var tc = new TouchClip(this.width);
                this.cover.append(tc.view);
            }
        }


    }
}