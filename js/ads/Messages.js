/// <reference path="../../libs/typing/jquery.d.ts" />
/// <reference path="../../../Scripts/typings/easeljs/easeljs.d.ts" />
var uplight;
(function (uplight) {
    var ads;
    (function (ads) {
        var c = createjs;
        var SS_1920 = (function () {
            function SS_1920() {
                var _this = this;
                this.delta = 1;
                var canvas = document.createElement('canvas');
                canvas.width = window.innerWidth;
                ;
                canvas.height = window.innerHeight;
                $('#screensaver').append(canvas).css('background-color', 'rgba(0,0,0,0.7)');
                this.view = $(canvas);
                // this.view.width(1920);
                // this.view.height(1080);
                this.stage = new c.Stage(canvas);
                var ar = ["I am listening to UPDATE event and dont have this problem any more", "Accelerator directors and staff looking to improve their program", "Entrepreneurs making the decision to apply to or join an accelerator", "Sponsors and donors assessing their financial support of accelerators", "Mentors considering donating their time and expertise", "Government agencies and policy-makers evaluating the role", "Sponsors and donors assessing their financial support of accelerators", "Mentors considering donating their time and expertise", "Government agencies and policy-makers evaluating the role"];
                this.setData(ar);
                setTimeout(function () { return _this.start(); }, 1000);
            }
            SS_1920.prototype.start = function () {
                var _this = this;
                //createjs.Ticker.timingMode = createjs.Ticker.RAF_SYNCHED;;
                // createjs.Ticker.setFPS(30);
                this.stage.removeAllChildren();
                var texts = new c.Container;
                var ar = this.data;
                for (var i = 0, n = ar.length; i < n; i++) {
                    var txt = new c.Text(ar[i], "50px Arial", '#FFFFFF');
                    txt.y = i * 90 + 50;
                    txt.x = 50;
                    texts.addChild(txt);
                }
                this.rect = this.makeRect();
                texts.mask = this.rect;
                this.stage.addChild(texts);
                c.Ticker.on('tick', function (evt) { return _this.onTick(evt); });
                this.stage.update();
            };
            SS_1920.prototype.onTick = function (evt) {
                // console.log(evt);
                // console.log(this);
                // evt.remove();
                this.stage.update();
                // c.Ticker.off('tick', (evt) => this.onTick(evt));
                //c.Ticker.setPaused(true)
                this.rect.y += this.delta;
                if (this.rect.y > 1000)
                    this.delta = -1;
                else if (this.rect.y < 0)
                    this.delta = 1;
            };
            SS_1920.prototype.makeRect = function () {
                return new c.Shape(new c.Graphics().beginFill("#ff0000").drawRect(0, 0, 1920, 80));
            };
            SS_1920.prototype.stop = function () {
            };
            SS_1920.prototype.destroy = function () {
            };
            SS_1920.prototype.setData = function (data) {
                this.data = data;
            };
            return SS_1920;
        })();
        ads.SS_1920 = SS_1920;
        var init = function () {
            return new uplight.ads.SS_1920();
        };
    })(ads = uplight.ads || (uplight.ads = {}));
})(uplight || (uplight = {}));
//uplight.ads.init();
new uplight.ads.SS_1920();
//# sourceMappingURL=Messages.js.map