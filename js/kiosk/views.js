/**
 * Created by VladHome on 11/4/2015.
 */
/// <reference path="../typing/jquery.d.ts" />
/// <reference path="Registry.ts" />
/// <reference path="search/KeyboardSimple.ts" />
var uplight;
(function (uplight) {
    var LowPanelController = (function () {
        function LowPanelController(el) {
            var r = uplight.Registry.getInstance();
            $('#btnSearch').click(function () { return r.events.triggerHandler(r.KIOSK_SHOW_SEARCH); });
            $('#SearchView [data-id=btnClose]').click(function () {
                //  console.log('close  '+r.KIOSK_SHOW_MENU);
                uplight.Registry.getInstance().events.trigger(r.KIOSK_SHOW_MENU);
            });
            $('#btnShowMenu').click(function () { return r.events.triggerHandler(r.KIOSK_SHOW_MENU); });
            r.events.on(r.PAGES_0, null, function () { $('#btnShowMenu').hide(); });
        }
        return LowPanelController;
    })();
    uplight.LowPanelController = LowPanelController;
    var KeyboardView = (function () {
        function KeyboardView(el) {
            var _this = this;
            this.view = $(el);
            this.R = uplight.Registry.getInstance();
            this.btnClose = this.view.find('[data-id=btnClose]:first').click(function () {
                _this.R.events.triggerHandler(_this.R.KEYBOARD_HIDE);
                _this.R.events.triggerHandler(_this.R.RESET_INPUT);
            });
            this.R.events.on(this.R.KEYBOARD_SHOW, function (evt) { return _this.show(); });
            this.R.events.on(this.R.KEYBOARD_HIDE, function (evt) { return _this.hide(); });
            this.R.events.on(this.R.RESET_VIEWS, function (evt) { return _this.hide(); });
            this.R.events.on(this.R.HIDE_VIEWS, function (evt) { return _this.hide(); });
            this.R.events.on(this.R.TIMEOUT, function (evt) { return _this.hide(); });
        }
        KeyboardView.prototype.hide = function () {
            if (this.isVisible) {
                this.view.removeClass(SHOW);
                this.isVisible = false;
            }
        };
        KeyboardView.prototype.show = function () {
            this.isVisible = true;
            this.view.addClass(SHOW);
        };
        return KeyboardView;
    })();
    uplight.KeyboardView = KeyboardView;
    var ButtonSearch = (function () {
        function ButtonSearch(el) {
            var _this = this;
            var view = $(el);
            this.R = uplight.Registry.getInstance();
            this.btnSearch = view.find('[data-id=btnSearch]:first').click(function () {
                console.log('search');
                _this.R.events.triggerHandler(_this.R.KEYBOARD_SHOW);
            });
        }
        return ButtonSearch;
    })();
    uplight.ButtonSearch = ButtonSearch;
})(uplight || (uplight = {}));
//# sourceMappingURL=views.js.map