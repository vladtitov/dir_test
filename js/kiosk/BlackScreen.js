/**
 * Created by VladHome on 5/12/2014.
 */
var uplight;
(function (uplight) {
    var BlackScreen = (function () {
        function BlackScreen() {
            var _this = this;
            this.onn = blank.stop;
            this.off = blank.start;
            this.location = url;
            console.log(blank);
            this.timer = setInterval(function () { return _this.testTime(); }, 5000);
        }
        BlackScreen.prototype.testTime = function () {
            var now = new Date();
            var mins = (now.getHours() * 60) + now.getMinutes();
            console.log(mins + '   ' + this.onn + '    ' + this.off);
            if (mins > this.onn) {
                if (this.off > this.onn && mins > this.off)
                    return;
                console.log('loading ' + this.location);
                clearInterval(this.timer);
                window.location.href = this.location;
            }
        };
        return BlackScreen;
    })();
    uplight.BlackScreen = BlackScreen;
})(uplight || (uplight = {}));
window.onload = function () {
    var screen = new uplight.BlackScreen();
};
//# sourceMappingURL=BlackScreen.js.map