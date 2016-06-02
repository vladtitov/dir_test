/// <reference path="../../../scripts/typings/greensock/greensock.d.ts" />
/// <reference path="../../libs/typing/jquery.d.ts" />
var ads;
(function (ads) {
    var TextTicker2 = (function () {
        function TextTicker2(width, height) {
            var _this = this;
            if (width === void 0) { width = 1920; }
            if (height === void 0) { height = 76; }
            this.width = width;
            this.height = height;
            this.delay = 10;
            this.maxY = 900;
            this.current = 0;
            this.top = 0;
            this.delay2 = 100;
            this.delta = 10;
            this.count = 0;
            this.view = $('<div id="TextTicker2" style="text-align:center"></div>').appendTo('#screensaver');
            this.view.width(width);
            this.view.height(height);
            this.view.css('position', 'absolute');
            this.view.css('overflow', 'hidden');
            this.container = $('<div style="width:100%"></div>').appendTo(this.view);
            // this.container.css('position', 'absolute');
            $.get('rem/kiosk.php?a=get_messages').done(function (resp) { return _this.onData(resp); });
        }
        TextTicker2.prototype.destory = function () {
            clearInterval(this.timer2);
            clearTimeout(this.timer);
            this.view = null;
            this._data = null;
        };
        TextTicker2.prototype.onTimer2 = function () {
            this.isMove = true;
        };
        TextTicker2.prototype.startTimer2 = function () {
            var _this = this;
            this.timer2 = setInterval(function () { return _this.onTimer2(); }, this.delay2 * 1000);
        };
        TextTicker2.prototype.onData = function (resp) {
            var _this = this;
            var data = JSON.parse(resp);
            this._data = data;
            var out = '';
            //for (var i = 0, n = data.length; i < n; i++) {
            // out += '<h2>' + data[i] + '</h2>';
            // }
            this.container.append(this.renderItem(this._data[0]));
            this.top = 300;
            this.moveView();
            this.timer = setTimeout(function () { return _this.playNext(); }, this.delay * 1000);
        };
        TextTicker2.prototype.renderItem = function (str) {
            return '<h1>' + str + '</h1>';
        };
        TextTicker2.prototype.moveDown = function () {
        };
        TextTicker2.prototype.moveView = function () {
            if (this.top > 900 || this.top < 40)
                this.delta = -this.delta;
            this.top += this.delta;
            var t = this.top;
            TweenMax.to(this.view, 0.3, { y: t }).delay(1.7);
        };
        TextTicker2.prototype.playNext = function () {
            var _this = this;
            this.moveView();
            if (this.count >= this._data.length)
                this.count = 0;
            this.container.append(this.renderItem(this._data[this.count++]));
            var v = this.view;
            var c = this.container;
            this.view.animate({ scrollTop: this.height }, 2000, function () {
                c.children().first().remove();
                v.scrollTop(0);
            });
            // this.view.animate({ top: this.top }, 2000, function () {
            // })
            this.timer = setTimeout(function () { return _this.playNext(); }, this.delay * 1000);
        };
        return TextTicker2;
    })();
    ads.TextTicker2 = TextTicker2;
})(ads || (ads = {}));
var stextSlider = new ads.TextTicker2();
//# sourceMappingURL=TextTicker2.js.map