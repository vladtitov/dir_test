/// <reference path="../Registry.ts" />
var uplight;
(function (uplight) {
    var ScreenSaver2 = (function () {
        function ScreenSaver2() {
            this.init();
        }
        ScreenSaver2.prototype.init = function () {
            this.R = uplight.Registry.getInstance();
            // this.attratLoop = new AttractLoop($('#AttractLoop'),this.R.settings.attract_loop);
            this.isActive = true;
        };
        ScreenSaver2.prototype.startTimer = function () {
            clearTimeout(this.timer);
        };
        ScreenSaver2.prototype.onViewClick = function () {
            if (this.isActive)
                this.stopScreenSaver();
        };
        ScreenSaver2.prototype.onClick = function (evt) {
            this.startTimer();
            if (this.isActive)
                this.stopScreenSaver();
        };
        ScreenSaver2.prototype.startScreenSaver = function () {
            if (this.isActive)
                return;
            this.isActive = true;
            console.log('start ss');
            //  this.R.events.triggerHandler(this.R.SS_START);
        };
        ScreenSaver2.prototype.stopScreenSaver = function () {
            this.isActive = false;
            console.log('stop ss');
            // this.R.events.triggerHandler(this.R.SS_STOP);
        };
        return ScreenSaver2;
    })();
    uplight.ScreenSaver2 = ScreenSaver2;
})(uplight || (uplight = {}));
//# sourceMappingURL=ScreenSaver.js.map