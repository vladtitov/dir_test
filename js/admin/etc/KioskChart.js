/**
 * Created by VladHome on 11/9/2015.
 */
/// <reference path="../../typing/jquery.d.ts" />
/// <reference path="../../typing/underscore.d.ts" />
/// <reference path="../RegA.ts" />
var uplight;
(function (uplight) {
    var CategoriesChart = (function () {
        function CategoriesChart(view, data, colors) {
            // console.log(data);
            this.view = view;
            this.data = data;
            this.colors = colors;
            var ar = data;
            var out = {};
            var max = 0;
            for (var i = 0, n = ar.length; i < n; i++) {
                var val = ar[i][1];
                if (isNaN(val))
                    val = 10000;
                val = 10000 - val;
                if (val > max)
                    max = val;
                out[ar[i][0]] = val;
            }
            for (var str in out)
                out[str] -= max;
            this.render(out);
            //RegA.getInstance().connector.getCategories().done((res)=>this.onCategories(res))
        }
        /* private getCategryStat(id:number){
         var ar = this.data
         for(var i=0,n=ar.length;i<n;i++){
         var item = ar[i];
         }
         }
         */
        /* private parseData(cats:any,data:any):void{
         console.log(data);
         var ar = data
         for(var i=0,n=ar.length;i<n;i++){
         if(ar[i].type=='cp'){ cats[ar[i].val]++}
         else if(ar[i].type=='cm'){cats[ar[i].val]--};
         }

         }

         private rateCategories(cats:VOCategory[],obj:any):VOPie[]{
         var ar = cats;
         var out:VOPie[]=[]
         for(var i=0,n=ar.length;i<n;i++){
         var item = ar[i];
         var vo:VOPie = new VOPie();
         vo.color=ar[i].color;
         vo.label = ar[i].label;
         vo.value = obj[ar[i].id];
         out.push(vo);
         }
         return out;
         }
         private cats:any;*/
        CategoriesChart.prototype.render = function (data) {
            var list = $('<ul>');
            var out = '';
            // var ar = res
            var obj = {};
            var pies = [];
            var ar = uplight.RegA.getInstance().model.getCategories();
            var total = 0;
            for (var i = 0, n = ar.length; i < n; i++) {
                // var cat:VOCategory = new VOCategory(ar[i]);
                var vo = new VOPie();
                vo.color = this.colors[i];
                vo.label = ar[i].label;
                var val = data[ar[i].id] || 1;
                if (val === 0)
                    val = 1;
                val = 1 / Math.abs(val);
                total += val;
                vo.value = val; // 100+(data[cat.id] || 0);
                pies.push(vo);
                out += '<li><span class="glyphicon glyphicon-stop" style="color:' + vo.color + ';"></span> <span> ' + vo.label + '</span></li>';
            }
            for (var i = 0, n = pies.length; i < n; i++) {
                pies[i].value = pies[i].value / total * 100;
            }
            // console.log(pies);
            // this.parseData(obj,this.data);
            ///  var vis =  this.rateCategories(cats,obj);
            // console.log(cats);
            list.html(out);
            this.list = list;
            var cont = this.view.find('[data-id=list]:first').empty();
            list.appendTo(cont);
            var canvas = this.view.find('[data-id=canvas]:first');
            //console.log('vis',vis);
            var myPieChart = new Chart(canvas.get(0).getContext("2d")).Pie(pies, this.getOptions());
            //console.log(res);
        };
        CategoriesChart.prototype.getOptions = function () {
            return {
                //Boolean - Whether we should show a stroke on each segment
                segmentShowStroke: true,
                //String - The colour of each segment stroke
                segmentStrokeColor: "#fff",
                //Number - The width of each segment stroke
                segmentStrokeWidth: 2,
                //Number - The percentage of the chart that we cut out of the middle
                percentageInnerCutout: 0,
                //Number - Amount of animation steps
                animationSteps: 100,
                //String - Animation easing effect
                animationEasing: "easeOutBounce",
                //Boolean - Whether we animate the rotation of the Doughnut
                animateRotate: true,
                //Boolean - Whether we animate scaling the Doughnut from the centre
                animateScale: false
            };
        };
        return CategoriesChart;
    }());
    uplight.CategoriesChart = CategoriesChart;
    var VOPie = (function () {
        function VOPie() {
        }
        return VOPie;
    }());
    var VOKs = (function () {
        function VOKs(id) {
            this.id = id;
            this.clicks = [];
        }
        VOKs.prototype.buildDays = function () {
            var out;
            var ar = this.clicks;
            for (var i = 0, n = ar.length; i < n; i++) {
                var date = new Date(ar[i] * 1000);
                var day = date.getDay();
                if (!out[day])
                    out[day] = 0;
                out[day]++;
            }
            return out;
        };
        return VOKs;
    }());
    var KiosksChart = (function () {
        function KiosksChart(view, colors, fromto) {
            var _this = this;
            this.view = view;
            this.colors = colors;
            //  console.log(clicks);
            this.view.find('[data-id=fromto]:first').text(fromto);
            uplight.RegA.getInstance().connector.getData('devices').done(function (res) { return _this.onDevices(res); });
        }
        KiosksChart.prototype.craeateTimeline = function () {
            var now = new Date();
            var dates = [];
            dates.push(now.getDate());
            for (var i = 0, n = 30; i < n; i++) {
                now.setDate(now.getDate() - 1);
                dates.push(now.getDate());
            }
            return dates.reverse();
        };
        KiosksChart.prototype.breakeClicksInDays = function (clicks) {
            var ar = clicks;
            for (var i = 0, n = ar.length; i < n; i++) {
                var date = new Date(ar[i] * 1000);
            }
            var from = new Date(clicks[0] * 1000);
            var to = new Date(clicks[clicks.length - 1] * 1000);
            console.log(from);
            console.log(to);
        };
        KiosksChart.prototype.convertClicks = function (ar) {
            var out = [];
            // console.log(ar);
            for (var i = 0, n = ar.length; i < n; i++) {
                var date = new Date(ar[i] * 1000);
                var day = date.getDate();
                if (!out[day])
                    out[day] = 0;
                out[day]++;
            }
            return out;
        };
        KiosksChart.prototype.mapClicks = function (ar, clicks) {
            var out = [];
            for (var i = 0, n = ar.length; i < n; i++)
                out.push(clicks[ar[i]] || 0);
            return out;
        };
        KiosksChart.prototype.renderKiosk = function (obj) {
            return '<li title="kiosk id ' + obj.id + '"><span class="glyphicon glyphicon-stop" style="color:' + obj.color + ';"></span> <span> ' + obj.name + '</span></li>';
        };
        KiosksChart.prototype.onData = function (res) {
            // console.log('usage',res);
            var timeline = this.craeateTimeline();
            var ar = [];
            for (var str in res) {
                var item = this.devices[str];
                var clicks = this.convertClicks(res[str]);
                item.clicks = this.mapClicks(timeline, clicks);
                ar.push(item);
            }
            this.drawGraph(timeline.map(String), ar);
        };
        KiosksChart.prototype.drawGraph = function (timeline, ar) {
            var datasets = [];
            for (var i = 0, n = ar.length; i < n; i++) {
                var ds = {};
                ds.label = ar[i].name;
                ds.strokeColor = ar[i].color;
                ds.pointColor = ar[i].color;
                ds.pointHighlightStroke = "rgba(220,220,220,1)";
                ds.pointStrokeColor = "#fff";
                ds.pointHighlightFill = "#666";
                ds.data = ar[i].clicks;
                datasets.push(ds);
            }
            var data = {
                labels: timeline.map(String),
                datasets: datasets
            };
            var canvas = this.view.find('[data-id=canvas]:first');
            var ctx = canvas.get(0).getContext("2d");
            var myLineChart = new Chart(ctx).Line(data, this.getOptions());
        };
        KiosksChart.prototype.onDevices = function (res) {
            var _this = this;
            var ids = [];
            // var timeline:number[]=  this.craeateTimeline();
            var ks = JSON.parse(res);
            // console.log(ks);
            var ar = ks;
            var list = $('<ul>');
            var out = '';
            var datasets = [];
            var devices = {};
            for (var i = 0, n = ar.length; i < n; i++) {
                var item = ar[i];
                var index = item.type + item.id;
                ids.push(index);
                devices[index] = ar[i];
                // var clicks:number[] = this.clicks[ar[i].id];
                //if(!clicks) clicks=[];
                //clicks = this.convertClicks(clicks);
                //ar[i].clicks = this.mapClicks(timeline,clicks);
                ar[i].color = this.colors[i];
                out += this.renderKiosk(ar[i]);
            }
            this.devices = devices;
            uplight.RegA.getInstance().connector.getUsage(ids.join(','), '-30 days', 'now').done(function (res) { return _this.onData(res); });
            list.html(out);
            this.view.find('[data-id=list]:first').append(list);
            return;
            var timeline;
            var data = {
                labels: timeline.map(String),
                datasets: datasets /*[
                 {
                 label: "My First dataset",
                 fillColor: "rgba(220,220,220,0.2)",
                 strokeColor: "rgba(220,220,220,1)",
                 pointColor: "rgba(220,220,220,1)",
                 pointStrokeColor: "#fff",
                 pointHighlightFill: "#fff",
                 pointHighlightStroke: "rgba(220,220,220,1)",
                 data: ks[0].clicks
                 },
                 {
                 label: "My Second dataset",
                 fillColor: "rgba(151,187,205,0.2)",
                 strokeColor: "rgba(151,187,205,1)",
                 pointColor: "rgba(151,187,205,1)",
                 pointStrokeColor: "#fff",
                 pointHighlightFill: "#fff",
                 pointHighlightStroke: "rgba(151,187,205,1)",
                 data: ks[1].clicks
                 }
                 ]*/
            };
            var canvas = this.view.find('[data-id=canvas]:first');
            var ctx = canvas.get(0).getContext("2d");
            var myLineChart = new Chart(ctx).Line(data, this.getOptions());
        };
        KiosksChart.prototype.getOptions = function () {
            return {
                ///Boolean - Whether grid lines are shown across the chart
                scaleShowGridLines: true,
                //String - Colour of the grid lines
                scaleGridLineColor: "rgba(0,0,0,.05)",
                //Number - Width of the grid lines
                scaleGridLineWidth: 1,
                //Boolean - Whether to show horizontal lines (except X axis)
                scaleShowHorizontalLines: true,
                //Boolean - Whether to show vertical lines (except Y axis)
                scaleShowVerticalLines: true,
                //Boolean - Whether the line is curved between points
                bezierCurve: true,
                //Number - Tension of the bezier curve between points
                bezierCurveTension: 0.4,
                //Boolean - Whether to show a dot for each point
                pointDot: true,
                //Number - Radius of each point dot in pixels
                pointDotRadius: 4,
                //Number - Pixel width of point dot stroke
                pointDotStrokeWidth: 1,
                //Number - amount extra to add to the radius to cater for hit detection outside the drawn point
                pointHitDetectionRadius: 5,
                //Boolean - Whether to show a stroke for datasets
                datasetStroke: true,
                //Number - Pixel width of dataset stroke
                datasetStrokeWidth: 2,
                //Boolean - Whether to fill the dataset with a colour
                datasetFill: false
            };
        };
        return KiosksChart;
    }());
    uplight.KiosksChart = KiosksChart;
})(uplight || (uplight = {}));
//# sourceMappingURL=KioskChart.js.map