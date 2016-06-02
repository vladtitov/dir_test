/**
 * Created by VladHome on 8/23/2015.
 */
/// <reference path="../Registry.ts" />
/// <reference path="AttractLoop.ts" />
var uplight;
(function (uplight) {
    var GalleryDisplay = (function () {
        function GalleryDisplay(props, i) {
            var _this = this;
            this.props = props;
            this.timeout = 20;
            this.current = -1;
            this.interval = 0;
            this.view = $('<div>').addClass(props.url + ' gallery');
            this.list = $('<div>').appendTo(this.view);
            var delay = Number(props.delay);
            if (isNaN(delay) || delay < 5)
                delay = this.timeout;
            this.timeout = delay;
            uplight.Registry.getInstance().events.on(uplight.Registry.getInstance().AL_START, function () { return _this.start(); });
            uplight.Registry.getInstance().events.on(uplight.Registry.getInstance().AL_STOP, function () { return _this.stop(); });
            uplight.Registry.getInstance().connector.getData(props.url).done(function (res) { return _this.onData(res); });
        }
        GalleryDisplay.prototype.appendTo = function (container) {
            this.view.appendTo(container);
        };
        GalleryDisplay.prototype.onData = function (res) {
            var data = JSON.parse(res);
            var ar = data;
            var out = [];
            for (var i = 0, n = ar.length; i < n; i++) {
                out.push(this.createImage(ar[i]));
            }
            this.galley = out;
            this.current = -1;
            this.goNext();
        };
        GalleryDisplay.prototype.goNext = function () {
            var _this = this;
            console.log('next');
            if (!this.isActive || !this.galley)
                return;
            this.current++;
            if (this.current >= this.galley.length)
                this.current = 0;
            var next = this.galley[this.current];
            if (this.list.children().length > 1) {
                this.list.children().detach();
                this.cur = null;
            }
            this.list.append(next);
            if (this.cur) {
                var prev = this.cur;
                this.list.addClass('move');
                setTimeout(function () {
                    prev.detach();
                    _this.list.removeClass('move');
                }, 2000);
            }
            this.cur = next;
        };
        GalleryDisplay.prototype.createImage = function (url) {
            return $('<div>').addClass('item').html('<img src="' + url + '" />');
        };
        GalleryDisplay.prototype.start = function () {
            var _this = this;
            this.isActive = true;
            if (this.interval === 0)
                this.interval = setInterval(function () { _this.goNext(); }, this.timeout * 1000);
            this.goNext();
        };
        GalleryDisplay.prototype.stop = function () {
            this.isActive = false;
            clearInterval(this.interval);
            this.interval = 0;
        };
        return GalleryDisplay;
    })();
    uplight.GalleryDisplay = GalleryDisplay;
})(uplight || (uplight = {}));
//# sourceMappingURL=GalleryDisplay.js.map