/**
 * Created by VladHome on 6/20/2015.
 */
/// <reference path="../rega.ts" />
var uplight;
(function (uplight) {
    var CategoryNotListing = (function () {
        function CategoryNotListing(view) {
            var _this = this;
            this.R = uplight.RegA.getInstance();
            this.view = view.hide();
            this.total = view.find('[data-id=total]:first');
            this.list = $('<ul>').appendTo(view.find('[data-id=list]:first'));
            this.list.on(CLICK, 'li', function (evt) { return _this.onListClick($(evt.currentTarget)); });
            this.btnAdd = view.find('[data-id=btnAdd]:first').on(CLICK, function () { return _this.onAddClick(); });
            this.tiSearch = view.find('[data-id=tiSearch]:first').on('input', function () { return _this.onSearchInput(); });
            this.btnClose = view.find('[data-id=btnClose]:first').on(CLICK, function () { return _this.onCloseClicked(); });
            this.btnBack = view.find('[data-id=btnBack]:first').on(CLICK, function () { return _this.onCloseClicked(); });
            // this.R.events.on(this.R.CATEGORY_SELECTED,(evt,cat)=>this.onCategorySelected(cat));
            this.R.dispatcher.on(this.R.CATEGORY_REMOVE_SELECTED, function (evt, elms) { return _this.onRemoved(elms); });
            this.R.dispatcher.on(this.R.CATEGORY_REST, function () { return _this.render(); });
            this.btnClear = view.find('.fa-times-circle:first').on(CLICK, function () { return _this.onClearClicked(); });
        }
        CategoryNotListing.prototype.onClearClicked = function () {
            this.tiSearch.val('');
            this.sortList();
        };
        CategoryNotListing.prototype.sortList = function () {
            var mylist = this.list;
            var listitems = mylist.children().get();
            listitems.sort(function (a, b) {
                return $(a).text().toUpperCase().localeCompare($(b).text().toUpperCase());
            });
            $.each(listitems, function (idx, itm) { mylist.append(itm); });
            return listitems.length;
        };
        CategoryNotListing.prototype.onRemoved = function (elms) {
            var _this = this;
            this.list.prepend(elms);
            setTimeout(function () { return _this.refreshList(); }, 2000);
        };
        CategoryNotListing.prototype.refreshList = function () {
            this.list.children().removeClass(SELECTED);
            this.total.text(this.sortList());
        };
        CategoryNotListing.prototype.onCloseClicked = function () {
            this.hide();
            this.R.dispatcher.triggerHandler(this.R.CATEGORY_NOTINLIS_CLOSE);
        };
        CategoryNotListing.prototype.setCurrent = function (cat) {
            this.current = cat;
            // this.render();
        };
        CategoryNotListing.prototype.onAddClick = function () {
            var _this = this;
            var elms = this.list.children('.selected');
            this.R.dispatcher.triggerHandler(this.R.CATEGORY_ADD_SELECTED, [elms]);
            setTimeout(function () { return _this.refreshList(); }, 500);
        };
        CategoryNotListing.prototype.onSearchInput = function () {
            var pat = this.tiSearch.val().toLowerCase();
            if (pat.length) {
                var mylist = this.list;
                var listitems = mylist.children().get();
                $.each(listitems, function (idx, itm) {
                    if (itm.innerText.toLowerCase().indexOf(pat) !== -1)
                        mylist.prepend(itm);
                });
            }
            else
                this.sortList();
        };
        CategoryNotListing.prototype.onListClick = function (el) {
            if (el.hasClass(SELECTED))
                el.removeClass(SELECTED);
            else
                el.addClass(SELECTED);
        };
        CategoryNotListing.prototype.show = function () {
            if (this.isVisible)
                return;
            this.view.show('fast');
            this.isVisible = true;
        };
        CategoryNotListing.prototype.hide = function () {
            if (this.isVisible) {
                this.view.hide('fast');
                this.isVisible = false;
            }
        };
        CategoryNotListing.prototype.renderItem = function (item, i) {
            return '<li data-type="new" data-id="' + item.id + '" class="item" ><span class="name">' + item.name + '</span><span class="unit pull-right">' + item.unit + '</span></li>';
        };
        // resetData():CategoryNotListing{
        //   if(!this.current) return;
        //return this;
        // }
        CategoryNotListing.prototype.render = function () {
            if (!this.current)
                return;
            var out = '';
            var ar = this.R.model.getDestinationsNotInCategory();
            for (var i = 0, n = ar.length; i < n; i++) {
                out += this.renderItem(ar[i], i);
            }
            this.list.html(out);
            this.data = ar;
            this.total.text(n);
        };
        return CategoryNotListing;
    }());
    uplight.CategoryNotListing = CategoryNotListing;
})(uplight || (uplight = {}));
//# sourceMappingURL=CategoryNotListing.js.map