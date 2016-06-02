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
            this.input.on('input', function (evt) { return _this.onInput(evt); });
            this.list = view.find('[data-id=list]');
            this.list.on(CLICK, 'a', function (evt) { return _this.onListClick(evt); });
            this.list.on(CLICK, 'img', function (evt) { return _this._onImageClick(evt); });
            this.cache = { ' ': 'Please type in feild' };
            this.tiFilter = view.find('[data-id=tiFilter]:first');
            this.catTitle = view.find('[data-id=catTitle]:first');
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
            this.catTitle.text('All Categories');
            this.renderAll();
            // this.show();
            this.input.focus();
        };
        FilterPage.prototype.showPattern = function (str) {
            if (str.length == 0) {
                this.renderAll();
            }
            else {
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
            }
            else {
                //  console.log(el.children('.details').length);
                if (el.children('.details').length !== 0) {
                }
                else {
                    var vo = uplight.Registry.getInstance().model.getDestById(Number(el.data('id')));
                    if (vo)
                        this.addDetails(vo, el);
                }
                clearTimeout(this.statTimeout);
                this.statTimeout = setTimeout(function () { uplight.Registry.getInstance().connector.Stat('sr', String(el.data('id'))); }, 2000);
                setTimeout(function () { el.addClass(SELECTED); }, 100);
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
            setTimeout(function () { return _this.doFilter(); }, 200);
        };
        FilterPage.prototype.doFilter = function () {
            var str = this.input.val();
            if (str.length == 0) {
                this.renderAll();
            }
            else {
                this.data = uplight.Registry.getInstance().model.getDestsByPattern(str);
                if (this.data.length == 0)
                    this.list.html('<p class="bgwhite">  Sorry not results for text <b>' + str + '</b></p>');
                else
                    this.renderList(str);
                clearTimeout(this.statTimeout);
                this.statTimeout = setTimeout(function () { uplight.Registry.getInstance().connector.Stat('kb', str); }, 2000);
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
//# sourceMappingURL=FilterPage.js.map