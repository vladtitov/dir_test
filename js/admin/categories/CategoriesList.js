/**
 * Created by VladHome on 6/20/2015.
 */
///<reference path="../RegA.ts" />
var uplight;
(function (uplight) {
    var CategoriesList = (function () {
        function CategoriesList(view) {
            var _this = this;
            this.view = view;
            var table = view.find('.table:first');
            var head = $('<thead>');
            head.html('<tr class="header"><th class="id">ID</th><th class="icon">Icon</th><th class="name">Name</th><th class="seq">Sequence</th><th class="seq">Enabled</th><th class="recs">Records</th></tr>');
            table.append(head);
            this.list = $('<tbody>');
            table.append(this.list);
            this.listView = $('#CategoriesList-container');
            this.R = uplight.RegA.getInstance();
            this.R.model.dispatcher.on(this.R.model.CHANGE, function () { _this.onModelChanged(); });
            if (this.R.model.getCategories())
                this.renderList();
            this.list.on(CLICK, 'tr', function (evt) { return _this.onClick($(evt.currentTarget)); });
            this.R.model.dispatcher.on(this.R.model.CATEGORIES_CAHANGE, function (evt, cata) { return _this.onCategoriesChanged(); });
        }
        CategoriesList.prototype.onCategoriesChanged = function () {
            this.renderList();
            if (this.selectedItem)
                this.selectElementById(this.selectedItem.id);
        };
        CategoriesList.prototype.onClick = function (el) {
            var i = Number(el.data('i'));
            if (isNaN(i))
                return;
            var cat = this.data[i];
            if (cat) {
                // console.log(cat);
                this.selectedItem = cat;
                this.selectElement(el);
                this.R.dispatcher.triggerHandler(this.R.CATEGORY_SELECTED, cat);
            }
        };
        CategoriesList.prototype.selectElementById = function (id) {
            var el = this.list.find('[data-id=' + id + ']');
            if (el)
                this.selectElement(el);
        };
        CategoriesList.prototype.selectElement = function (el) {
            if (this.selected)
                this.selected.removeClass(SELECTED);
            el.addClass(SELECTED);
            this.selected = el;
        };
        CategoriesList.prototype.onModelChanged = function () {
            this.renderList();
        };
        CategoriesList.prototype.renderList = function () {
            this.R.model.mapCategories();
            var ar = this.R.model.getCategories();
            var out = '';
            for (var i = 0, n = ar.length; i < n; i++) {
                out += this.renderItem(ar[i], i);
            }
            this.list.html(out);
            this.data = ar;
        };
        CategoriesList.prototype.renderItem = function (item, i) {
            var total = 0;
            var enbl = 'fa fa-check';
            if (!item.enable)
                enbl = 'fa fa-minus';
            if (item.dests)
                total = item.dests.length;
            //if (this.isChange) return '<li class="uplight" data-id="' + item.catid + '"    ><div class="catname ' + (item.enable == 1 ? '' : ' disabled') + '" contentEditable="true">' + item.label + '</div></li>';
            return '<tr  class="item ' + (item.enable == 1 ? '' : ' disabled') + '" data-i="' + i + '" data-id="' + item.id + '" >' +
                '<td class="id">' + item.id + '</td>' +
                '<td class="icon"><span class="' + item.icon + '"></td>' +
                '<td >' + item.label + '</td>' +
                '<td >' + item.sort + '</td>' +
                '<td ><span class="' + enbl + '"></span></td>' +
                '<td >' + total + '</td>' +
                '</tr>';
            // return '<li class="uplight" data-id="' + item.catid + '"    ><div class="catname ' + (item.enable == 1 ? '' : ' disabled') + '" >' + item.label + '</div></li>';
        };
        return CategoriesList;
    }());
    uplight.CategoriesList = CategoriesList;
})(uplight || (uplight = {}));
//# sourceMappingURL=CategoriesList.js.map