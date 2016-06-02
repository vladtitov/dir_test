/**
 * Created by VladHome on 11/9/2015.
 */
    /// <reference path="../RegA.ts" />
    /// <reference path="../../typing/jquery.d.ts" />
    /// <reference path="../../typing/underscore.d.ts" />
module uplight{

    export class DeviceModel{
       id:number;
        status:number=0;
        track:VOTrack;
        name:string;
        template:string;
        timer:number;
        type:string;
       static s_time:number;
        constructor(dev:VODevice){
            for(var str in dev) this[str] = dev[str];
            if(this.track){
                var delta:number = (DeviceModel.s_time-this.track.s_time);
                if(delta < (this.timer/1000))this.status=1;
            }

        }
    }


    export class DevicesData implements UModule {
        private data:VODevice[];
        private devices:DeviceModel[];
        private s_time:number;
        private list:JQuery;
        private kioskTimer:number;
        private timer:number;
        private ID:string ='uplight.DevicesData';

        // private greenLite:JQuery;

        private R:RegA;
        constructor(private $view:JQuery,private colors:string[]){
            //console.log('DevicesData');

            this.R =  RegA.getInstance()
            var obj:any = RegA.getInstance().getProps['timer'];
            if(obj) this.kioskTimer =obj.value;
            this.list = $view.find('[data-id=list]:first');
            // this.greenLite=view.find('[data-view=greenLite]:first');
            this.loadData();
           this.timer =  setInterval(()=>this.loadData(),10000);
        }

        detach():void{
            this.$view.detach();
        }
        appendTo(cont:JQuery):UModule{
            this.$view.appendTo(cont);
            return this;
        }
        getName():string{
            return this.ID;
        }
        destroy():void{
            clearInterval(this.timer);
        }

        private loadData():void{
            this.list.find('.status').detach();
            RegA.getInstance().connector.getDevicesData().done((res)=>this.onDeviceData(res));
        }

        private onDeviceData(res:VOResult):void{
           // console.log(res);

            var ar:any[] =res.result;
            DeviceModel.s_time = Number(res.success);
           var out:DeviceModel[]=[];
            for(var i=0,n=ar.length;i<n;i++) out.push(new DeviceModel(ar[i]));
            this.devices = out;
            this.render();
        }

        private render():void {
            var s_time=this.s_time;
            var ar:DeviceModel[] =  this.devices;
            var out='';
            for(var i=0,n=ar.length;i<n;i++){
              out+=this.createDevice(ar[i]);
            }
            this.list.html(out) ;
        }

        private createDevice(obj:DeviceModel):string{
            var color:string='#0F0';
            var statusStr='Working fine';
            var  cl ='fa-circle';
            if(obj.status === 0){
                color = '#ECCC6B';
                cl='fa-exclamation-triangle';
                statusStr = 'Experienced delays';
            }
            var stsrtTime:string='';
            var lastTime:string='';
            var ip:string ='';
            var ping:string='';
            if(obj.track){
                stsrtTime = new Date(obj.track.start*1000).toLocaleString();
                lastTime =  new Date(obj.track.now*1000).toLocaleString();
                ip=obj.track.ip;
                ping = obj.track.ping+' ';
            }


            return '<tr>' +
                '<td>'+obj.name+'</td>' +
                '<td><a target="_blank" href="'+obj.template+'&mode=preview" ><span class="fa fa-external-link"></span></a></td>' +
                '<td><span title="'+statusStr+'" class="status fa '+cl+'" style="color:'+color+'">&nbsp</span></td>' +
                '<td>'+ip+'</td>' +
                '<td>'+ping+'</td>' +
                '<td class="text-right">'+stsrtTime+'</td>' +
                '<td class="text-right">'+lastTime+'</td>' +
                '</tr>';


        }



    }
}