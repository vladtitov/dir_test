/**
 * Created by VladHome on 6/18/2015.
 */
/// <reference path="../RegA.ts" />
var uplight;
(function (uplight) {
    var DetailsCategory = (function () {
        function DetailsCategory(view) {
            var _this = this;
            this.view = view;
            this.R = uplight.RegA.getInstance();
            this.categories = view.find('[data-id=categories]:first').on('click', function () { return _this.showHideCategories(); });
            this.categoriesAll = $('#details-categories-list').on('click', 'input', function (evt) { return _this.onCategoryClick($(evt.currentTarget)); }).hide();
        }
        DetailsCategory.prototype.render = function () {
            var cats = this.current.catsStr ? this.current.catsStr.toString() : '';
            this.categories.val(cats);
        };
        DetailsCategory.prototype.reset = function () {
            this.hideEditCategories();
            this.categories.val('');
            this.current.cats = null;
        };
        DetailsCategory.prototype.setCurrent = function (dest) {
            this.current = dest;
            this.hideEditCategories();
        };
        DetailsCategory.prototype.hideEditCategories = function () {
            if (this.catsVisible) {
                this.categoriesAll.hide('fast');
                this.catsVisible = false;
            }
        };
        DetailsCategory.prototype.showEditCategories = function () {
            if (this.catsVisible)
                return;
            this.categoriesAll.show('fast');
            this.catsVisible = true;
        };
        DetailsCategory.prototype.showHideCategories = function () {
            console.log(this.catsVisible);
            if (this.catsVisible)
                this.hideEditCategories();
            else {
                this.editCategories();
                this.showEditCategories();
            }
        };
        DetailsCategory.prototype.addCategory = function (cat) {
            var id = cat.id;
            var ar = this.current.cats;
            console.log(ar);
            if (ar.indexOf(id) === -1) {
                ar.push(id);
                this.current.catsStr = this.R.model.getCategoriesNames(ar);
                this.render();
            }
        };
        DetailsCategory.prototype.removeCategory = function (cat) {
            var id = cat.id;
            var ar = this.current.cats;
            var ind = ar.indexOf(id);
            if (ind !== -1) {
                ar.splice(ind, 1);
                this.current.catsStr = this.R.model.getCategoriesNames(ar);
                this.render();
            }
        };
        DetailsCategory.prototype.onCategoryClick = function (el) {
            var cat = this.R.model.getCategoryById(el.val());
            if (el.prop('checked'))
                this.addCategory(cat);
            else
                this.removeCategory(cat);
        };
        DetailsCategory.prototype.editCategories = function () {
            //   console.log('editCategories '+this.current.cats ,this.current);
            if (!this.current.cats || this.current.cats.length === 0) {
                this.current.cats = [];
                this.renderAllCats();
                return;
            }
            var ar1 = [];
            var ar2 = [];
            var cats = this.R.model.getCategories();
            var catsAr = this.current.cats;
            for (var i = 0, n = cats.length; i < n; i++) {
                if (catsAr.indexOf(cats[i].id) == -1)
                    ar2.push(cats[i]);
                else
                    ar1.push(cats[i]);
            }
            var out = this.renderCats(ar1, true);
            out += this.renderCats(ar2, false);
            this.categoriesAll.html(out);
        };
        DetailsCategory.prototype.renderAllCats = function () {
            // console.log('renderAllCats   ', this.R.model.getCategories());
            this.categoriesAll.html(this.renderCats(this.R.model.getCategories(), false));
        };
        DetailsCategory.prototype.renderCats = function (cats, selected) {
            var out = '';
            // out += '<li ' +( selected?'class="selected" >':'>')+ cats[i].label + '<input class="unit" type="checkbox" value="' + cats[i].catid + '" ' + (selected?'checked="true"':'')+'/></li>';
            for (var i = 0, n = cats.length; i < n; i++) {
                out += '<div><input type="checkbox" value="' + cats[i].id + '" ' + (selected ? 'checked="true"' : '') + '/><label>' + cats[i].label + '</label></div>';
            }
            return out;
        };
        return DetailsCategory;
    }());
    uplight.DetailsCategory = DetailsCategory;
})(uplight || (uplight = {}));
//# sourceMappingURL=DetailsCategory.js.map