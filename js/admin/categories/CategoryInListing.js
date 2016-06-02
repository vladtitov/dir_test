/**
 * Created by VladHome on 6/22/2015.
 */
/// <reference path="../RegA.ts" />
var uplight;
(function (uplight) {
    var CategoryInListing = (function () {
        function CategoryInListing(view) {
            var _this = this;
            this.view = view;
            this.R = uplight.RegA.getInstance();
            this.R.dispatcher.on(this.R.CATEGORY_REST, function () { return _this.render(); });
            this.list = $('<ul>').appendTo(view.find('[data-id=list]:first'));
            this.list.on(CLICK, 'li', function (evt) { return _this.onListClick($(evt.currentTarget)); });
            this.title = view.find('[data-id=title]:first');
            this.R.dispatcher.on(this.R.CATEGORY_ADD_SELECTED, function (evt, elms) { return _this.onAddSelected(elms); });
            this.total = view.find('[data-id=total]:first');
            this.btnDel = view.find('[data-id=btnDel]').on(CLICK, function () { return _this.onDelClicked(); });
            this.btnReset = view.find('[data-id=btnReset]').on(CLICK, function () { _this.R.dispatcher.triggerHandler(_this.R.CATEGORY_REST); });
        }
        CategoryInListing.prototype.onDelClicked = function () {
            var _this = this;
            var elms = this.list.children('.selected');
            this.R.dispatcher.triggerHandler(this.R.CATEGORY_REMOVE_SELECTED, [elms]);
            setTimeout(function () { return _this.refreshList(); }, 500);
        };
        CategoryInListing.prototype.onAddSelected = function (elms) {
            var _this = this;
            // console.log(elms);
            this.list.prepend(elms);
            setTimeout(function () { return _this.refreshList(); }, 2000);
        };
        CategoryInListing.prototype.refreshList = function () {
            this.list.children().removeClass(SELECTED);
            this.sortList();
            this.total.text(this.sortList());
        };
        CategoryInListing.prototype.onListClick = function (el) {
            var id = Number(el.data('id'));
            if (isNaN(id))
                return;
            el.toggleClass(SELECTED);
        };
        CategoryInListing.prototype.getCatId = function () {
            return this.current.id;
        };
        CategoryInListing.prototype.getAllIds = function () {
            var out = [];
            this.list.children().each(function (ind, el) {
                out.push(Number($(el).data('id')));
            });
            return out;
        };
        CategoryInListing.prototype.setCurrent = function (vo) {
            // console.log(vo);
            this.current = vo;
            // this.render();
        };
        CategoryInListing.prototype.render = function () {
            if (!this.current)
                return;
            var ar = this.R.model.getDestinationsInCategory(this.current.id);
            ///  console.log(ar);
            var out = '';
            for (var i = 0, n = ar.length; i < n; i++) {
                out += this.renderItem(ar[i], i);
            }
            this.list.html(out);
            this.title.text(this.current.label);
            this.total.text(n);
        };
        CategoryInListing.prototype.renderItem = function (item, i) {
            return '<li data-i="' + i + '" data-type="old" data-id="' + item.id + '" class="item" ><span class="name">' + item.name + '</span><span class="unit pull-right">' + item.unit + '</span></li>';
        };
        CategoryInListing.prototype.sortList = function () {
            var mylist = this.list;
            var listitems = mylist.children().get();
            listitems.sort(function (a, b) {
                return $(a).text().toUpperCase().localeCompare($(b).text().toUpperCase());
            });
            $.each(listitems, function (idx, itm) { mylist.append(itm); });
            return listitems.length;
        };
        return CategoryInListing;
    }());
    uplight.CategoryInListing = CategoryInListing;
})(uplight || (uplight = {}));
//# sourceMappingURL=CategoryInListing.js.map