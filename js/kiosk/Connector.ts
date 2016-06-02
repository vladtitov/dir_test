/// <reference path="Registry.ts" />
module uplight {

    export  class VOResult{
        result:string;
        success:string;
        error:string;
    }

    export class Connector {
        constructor(){
            this.id = Registry.getInstance().getSettings('id');
        }
        private service = 'rem/kiosk.php?a=';
        private serv= 'rem/kiosk.php';
        private id:string;
       // who:string='kiosk';
       public device: string;
        public lang: string;

        public onData: Function;

        get(url:string):JQueryPromise<string>{
            return $.get(url);
        }

        getKeywords():JQueryPromise<string>{
            return  $.get(this.service + 'get_keywords');
        }
        getData(filename:string):JQueryPromise<string> {
           return $.get(this.service + 'get_data&device=' + this.device+'&index='+filename);

        }
        getUpdates(stamp:number,callBack: Function, onError: Function): void {
            $.get(this.service + 'get_updates&stamp='+stamp).done(callBack).fail(onError);
        }
        Log(msg:string): void {
            msg=(new Date()).toString()+'||'+msg;
            $.post(this.service + 'log_log',msg);
        }

        relay(obj:any):JQueryPromise<VOResult>{
            obj.a='get_stamp';
            obj.id=this.id;
            //stamp:number,now:number,ping:number,timer:number,status:string
            return $.get(this.serv,obj);

        }
        Error(msg:string): void {
            msg=(new Date()).toString()+'||'+msg;
            $.post(this.service + 'log_error',msg);
        }
        Stat(type:string,val:string): void {
            var who = this.id;
            var stamp= Date.now();
            $.get(this.service + 'log_stat'+'&type='+type+'&val='+val+'&who='+who+'&stamp='+stamp);
        }

        getCategories():JQueryPromise<VOCategory[]>  {
           return $.get(this.service + 'get_categories');

        }
        ////////////////////////////////////////
        getPagesList(callBack: Function) {
            $.get(this.service + 'get_pages_list').done(callBack);

        }

        private pages:JQueryDeferred<any[]>;
        getPages():JQueryPromise<any[]> {
            if(!this.pages) this.pages = $.Deferred();
                this.getData(u_settings.pages).done((res)=>{
                    var ar = JSON.parse(res);
                    for(var i=0,n=ar.length;i<n;i++){
                      ar[i].label = ar[i].name;
                    }
                    this.pages.resolve(ar);
                })

            return   this.pages.promise();

        }

        ///////////////////////////////////////////////
        getSettings():JQueryPromise <JSON> {
            return $.get(this.service + 'get_settings',null,'application/json');
        }
///////////////////////////////
        getPersonal(callBack:Function, destid:number): void {
            $.ajax(this.service + 'get_personal&destid='+destid).done(callBack);
        }
        getAdvanced(callBack: Function, adv:string): void {
            $.ajax(this.service + 'get_advanced&id=' + adv).done(callBack);
        }
        getDestinations():JQueryPromise <JSON> {
            return $.get(this.service + 'get_dests');
        }
      
    }
}

