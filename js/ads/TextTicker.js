/// <reference path="../../libs/typing/jquery.d.ts" />
var ads;
(function (ads) {
    var TextTicker = (function () {
        function TextTicker() {
            this.delay = 10;
            this.width = 1920;
            this.maxY = 900;
            this.height = 110;
            this.current = 0;
            this.top = 100;
            // private timer2: number;
            this.delay2 = 100;
            this.view = $('<div id="Ticker" style="position:absolute;" ></div>');
            this.view.width(this.width);
            this.view.height(this.height);
            this.view.css('overflow', 'hidden');
            // this.container = $('<div></div>').appendTo(this.view);          // this.container.
        }
        TextTicker.prototype.stop = function () {
            console.log('Ticker stop');
            console.log(this.timer);
            clearTimeout(this.timer);
            this.timer = null;
            // console.log(this.timer);
            // this.view = null;
            //this._data = null;
            this.current = 0;
            this.top = 100;
        };
        TextTicker.prototype.onTimer2 = function () {
            this.isMove = true;
        };
        TextTicker.prototype.startTimer2 = function () {
            // this.timer2 = setInterval(() => this.onTimer2(), this.delay2 * 1000);
        };
        TextTicker.prototype.setData = function (data) {
            this._data = data;
            return this;
        };
        TextTicker.prototype.getData = function () {
            return this._data;
        };
        TextTicker.prototype.moveDown = function () {
        };
        TextTicker.prototype.playNext = function () {
            var _this = this;
            console.log('playNext ' + this.current + ' of ' + this._data.length);
            if (this.isMove) {
                this.isMove = false;
                this.moveDown();
            }
            if (this.current >= this._data.length)
                this.current = 0;
            var msg = this._data[this.current++];
            this.view.append('<H2>' + msg + '</H2>');
            if (this.view.children().length > 1)
                this.removeFirst(this.view);
            clearTimeout(this.timer);
            this.timer = setTimeout(function () { return _this.playNext(); }, this.delay * 1000);
        };
        TextTicker.prototype.removeFirst = function (cont) {
            // var vp: JQuery = cont;
            this.top += 95;
            if (this.top > 800)
                this.top = 100;
            cont.animate({ scrollTop: 95, top: this.top }, 500, 'linear', function () {
                cont.scrollTop(0);
                cont.children().first().remove();
            });
        };
        return TextTicker;
    })();
    ads.TextTicker = TextTicker;
})(ads || (ads = {}));
//# sourceMappingURL=TextTicker.js.map