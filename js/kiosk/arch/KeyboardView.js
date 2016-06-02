/// <reference path="../Registry.ts" />
var kiosk;
(function (kiosk) {
    var KeyboardView = (function () {
        function KeyboardView(id) {
            var _this = this;
            // private R: Registry;
            this.isShown = true;
            // this.R = Registry.getInstance();
            this.view = $(id);
            this.keyboard = $('#Keyboard');
            this.keyboard.on(CLOSE, function (evt) { return _this.onKeyboardClose(evt); });
            this.btnSearch = $(id + ' .redbutton');
            this.btnSearch.on(CLICK, function () { return _this.onButtonClick(); });
        }
        KeyboardView.prototype.showKeyboard = function () {
            var _this = this;
            if (this.isShown)
                return;
            this.isShown = true;
            this.inTransition = true;
            this.keyboard.show();
            this.btnSearch.addClass(DISABLED);
            this.keyboard.animate({ top: '80px' }, 500, function () {
                _this.inTransition = false;
            });
            // TweenLite.to(this.keyboard, 0.5, { css: { top: 0 } });
        };
        KeyboardView.prototype.setBack = function () {
            this.inTransition = false;
        };
        KeyboardView.prototype.hideKeyboard = function () {
            var _this = this;
            //console.log('hide keyboard ' + this.isShown );
            if (!this.isShown || this.inTransition)
                return;
            this.isShown = false;
            this.inTransition = true;
            $('#kb_close').triggerHandler(CLICK);
            this.keyboard.animate({ top: '400px' }, 500, function () {
                _this.inTransition = false;
                _this.btnSearch.removeClass(DISABLED);
                _this.keyboard.hide();
            });
            // TweenLite.to(this.keyboard, 0.5, {top: '400px' , onComplete: () => { $(this.keyboard).hide() } });
        };
        KeyboardView.prototype.onButtonClick = function () {
            if (this.btnSearch.hasClass(DISABLED))
                return;
            this.btnSearch.addClass(DISABLED);
            this.showKeyboard();
        };
        KeyboardView.prototype.onKeyboardClose = function (evt) {
            this.btnSearch.removeClass(DISABLED);
            this.hideKeyboard();
        };
        return KeyboardView;
    })();
    kiosk.KeyboardView = KeyboardView;
})(kiosk || (kiosk = {}));
//# sourceMappingURL=KeyboardView.js.map