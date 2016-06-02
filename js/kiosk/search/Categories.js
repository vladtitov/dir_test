/**
 * Created by VladHome on 7/9/2015.
 */
/// <reference path="../Registry.ts" />
var uplight;
(function (uplight) {
    var CategoriesCheck = (function () {
        function CategoriesCheck(el) {
            var _this = this;
            this.view = $(el);
            this.R = uplight.Registry.getInstance();
            this.list = this.view.find('.list:first');
            this.R.model.dispatcher.on(this.R.model.READY, function () { return _this.onDataReady(); });
            this.R.events.on(this.R.TIMEOUT, function () { return _this.reset(); });
            this.addListeners();
        }
        CategoriesCheck.prototype.addListeners = function () {
            var _this = this;
            this.list.on(CLICK, 'li', function (evt) { return _this.onListChanged(evt); });
            this.R.events.on(this.R.TIMEOUT, function () { return _this.reset(); });
        };
        CategoriesCheck.prototype.reset = function () {
            this.list.scrollTop(0);
            this.render();
        };
        CategoriesCheck.prototype.addCategory = function (id) {
            var ind = this.selected.indexOf(id);
            if (ind == -1) {
                this.selected.push(id);
                this.R.connector.Stat('cp', id.toString());
                this.R.events.triggerHandler(this.R.CATEGORIES_CHANGE, [this.selected]);
            }
        };
        CategoriesCheck.prototype.removeCategory = function (id) {
            var ind = this.selected.indexOf(id);
            if (ind !== -1) {
                this.selected.splice(ind, 1);
                this.R.connector.Stat('cm', id.toString());
                this.R.events.triggerHandler(this.R.CATEGORIES_CHANGE, [this.selected]);
            }
        };
        CategoriesCheck.prototype.onListChanged = function (evt) {
            var el = $(evt.currentTarget);
            var id = Number(el.data('id'));
            if (isNaN(id))
                return;
            if (Number(el.data('checked')) == 1) {
                el.data('checked', 0);
                console.log('removing category ' + id);
                this.removeCategory(id);
                el.find('.check').removeClass('fa-check-square-o').addClass('fa-square-o');
            }
            else {
                el.data('checked', 1);
                console.log('adding  category ' + id);
                this.addCategory(id);
                el.find('.check').removeClass('fa-square-o').addClass('fa-check-square-o');
            }
        };
        CategoriesCheck.prototype.onDataReady = function () {
            this.data = this.R.model.getCategories();
            this.render();
        };
        CategoriesCheck.prototype.renderItem = function (vo, i) {
            return '<li data-checked="1" data-id="' + vo.id + '" class="btn" ><span class="check fa fa-check-square-o" data-id="' + vo.id + '" ></span><span class="icon ' + vo.icon + '"></span> <span class="name">' + vo.label + '</span></label></li>';
            //  return '<li data-checked="1" data-id="'+vo.id+'" class="btn" ><span class="id">'+vo.id+'</span><span class="check fa fa-check-square-o" data-id="'+vo.id+'" ></span><span class="icon '+vo.icon+'"></span> <span class="name">'+vo.label+'</span></label></li>';
        };
        CategoriesCheck.prototype.render = function () {
            var ar = this.data;
            var out = '<ul>';
            var idis = [];
            for (var i = 0, n = ar.length; i < n; i++) {
                out += this.renderItem(ar[i], i);
                idis.push(ar[i].id);
            }
            out += '</ul>';
            this.selected = idis;
            this.list.html(out);
        };
        return CategoriesCheck;
    })();
    uplight.CategoriesCheck = CategoriesCheck;
})(uplight || (uplight = {}));
//# sourceMappingURL=Categories.js.map