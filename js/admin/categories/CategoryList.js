/**
 * Created by VladHome on 6/22/2015.
 */
/// <reference path="../RegA.ts" />
var uplight;
(function (uplight) {
    var CategoryList = (function () {
        function CategoryList(view) {
            var _this = this;
            this.view = view;
            this.CATEGORY_SELECTED = 'CATEGORY_SELECTED';
            this.dispatcher = $({});
            this.R = uplight.RegA.getInstance();
            //console.log(this.R.vo);
            // view.find('[data-id=header]:first').html('<div class="icon">Icon</div><div class="name">Name</div>');
            this.list = $('<ul>').on(CLICK, 'li', function (evt) { return _this.onItemClick($(evt.currentTarget)); }).appendTo(this.view.find('[data-id=list]:first'));
            if (this.R.model.getCategories())
                this.render();
            this.R.model.dispatcher.on(this.R.model.CHANGE, function () { return _this.render(); });
            this.R.dispatcher.on(this.R.CATEGORY_NOTINLIS_CLOSE, function () { return _this.show(); });
        }
        CategoryList.prototype.render = function () {
            var ar = this.R.model.getCategories();
            var out = '';
            for (var i = 0, n = ar.length; i < n; i++) {
                out += this.renderItem(ar[i], i);
            }
            this.list.html(out);
            this.data = ar;
        };
        CategoryList.prototype.hide = function () {
            this.view.hide('fast');
        };
        CategoryList.prototype.show = function () {
            this.view.show('fast');
        };
        CategoryList.prototype.renderItem = function (item, i) {
            return '<li  class="item ' + (item.enable == 1 ? '' : ' disabled') + '" data-i="' + i + '" data-id="' + item.id + '" ><span class="' + item.icon + '"></span> <span class="name">' + item.label +
                '</span></li>';
        };
        CategoryList.prototype.onItemClick = function (el) {
            var i = Number(el.data('i'));
            if (isNaN(i))
                return;
            var item = this.data[i];
            this.dispatcher.triggerHandler(this.CATEGORY_SELECTED, item);
            this.selectElement(el);
        };
        CategoryList.prototype.selectElement = function (el) {
            if (this.selected)
                this.selected.removeClass(SELECTED);
            this.selected = el;
            el.addClass(SELECTED);
        };
        return CategoryList;
    }());
    uplight.CategoryList = CategoryList;
})(uplight || (uplight = {}));
//# sourceMappingURL=CategoryList.js.map