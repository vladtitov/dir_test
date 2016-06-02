/**
 * Created by VladHome on 8/8/2015.
 */
    ///<reference path="../../typing/chart.d.ts"/>
    /// <reference path="../DirsAdmin.ts" />
    /// <reference path="TopSearches.ts" />
    /// <reference path="KioskChart.ts" />
    /// <reference path="DeviceData.ts" />
module uplight{
    export class Statistics implements UModule{
        private ID:string = 'uplight.Statistics';
        R:RegA;
        private data:VOStat[];
        private $view:JQuery;
       private colors:string[]=['#9F9977','#B2592D','#BDC2C7','#BC8777',' #996398','#839182','#708EB3','#BC749A','#9F9977','#B2592D','#BDC2C7','#BC8777',' #996398','#839182','#708EB3','#BC749A'];
        private fromTo:string;
        private devices:UModule;
        constructor(contauner:JQuery){
            this.R = RegA.getInstance();
            this.R.current = this;
            contauner.load('htms/admin/Statistics.htm',()=>this.init());
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
        destroy(){
            this.devices.destroy();
        }
        private init():void{
            this.$view=$('#Statistics');
           this.R.connector.getStatistics().done((res)=>this.onData(res));

            var today = new Date()
            var priorDate = new Date(today.getTime() - 30*24*60*60*1000);
            this.fromTo = 'from '+today.toDateString().substr(4) +' to '+priorDate.toDateString().substr(4);
            var kiosksChart:KiosksChart = new KiosksChart($('#KiosksChart'),this.colors,this.fromTo);
            this.devices = new DevicesData($('#DevicesData'),this.colors);

        }

        private onData(res:any):void{
            var cats =  res.categories;
            var dests = res.destinations;

          //  console.log(res);

            var categ:CategoriesChart  = new CategoriesChart($('#CategoriesChart'),cats,this.colors);
            var destinTopDestinations = new TopDestinations($('#TopDestinations'),dests);
            var searches:TopSearches = new TopSearches($('#TopSearches'), res.search,res.keywords);

        }
    }









}