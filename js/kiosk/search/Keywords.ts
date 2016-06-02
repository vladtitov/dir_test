/**
 * Created by VladHome on 7/11/2015.
 */
/// <reference path="../Registry.ts" />
module uplight{
    export class Keywords{
        private view:JQuery;
        list:JQuery;
        kwAll:string[];
        kwsRated:string[];
        data:string[];
        R:Registry;

        constructor(el:HTMLElement){
            this.view = $(el);
            this.R = Registry.getInstance();
            this.list =$('<ul>').appendTo(this.view.find('[data-id=list]:first'));
            this.list.on(CLICK,'li',(evt)=>{this.onClick(evt.currentTarget)});
            this.R.model.dispatcher.on(this.R.model.READY,()=>this.onModelReady());
            this.R.events.on(this.R.INPUT_CHANGED,(evt,word)=>this.filter(word));
        }

        private onKeywords(res:string):void{
            this.kwsRated=JSON.parse(res);
           // console.log(this.kwsRated);
            this.reset();
        }

        private onModelReady():void{
            this.R.connector.getKeywords().done((res)=>this.onKeywords(res));
           this.kwAll =   this.R.model.getKeywords().sort(function (a, b) {
               return a.toLowerCase().localeCompare(b.toLowerCase())});
           // console.log(this.kwAll);

            //console.log(obj);
          //  var out:VOKw[]=[];
           // for(var str in obj) out.push(new VOKw(str,obj[str]));

           // this.render();

        }



        private filter(str:string){
            console.log(str);
            if(!str){
                this.reset();
                return;
            }
            str = str.toLowerCase();

            var out1:string[] =[];
            var out2:string[] =[];
            var word:string;
            var ar = this.kwsRated;
            for(var i=0,n=ar.length;i<n;i++){
               word = ar[i].toLowerCase();
               if(word.indexOf(str)===0)out1.push(ar[i]);
                else if(word.indexOf(' '+str)!==-1)out2.push(ar[i]);
            }

            if((out1.length+out2.length)<7){
                ar = this.kwAll;
                for(var i=0,n=ar.length;i<n;i++){
                    if((out1.length+out2.length)===7)break;
                    if(out1.indexOf(ar[i])!==-1 || out2.indexOf(ar[i])!==-1)continue;
                    word = ar[i].toLowerCase();

                    if(word.indexOf(str)===0)out1.push(ar[i]);
                    else if(word.indexOf(' '+str)!==-1)out2.push(ar[i]);
                }
            }

            this.data = out1.concat(out2);
            this.render();
        }
        reset(){
            if( this.kwsRated.length <7) this.data = this.kwsRated.concat(this.kwAll);
            else this.data = this.kwsRated;
            this.render();
        }

        private render():void{
            var ar = this.data;
            var out='';
            for(var i=0,n=ar.length<7?ar.length:7;i<n;i++)  out+= this.renderItem(ar[i]);
           // console.log(out);
            this.list.html(out);
        }

        private onClick(e:HTMLElement):void{
            var el=$(e);
          //  var i:number = el.data('i');
           // var type= el.data('t');
            var txt:string = el.text();
          ///  var val = this.kwAll[i].label;
           if(txt.length>1)this.R.events.triggerHandler(this.R.KEYWORD_PRESSED,txt);

        }

        renderItem(val:string):string{
            return '<li><a class="btn">'+val+'</a></li>';
        }

    }



    export  class VOKw{
        constructor(public label:string,private dests:number[]){

    }
    }

}