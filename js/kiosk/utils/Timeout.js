/**
 * Created by VladHome on 9/18/2015.
 */
/// <reference path="../Kiosk.ts" />
var uplight;
(function (uplight) {
    var Timeout = (function () {
        function Timeout(timeout) {
            var _this = this;
            console.log(timeout);
            if (isNaN(timeout)) {
                console.log('error setting timeout ', timeout);
                timeout = 60;
            }
            this.timeout = timeout;
            document.addEventListener(CLICK, function (evt) { return _this.startTimer(); });
        }
        Timeout.prototype.startTimer = function () {
            var _this = this;
            clearTimeout(this.timer);
            this.timer = setTimeout(function () { if (_this.onTimeout)
                _this.onTimeout(_this.timeout); }, this.timeout * 1000);
        };
        return Timeout;
    })();
    uplight.Timeout = Timeout;
})(uplight || (uplight = {}));
//# sourceMappingURL=Timeout.js.map