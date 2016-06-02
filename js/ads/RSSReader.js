/// <reference path="../../../scripts/typings/greensock/greensock.d.ts" />
/// <reference path="../../libs/typing/jquery.d.ts" />
var uplight;
(function (uplight) {
    var ads;
    (function (ads) {
        var RSSReader = (function () {
            function RSSReader() {
                this.delay = 25;
                this.STEP = 10;
                this.dX = this.STEP;
                this.dY = this.STEP;
                this.current = 0;
                this.view = $('#view').css('top', Math.random() * 700).css('left', Math.random() * 700);
                this.content = $('#content').html('<div></div>').appendTo(this.view);
                var data = 'rem/kiosk.php?a=get_rss';
                this.setData(data);
            }
            RSSReader.prototype.setData = function (data) {
                this._data = data;
                this.refresh();
            };
            RSSReader.prototype.refresh = function () {
                var _this = this;
                $.ajax({
                    url: this._data,
                    success: function (resp) { return _this.onData(resp); }
                });
            };
            RSSReader.prototype.start = function () {
                this.playNext();
            };
            RSSReader.prototype.stop = function () {
                clearTimeout(this.timer);
                clearTimeout(this.timer2);
            };
            RSSReader.prototype.destroy = function () {
            };
            RSSReader.prototype.onData = function (resp) {
                var _this = this;
                var rss = $.parseXML(resp);
                this.view.children('h2').eq(0).text(rss.getElementsByTagName('title')[0].textContent);
                // console.log(rss.getElementsByTagName('item'));
                this.rss = rss.getElementsByTagName('description');
                // var el: Node = this.rss[0];
                this.current = Math.round(Math.random() * this.rss.length);
                clearTimeout(this.timer2);
                this.timer2 = setTimeout(function () { return _this.refresh(); }, 3600 * 1000);
                this.playNext();
            };
            RSSReader.prototype.slideContent = function () {
                var c = this.content;
                var v = this.view;
                var p = this.view.position();
                if (p.left > 1000)
                    this.dX = -this.STEP;
                else if (p.left < 0)
                    this.dX = this.STEP;
                if (p.top > 700)
                    this.dY = -this.STEP;
                else if (p.top < 0)
                    this.dY = this.STEP;
                //console.log(p);
                // console.log(p.top + this.dY);
                // this.view.css('top', p.top + this.dY).css('left', (p.left + this.dX));         
                TweenMax.to(this.view, 0.5, { top: p.top + this.dY, left: p.left + this.dX });
                TweenMax.to(this.content, 0.5, {
                    x: -710,
                    onComplete: function () {
                        TweenMax.set(c, { x: 0 });
                        var g = c.children().first().remove();
                        g = null;
                    }
                });
                /*
                 c.animate({
                   'margin-left':- 720
                 }, 1000, function () {
                     c.css('margin-left', '0px');
                     c.children().first().html('').remove();
     
                 });
     */
            };
            RSSReader.prototype.playNext = function () {
                var _this = this;
                if (this.current >= this.rss.length)
                    this.current = 0;
                var item = this.rss[this.current++];
                if (item.parentNode.nodeName != 'item')
                    item = this.rss[this.current++];
                var str = '<div>' + item.textContent + '</div>';
                this.content.append(str);
                if (this.content.children().length > 1)
                    this.slideContent();
                clearTimeout(this.timer);
                this.timer = setTimeout(function () { return _this.playNext(); }, this.delay * 1000);
            };
            return RSSReader;
        })();
        ads.RSSReader = RSSReader;
    })(ads = uplight.ads || (uplight.ads = {}));
})(uplight || (uplight = {}));
var rssreader = new uplight.ads.RSSReader();
//# sourceMappingURL=RSSReader.js.map