/// <reference path="arch/Details.ts" />
/// <reference path="mainview.ts" />
/// <reference path="banner.ts" />
/// <reference path="als/ScreenSaver.ts" />
/// <reference path="infopage.ts" />
/// <reference path="Connector.ts" />
/// <reference path="search/KeyboardSimple.ts" />
/// <reference path="search/SearchResult.ts" />
/// <reference path="search/SearchModel.ts" />
/// <reference path="als/TouchClip.ts" />
/// <reference path="als/AttractLoop.ts" />
/// <reference path="als/GalleryDisplay.ts" />
/// <reference path="search/models.ts" />
/// <reference path="../typing/greensock.d.ts" />
/// <reference path="../typing/jquery.d.ts" />
/// <reference path="arch/KeyboardView.ts" />
/// <reference path="search/SearchResult.ts" />
/// <reference path="Registry.ts" />
/// <reference path="search/models.ts" />
/// <reference path="search/Categories.ts" />
/// <reference path="Connector.ts" />
/// <reference path="search/Keywords.ts" />
/// <reference path="MainMenu.ts" />
/// <reference path="utils/Relay.ts" />
/// <reference path="utils/Timeout.ts" />
/// <reference path="views.ts" />
var uplight;
(function (uplight) {
    var Kiosk = (function () {
        function Kiosk() {
            var _this = this;
            // onMenuClick(item:any):void{
            // this.showPages();
            // }
            this.errors = '';
            this.warns = '';
            document.addEventListener('mousedown', function (evt) { return _this.onMouseDown(evt); }, true);
            var r = uplight.Registry.getInstance();
            r.events = $('<div>');
            r.setSettings(u_settings);
            r.connector = new uplight.Connector();
            // console.log(u_settings);          // r.connector.who='kiosk';
            r.model = new uplight.Model(r.connector, function (w) { return _this.warn(w); });
            var obj = r.getSettings('timeout');
            console.log(obj);
            var timeout;
            if (obj)
                timeout = Number(obj.value);
            if (isNaN(timeout) || timeout < 10)
                timeout = 60;
            this.timeoutVal = timeout * 1000;
            this.setControllers();
            this.R = r;
            r.events.on(r.KIOSK_SHOW_SEARCH, function () { return _this.showSearch(); });
            r.events.on(r.KIOSK_SHOW_MENU, null, function (evt) { return _this.showMenu(); });
            r.events.on(r.PAGES_0, null, function (evt) {
                _this.showSearch();
                _this.showMenu = function () { };
            });
            this.R.events.on(this.R.KEYBOARD_SHOW, function () { return _this.showSearchResult(); });
            this.R.events.on(this.R.PAGE_SELECED, function (evt, pageid) {
                _this.R.events.triggerHandler(_this.R.KEYBOARD_HIDE);
                _this.showPages();
            });
            this.R.events.on(r.CATEGORY_SELECTED, function (evt, cat) {
                _this.showSearchResult();
            });
            r.events.on(uplight.DetailsLarge.DETAILS_LARGE_CLOSE_CLICK, function (evt) {
                r.events.triggerHandler(uplight.DetailsLarge.DETAILS_LARGE_HIDE);
            });
            r.events.on(this.R.SEARCH_RESULT_SELECT, function (evt, id) {
                var dest = _this.R.model.getDestById(id);
                if (dest.imgs)
                    r.events.triggerHandler(uplight.DetailsLarge.DETAILS_LARGE_SHOW, id); // this.details.setDestination(dest).render().show();
                else
                    r.events.triggerHandler(_this.R.SEARCH_RESULT_SHOW_DESTINATION, id); //this.searchResult.showDestination(dest);
                console.log(dest);
            });
            var tmr = r.getProp('timer');
            if (tmr)
                var relay = new uplight.Relay(tmr.value);
            //window.addEventListener("hashchange",()=>this.onHachChange(), false);
            setTimeout(function () { return _this.onHachChange(); }, 1000);
        }
        // private isAL:boolean=true;
        Kiosk.prototype.onMouseDown = function (evt) {
            // if(this.attractLoop.hide()) window.location.href='#kiosk';
            var _this = this;
            console.log('mouse down');
            clearTimeout(this.timeout);
            this.timeout = setTimeout(function () {
                console.log(_this.R.TIMEOUT + _this.timeoutVal);
                _this.showSearchResult();
                _this.showMenu();
                _this.R.events.triggerHandler(_this.R.TIMEOUT);
            }, this.timeoutVal);
            if (this.isBlocked) {
                evt.preventDefault();
                evt.stopPropagation();
                evt.stopImmediatePropagation();
            }
            else {
                setTimeout(function () { return _this.unblock(); }, 500);
                this.isBlocked = true;
            }
        };
        Kiosk.prototype.showSearch = function () {
            $('#toolsview').animate({ scrollTop: '365' });
            this.showSearchResult();
        };
        Kiosk.prototype.showMenu = function () {
            //console.log('showMenu');
            this.R.events.triggerHandler(this.R.RESET_INPUT);
            $('#toolsview').animate({ scrollTop: '0' });
        };
        Kiosk.prototype.showSearchResult = function () {
            //console.log('showSearck');
            $('#mainport').animate({ scrollLeft: 0 });
        };
        Kiosk.prototype.showPages = function () {
            $('#mainport').animate({ scrollLeft: 725 });
        };
        Kiosk.prototype.error = function (str) {
            this.errors += str + "\n";
        };
        Kiosk.prototype.warn = function (str) {
            this.warns += str + "\n";
        };
        Kiosk.prototype.setControllers = function () {
            var stringToFunction = function (str) {
                var arr = str.split(".");
                var fn = (window || this);
                for (var i = 0, len = arr.length; i < len; i++)
                    fn = fn[arr[i]];
                if (typeof fn !== "function")
                    fn = null;
                return fn;
            };
            var r = uplight.Registry.getInstance();
            $('[data-ctr]').each(function (ind, el) {
                var str = String($(el).data('ctr'));
                var MyClass = stringToFunction(str);
                if (MyClass) {
                    r.register(str, MyClass);
                    var cl = new MyClass(el);
                }
                else
                    console.warn(' class ' + str + ' not loaded');
                //console.log(el);
            });
        };
        Kiosk.prototype.unblock = function () {
            this.isBlocked = false;
        };
        Kiosk.prototype.onHachChange = function () {
            var h = document.location.hash;
            var hash = h.split('/');
            switch (hash[0]) {
                case '#page':
                    var pageid = Number(hash[1]);
                    this.R.events.triggerHandler(uplight.InfoPagesModel.PAGE_SELECED, pageid);
                    //  this.keyboardView.hideKeyboard();
                    // var cat: VOItem = this.menu.getCategoryById(Number(hash[1]));
                    // this.maiView.showView(this.searchResult.getListByCategory(cat));
                    break;
                case '#dest':
                    //  this.dest.showDest(Number(hash[1]));
                    //  this.keyboardView.hideKeyboard();
                    //  this.maiView.showView(this.details.getDetailsById(Number(hash[1])));
                    break;
                case '#ScreenSaver':
                    window.location.reload();
                    /*
                    this.details.resetMode();
                    this.searchResult.resetMode();
                    this.keyboard.resetMode();
                    this.cateegories.resetMode();
                    this.keywords.resetMode();
                    */
                    break;
            }
        };
        return Kiosk;
    })();
    uplight.Kiosk = Kiosk;
})(uplight || (uplight = {}));
$(document).ready(function () {
    var k = new uplight.Kiosk();
});
//# sourceMappingURL=Kiosk.js.map