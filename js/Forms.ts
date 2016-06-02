/**
 * Created by VladHome on 12/30/2015.
 */
    ///<reference path='typing/jquery.d.ts' />
    ///<reference path='typing/underscore.d.ts' />
    ///<reference path='Utils.ts' />
    ///<reference path='admin/net.ts' />


module uplight{
    export class SimpleForm extends DisplayObject{
        constructor(public $view,service:string,name?:string){
            super($view,name);
          this.conn =   new Connect(service,name);
        }
        inputs:HTMLInputElement[];
        ind:_.Dictionary<HTMLInputElement>;
        $submit:JQuery;
        conn:Connect;
        message:string='Form error';
        currentItem:any;
        init(){
            this. $view.find( "form" ).submit(function( evt ) { evt.preventDefault(); });
            var ar:HTMLInputElement[]=[];
            var dic:any={};
            this.$view.find('input').each(function(i,el){
                dic[el.getAttribute('name')]=el;
                ar.push(el);
            })
            this.inputs = ar;
            this.ind=dic;
            this.$submit = this.$view.find('[type=submit]').click(()=>this.onSubmitClick())
            this.onInit();
        }
        onInit():void{

        }

        setTitle(title:string){
                this.$view.find('[data-id=title]').text(title);
        }

        setData(data:any):void{
            for(var str in data) if(this.ind[str]) this.ind[str].value = data[str];
            this.currentItem = data;
        }
        clear(){
            var ar = this.inputs
            for(var i=0,n=ar.length;i<n;i++){
                ar[i].value='';
            }
        }
        onSubmitClick():void{
            var valid = true;
            var ar = this.inputs;
            var data:any={};
            for(var i=0,n=ar.length;i<n;i++){
                if(!ar[i].checkValidity()) valid = false;
                if(ar[i].type=='checkbox') data[ar[i].name]=ar[i].checked;
                else data[ar[i].name]=ar[i].value;
            }

            if(valid){
                var btn:JQuery = this.$submit.prop('disabled',true);
                setTimeout(function(){
                    btn.prop('disabled',false)
                },3000)
                this.onSubmit(data);
            }
        }
        onComplete(res:VOResult):void{

        }
        onError(res:VOResult):void{
            var msg:string = res.message || this.message
            this.showMessage(msg);
            console.log(msg);
        }
        onResult(res:VOResult):void{
            if(res.success)this.onComplete(res);
            else this.onError(res)
        }

        onRespond(s:any):void{
            var res:VOResult;
           // console.log(s);
            if(typeof s=='string'){
                try{
                    res = JSON.parse(s);
                }catch (e){
                    this.showMessage('Communication Error logged on server <br/> We will contact you soon');
                    this.conn.logError('EMAIL'+this.name+this.conn.service+'  '+s);
                    //  console.log(s);
                    return;
                }
            }else res=s

            if(res) this.onResult(res);
        }
        send(obj){
            this.conn.post(obj).done((s:string)=>this.onRespond(s))
        }

        onSubmit(data:any){
            if(this.currentItem){
                for(var str in data)this.currentItem[str]=data[str];
                this.send(this.currentItem);
            }else  this.send(data);
        }
        timeout:number;
        showMessage(str:string){
            var msg = this.$view.find('[data-id=message]').html(str).removeClass('hidden').fadeIn();
            clearTimeout(this.timeout);
            this.timeout =  setTimeout(function(){ msg.fadeOut(); },5000);
        }


    }
    export class ModalForm extends SimpleForm{
        constructor($view,service,name){
            super($view,service,name);
           var btn =  this.$view.find('[data-id=btnClose]').click(()=>this.onCloseClick());

        }
        onCloseClick():void{
            this.hide();
        }

    }


    export class LoginForm extends SimpleForm{
        constructor(public $view,service:string,name?:string){
            super($view,service,name);

        }
        onInit():void{
           var chk:JQuery =  this.$view.find('[name=showpassword]').click(()=>{
                if(chk.prop('checked'))this.ind['password'].type='text';
                else  this.ind['password'].type='password';
            })
        }
        onComplete(res:VOResult):void{

            if(res.success=='loggedin')window.location.href=res.result;
        }
    }
}