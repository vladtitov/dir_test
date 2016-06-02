/**
 * Created by VladHome on 7/11/2015.
 */
/// <reference path="../Registry.ts" />
var uplight;
(function (uplight) {
    var Keywords = (function () {
        function Keywords(el) {
            var _this = this;
            this.view = $(el);
            this.R = uplight.Registry.getInstance();
            this.list = $('<ul>').appendTo(this.view.find('[data-id=list]:first'));
            this.list.on(CLICK, 'li', function (evt) { _this.onClick(evt.currentTarget); });
            this.R.model.dispatcher.on(this.R.model.READY, function () { return _this.onModelReady(); });
            this.R.events.on(this.R.INPUT_CHANGED, function (evt, word) { return _this.filter(word); });
        }
        Keywords.prototype.onKeywords = function (res) {
            this.kwsRated = JSON.parse(res);
            // console.log(this.kwsRated);
            this.reset();
        };
        Keywords.prototype.onModelReady = function () {
            var _this = this;
            this.R.connector.getKeywords().done(function (res) { return _this.onKeywords(res); });
            this.kwAll = this.R.model.getKeywords().sort(function (a, b) {
                return a.toLowerCase().localeCompare(b.toLowerCase());
            });
            // console.log(this.kwAll);
            //console.log(obj);
            //  var out:VOKw[]=[];
            // for(var str in obj) out.push(new VOKw(str,obj[str]));
            // this.render();
        };
        Keywords.prototype.filter = function (str) {
            console.log(str);
            if (!str) {
                this.reset();
                return;
            }
            str = str.toLowerCase();
            var out1 = [];
            var out2 = [];
            var word;
            var ar = this.kwsRated;
            for (var i = 0, n = ar.length; i < n; i++) {
                word = ar[i].toLowerCase();
                if (word.indexOf(str) === 0)
                    out1.push(ar[i]);
                else if (word.indexOf(' ' + str) !== -1)
                    out2.push(ar[i]);
            }
            if ((out1.length + out2.length) < 7) {
                ar = this.kwAll;
                for (var i = 0, n = ar.length; i < n; i++) {
                    if ((out1.length + out2.length) === 7)
                        break;
                    if (out1.indexOf(ar[i]) !== -1 || out2.indexOf(ar[i]) !== -1)
                        continue;
                    word = ar[i].toLowerCase();
                    if (word.indexOf(str) === 0)
                        out1.push(ar[i]);
                    else if (word.indexOf(' ' + str) !== -1)
                        out2.push(ar[i]);
                }
            }
            this.data = out1.concat(out2);
            this.render();
        };
        Keywords.prototype.reset = function () {
            if (this.kwsRated.length < 7)
                this.data = this.kwsRated.concat(this.kwAll);
            else
                this.data = this.kwsRated;
            this.render();
        };
        Keywords.prototype.render = function () {
            var ar = this.data;
            var out = '';
            for (var i = 0, n = ar.length < 7 ? ar.length : 7; i < n; i++)
                out += this.renderItem(ar[i]);
            // console.log(out);
            this.list.html(out);
        };
        Keywords.prototype.onClick = function (e) {
            var el = $(e);
            //  var i:number = el.data('i');
            // var type= el.data('t');
            var txt = el.text();
            ///  var val = this.kwAll[i].label;
            if (txt.length > 1)
                this.R.events.triggerHandler(this.R.KEYWORD_PRESSED, txt);
        };
        Keywords.prototype.renderItem = function (val) {
            return '<li><a class="btn">' + val + '</a></li>';
        };
        return Keywords;
    })();
    uplight.Keywords = Keywords;
    var VOKw = (function () {
        function VOKw(label, dests) {
            this.label = label;
            this.dests = dests;
        }
        return VOKw;
    })();
    uplight.VOKw = VOKw;
})(uplight || (uplight = {}));
//# sourceMappingURL=Keywords.js.map