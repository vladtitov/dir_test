/**
 * Created by VladHome on 11/9/2015.
 */
/// <reference path="../RegA.ts" />
/// <reference path="../../typing/jquery.d.ts" />
/// <reference path="../../typing/underscore.d.ts" />
var uplight;
(function (uplight) {
    var DeviceModel = (function () {
        function DeviceModel(dev) {
            this.status = 0;
            for (var str in dev)
                this[str] = dev[str];
            if (this.track) {
                var delta = (DeviceModel.s_time - this.track.s_time);
                if (delta < (this.timer / 1000))
                    this.status = 1;
            }
        }
        return DeviceModel;
    }());
    uplight.DeviceModel = DeviceModel;
    var DevicesData = (function () {
        function DevicesData($view, colors) {
            //console.log('DevicesData');
            var _this = this;
            this.$view = $view;
            this.colors = colors;
            this.ID = 'uplight.DevicesData';
            this.R = uplight.RegA.getInstance();
            var obj = uplight.RegA.getInstance().getProps['timer'];
            if (obj)
                this.kioskTimer = obj.value;
            this.list = $view.find('[data-id=list]:first');
            // this.greenLite=view.find('[data-view=greenLite]:first');
            this.loadData();
            this.timer = setInterval(function () { return _this.loadData(); }, 10000);
        }
        DevicesData.prototype.detach = function () {
            this.$view.detach();
        };
        DevicesData.prototype.appendTo = function (cont) {
            this.$view.appendTo(cont);
            return this;
        };
        DevicesData.prototype.getName = function () {
            return this.ID;
        };
        DevicesData.prototype.destroy = function () {
            clearInterval(this.timer);
        };
        DevicesData.prototype.loadData = function () {
            var _this = this;
            this.list.find('.status').detach();
            uplight.RegA.getInstance().connector.getDevicesData().done(function (res) { return _this.onDeviceData(res); });
        };
        DevicesData.prototype.onDeviceData = function (res) {
            // console.log(res);
            var ar = res.result;
            DeviceModel.s_time = Number(res.success);
            var out = [];
            for (var i = 0, n = ar.length; i < n; i++)
                out.push(new DeviceModel(ar[i]));
            this.devices = out;
            this.render();
        };
        DevicesData.prototype.render = function () {
            var s_time = this.s_time;
            var ar = this.devices;
            var out = '';
            for (var i = 0, n = ar.length; i < n; i++) {
                out += this.createDevice(ar[i]);
            }
            this.list.html(out);
        };
        DevicesData.prototype.createDevice = function (obj) {
            var color = '#0F0';
            var statusStr = 'Working fine';
            var cl = 'fa-circle';
            if (obj.status === 0) {
                color = '#ECCC6B';
                cl = 'fa-exclamation-triangle';
                statusStr = 'Experienced delays';
            }
            var stsrtTime = '';
            var lastTime = '';
            var ip = '';
            var ping = '';
            if (obj.track) {
                stsrtTime = new Date(obj.track.start * 1000).toLocaleString();
                lastTime = new Date(obj.track.now * 1000).toLocaleString();
                ip = obj.track.ip;
                ping = obj.track.ping + ' ';
            }
            return '<tr>' +
                '<td>' + obj.name + '</td>' +
                '<td><a target="_blank" href="' + obj.template + '&mode=preview" ><span class="fa fa-external-link"></span></a></td>' +
                '<td><span title="' + statusStr + '" class="status fa ' + cl + '" style="color:' + color + '">&nbsp</span></td>' +
                '<td>' + ip + '</td>' +
                '<td>' + ping + '</td>' +
                '<td class="text-right">' + stsrtTime + '</td>' +
                '<td class="text-right">' + lastTime + '</td>' +
                '</tr>';
        };
        return DevicesData;
    }());
    uplight.DevicesData = DevicesData;
})(uplight || (uplight = {}));
//# sourceMappingURL=DeviceData.js.map