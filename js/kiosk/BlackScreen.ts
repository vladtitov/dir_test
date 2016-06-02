/**
 * Created by VladHome on 5/12/2014.
 */
module uplight{
    declare  var blank:any;
    declare var url:string;
export class BlackScreen{
    private onn:number;
    private off:number;
    private location:string;
private timer:number
    constructor(){
        this.onn=blank.stop;
        this.off = blank.start;
        this.location=url;
        console.log(blank)


      this.timer=  setInterval(()=>this.testTime(),5000);
    }

    private testTime():void{

        var now:Date = new Date();
        var mins:number = (now.getHours()*60) + now.getMinutes();
        console.log(mins+ '   '+this.onn+'    '+this.off);
        if(mins>this.onn){
            if(this.off>this.onn && mins>this.off) return;
            console.log('loading '+this.location);
            clearInterval(this.timer);
           window.location.href=this.location;
        }


    }
}

}

window.onload=function(){
var screen= new uplight.BlackScreen();

}