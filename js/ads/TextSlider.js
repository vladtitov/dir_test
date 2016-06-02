/// <reference path="../../../scripts/typings/jquery.d.ts" />
var ads;
(function (ads) {
    var TextSlider = (function () {
        function TextSlider() {
            var _this = this;
            this.delay = 10;
            this.width = 1920;
            this.maxY = 900;
            this.height = 100;
            this.current = 0;
            this.top = 0;
            this.delay2 = 100;
            this.view = $('<div id="TextSlider"></div>');
            this.view.width(this.width);
            this.view.height(this.height);
            this.view.css('position', 'absolute');
            this.view.css('overflow', 'hidden');
            this.container = $('<div style="width:100%"></div>').appendTo(this.view);
            this.container.css('position', 'absolute');

            var ar = [
                ' I am listening to UPDATE event and dont have this problem any more',
                'Accelerator directors and staff looking to improve their program',
                'Entrepreneurs making the decision to apply to or join an accelerator',
                'Sponsors and donors assessing their financial support of accelerators',
                'Mentors considering donating their time and expertise',
                'Government agencies and policy-makers evaluating the role'
            ];
            this.setData(ar);

            this.timer = setTimeout(function () {
                return _this.playNext();
            }, this.delay * 1000);
        }
        TextSlider.prototype.destory = function () {
            clearInterval(this.timer2);
            clearTimeout(this.timer);
            this.view = null;
            this._data = null;
        };

        TextSlider.prototype.onTimer2 = function () {
            this.isMove = true;
        };
        TextSlider.prototype.startTimer2 = function () {
            var _this = this;
            this.timer2 = setInterval(function () {
                return _this.onTimer2();
            }, this.delay2 * 1000);
        };
        TextSlider.prototype.setData = function (data) {
            this._data = data;
            var out = '';
            for (var i = 0, n = data.length; i < n; i++) {
                out += '<h2>' + data[i] + '</h2>';
            }
            this.container.html(out);
        };
        TextSlider.prototype.moveDown = function () {
        };

        TextSlider.prototype.playNext = function () {
            var _this = this;
            if (this.top > 900)
                this.top = 0;
            this.top += 98;
            this.view.animate({ scrollTop: this.top, top: this.top }, 2000, function () {
            });

            // this.view.animate({ top: this.top }, 2000, function () {
            // })
            this.timer = setTimeout(function () {
                return _this.playNext();
            }, this.delay * 1000);
        };
        return TextSlider;
    })();
    ads.TextSlider = TextSlider;
})(ads || (ads = {}));

var stextSlider = new ads.TextSlider();
