/// <reference path="Registry.ts" />
var uplight;
(function (uplight) {
    var VOResult = (function () {
        function VOResult() {
        }
        return VOResult;
    })();
    uplight.VOResult = VOResult;

    var Connector = (function () {
        function Connector() {
            this.service = 'rem/kiosk.php?a=';
            this.serv = 'rem/kiosk.php';
        }
        Connector.prototype.getData = function (filename) {
            return $.get(this.service + 'get_data&device=' + this.device + '&file_name=' + filename);
        };
        Connector.prototype.getUpdates = function (stamp, callBack, onError) {
            $.get(this.service + 'get_updates&stamp=' + stamp).done(callBack).fail(onError);
        };
        Connector.prototype.Log = function (msg) {
            msg = (new Date()).toString() + '||' + msg;
            $.post(this.service + 'log_log', msg);
        };

        Connector.prototype.relay = function (obj) {
            obj.a = 'get_stamp';
            obj.id = this.id;

            //stamp:number,now:number,ping:number,timer:number,status:string
            return $.get(this.serv, obj);
        };
        Connector.prototype.Error = function (msg) {
            msg = (new Date()).toString() + '||' + msg;
            $.post(this.service + 'log_error', msg);
        };
        Connector.prototype.Stat = function (type, val) {
            var who = this.id;
            var stamp = Date.now();
            $.get(this.service + 'log_stat' + '&type=' + type + '&val=' + val + '&who=' + who + '&stamp=' + stamp);
        };

        Connector.prototype.getCategories = function () {
            return $.get(this.service + 'get_categories');
        };

        ////////////////////////////////////////
        Connector.prototype.getPagesList = function (callBack) {
            $.get(this.service + 'get_pages_list').done(callBack);
        };

        Connector.prototype.getPages = function () {
            var _this = this;
            if (!this.pages)
                this.pages = $.Deferred();
            this.getData(u_settings.pages).done(function (res) {
                var ar = JSON.parse(res);
                for (var i = 0, n = ar.length; i < n; i++) {
                    ar[i].label = ar[i].name;
                }
                _this.pages.resolve(ar);
            });

            return this.pages.promise();
        };

        ///////////////////////////////////////////////
        Connector.prototype.getSettings = function () {
            return $.get(this.service + 'get_settings', null, 'application/json');
        };

        ///////////////////////////////
        Connector.prototype.getPersonal = function (callBack, destid) {
            $.ajax(this.service + 'get_personal&destid=' + destid).done(callBack);
        };
        Connector.prototype.getAdvanced = function (callBack, adv) {
            $.ajax(this.service + 'get_advanced&id=' + adv).done(callBack);
        };
        Connector.prototype.getDestinations = function () {
            return $.get(this.service + 'get_dests');
        };
        return Connector;
    })();
    uplight.Connector = Connector;
})(uplight || (uplight = {}));
/// <reference path="../Registry.ts" />
var uplight;
(function (uplight) {
    var VODestination = (function () {
        function VODestination(obj) {
            for (var str in obj)
                this[str] = obj[str];
        }
        return VODestination;
    })();
    uplight.VODestination = VODestination;

    var VOCategory = (function () {
        function VOCategory(obj) {
            for (var str in obj)
                this[str] = obj[str];
            if (!this.dests)
                this.dests = [];
        }
        return VOCategory;
    })();
    uplight.VOCategory = VOCategory;

    var Model = (function () {
        //  warn:Function;
        //  error:Function;
        function Model(connector, logger) {
            var _this = this;
            this.connector = connector;
            this.logger = logger;
            this.READY = 'READY';
            // this.R = Registry.getInstance();
            this.dispatcher = $({});

            //this.error= this.R.error;
            // this.warn= this.R.warn;
            console.log('get destinations');
            this.connector.getDestinations().done(function (res) {
                return _this.onResult(res);
            });
        }
        Model.prototype.getDestById = function (id) {
            return this.destInd[id];
        };

        Model.prototype.getKeywords = function () {
            return this.keywords;
        };

        Model.prototype.getCategories = function () {
            return this.cats;
        };

        Model.prototype.getCategoryById = function (id) {
            return this.catsInd[id];
        };
        Model.prototype.getDestsByCat = function (catid) {
            // trace(' getAllByType : ' + type);
            var id = 'c__' + catid;
            if (!this.cache[id])
                this.cache[id] = this._getDestsByCat(catid, this.dests);
            return this.cache[id];
        };

        Model.prototype.getDestsByUnit = function (unit) {
            var id = 'u__' + unit;
            if (!this.cache[id])
                this.cache[id] = this._getDestsByUnit(unit.toString(), this.dests);
            return this.cache[id];
        };
        Model.prototype.getDestsByPatternAndCat = function (cat, pattern) {
            var id = cat + '__' + pattern;
            if (!this.cache[id])
                this.cache[id] = this._getDestsByPattern(pattern, this.getDestsByCat(cat));

            return this.cache[id];
        };

        Model.prototype.getDestsByUnitAndCat = function (cat, unit) {
            var id = cat + '_u_' + unit;
            if (!this.cache[id])
                this.cache[id] = this._getDestsByUnit(unit.toString(), this.getDestsByCat(cat));
            return this.cache[id];
        };

        Model.prototype.getDestsByPattern = function (pattern) {
            if (!this.cache[pattern])
                this.cache[pattern] = this._getDestsByPattern(pattern, this.dests);
            return this.cache[pattern];
        };

        Model.prototype.refreshData = function () {
            // this.connector.getDestinations((data) => this.onDestinations(data));
            // $.post(this.service, Registry.getInstance().device,'application/json').done((data) => this.onDestinations(data));
        };

        Model.prototype.getData = function () {
            return this.dests;
        };

        // R:Registry;
        Model.prototype.setData = function (data) {
            this.dests = data;
            this.cache = {};
        };

        Model.prototype.makeCats = function (ar) {
            //console.log(ar);
            var out = [];
            var ind = [];
            for (var i = 0, n = ar.length; i < n; i++) {
                var cat = new VOCategory(ar[i]);
                ind[cat.id] = cat;
                out.push(cat);
            }
            this.cats = out;
            this.catsInd = ind;
        };

        Model.prototype.addKeywords = function (str) {
        };
        Model.prototype.makeDests = function (ar) {
            var out = [];
            var ind = [];
            var kws = {};
            for (var i = 0, n = ar.length; i < n; i++) {
                if (!ar[i].name)
                    continue;
                if (typeof ar[i].cats === 'string' && ar[i].cats.length)
                    ar[i].cats = ar[i].cats.split(',').map(Number);
                var dest = new VODestination(ar[i]);
                ind[dest.id] = dest;
                if (dest.kws && dest.kws.length) {
                    dest.kws.split(',').forEach(function (val) {
                        if (!kws[val])
                            kws[val] = [];
                        kws[val].push(dest.id);
                    });
                }

                out.push(dest);
            }
            this.keywords = kws;
            this.dests = out;
            this.destInd = ind;
        };

        Model.prototype.onResult = function (res) {
            this.makeCats(res.cats);
            this.makeDests(res.dests);
            this.addIcon();
            this.cache = {};

            console.log(this.READY);
            this.dispatcher.triggerHandler(this.READY);
        };

        Model.prototype.addIcon = function () {
            var catsI = this.catsInd;
            var ar = this.dests;
            for (var i = 0, n = ar.length; i < n; i++) {
                var item = ar[i];
                if (item.cats && item.cats.length) {
                    if (catsI[item.cats[0]])
                        item.icon = catsI[item.cats[0]].icon;
                    else
                        this.logger('cant find icon for category ' + item.cats[0] + ' ib dest: ' + item.name);
                }
            }
        };

        Model.prototype._getDestsByUnit = function (unit, data) {
            var out = [];
            for (var i = 0, n = data.length; i < n; i++)
                if (data[i].unit.indexOf(unit) != -1)
                    out.push(data[i]);

            return out;
        };

        Model.prototype._getDestsByPattern = function (pattern, data) {
            pattern = pattern.toLowerCase();
            var out1 = [];
            var out2 = [];
            var out3 = [];
            for (var i = 0, n = data.length; i < n; i++) {
                var name = data[i].name.toLowerCase();
                if (name.indexOf(pattern) == 0)
                    out1.push(data[i]);
                else if (name.indexOf(' ' + pattern) !== -1)
                    out2.push(data[i]);
                else if (data[i].unit.indexOf(pattern) !== -1)
                    out3.push(data[i]);
            }
            return out1.concat(out2, out3);
        };

        Model.prototype._getDestsByCat = function (cat, data) {
            if (cat == 0)
                return data;
            var out = [];
            for (var i = 0, n = data.length; i < n; i++)
                if (data[i].cats.indexOf(cat) != -1)
                    out.push(data[i]);
            return out;
        };

        Model.prototype.onDestinations = function (data) {
            this.dests = data;
            this.cache = {};
            this._dataid = {};
            if (this.onReady)
                this.onReady();
        };
        Model.prototype.pushKeywords = function (ar, obj) {
            for (var i = 0, n = ar.length; i < n; i++)
                obj[ar[i]] = true;
        };
        return Model;
    })();
    uplight.Model = Model;
})(uplight || (uplight = {}));
/// <reference path="Registry.ts" />
/// <reference path="../typing/jquery.d.ts" />
/// <reference path="../typing/underscore.d.ts" />
var uplight;
(function (uplight) {
    var VOPage = (function () {
        function VOPage(obj) {
            var _this = this;
            for (var str in obj)
                this[str] = obj[str];
            this.id = Number(this.id);
            this.view = $('<div>').addClass('page');
            this.header = $('<div>').addClass('header').appendTo(this.view).html('<span class="' + this.icon + '"> </span> <span> ' + this.name + '</span>');
            this.content = $('<div>').addClass('content').appendTo(this.view);
            if (this.url)
                $.get(this.url).done(function (data) {
                    _this.content.html(data);
                });
        }
        return VOPage;
    })();
    uplight.VOPage = VOPage;

    var InfoPagesModel = (function () {
        function InfoPagesModel(el) {
            var _this = this;
            this.prev = -2;
            /*
            loadData(item:any):void {
            
            $.get(item.url).done(function(data){
            //   console.log(data);
            item.$div=$('<div>').html(data);
            })
            }
            
            setData(data:any[]):void{
            var ar = data
            for(var i=0,n=ar.length;i<n;i++){
            this.loadData(ar[i]);
            }
            this.data = data
            }
            */
            this.current = -1;
            this.view = $(el);
            this.R = uplight.Registry.getInstance();
            this.R.connector.getData('pages.json').done(function (data) {
                return _this.onData(data);
            });
            this.R.events.on(InfoPagesModel.PAGE_SELECED, function (evt, pageid) {
                _this.showPage(pageid);
            });
            this.view.css('overfow', 'hidden');
            this.width = this.view.width();
            this.list = $('<div>').appendTo(this.view);
        }
        InfoPagesModel.prototype.onData = function (res) {
            var out = [];
            var ar = JSON.parse(res);
            for (var i = 0, n = ar.length; i < n; i++) {
                out.push(new VOPage(ar[i]));
            }
            this.data = out;
            this.dataInd = _.indexBy(out, 'id');
        };

        InfoPagesModel.prototype._showPage = function (i) {
        };

        InfoPagesModel.prototype.showPage = function (id) {
            var _this = this;
            if (this.inTrans)
                return;
            if (id == this.current)
                return;
            var item = this.dataInd[id];
            if (!item) {
                console.log('Error cant find page with id' + id);
                return;
            }
            this.current = id;
            this.list.append(item.view);
            if (this.list.children().length > 1) {
                this.inTrans = true;
                this.view.animate({ scrollLeft: this.width }, function () {
                    _this.list.children().first().remove();
                    _this.view.scrollLeft(0);
                    _this.inTrans = false;
                });
            }
        };

        /*
        getPage(page:VOItem): JQuery {
        if (!this.cache[page.id]) this.cache[page.id] = this.createPage(page);
        return this.cache[page.id];
        }
        
        private createPage(page: VOItem): JQuery {
        var p:JQuery = $('<div class="view"><div class="mytitle">'+page.label+'</div></div>');
        this.content = $('<div class="view-content">Loading</div>').appendTo(p);
        this.loadPage(page.id.toString());
        return p;
        
        }
        
        */
        InfoPagesModel.prototype.onPageLoaded = function (res) {
            // this.content.html(res);
        };
        InfoPagesModel.PAGE_SELECED = 'PAGE_SELECED';
        return InfoPagesModel;
    })();
    uplight.InfoPagesModel = InfoPagesModel;
})(uplight || (uplight = {}));
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
            this.KEYWORD_PRESSED = 'KEYWORD_PRESSED';
            this.ON_SETTINGS = 'ON_SETTINGS';
            this.ON_DATA = 'ON_DATA';
            this.RESET_ALL = 'TIMEOUT';
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

        Registry.prototype.setSettings = function (data) {
            this.settings = data;
            this.events.triggerHandler(this.ON_SETTINGS, data);
        };

        Registry.getInstance = function () {
            return Registry._instance;
        };
        Registry._instance = new Registry();
        return Registry;
    })();
    uplight.Registry = Registry;
})(uplight || (uplight = {}));
/// <reference path="../kiosk/registry.ts" />
/// <reference path="../typing/jquery.d.ts" />
var uplight;
(function (uplight) {
    var InfoPageMobile = (function () {
        function InfoPageMobile(item) {
            this.item = item;
        }
        InfoPageMobile.prototype.getView = function () {
            if (!this.view)
                this.view = $('<div>').addClass('container').load(this.item.url);
            return this.view;
        };
        return InfoPageMobile;
    })();
    uplight.InfoPageMobile = InfoPageMobile;
})(uplight || (uplight = {}));
/// <reference path="../kiosk/registry.ts" />
/// <reference path="Mobile.ts" />
var uplight;
(function (uplight) {
    var FilterPage = (function () {
        function FilterPage(view) {
            var _this = this;
            this.view = view;
            this.ALL = 'all_';
            this.cache = {};
            this.chache = {};
            this.template = view.clone();
            this.input = view.find('[data-id=filter]');
            this.input.on('input', function (evt) {
                return _this.onInput(evt);
            });
            this.list = view.find('[data-id=list]');
            this.list.on(CLICK, 'a', function (evt) {
                return _this.onListClick(evt);
            });
            this.list.on(CLICK, 'img', function (evt) {
                return _this._onImageClick(evt);
            });
            this.cache = { ' ': 'Please type in feild' };
            this.tiFilter = view.find('[data-id=tiFilter]:first');
            this.catTitle = view.find('[data-id=catTitle]:first').hide();
            view.find('[data-id=btnClear]:first').click(function () {
                _this.input.val('');
                _this.renderAll();
            });

            this.details = $('<div>').addClass('details');
        }
        FilterPage.prototype.getView = function () {
            return this.view;
        };

        FilterPage.prototype.setData = function (data) {
            this.data = data;
        };
        FilterPage.prototype.addListeners = function () {
        };

        FilterPage.prototype.resetView = function () {
            this.input.val('');
            this.list.html('<p class="bgwhite">Start typing in input field on top of page. Results will come as soon as you are typing</p>');
            return this.view;
        };

        FilterPage.prototype.showDefault = function () {
            this.data = uplight.Registry.getInstance().model.getData();
            this.input.val('');

            this.tiFilter.show();
            this.catTitle.text('').hide();
            this.renderAll();

            // this.show();
            this.input.focus();
        };

        FilterPage.prototype.showPattern = function (str) {
            if (str.length == 0) {
                this.renderAll();
            } else {
                this.data = uplight.Registry.getInstance().model.getDestsByPattern(str);
                if (this.data.length == 0)
                    this.list.html('<p class="bgwhite">  Sorry not results for text <b>' + str + '</b></p>');
                else
                    this.renderList(str);
            }
        };

        FilterPage.prototype.setCategoryName = function (str) {
            this.catTitle.text(str).show();
        };

        FilterPage.prototype.showCategory = function (num) {
            var page = new FilterPage(this.template.clone());
            var cat = uplight.Registry.getInstance().model.getCategoryById(num);
            page.setCategoryName(cat.label);
            var data = uplight.Registry.getInstance().model.getDestsByCat(num);
            page.setData(data);
            page.renderData();
            return page.getView();
        };

        FilterPage.prototype._onImageClick = function (evt) {
            var el = $(evt.target);
            var src = el.attr('src');
            if (src)
                uplight.Utils.showImage(src);
            if (this.onImageClick)
                this.onImageClick(src);
        };

        FilterPage.prototype.addDetails = function (vo, el) {
            // console.log(vo);
            if (!vo.details)
                vo.details = uplight.Utils.renderDetails(vo);

            el.append(vo.details);
        };

        FilterPage.prototype.onListClick = function (evt) {
            var el = $(evt.currentTarget).parent();

            // console.log(el);
            if (el.hasClass(SELECTED)) {
                el.removeClass(SELECTED);

                // el.children('.details').hide('fast');
                this.selected = null;
            } else {
                //  console.log(el.children('.details').length);
                if (el.children('.details').length !== 0) {
                    //  el.children('.details').show('fast');
                } else {
                    var vo = uplight.Registry.getInstance().model.getDestById(el.data('id'));
                    if (vo)
                        this.addDetails(vo, el);
                    //  el.children('.details').show('fast');
                }
                clearTimeout(this.statTimeout);
                this.statTimeout = setTimeout(function () {
                    uplight.Registry.getInstance().connector.Stat('sr', el.data('id'));
                }, 2000);
                setTimeout(function () {
                    el.addClass(SELECTED);
                }, 100);
                this.selected = el;
            }
        };
        FilterPage.prototype.getHeader = function () {
            return this.input;
        };
        FilterPage.prototype.onInputFocus = function (evt) {
            this.input.val('');
        };

        FilterPage.prototype.renderAll = function () {
            this.data = uplight.Registry.getInstance().model.getData();
            this.renderList(this.ALL);
        };
        FilterPage.prototype.onInput = function (evt) {
            var _this = this;
            setTimeout(function () {
                return _this.doFilter();
            }, 200);
        };

        FilterPage.prototype.doFilter = function () {
            var str = this.input.val();

            if (str.length == 0) {
                this.renderAll();
            } else {
                this.data = uplight.Registry.getInstance().model.getDestsByPattern(str);
                if (this.data.length == 0)
                    this.list.html('<p class="bgwhite">  Sorry not results for text <b>' + str + '</b></p>');
                else
                    this.renderList(str);
                clearTimeout(this.statTimeout);
                this.statTimeout = setTimeout(function () {
                    uplight.Registry.getInstance().connector.Stat('kb', str);
                }, 2000);
                //if (!this.cache[str]) this.cache[str] = this.renderList(str);
                // this.list.html(this.cache[str]);
            }
        };

        FilterPage.prototype.makeCats = function () {
            var ar = uplight.Registry.getInstance().model.getCategories();
            var out = [];
            for (var i = 0, n = ar.length; i < n; i++) {
                var item = ar[i];
                out[ar[i].id] = ar[i].icon;
            }
            return out;
        };

        FilterPage.prototype.renderData = function () {
            var ar = this.data;
            var out = '';
            for (var i = 0, n = ar.length; i < n; i++)
                out += uplight.Utils.renderItemMobile(ar[i], this.cats);
            this.list.html(out);
        };

        FilterPage.prototype.renderList = function (str) {
            if (this.cache[str])
                this.list.html(this.cache[str]);
            else {
                if (!this.cats)
                    this.cats = this.makeCats();
                var ar = this.data;
                var out = '';
                for (var i = 0, n = ar.length; i < n; i++)
                    out += uplight.Utils.renderItemMobile(ar[i], this.cats);
                this.cache[str] = out;
                this.list.html(out);
            }
        };
        return FilterPage;
    })();
    uplight.FilterPage = FilterPage;
})(uplight || (uplight = {}));
/// <reference path="Mobile.ts" />
var uplight;
(function (uplight) {
    var MainViewMobile = (function () {
        function MainViewMobile(view, width, height) {
            this.view = view;
            this.width = width;
            this.height = height;
            this.slider = $('<div class="myslider"></div>').width(this.width).css('overflow-x', 'hidden').css('overflow-y', 'auto').height(this.height).appendTo(this.view);
            this.content = $('<div class="mycontent"></div>').width(this.width * 2 + 20).appendTo(this.slider);
        }
        /*
        showView(el: JQuery): void {
        
        this.current = el;
        this.content.append(el);
        if (this.content.children().length > 1) {
        //  console.log('animate   scrollLeft:' + this.width);
        this.slider.animate({ scrollLeft: this.width }, 500, () => {
        el.siblings().remove();
        this.slider.scrollLeft(0);
        });
        }
        }
        
        */
        MainViewMobile.prototype.setHeader = function (str) {
            return this;
        };
        MainViewMobile.prototype.addFooter = function (footer) {
            if (this.footer)
                this.footer.remove();
            if (footer)
                this.view.append(footer);
            this.footer = footer;
        };
        MainViewMobile.prototype.addHeader = function (header) {
            if (this.header)
                this.header.remove();
            if (header)
                this.view.prepend(header);
            this.header = header;
        };
        MainViewMobile.prototype.showView = function (el, header) {
            var _this = this;
            // this.addHeader(header);
            // this.addFooter(footer);
            if (this.header)
                this.header.prependTo(this.current);
            this.header = null;
            this.current = el;
            this.content.append(el);

            // var el = this.current;
            this.slider.animate({ scrollLeft: this.width }, 500, function () {
                el.siblings().remove();
                if (header) {
                    _this.header = header;
                    header.prependTo(_this.view);
                }
                _this.slider.scrollLeft(0);
            });
        };

        MainViewMobile.prototype.showViewBack = function (el, header) {
            var _this = this;
            if (this.header)
                this.header.prependTo(this.current);
            this.header = null;

            // this.addHeader(header);
            // this.addFooter(footer);
            if (this.content.children().length > 1) {
                console.log('CHIDREN more then 1');
                this.current.siblings().remove();
            }
            el.show();
            this.current = el;
            this.content.prepend(el);
            this.slider.scrollLeft(this.width);
            this.slider.animate({ scrollLeft: 0 }, this.width, function () {
                el.siblings().remove();
                if (header) {
                    _this.header = header;
                    header.prependTo(_this.view);
                }
            });
        };
        return MainViewMobile;
    })();
    uplight.MainViewMobile = MainViewMobile;
})(uplight || (uplight = {}));
/**
* Created by VladHome on 9/28/2015.
*/
/// <reference path="Mobile.ts" />
var uplight;
(function (uplight) {
    var FrontPage = (function () {
        function FrontPage(view) {
            this.view = view;
            view.addClass('container');

            this.list = view.find('[data-id=list]:first');
            this.pages = u_pages;
            this.renderList();
        }
        FrontPage.prototype.hide = function () {
            this.view.hide();
        };
        FrontPage.prototype.show = function () {
            this.view.show();
        };
        FrontPage.prototype.getView = function () {
            return this.view;
        };

        FrontPage.prototype.init = function () {
            console.log(this.view);
        };

        FrontPage.prototype.renderList = function () {
            var ar = this.pages;
            var out = '<a href="#SearchDirectories" class="list-group-item"><span class="fa fa-search"></span> <span> Search Directory</span></a>';
            for (var i = 0, n = ar.length; i < n; i++) {
                var item = ar[i];
                item.seq = i + 1;
                out += '<a href="#page/' + item.id + '/' + item.name + '" class="list-group-item"><span class="' + item.icon + '"></span> <span> ' + item.name + '</span></a>';
            }
            this.list.html(out);
        };
        return FrontPage;
    })();
    uplight.FrontPage = FrontPage;
})(uplight || (uplight = {}));
/**
* Created by VladHome on 9/20/2015.
*/
/// <reference path="Mobile.ts" />
var uplight;
(function (uplight) {
    var Utils = (function () {
        function Utils() {
        }
        Utils.hideImage = function () {
            if (Utils.isImage) {
                $('#ImageView').fadeOut();
                Utils.isImage = false;
            }
        };

        Utils.showImage = function (src) {
            Utils.isImage = true;
            $('#ImageView').fadeIn();
            $('#ImageView img').attr('src', src);

            if (!Utils.isImageInit) {
                $('#ImageView').click(function () {
                    Utils.hideImage();
                });
                Utils.isImageInit = true;
            }
        };

        Utils.checkValue = function (val) {
            if (!val || val.length === 0)
                return '&nbsp;';
            var re = /\S+@\S+\.\S+/;
            if (re.test(val))
                return '<a href="mailto:' + val + '">' + val + '</a>';
            var phone = val.match(/\d/g);
            if (phone && phone.length === 10)
                return '<a href="tel:' + val + '">' + val + '</a>';

            return val;
        };
        Utils.createTable = function (more) {
            if (more.length === 0)
                return '';
            var ar = more.split("\n");
            var out = '<div class="more" ><table class="table">';

            for (var i = 0, n = ar.length; i < n; i++) {
                var item = ar[i].split('\t');
                out += '<tr><td>' + (item[0] || '&nbsp;') + '</td><td>' + Utils.checkValue(item[1]) + '</td></tr>';
            }

            out += '</table></div>';
            return out;
        };

        Utils.createImages = function (imgs) {
            var out = '';
            var ar = imgs.split(',');
            for (var i = 0, n = ar.length; i < n; i++) {
                out += '<a data-id="' + i + '"><img src="' + ar[i] + '" /></a>';
            }
            return out;
        };
        Utils.renderDetails = function (vo) {
            var out = '';
            if (vo.info)
                out += '<div class="uinfo">' + vo.info + '</div>';
            out += Utils.createTable(vo.more);
            if (vo.tmb)
                out += '<div class="tmb"><img src="' + vo.tmb + '"/></div>';
            if (vo.imgs)
                out += '<div class="imgs"><div>' + Utils.createImages(vo.imgs) + '</div></div>';
            if (out)
                out = '<div class="details"><br/>' + out + '</div>';
            return out;
        };

        Utils.renderItem = function (vo, catsObj) {
            //  var cats:string=(vo.cats && vo.cats.length)?catsObj[vo.cats[0]]:'fa-fw';
            var more = '<span class="fa fa-fw">&nbsp;</span>';
            if (vo.more || vo.info || vo.tmb || vo.imgs)
                more = '<span class="anim fa fa-angle-double-left">&nbsp;</span>';

            // if(vo.imgs) more+=' <span class="fa fa-image"></span>';
            //if(more) more='<span class="btn">'+more+'</span>';
            return '<li class="list-group-item" data-id="' + vo.id + '" ><a>' + more + '<span> ' + vo.name + ' </span><span class="pull-right">' + vo.unit + '</span></a></li>';
        };
        Utils.renderItemMobile = function (vo, catsObj) {
            //  var cats:string=(vo.cats && vo.cats.length)?catsObj[vo.cats[0]]:'fa-fw';
            var more = '<span class="fa fa-fw">&nbsp;</span>';
            if (vo.more || vo.info || vo.tmb || vo.imgs)
                more = '<span class="anim fa fa-angle-double-left">&nbsp;</span>';

            // if(vo.imgs) more+=' <span class="fa fa-image"></span>';
            //if(more) more='<span class="btn">'+more+'</span>';
            return '<li class="list-group-item" data-id="' + vo.id + '" ><a>' + more + '<span> ' + vo.name + ' </span><span class="pull-right">' + vo.unit + '</span></a></li>';
        };
        Utils.renderItem2 = function (vo, catsObj) {
            var cats = (vo.cats && vo.cats.length) ? catsObj[vo.cats[0]] : 'fa-fw';

            var more = '';
            if (vo.more || vo.info || vo.tmb)
                more += '<span class="fa fa-info"></span>';
            if (vo.imgs)
                more += ' <span class="fa fa-image"></span>';
            if (more)
                more = '<span class="btn">' + more + '</span>';

            return '<li class="list-group-item" data-id="' + vo.id + '" ><a><span class="fa ' + cats + '">&nbsp;</span> <span>' + vo.name + ' </span> ' + more + '<span class="pull-right">' + vo.unit + '</span></a></li>';
        };
        return Utils;
    })();
    uplight.Utils = Utils;
})(uplight || (uplight = {}));
/**
* Created by VladHome on 10/7/2015.
*/
/// <reference path="../typing/jquery.d.ts" />
var uplight;
(function (uplight) {
    var GoogleMapOptions = (function () {
        function GoogleMapOptions() {
            this.key = 'AIzaSyAUaQFpM8aGgiocMDRcPzH66FKx5rPH1q0';
            this.center = '43.657467, -79.376571';
            this.zoom = 10;
            this.maptype = 'satelite';
        }
        GoogleMapOptions.SATELITE = 'satellite';
        GoogleMapOptions.ROADMAP = 'roadmap';
        return GoogleMapOptions;
    })();
    uplight.GoogleMapOptions = GoogleMapOptions;

    var GoogleMap = (function () {
        function GoogleMap() {
            this.key = 'AIzaSyAUaQFpM8aGgiocMDRcPzH66FKx5rPH1q0';
            // private TORONTO:string=;
            this.url = 'https://www.google.com/maps/embed/v1/';
            this.type = 'view';
            this.options = new GoogleMapOptions();
            this.options.key = this.key;
            this.options.zoom = 18;
            this.options.maptype = GoogleMapOptions.ROADMAP;
        }
        GoogleMap.prototype.createView = function () {
            var _this = this;
            return $('<div>').addClass('loader').load('htms/mobile/GoogleMap.htm', function () {
                return _this.init();
            });
        };

        GoogleMap.prototype.getView = function () {
            if (!this.view)
                this.view = this.createView();
            return this.view;
        };

        GoogleMap.prototype.toString = function (opt) {
            var ar = [];
            for (var str in opt)
                ar.push(str + '=' + opt[str]);
            return this.url + this.type + '?' + ar.join('&');
        };
        GoogleMap.prototype.init = function () {
            this.view.prepend(this.view.children());
            var iframe = this.view.find('iframe:first');
            iframe.attr('src', this.toString(this.options));
        };
        return GoogleMap;
    })();
    uplight.GoogleMap = GoogleMap;
})(uplight || (uplight = {}));
/// <reference path="Mobile.ts" />
var uplight;
(function (uplight) {
    var Menu = (function () {
        function Menu(view, conn, model) {
            var _this = this;
            this.view = view;
            this.conn = conn;
            this.model = model;
            this.menu = $('#Menu');
            this.menu.find('[data-id=btnClose]').click(function () {
                return _this.hideMenu();
            });
            this.listP = this.view.find('[data-id=listP]:first');
            this.listC = this.view.find('[data-id=listC]:first');
            this.content = this.view.find('[data-id=content]:first');
            this.btnMenu = this.view.find('[data-id=btnMenu]:first').click(function () {
                return _this.toggleMenu();
            });
            var cats = model.getCategories();
            var d1 = $.Deferred();
            if (!cats) {
                model.dispatcher.on(model.READY, function () {
                    cats = model.getCategories();
                    d1.resolve(cats);
                });
            } else
                d1.resolve(cats);
            $.when(d1).then(function (cats) {
                // console.log(cats);
                var out = '';
                var ar = cats;
                for (var i = 0, n = ar.length; i < n; i++)
                    for (var i = 0, n = ar.length; i < n; i++)
                        out += '<a class="u-brand list-group-item" href="#category/' + ar[i].id + '/' + ar[i].label + '"><span class="' + ar[i].icon + '"></span> ' + ar[i].label + '</a>';
                _this.listC.html(out);
            });

            //  var p0 =   conn.getPages().done((res)=>{
            // console.log(res);
            var out = '';
            var ar = u_pages;
            console.log(u_pages);
            for (var i = 0, n = ar.length; i < n; i++)
                out += '<a class="u-brand list-group-item" href="#page/' + ar[i].id + '/' + ar[i].name + '"><span class="' + ar[i].icon + '"></span> ' + ar[i].name + '</a>';
            this.listP.html(out);

            //  });
            //
            this.slider = this.view.find('[data-id=SearchSlider]:first');

            this.view.find('[data-id=btnSearch]').click(function () {
                return _this.toggleSearch();
            });
            this.view.find('[data-id=btnSearchClose]:first').click(function () {
                _this.tiSearch.val('');
                _this.hideSearch();
                if (_this.onSearchClose)
                    _this.onSearchClose();
            });

            this.tiSearch = this.view.find('[data-id=tiSearch]:first').on('input', function () {
                console.log(_this.tiSearch.val());
                if (_this.onSearchType)
                    _this.onSearchType(_this.tiSearch.val());
            });
            // $.when(p0,d1).then((pages,cats)=>{
            //    console.log(pages,cats);
            // })
            //  conn.getCategories((data) => this.onCatData(data));
        }
        Menu.prototype.showMenu = function () {
            var _this = this;
            if (this.isHiddenMenu) {
                clearTimeout(this.timeoutMenu);
                this.isHiddenMenu = false;
                this.menu.removeClass('closed');
                this.timeoutMenu = setTimeout(function () {
                    if (_this.onMenuON)
                        _this.onMenuON();
                }, 500);
            }
        };

        Menu.prototype.clearSearch = function () {
            this.tiSearch.val('');
        };
        Menu.prototype.hideAll = function () {
            this.hideMenu();
            this.hideSearch();
        };

        Menu.prototype.hideMenu = function () {
            if (!this.isHiddenMenu) {
                clearTimeout(this.timeoutMenu);
                this.isHiddenMenu = true;
                this.menu.addClass('closed');
            }
        };

        Menu.prototype.toggleMenu = function () {
            if (this.isHiddenMenu)
                this.showMenu();
            else
                this.hideMenu();
        };

        Menu.prototype.hideSearch = function () {
            if (this.isSearch) {
                this.isSearch = false;
                this.slider.animate({ scrollTop: 0 });
                clearTimeout(this.timeoutSearchFocus);
                clearTimeout(this.timeoutON);
            }
        };

        Menu.prototype.showSearch = function () {
            var _this = this;
            if (!this.isSearch) {
                this.tiSearch.val('');
                clearTimeout(this.timeoutON);
                this.isSearch = true;
                this.slider.animate({ scrollTop: 30 });
                this.timeoutON = setTimeout(function () {
                    if (_this.onSearchON)
                        _this.onSearchON();
                }, 500);

                this.timeoutSearchFocus = setTimeout(function () {
                    return _this.focusSearch();
                }, 1000);
            }
        };
        Menu.prototype.focusSearch = function () {
            this.tiSearch.focus();
            if (this.onSearchFocus)
                this.onSearchFocus();
        };
        Menu.prototype.toggleSearch = function () {
            if (this.isSearch)
                this.hideSearch();
            else
                this.showSearch();
        };
        return Menu;
    })();
    uplight.Menu = Menu;
})(uplight || (uplight = {}));
/**
* Created by VladHome on 10/3/2015.
*/
/// <reference path="../typing/jquery.d.ts" />
var uplight;
(function (uplight) {
    var Page = (function () {
        function Page(url) {
        }
        Page.prototype.getView = function () {
            return this.view;
        };
        return Page;
    })();
    uplight.Page = Page;

    var Transition = (function () {
        function Transition(view) {
            this.view = view;
        }
        Transition.prototype.setView = function (view) {
            this.view = view;
        };

        Transition.prototype.reArrange = function (cont, slot) {
            slot.children().appendTo(cont);
            slot.detach();
        };

        Transition.prototype.showView = function (newV) {
            var _this = this;
            var cont = this.view;
            var old = cont.children().first();
            cont.children().detach();
            var w = cont.width();

            var slot1 = $('<div>').addClass('slot').width(w).css('float', 'left').append(old);
            var slot2 = $('<div>').addClass('slot').width(w).css('float', 'left');

            var ready1;
            var ready2;
            if (jQuery.type(newV) == 'string')
                slot2.load(newV, function () {
                    ready1 = true;
                    if (ready2)
                        this.reArrange(cont, slot2);
                });
            else {
                ready1 = true;
                slot2.append(newV);
            }

            //console.log(w);
            // var slider:JQuery=$('<div>').width(w*2+30).append(old).append(newV).appendTo(cont);
            var slider = $('<div>').width(w * 2 + 30).append(slot1).append(slot2).appendTo(cont);
            setTimeout(function () {
                cont.animate({ scrollLeft: w }, function () {
                    slot1.detach();
                    slot2.appendTo(cont);
                    slot2.css('width', 'auto');
                    slider.detach();
                    cont.scrollLeft(0);
                    ready2 = true;
                    if (ready1)
                        _this.reArrange(cont, slot2);
                });
            }, 50);

            return slot2;
        };
        Transition.prototype.newPage = function (newV) {
            console.log(jQuery.type(newV));
            var cont = this.view;
            var old = cont.children().first();
            cont.children().detach();

            //  console.log('Old  '+old.attr('id'));
            // console.log('new  '+newV.attr('id'));
            var w = cont.width();

            var slot1 = $('<div>').addClass('slot').width(w).css('float', 'left').append(old);
            var slot2 = $('<div>').addClass('slot').width(w).css('float', 'left').append(newV);

            // var w:number = old.first().width();
            /// this.content.width(w);
            // old.width(w).css('float','left');
            // newV.width(w).css('float','left');
            console.log(w);

            // var slider:JQuery=$('<div>').width(w*2+30).append(old).append(newV).appendTo(cont);
            var slider = $('<div>').width(w * 2 + 30).append(slot1).append(slot2).appendTo(cont);

            setTimeout(function () {
                //  cont.scrollLeft(w);
                cont.animate({ scrollLeft: w }, function () {
                    // old.detach();
                    slot1.detach();

                    //newV.appendTo(cont);
                    slot2.appendTo(cont);

                    // newV.css('width','auto');
                    slider.detach();
                    cont.scrollLeft(0);
                });
            }, 100);

            return slot2;
        };
        return Transition;
    })();
    uplight.Transition = Transition;
})(uplight || (uplight = {}));
/**
* Created by VladHome on 9/16/2015.
*/
/// <reference path="../Registry.ts" />
var uplight;
(function (uplight) {
    var Relay = (function () {
        function Relay(delay, count) {
            var _this = this;
            this.stamp = 0;
            this.ping = 0;
            if (isNaN(delay) || delay < 2)
                delay = 2;
            this.timer = (new Date()).getTime();
            this.startTime = Math.round(this.timer / 1000);
            this.interval = setInterval(function () {
                return _this.relay();
            }, delay * 1000);
            this.count = 1000000;
            if (count)
                this.count = count;
        }
        Relay.prototype.relay = function () {
            this.count--;
            if (this.count < 0)
                clearInterval(this.interval);
            var self = this;
            var now = (new Date()).getTime();
            var timer = now - this.timer;
            this.timer = now;
            var out = {
                stamp: this.stamp,
                now: Math.round(now / 1000),
                ping: this.ping,
                timer: timer,
                start: this.startTime
            };

            uplight.Registry.getInstance().connector.relay(out).done(function (res) {
                self.ping = (new Date()).getTime() - now;
                var vo;
                try  {
                    vo = JSON.parse(res);
                } catch (e) {
                    console.warn('relay doesnt work ' + res);
                    return;
                }

                if (vo.success == 'success') {
                    var stamp = Number(vo.result);

                    if (self.stamp === 0)
                        self.stamp = stamp;
                    else if (self.stamp && self.stamp != stamp)
                        window.location.reload();
                }
            });
        };
        return Relay;
    })();
    uplight.Relay = Relay;
})(uplight || (uplight = {}));
/**
* Created by VladHome on 7/23/2015.
*/
/// <reference path="../Registry.ts" />
var uplight;
(function (uplight) {
    var DetailsLarge = (function () {
        function DetailsLarge(el) {
            var _this = this;
            // console.log(view);
            var view = $(el);
            this.view = view;
            this.$name = view.find('[data-id=name]:first');
            this.$unit = view.find('[data-id=unit]:first');
            this.$more = view.find('[data-id=more]:first');
            this.$info = view.find('[data-id=info]:first');
            this.$tumb = view.find('[data-id=tumb]:first');
            this.$gallery = view.find('[data-id=gallery]:first');
            this.$gallery.on(CLICK, 'a', function (evt) {
                return _this.onGalClick(evt);
            });
            this.$img = view.find('[data-id=image]:first');
            this.$page = view.find('[data-id=page]:first');

            this.isVis = !view.hasClass(HIDE);
            view.find('[data-id=btnClose]').click(function () {
                var r = uplight.Registry.getInstance();
                r.events.triggerHandler(DetailsLarge.DETAILS_LARGE_CLOSE_CLICK);
            });

            this.addListeners();
        }
        DetailsLarge.prototype.show = function () {
            if (!this.isVis) {
                this.view.removeClass(HIDE).show();
                this.isVis = true;
            }
        };

        DetailsLarge.prototype.hide = function () {
            if (this.isVis) {
                this.view.addClass(HIDE).hide();
                this.isVis = false;
            }
        };

        DetailsLarge.prototype.addListeners = function () {
            var _this = this;
            var r = uplight.Registry.getInstance();
            r.events.on(DetailsLarge.DETAILS_LARGE_SHOW, function (evt, id) {
                return _this.showDetails(id);
            });
            r.events.on(DetailsLarge.DETAILS_LARGE_HIDE, function (evt) {
                return _this.hide();
            });
            r.events.on(r.TIMEOUT, function (evt) {
                return _this.hide();
            });
        };

        DetailsLarge.prototype.showDetails = function (id) {
            var dest = uplight.Registry.getInstance().model.getDestById(id);
            this.setDestination(dest).render().show();
        };

        DetailsLarge.prototype.setDestination = function (vo) {
            this.vo = vo;
            return this;
        };

        DetailsLarge.prototype.render = function () {
            var vo = this.vo;

            this.$name.text(vo.name);
            this.$unit.text(vo.unit || '');

            this.$more.html(this.createTable(vo.more || ''));
            if (vo.tmb)
                this.$tumb.html('<img src="' + vo.tmb + '">');
            else
                this.$tumb.html('');
            if (vo.imgs && vo.imgs.length) {
                var imgs = vo.imgs.split(',');
                this.$gallery.html(this.createGallery(imgs));
                this.$img.attr('src', imgs[0]);
            } else {
                this.$gallery.html('');
                this.$img.attr('src', '');
            }

            return this;
        };

        DetailsLarge.prototype.createTable = function (more) {
            if (more.length === 0)
                return '';
            var ar = more.split("\n");
            var out = '<div class="more" ><table class="table">';

            for (var i = 0, n = ar.length; i < n; i++) {
                var item = ar[i].split('\t');
                out += '<tr><td>' + (item[0] || '&nbsp;') + '</td><td>' + (item[1] || '&nbsp;') + '</td></tr>';
            }

            out += '</table></div>';
            return out;
        };

        DetailsLarge.prototype.createGallery = function (imgs) {
            var ar = imgs;
            var out = '';
            for (var i = 0, n = ar.length; i < n; i++)
                out += '<a><img src="' + ar[i] + '" /></a>';
            out += '';
            return out;
        };

        DetailsLarge.prototype.onGalClick = function (evt) {
            console.log($(evt.currentTarget));
            this.$img.attr('src', $(evt.currentTarget).children('img').first().attr('src'));
        };
        DetailsLarge.DETAILS_LARGE_HIDE = 'HIDE_DETAILS_LARGE';
        DetailsLarge.DETAILS_LARGE_CLOSE_CLICK = 'DETAILS_LARGE_CLOSE_CLICK';
        DetailsLarge.DETAILS_LARGE_SHOW = 'SHOW_DETAILS_LARGE';
        return DetailsLarge;
    })();
    uplight.DetailsLarge = DetailsLarge;
})(uplight || (uplight = {}));
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
            var settings = u_settings;
            this.R = uplight.Registry.getInstance();
            this.R.settings = settings;
            var conn = new uplight.Connector();
            conn.id = 'mobile';

            var rel = new uplight.Relay(5, 2);

            this.R.connector = conn;

            // this.R.connector.getSettings((data) => this.onSettings(data));
            this.R.model = new uplight.Model(conn, function (w) {
                return _this.warn(w);
            });

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
            this.transition = new uplight.Transition(this.content);
            this.frontPage = new uplight.FrontPage($('#FrontPage'));

            $(window).on('hashchange', function (evt) {
                return _this.onHachChange();
            });
            this.filterPage = new uplight.FilterPage($('[data-ctr=FilterPage]'));
            setTimeout(function () {
                return _this.onHachChange();
            }, 1000);
            this.content = $('#Content');
            this.gmap = new uplight.GoogleMap();
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
                    break;
                case '#logo':
                    this.showView(this.frontPage.getView());
                    break;
                default:
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
            this.transition.showView(view);
        };
        return Mobile;
    })();
    uplight.Mobile = Mobile;
})(uplight || (uplight = {}));

$(document).ready(function () {
    var app = new uplight.Mobile();
});
