/**
 * Created by VladHome on 9/16/2015.
 */
/// <reference path="../Registry.ts" />
var uplight;
(function (uplight) {
    var Relay = (function () {
        function Relay(delay, count) {
            var _this = this;
            this.stamp = 0;
            this.ping = 0;
            if (isNaN(delay) || delay < 2)
                delay = 2;
            this.timer = (new Date()).getTime();
            this.startTime = Math.round(this.timer / 1000);
            this.interval = setInterval(function () { return _this.relay(); }, delay * 1000);
            this.count = 1000000;
            if (count)
                this.count = count;
        }
        Relay.prototype.relay = function () {
            this.count--;
            if (this.count < 0)
                clearInterval(this.interval);
            var self = this;
            var now = (new Date()).getTime();
            var timer = now - this.timer;
            this.timer = now;
            var out = {
                stamp: this.stamp,
                now: Math.round(now / 1000),
                ping: this.ping,
                timer: timer,
                start: this.startTime
            };
            uplight.Registry.getInstance().connector.relay(out).done(function (res) {
                self.ping = (new Date()).getTime() - now;
                var vo;
                try {
                    vo = JSON.parse(res);
                }
                catch (e) {
                    console.warn('relay doesnt work ' + res);
                    return;
                }
                if (vo.success == 'success') {
                    var stamp = Number(vo.result);
                    if (self.stamp === 0)
                        self.stamp = stamp;
                    else if (self.stamp && self.stamp != stamp)
                        window.location.reload();
                }
            });
        };
        return Relay;
    })();
    uplight.Relay = Relay;
})(uplight || (uplight = {}));
//# sourceMappingURL=Relay.js.map