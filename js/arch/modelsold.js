/// <reference path="../../libs/typing/jquery.d.ts" />
var models;
(function (models) {
    var ListViewModel = (function () {
        function ListViewModel(name) {
            var _this = this;
            this.name = name;
            $.get('rem/data.' + name + 's').done(function (data) { return _this.onServerData(data); });
        }
        ListViewModel.prototype.getData = function () {
            return this._model;
        };
        ListViewModel.prototype.toString = function () {
            return this._toString(this._model);
        };
        ListViewModel.prototype.filterToString = function (pattern) {
            if (!this._patterns[pattern])
                this._patterns[pattern] = this._toString(this.filter(pattern));
            return this._patterns[pattern];
        };
        ListViewModel.prototype.filter = function (pattern) {
            pattern = ' ' + pattern.toLowerCase();
            var data = this._labels_units;
            var out = [];
            for (var i = 0, n = data.length; i < n; i++) {
                if (data[i].indexOf(pattern) > -1)
                    out.push(this._model[i]);
            }
            this.amount = out.length;
            return out;
        };
        ListViewModel.prototype.setData = function (data) {
            var ar = [];
            for (var i = 0, n = data.length; i < n; i++) {
                ar.push(' ' + data[i].name.toLowerCase() + ' ' + data[i].unit.toLowerCase());
            }
            this._patterns = {};
            this._labels_units = ar;
            this._model = data;
            this.total = data.length;
            this.reset();
            trace(this.name + this.type + this._model.length);
            if (this.onModelChange)
                this.onModelChange(this._model);
        };
        ListViewModel.prototype.reset = function () {
            this._selectedItem = null;
            if (this.onReset)
                this.onReset();
        };
        ListViewModel.prototype.setItem = function (item) {
            for (var i = 0, n = this._model.length; i < n; i++) {
                if (this._model[i].mid == item.mid) {
                    this._model[i] = item;
                    return true;
                }
            }
            return false;
        };
        ListViewModel.prototype.selectedItem = function (id) {
            if (id === void 0) { id = -1; }
            if (id < 0)
                return this._selectedItem;
            for (var i = 0, n = this._model.length; i < n; i++) {
                if (this._model[i].mid == id)
                    this._selectedItem = this._model[i];
            }
            return this._selectedItem;
        };
        ListViewModel.prototype.onServerData = function (data) {
            if (data.result == 'success') {
                this.type = data.type;
                this.setData(data.data);
            }
        };
        ListViewModel.prototype._toString = function (data) {
            var str = '<ul>';
            for (var i = 0, n = data.length; i < n; i++) {
                str += '<a href="#data.' + this.name + '?id=' + data[i].id + '"><li><span class="name">' + data[i].name + '</span><span class="unit">' + data[i].unit + '</span></li></a>';
            }
            return str + '</ul>';
        };
        return ListViewModel;
    })();
    models.ListViewModel = ListViewModel;
    var VOItem = (function () {
        function VOItem(obj) {
        }
        return VOItem;
    })();
    models.VOItem = VOItem;
})(models || (models = {}));
var trace = trace || function (data) {
    console.log(data);
};
//# sourceMappingURL=modelsold.js.map