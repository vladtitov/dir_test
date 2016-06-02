/**
 * Created by VladHome on 6/20/2015.
 */
/// <reference path="../rega.ts" />
///<reference path="CategoryInListing.ts" />
///<reference path="CategoryList.ts" />
///<reference path="CategoryNotListing.ts" />
var uplight;
(function (uplight) {
    var CategoryListing = (function () {
        function CategoryListing(container) {
            this.R = uplight.RegA.getInstance();
            var that = this;
            if (!this.R.model)
                this.R.model = new uplight.DestinantionsModel();
            container.load('htms/admin/CategoryListing.htm', function () { that.init(); });
        }
        CategoryListing.prototype.init = function () {
            var _this = this;
            this.view = $('#CategoryListing');
            var tools = this.view;
            // this.show();
            this.inListing = new uplight.CategoryInListing($('#CategoryInListing'));
            this.list = new uplight.CategoryList($('#CategoryList'));
            this.list.dispatcher.on(this.list.CATEGORY_SELECTED, function (evt, cat) { return _this.onCategorySelected(cat); });
            this.notInListing = new uplight.CategoryNotListing($('#CategoryNotListing'));
            this.btnAdd = tools.find('[data-id=btnAdd]:first').on(CLICK, function () { return _this.onAddClicked(); });
            this.btnSave = tools.find('[data-id=btnSave]:first').on(CLICK, function () { return _this.onSaveClicked(); });
        };
        CategoryListing.prototype.onCategorySelected = function (cat) {
            //console.log(cat);
            this.inListing.setCurrent(cat);
            this.inListing.render();
            this.notInListing.setCurrent(cat);
            this.notInListing.render();
        };
        CategoryListing.prototype.onAddClicked = function () {
            this.list.hide();
            this.notInListing.show();
        };
        CategoryListing.prototype.onSave = function (res) {
            if (res.success)
                this.R.msg('Records Saved', this.btnSave);
            else
                this.R.msg('ERROR ', this.btnSave);
            console.log(res);
        };
        CategoryListing.prototype.onSaveClicked = function () {
            var _this = this;
            var btn = this.btnSave;
            btn.prop('disabled', true);
            setTimeout(function () { btn.prop('disabled', false); }, 1500);
            var ids = this.inListing.getAllIds();
            var catid = this.inListing.getCatId();
            this.R.model.saveCategoryListing(catid, ids, function (res) { return _this.onSave(res); });
        };
        return CategoryListing;
    }());
    uplight.CategoryListing = CategoryListing;
})(uplight || (uplight = {}));
//# sourceMappingURL=CategoryListing.js.map