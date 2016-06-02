/// <reference path="../admin/models.ts" />
/// <reference path="../admin/rega.ts" />
var admin;
(function (admin) {
    var CategoriesList = (function () {
        function CategoriesList() {
            this.init();
        }
        CategoriesList.prototype.refresh = function () {
            this._data = R.modelCats.getData();
            var out = '';
            for (var i = 0, n = this._data.length; i < n; i++)
                out += '<li class="uplight' + (this._data[i].enable == 1 ? '' : ' disabled') + '" data-i="' + i + '"  data-id="' + this._data[i].catid + '"    >' + this._data[i].label + '</>';
            this.list.html(out);
            this.selectedItem = null;
        };

        CategoriesList.prototype.init = function () {
            var _this = this;
            this.list = $('#lstCats');

            $(this.list).on(CLICK, 'li', function (evt) {
                return _this.onCategoryClick(evt);
            });
            // if (!R.modelCats) {
            //  R.modelCats = new admin.ModelCategories();
            // R.modelCats.refresh();
            // } else this.refresh();
            // R.modelCats.onChange = () => this.onModelChanged();
        };
        CategoriesList.prototype.onModelChanged = function () {
            this.refresh();
        };
        CategoriesList.prototype.onCategoryClick = function (evt) {
            var i = Number($(evt.target).data('i'));

            if (isNaN(i))
                return;

            if (this.selected)
                this.selected.removeClass(SELECTED);

            // this.list.children().removeClass('selected');
            this.selected = $(evt.target);
            this.selected.addClass(SELECTED);
            console.log(this._data);
            // this.selectedItem = this._data[i];
            //if(this.onChange)this.onChange();
        };
        return CategoriesList;
    })();
    admin.CategoriesList = CategoriesList;
})(admin || (admin = {}));
//# sourceMappingURL=CategoriesList.js.map
