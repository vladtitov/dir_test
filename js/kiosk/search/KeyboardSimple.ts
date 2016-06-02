/**
 * Created by VladHome on 6/9/2015.
 */
    /// <reference path="../Registry.ts" />

module uplight{
    export class Keyboard {
     //  static   KEY_PRESSED:string='KEY_PRESSED';

      //  static SEARCH_CHANGED:string='SEARCH_CHANGED';
      //  static KEYBOARD_SHOW:string ='KEYBOARD_SHOW';
      //  static KEYBOARD_HIDE:string ='KEYBOARD_HIDE';
           private keys:JQuery;

        view:JQuery
        private alphabet:string = '1,2,3,4,5,6,7,8,9,0,Q,W,E,R,T,Y,U,I,O,P,A,S,D,F,G,H,J,K,L,&nbsp;,Z,X,C,V,SPACE,B,N,M';
        R:Registry
        constructor(el:HTMLElement) {
            this.view = $(el);
            this.R=Registry.getInstance();
           // if(set && set.keyboard) this.initSettings(set.keyboard);
            this.keys = $('<div>');
            this.keys.html(this.parseKeys(this.alphabet.split(','))).appendTo(this.view);

           this.addListeners();


        }
        addListeners():void{


            this.keys.on(CLICK,'.kb-key',(evt)=>{this.onKeyClick($(evt.currentTarget))})
        }


        private onKeyClick(el):void{
            var txt = el.text().toLowerCase();
            if(txt=='\u00A0'){
                txt='del';
            }else if(txt=='space'){
                txt=' ';
            }
            this.R.events.triggerHandler(this.R.KEY_PRESSED,txt);
        }
        private parseKeys(ar: string[]):string{
            var out: string = '<div class="row1">';
            for (var i = 0, n = ar.length; i < n; i++) {
                if(i===10)out+='</div><div class="row2">';
                if(i===20) out+='</div><div class="row3">'
                if(i===30) out+='</div><div class="row4">'
                out += this.itemRenderer(ar[i]);
            }
            return out+'</div>';
        }
        private itemRenderer(item: string): string {
            var cl = '';
            if(item=='SPACE') cl+=' space';
            if(item == '&nbsp;')cl+=' back fa fa-caret-square-o-left';
            return '<div class="kb-key btn '+cl+'"><span>' + item + '</span></div>';
        }
    }

    export class SearchInput{
        view:JQuery;
        input:JQuery;
        private btnClear:JQuery;
        data:string;
        R:Registry;
        private isKw:boolean;
        constructor(el:HTMLElement){
            this.view=$(el);
            this.data='';
            this.input = this.view.find('[data-id=input]:first');
            this.R=Registry.getInstance();
            this.btnClear = this.view.find('[data-id=btnClear]:first');
            this.addListeners();

        }

        reset(){
            this.input.text('');
            this.data='';
        }

        private addListeners():void{
            this.btnClear.on(CLICK,()=>this.onClearClick());
           // this.R.events.on(this.R.KEYBOARD_HIDE,()=>{this.setText('');});
            this.R.events.on(this.R.RESET_INPUT,()=>{this.setText('');});
            this.R.events.on(this.R.KEY_PRESSED,(evt,txt)=>{this.onKeyPressed(txt)});
            this.R.events.on(this.R.KEYWORD_PRESSED,(evt,txt)=>{this.onKeyword(txt)});
            this.R.events.on(this.R.TIMEOUT,()=>this.reset());
        }
        private onKeyword(str:string):void{
            //this.isKw=true
            if(this.data ==str){
                this.setText('');
            }else{
                this.R.connector.Stat('kw',str);
                this.setText(str);
            }
        }

        private onClearClick():void{
            this.setText('');
        }

        private setText(txt:string):void{
            this.data=txt;
            this.input.text(this.data);

          //  console.log(this.R.SEARCH_CHANGED,this.data);
            this.R.events.triggerHandler(this.R.INPUT_CHANGED,this.data);
        }

        private timeout:number
        private onKeyPressed(txt:string):void{
            var str:string = this.data;
            if(txt=='del') {
                if (str.length > 1) str = str.substr(0, str.length - 1);
                else str = '';
            }else{
                if(str.length==0) str=txt.toUpperCase();
                else  str+=txt;
            }


            this.setText(str);
            clearTimeout(this.timeout)
            this.timeout = setTimeout(function(){ Registry.getInstance().connector.Stat('kb',str);},1500);
           // this.input.focus();
        }

    }


}