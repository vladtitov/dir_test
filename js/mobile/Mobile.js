/// <reference path="infopage.ts" />
/// <reference path="../kiosk/search/models.ts" />
/// <reference path="filterpage.ts" />
/// <reference path="mainview.ts" />
/// <reference path="FrontPage.ts" />
/// <reference path="Utils.ts" />
/// <reference path="GoogleMap.ts" />
/// <reference path="menu.ts" />
/// <reference path="../view/Views.ts" />
/// <reference path="../kiosk/registry.ts" />
/// <reference path="../kiosk/utils/Relay.ts" />
/// <reference path="../kiosk/search/DetailsLarge.ts" />
var CLICK = 'mousedown';
var TAP = 'tap';
var TAPHOLD = 'taphold';
var SWIPE = 'swipe';
var SWIPELEFT = 'swipeleft';
var SWIPERIGTH = 'swiperight';
var HIDE = 'hide';
var SHOW = 'show';
var OPEN = 'open';
var DETAILS = 'details';
var uplight;
(function (uplight) {
    var Mobile = (function () {
        // private mainView: MainView;
        function Mobile() {
            var _this = this;
            this.errors = '';
            this.warns = '';
            this.cache = {};
            this.R = uplight.Registry.getInstance();
            this.R.setSettings(u_settings);
            var conn = new uplight.Connector();
            var rel = new uplight.Relay(5, 2);
            this.R.connector = conn;
            // this.R.connector.getSettings((data) => this.onSettings(data));      
            this.R.model = new uplight.Model(conn, function (w) { return _this.warn(w); });
            // console.log('Mobile controller');
            this.menu = new uplight.Menu($('[data-ctr=Menu]:first'), conn, this.R.model);
            this.menu.onMenuON = function () {
                _this.menu.hideSearch();
            };
            this.menu.onSearchFocus = function () {
                window.location.href = '#SearchDirectories';
            };
            this.menu.onSearchON = function () {
                _this.menu.hideMenu();
            };
            this.menu.onSearchType = function (str) {
                _this.filterPage.showPattern(str);
            };
            this.menu.onSearchClose = function (str) {
                _this.filterPage.showDefault();
            };
            //  this.searchResult = new SearchResult('#Results');
            this.content = $('#Content');
            if (this.R.getSettings('preview'))
                this.content.addClass('preview');
            this.transition = new uplight.Transition(this.content);
            this.frontPage = new uplight.FrontPage($('#FrontPage'));
            this.currentView = this.frontPage.getView();
            $(window).on('hashchange', function (evt) { return _this.onHachChange(); });
            this.filterPage = new uplight.FilterPage($('[data-ctr=FilterPage]'));
            setTimeout(function () { return _this.onHachChange(); }, 1000);
            // this.content = $('#Content');
        }
        Mobile.prototype.error = function (str) {
            this.errors += str + "\n";
        };
        Mobile.prototype.warn = function (str) {
            this.warns += str + "\n";
        };
        Mobile.prototype.showView2 = function (newV) {
            var _this = this;
            var w = this.content.width();
            this.content.width(w);
            this.content.css('overflow', 'hidden');
            var old = this.content.children();
            old.width(w).css('float', 'left');
            newV.width(w).css('float', 'left');
            var slider = $('<div>').width(w * 2 + 30).append(old).append(newV).appendTo(this.content);
            this.content.animate({ scrollLeft: w }, function () {
                old.detach();
                newV.appendTo(_this.content);
                newV.css('width', 'auto');
                slider.detach();
            });
        };
        Mobile.prototype.onHachChange = function () {
            var ar = document.location.hash.split('/');
            var hash = document.location.hash;
            console.log(ar[0]);
            uplight.Utils.hideImage();
            switch (ar[0]) {
                case '#gmap':
                    if (!this.gmap)
                        this.gmap = new uplight.GoogleMap(this.content);
                    this.showView(this.gmap.getView());
                    this.menu.hideAll();
                    this.R.connector.Stat('pg', 'gmap');
                    break;
                case '#destination':
                    var vo = this.R.model.getDestById(Number(ar[1]));
                    if (!vo)
                        break;
                    this.R.connector.Stat('sr', vo.id + '');
                    break;
                case '#category':
                    var v = this.filterPage.showCategory(Number(ar[1]));
                    this.showView(v);
                    this.menu.hideAll();
                    this.R.connector.Stat('ct', ar[1]);
                    break;
                case '#page':
                    var num = Number(ar[1]);
                    if (isNaN(num))
                        break;
                    this.showPage(num);
                    this.menu.hideAll();
                    this.R.connector.Stat('pg', num + '');
                    break;
                case '#SearchDirectories':
                    this.filterPage.showDefault();
                    this.showView(this.filterPage.getView());
                    this.menu.hideMenu();
                    this.menu.showSearch();
                    break;
                case '#Menu':
                    this.menu.showMenu();
                    break;
                case '#MenuClose':
                    this.menu.hideMenu();
                    break;
                case '#logo':
                    this.showView(this.frontPage.getView());
                    break;
                default:
                    this.menu.showMenu();
                    this.showView(this.frontPage.getView());
                    break;
            }
        };
        Mobile.prototype.showPage = function (id) {
            var ar = u_pages;
            for (var i = 0, n = ar.length; i < n; i++)
                if (ar[i].id == id)
                    this.transition.showView(ar[i].url);
        };
        Mobile.prototype.showView = function (view) {
            if (this.currentView == view)
                return;
            this.currentView = view;
            this.transition.showView(view);
        };
        return Mobile;
    })();
    uplight.Mobile = Mobile;
})(uplight || (uplight = {}));
$(document).ready(function () {
    var app = new uplight.Mobile();
});
//# sourceMappingURL=Mobile.js.map