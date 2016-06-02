/**
 * Created by VladHome on 12/15/2015.
 */
    ///<reference path='typing/jquery.d.ts' />
    ///<reference path='typing/underscore.d.ts' />

module uplight{
   export class Utils{
       static message(text:string,vis:JQuery,time?:number){
           if(!time) time=3;
           var msg =  $('<div>').addClass('message').css(vis.offset()).text(text).appendTo('body');
           msg.hide();
           msg.show('fast');
           setTimeout(function(){
               msg.hide('fast',function(){
                   msg.remove();
               })
           },time*1000);
       }

   }


  /*  export class VOResult{
        success:string;
        error:string;
        result:string;
        message:string;
    }
*/
    export class UItem{
        ind:string;
        val:string;
        lbl:string;
    }

    export class Connect{
        service:string = 'rem/index.php';
        logger:string = 'rem/logger.php';
        action:string;
        id:string;
        constructor(service:string,id?:string ){
            var ar:string[] = service.split(',');
            if(ar.length==2){
                this.service = 'rem/'+ar[0]+'.php';
                this.action= ar[1];
            }else this.action = ar[0];
            if(id)this.id=id;
           // console.log('Connect service:'+service+' action: '+action);

        }
        post(obj:any,url?:string):JQueryPromise<string>{
            if(typeof obj == 'object') obj = JSON.stringify(obj);
            return  $.post(this.service+this.makeUrl(url),obj);
        }
        private makeUrl(url:string):string{
            if(!url) url='?a='+this.action;
            else if(this.action)  url='?a='+this.action+'.'+url;
            else  url='?a='+url;
            if(this.id)url+='&id='+this.id;
            return url;
        }
        get(url:string):JQueryPromise<string>{
            return  $.get(this.service+this.makeUrl(url));
        }

        log(obj:any,url?:string):JQueryPromise<string>{
            if(typeof obj == 'object') obj = JSON.stringify(obj);
            if(!url) url='?a=LOG';
            return  $.post(this.logger+this.makeUrl(url),obj);
        }
        logError(obj):JQueryPromise<string>{
            var url='?a=ERROR';
            return this.log(obj,url);

        }
        emailError(obj):JQueryPromise<string>{
            var url='?a=EMAIL';
            return this.log(obj,url);

        }

    }

   export class Registry{
       static data:any;
       static settings:any;
   }


    export class DisplayObject{
        constructor(public $view:JQuery,public name?:string){

        }
        data:any;
        onShow():void{ }
        onHide():void{}
        onAdded():void{}
        onRemoved():void{}
        destroy():void{
            this.$view.remove();
        }
        id:number;
        isVisuble:boolean;
        show():DisplayObject{
            this.isVisuble = true;
            this.onShow();
            this.$view.show();
            return this;
        }

        hide():DisplayObject{
            if(this.isVisuble){
                this.isVisuble = false;
                this.$view.hide();
                this.onHide();
            }
            return this;
        }

        appendTo(parent:JQuery):DisplayObject{
            parent.append(this.$view);
            this.onAdded();
            return this;
        }
        remove():DisplayObject{
            this.$view.detach();
            this.onRemoved();
            return this;
        }

    }

    export class WindowView extends  DisplayObject{
        constructor($view:JQuery,opt:any,name?:string) {
            super($view, name);
            this.$view.find('[data-id=btnClose]').click(()=>this.onClose());
        }
        onClose():void{
            this.hide();
        }

    }
    export class ModuleView extends  WindowView{
        constructor($view:JQuery,opt:any,name?:string) {
            super($view, name);
        }

    }


}