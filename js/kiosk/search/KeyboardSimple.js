/**
 * Created by VladHome on 6/9/2015.
 */
/// <reference path="../Registry.ts" />
var uplight;
(function (uplight) {
    var Keyboard = (function () {
        function Keyboard(el) {
            this.alphabet = '1,2,3,4,5,6,7,8,9,0,Q,W,E,R,T,Y,U,I,O,P,A,S,D,F,G,H,J,K,L,&nbsp;,Z,X,C,V,SPACE,B,N,M';
            this.view = $(el);
            this.R = uplight.Registry.getInstance();
            // if(set && set.keyboard) this.initSettings(set.keyboard);
            this.keys = $('<div>');
            this.keys.html(this.parseKeys(this.alphabet.split(','))).appendTo(this.view);
            this.addListeners();
        }
        Keyboard.prototype.addListeners = function () {
            var _this = this;
            this.keys.on(CLICK, '.kb-key', function (evt) { _this.onKeyClick($(evt.currentTarget)); });
        };
        Keyboard.prototype.onKeyClick = function (el) {
            var txt = el.text().toLowerCase();
            if (txt == '\u00A0') {
                txt = 'del';
            }
            else if (txt == 'space') {
                txt = ' ';
            }
            this.R.events.triggerHandler(this.R.KEY_PRESSED, txt);
        };
        Keyboard.prototype.parseKeys = function (ar) {
            var out = '<div class="row1">';
            for (var i = 0, n = ar.length; i < n; i++) {
                if (i === 10)
                    out += '</div><div class="row2">';
                if (i === 20)
                    out += '</div><div class="row3">';
                if (i === 30)
                    out += '</div><div class="row4">';
                out += this.itemRenderer(ar[i]);
            }
            return out + '</div>';
        };
        Keyboard.prototype.itemRenderer = function (item) {
            var cl = '';
            if (item == 'SPACE')
                cl += ' space';
            if (item == '&nbsp;')
                cl += ' back fa fa-caret-square-o-left';
            return '<div class="kb-key btn ' + cl + '"><span>' + item + '</span></div>';
        };
        return Keyboard;
    })();
    uplight.Keyboard = Keyboard;
    var SearchInput = (function () {
        function SearchInput(el) {
            this.view = $(el);
            this.data = '';
            this.input = this.view.find('[data-id=input]:first');
            this.R = uplight.Registry.getInstance();
            this.btnClear = this.view.find('[data-id=btnClear]:first');
            this.addListeners();
        }
        SearchInput.prototype.reset = function () {
            this.input.text('');
            this.data = '';
        };
        SearchInput.prototype.addListeners = function () {
            var _this = this;
            this.btnClear.on(CLICK, function () { return _this.onClearClick(); });
            // this.R.events.on(this.R.KEYBOARD_HIDE,()=>{this.setText('');});
            this.R.events.on(this.R.RESET_INPUT, function () { _this.setText(''); });
            this.R.events.on(this.R.KEY_PRESSED, function (evt, txt) { _this.onKeyPressed(txt); });
            this.R.events.on(this.R.KEYWORD_PRESSED, function (evt, txt) { _this.onKeyword(txt); });
            this.R.events.on(this.R.TIMEOUT, function () { return _this.reset(); });
        };
        SearchInput.prototype.onKeyword = function (str) {
            //this.isKw=true
            if (this.data == str) {
                this.setText('');
            }
            else {
                this.R.connector.Stat('kw', str);
                this.setText(str);
            }
        };
        SearchInput.prototype.onClearClick = function () {
            this.setText('');
        };
        SearchInput.prototype.setText = function (txt) {
            this.data = txt;
            this.input.text(this.data);
            //  console.log(this.R.SEARCH_CHANGED,this.data);
            this.R.events.triggerHandler(this.R.INPUT_CHANGED, this.data);
        };
        SearchInput.prototype.onKeyPressed = function (txt) {
            var str = this.data;
            if (txt == 'del') {
                if (str.length > 1)
                    str = str.substr(0, str.length - 1);
                else
                    str = '';
            }
            else {
                if (str.length == 0)
                    str = txt.toUpperCase();
                else
                    str += txt;
            }
            this.setText(str);
            clearTimeout(this.timeout);
            this.timeout = setTimeout(function () { uplight.Registry.getInstance().connector.Stat('kb', str); }, 1500);
            // this.input.focus();
        };
        return SearchInput;
    })();
    uplight.SearchInput = SearchInput;
})(uplight || (uplight = {}));
//# sourceMappingURL=KeyboardSimple.js.map