/// <reference path="../typing/jquery.d.ts" />
/// <reference path="Connector.ts" />
/// <reference path="search/models.ts" />
/// <reference path="InfoPage.ts" />
var CLICK = 'click';
var CLOSE = 'close';
var SHOW = 'show';
var HIDE = 'hide';
var HIDDEN = 'hidden';
var SELECTED = 'selected';
var DISABLED = 'disabled';
var OPEN = 'open';
var uplight;
(function (uplight) {
    var VOProps = (function () {
        function VOProps() {
        }
        return VOProps;
    })();
    uplight.VOProps = VOProps;
    var Registry = (function () {
        function Registry() {
            this.KIOSK_SHOW_MENU = 'KIOSK_SHOW_MENU';
            this.KIOSK_SHOW_SEARCH = 'KIOSK_SHOW_SEARCH';
            this.CATEGORIES_CHANGE = 'CATEGORIES_CHANGE';
            this.CATEGORY_SELECTED = 'CATEGORY_SELECTED';
            this.PAGE_SELECED = 'PAGE_SELECED';
            this.PAGES_0 = 'PAGES_0';
            this.KEYWORD_PRESSED = 'KEYWORD_PRESSED';
            this.KEYBOARD_SHOW = 'KEYBOARD_SHOW';
            this.KEYBOARD_HIDE = 'KEYBOARD_HIDE';
            this.INPUT_CHANGED = 'INPUT_CHANGED';
            this.RESET_INPUT = 'RESET_INPUT';
            this.KEY_PRESSED = 'KEY_PRESSED';
            this.SEARCH_RESULT_SELECT = 'SEARCH_RESULT_SELECT';
            this.SEARCH_RESULT_SHOW_DESTINATION = 'SEARCH_RESULT_SHOW_DESTINATION';
            this.ON_SETTINGS = 'ON_SETTINGS';
            this.ON_DATA = 'ON_DATA';
            this.TIMEOUT = 'TIMEOUT';
            this.SCREENSAVER_START = 'SCREENSAVER_START';
            this.SCREENSAVER_END = 'SCREENSAVER_END';
            this.AL_START = 'AL_START';
            this.AL_STOP = 'AL_STOP';
            this.AL_STOPED = 'AL_STOPED';
            this.RESET_VIEWS = 'RESET_VIEWS';
            this.HIDE_VIEWS = 'HIDE_VIEWS';
            this._registr = {};
            this.errors = '';
            this.warns = '';
            this.device = { device: 'kiosk1', ln: 'en' };
            this.events = $('<div>');
            this.settings = u_settings;
        }
        Registry.prototype.register = function (name, cl) {
            this._registr[name] = cl;
        };
        Registry.prototype.getClass = function (name) {
            return this._registr[name];
        };
        Registry.prototype.error = function (str) {
            this.errors += str + "\n";
        };
        Registry.prototype.warn = function (str) {
            this.warns += str + "\n";
        };
        Registry.prototype.setProps = function (data) {
            this.props = _.indexBy(data, 'id');
        };
        Registry.prototype.getProp = function (str) {
            return this.props[str];
        };
        Registry.prototype.setSettings = function (data) {
            this.settings = data;
            if (data.props)
                this.setProps(data.props);
            this.events.triggerHandler(this.ON_SETTINGS, data);
        };
        Registry.prototype.getSettings = function (index) {
            return this.settings[index];
        };
        Registry.getInstance = function () {
            return Registry._instance;
        };
        Registry._instance = new Registry();
        return Registry;
    })();
    uplight.Registry = Registry;
    var VOGeo = (function () {
        function VOGeo(obj) {
            for (var str in obj)
                this[str] = obj[str];
        }
        return VOGeo;
    })();
    uplight.VOGeo = VOGeo;
})(uplight || (uplight = {}));
//# sourceMappingURL=Registry.js.map