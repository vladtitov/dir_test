/// <reference path="../rega.ts" />
/// <reference path="CategoryForm.ts" />
/// <reference path="CategoriesList.ts" />
var uplight;
(function (uplight) {
    var CategoriesManager = (function () {
        function CategoriesManager(container) {
            var _this = this;
            this.R = uplight.RegA.getInstance();
            if (!this.R.model)
                this.R.model = new uplight.DestinantionsModel();
            container.load('htms/admin/CategoriesManager.htm', function () { _this.init(); });
        }
        CategoriesManager.prototype.show = function () {
            this.isVisible = true;
            this.view.show('fast');
        };
        CategoriesManager.prototype.hide = function () {
            if (this.isVisible) {
                this.isVisible = false;
                this.view.hide('fast');
            }
        };
        CategoriesManager.prototype.init = function () {
            var _this = this;
            this.view = $('#CategoriesManager');
            this.categoryForm = new uplight.CategoryForm($('#CategoryForm'));
            this.categoryForm.onClose = function () {
                _this.show();
            };
            this.list = new uplight.CategoriesList($('#CategoriesList'));
            this.R.model.dispatcher.on(this.R.model.CHANGE, function () { _this.onModelChanged(); });
            this.btnAdd = $('#CategoriesView [data-id=btnAdd]:first').on(CLICK, function () { return _this.onAddClicked(); });
            this.btnEdit = $('#CategoriesView [data-id=btnEdit]:first').on(CLICK, function () { return _this.onEditClicked(); });
            this.btnDel = $('#CategoriesView [data-id=btnDel]').on(CLICK, function () { return _this.onDelClicked(); });
            this.total = this.view.find('[data-id=total]');
            this.title = this.view.find('[data-id=title]');
            this.isVisible = true;
        };
        CategoriesManager.prototype.onModelChanged = function () {
            // this.editCategories.renderList();
        };
        CategoriesManager.prototype.onAddClicked = function () {
            var cat = new uplight.VOCategory({ id: 0 });
            cat.dests = [];
            cat.sort = this.R.model.getCategories().length + 1;
            cat.icon = 'icon';
            cat.enable = 1;
            this.categoryForm.setCurrent(cat);
            this.categoryForm.show();
            this.hide();
        };
        CategoriesManager.prototype.onEditClicked = function () {
            this.categoryForm.show();
            this.hide();
        };
        CategoriesManager.prototype.onDeleteSuccess = function (res) {
            console.log(res);
        };
        CategoriesManager.prototype.onDelClicked = function () {
            var _this = this;
            // console.log('delite');
            var item = this.list.selectedItem;
            // console.log(item);
            if (!item)
                return;
            this.R.confirm.show('Delete Category', 'Yoy want to delete category ' + item.label + '?', function () {
                _this.R.model.deleteCategory(item, function (res) { return _this.onDeleteSuccess(res); });
            });
        };
        return CategoriesManager;
    }());
    uplight.CategoriesManager = CategoriesManager;
})(uplight || (uplight = {}));
//# sourceMappingURL=CategoriesManager.js.map