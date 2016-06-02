/// <reference path="../../../scripts/typings/jquery.d.ts" />
/// <reference path="../admin/models.ts" />
/// <reference path="../admin/rega.ts" />
var lists;
(function (lists) {
    var CatDestsList = (function () {
        function CatDestsList(id) {
            this.id = id;
            this.init();
        }
        CatDestsList.prototype.setCategory = function (cat) {
            this.cat = cat;
            trace(cat);
            var data;
            if (cat.type == 1 || cat.type == 2) {
                data = R.vo.getAllByType(cat.type.toString());
                $('#arrows button').prop('disabled', true);
                $('#CatDestsList input[type="button"]').prop('disabled', true);
            } else {
                data = R.vo.getAllByCat(cat);
                $('#arrows button').prop('disabled', false);
                $('#CatDestsList input[type="button"]').prop('disabled', false);
            }
            this.renderData(data);
            $('#CatDestsList p span:first').text('In Category:' + cat.label);
            $('#CatDestsList p span:last').text('Total:' + data.length);
        };

        CatDestsList.prototype.addListing = function (list) {
            this.container.append(list);
        };
        CatDestsList.prototype.reset = function () {
            $('#CatDestsList p span').text('');
            this.container.html('');
        };

        CatDestsList.prototype.renderData = function (data) {
            var out = '';
            for (var i = 0, n = data.length; i < n; i++)
                out += '<li data-id="' + data[i].destid + '" ><span class="name">' + data[i].name + '</span><span class="unit" >' + data[i].unit + '</span></li>';
            this.container.html(out);
        };
        CatDestsList.prototype.init = function () {
            var _this = this;
            this.container = $('#CatDestsList .destListing');
            this.container.on(CLICK, 'li', function (evt) {
                return _this.onSelected(evt);
            });
            $('#CatDestsList input[type="button"]').on(CLICK, function (evt) {
                return _this.onSaveClicked(evt);
            });

            $('#arrows button[value="add"]').on(CLICK, function () {
                return _this.addToListing();
            });
            $('#arrows button[value="remove"]').on(CLICK, function () {
                return _this.removeFromListing();
            });

            this.destsList = new lists.DestinationsList('Destinations');
            this.categories = new admin.ManageCategories();
            this.categories.onChange = function (cat) {
                return _this.onCatChange(cat);
            };
        };
        CatDestsList.prototype.removeFromListing = function () {
        };
        CatDestsList.prototype.addToListing = function () {
            this.addListing(this.destsList.getSelected());
            this.updateCat();
        };
        CatDestsList.prototype.updateCat = function () {
            var out = '';
            var total;
            this.container.children().each(function (ind, val) {
                total = ind;
                out += val.getAttribute('data-id') + ',';
            });

            this.cat.dests = out;
            R.vo.eraseCat(this.cat);
        };

        CatDestsList.prototype.onCatChange = function (cat) {
            if (cat.enable != 1)
                this.reset();
else
                this.setCategory(cat);
        };
        CatDestsList.prototype.onSelected = function (evt) {
        };
        CatDestsList.prototype.onSaveClicked = function (evt) {
            var _this = this;
            R.connector.updateCategory(function (resp) {
                return _this.onSave(resp);
            }, this.cat);
        };
        CatDestsList.prototype.onSave = function (resp) {
        };
        return CatDestsList;
    })();
    lists.CatDestsList = CatDestsList;
})(lists || (lists = {}));

var catDestsList = new lists.CatDestsList('CatDestsList');
