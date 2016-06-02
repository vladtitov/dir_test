/// <reference path="Registry.ts" />
var uplight;
(function (uplight) {
    var VOResult = (function () {
        function VOResult() {
        }
        return VOResult;
    })();
    uplight.VOResult = VOResult;
    var Connector = (function () {
        function Connector() {
            this.service = 'rem/kiosk.php?a=';
            this.serv = 'rem/kiosk.php';
            this.id = uplight.Registry.getInstance().getSettings('id');
        }
        Connector.prototype.get = function (url) {
            return $.get(url);
        };
        Connector.prototype.getKeywords = function () {
            return $.get(this.service + 'get_keywords');
        };
        Connector.prototype.getData = function (filename) {
            return $.get(this.service + 'get_data&device=' + this.device + '&index=' + filename);
        };
        Connector.prototype.getUpdates = function (stamp, callBack, onError) {
            $.get(this.service + 'get_updates&stamp=' + stamp).done(callBack).fail(onError);
        };
        Connector.prototype.Log = function (msg) {
            msg = (new Date()).toString() + '||' + msg;
            $.post(this.service + 'log_log', msg);
        };
        Connector.prototype.relay = function (obj) {
            obj.a = 'get_stamp';
            obj.id = this.id;
            //stamp:number,now:number,ping:number,timer:number,status:string
            return $.get(this.serv, obj);
        };
        Connector.prototype.Error = function (msg) {
            msg = (new Date()).toString() + '||' + msg;
            $.post(this.service + 'log_error', msg);
        };
        Connector.prototype.Stat = function (type, val) {
            var who = this.id;
            var stamp = Date.now();
            $.get(this.service + 'log_stat' + '&type=' + type + '&val=' + val + '&who=' + who + '&stamp=' + stamp);
        };
        Connector.prototype.getCategories = function () {
            return $.get(this.service + 'get_categories');
        };
        ////////////////////////////////////////
        Connector.prototype.getPagesList = function (callBack) {
            $.get(this.service + 'get_pages_list').done(callBack);
        };
        Connector.prototype.getPages = function () {
            var _this = this;
            if (!this.pages)
                this.pages = $.Deferred();
            this.getData(u_settings.pages).done(function (res) {
                var ar = JSON.parse(res);
                for (var i = 0, n = ar.length; i < n; i++) {
                    ar[i].label = ar[i].name;
                }
                _this.pages.resolve(ar);
            });
            return this.pages.promise();
        };
        ///////////////////////////////////////////////
        Connector.prototype.getSettings = function () {
            return $.get(this.service + 'get_settings', null, 'application/json');
        };
        ///////////////////////////////
        Connector.prototype.getPersonal = function (callBack, destid) {
            $.ajax(this.service + 'get_personal&destid=' + destid).done(callBack);
        };
        Connector.prototype.getAdvanced = function (callBack, adv) {
            $.ajax(this.service + 'get_advanced&id=' + adv).done(callBack);
        };
        Connector.prototype.getDestinations = function () {
            return $.get(this.service + 'get_dests');
        };
        return Connector;
    })();
    uplight.Connector = Connector;
})(uplight || (uplight = {}));
//# sourceMappingURL=Connector.js.map