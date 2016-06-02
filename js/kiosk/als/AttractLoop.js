/**
 * Created by VladHome on 8/23/2015.
 */
/// <reference path="../Registry.ts" />
/// <reference path="TouchClip.ts" />
/// <reference path="GalleryDisplay.ts" />
var uplight;
(function (uplight) {
    var ALProps = (function () {
        function ALProps() {
        }
        return ALProps;
    })();
    uplight.ALProps = ALProps;
    var ALoop = (function () {
        function ALoop(obj) {
            for (var str in obj)
                this[str] = obj[str];
        }
        return ALoop;
    })();
    uplight.ALoop = ALoop;
    var AttractLoop = (function () {
        function AttractLoop(el) {
            var _this = this;
            this.timeout = 60000;
            this.R = uplight.Registry.getInstance();
            this.view = $(el);
            this.view.on(CLICK, function () {
                _this.stop();
            });
            this.width = this.view.width();
            this.al = new ALoop(this.R.getSettings('attract_loop'));
            this.cover = this.view.find('[data-id=cover]:first');
            this.initAL();
            this.start();
            this.R.events.on(this.R.TIMEOUT, function () { return _this.start(); });
        }
        AttractLoop.prototype.hide = function () {
            this.view.addClass(HIDDEN);
        };
        AttractLoop.prototype.start = function () {
            if (!this.isActive) {
                this.isActive = true;
                this.show();
                this.R.events.triggerHandler(uplight.Registry.getInstance().AL_START);
            }
        };
        AttractLoop.prototype.show = function () {
            this.isActive = true;
            this.view.removeClass(HIDDEN);
        };
        AttractLoop.prototype.stop = function () {
            if (this.isActive) {
                this.R.events.triggerHandler(this.R.AL_STOP);
                this.isActive = false;
                this.hide();
            }
        };
        AttractLoop.prototype.initAL = function () {
            var vo = this.al;
            var ar = vo.props;
            for (var i = 0, n = ar.length; i < n; i++) {
                var item = ar[i];
                if (item.url.substr(0, 3) === 'gal') {
                    var gal = new uplight.GalleryDisplay(item, i);
                    gal.appendTo(this.cover);
                }
            }
            if (vo.TC) {
                var tc = new uplight.TouchClip(this.width);
                this.cover.append(tc.view);
            }
        };
        return AttractLoop;
    })();
    uplight.AttractLoop = AttractLoop;
})(uplight || (uplight = {}));
//# sourceMappingURL=AttractLoop.js.map