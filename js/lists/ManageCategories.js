/// <reference path="categorieslist.ts" />
/// <reference path="destinationslistcat.ts" />
/// <reference path="../../../scripts/typings/jquery.d.ts" />
/// <reference path="../admin/models.ts" />
/// <reference path="../admin/rega.ts" />
var lists;
(function (lists) {
    var ManageCategoriesListing = (function () {
        function ManageCategoriesListing() {
            this.init();
        }
        ManageCategoriesListing.prototype.setCategory = function (cat) {
            this.cat = cat;
            var data;

            //if (cat.type == 1 || cat.type == 2) {
            //   $('#arrows button').prop('disabled', true)
            //  $('#CatDestsList input[type="button"]').prop('disabled', true)
            // } else {
            //   $('#arrows button').prop('disabled', false)
            //   $('#CatDestsList input[type="button"]').prop('disabled', false)
            // }
            data = R.vo.getAllByCat(cat.catid);

            this.renderData(data);
            $('#txtInCategory').text('In Category:' + cat.label);
            $('#inCatTotal').text('Total:' + data.length);

            this.destsList.setCat(cat.catid);
        };

        ManageCategoriesListing.prototype.addListing = function (list) {
            this.lstDests.append(list);
        };
        ManageCategoriesListing.prototype.reset = function () {
            $('#txtInCategory').text('');
            this.lstDests.html('');
        };

        ManageCategoriesListing.prototype.renderData = function (data) {
            var out = '';
            for (var i = 0, n = data.length; i < n; i++)
                out += '<li class="uplight" data-id="' + data[i].destid + '" >' + data[i].name + '<span>' + data[i].unit + '</span></li>';
            this.lstDests.html(out);
        };

        ManageCategoriesListing.prototype.init = function () {
            var _this = this;
            this.btnSaveListing = $('#btnSaveListing');
            this.btnSaveListing.on(CLICK, function () {
                return _this.saveListing();
            });

            this.showAll = $('#showAll');
            this.showAll.on(CLICK, function () {
                return _this.showAllCLICK();
            });

            this.btnRemove = $('#btnRemove');
            this.btnRemove.on(CLICK, function () {
                return _this.removeFromListing();
            });

            this.lstDests = $('#CatDests');
            this.lstDests.on(CLICK, 'li', function (evt) {
                return _this.onSelected(evt);
            });

            //$('#CatDestsList input[type="button"]').on(CLICK, (evt) => this.onSaveClicked(evt));
            $('#arrowadd').on(CLICK, function () {
                return _this.addToListing();
            });

            this.destsList = new lists.DestinationsListCat();

            this.categories = new lists.CategoriesList();

            // this.categories.skipDisabled = true;
            this.categories.onChange = function (cat) {
                return _this.onCatChange(cat);
            };
            $('#arrows').hide();
            $('#Destinations').hide();
        };

        ManageCategoriesListing.prototype.showAllCLICK = function () {
            if (this.showAll.prop('checked')) {
                $('#Destinations').show('fast');
                $('#arrows').show('fast');
            } else {
                $('#arrows').hide('fast');
                $('#Destinations').hide('fast');
            }
        };
        ManageCategoriesListing.prototype.saveListing = function () {
            var _this = this;
            this.btnSaveListing.prop('disabled', true);
            R.vo.saveCatDest(function (res) {
                return _this.onSaveCatDest(res);
            });
        };
        ManageCategoriesListing.prototype.onSaveCatDest = function (res) {
            this.haveChanges = false;
            R.vo.deleteChanges();
        };


        Object.defineProperty(ManageCategoriesListing.prototype, "haveChanges", {
            get: function () {
                return this._haveChanges;
            },
            set: function (b) {
                if (b) {
                    this.btnSaveListing.prop('disabled', false);
                    // this.btnSaveListing.animate({
                    //    fontSize: '1.5em'
                    //  }, 2000);
                } else {
                    this.btnSaveListing.prop('disabled', true);
                }
                this._haveChanges = b;
            },
            enumerable: true,
            configurable: true
        });

        ManageCategoriesListing.prototype.removeFromListing = function () {
            if (!this.haveChanges) {
                this.haveChanges = true;
            }
            var lst = this.lstDests.children('.selected').removeClass('selected');
            var cat = this.cat.catid;
            $(lst).each(function (id, el) {
                var num = Number($(el).data('id'));
                if (!isNaN(num))
                    R.vo.removeCategory(num, cat);
            });
            lst.remove();
            this.btnRemove.prop('disabled', true);
            //this.destsList.filterByCat(cat);
        };
        ManageCategoriesListing.prototype.addToListing = function () {
            if (!this.haveChanges) {
                this.btnSaveListing.prop('disabled', false);
                this.haveChanges = true;
            }

            /////////////////////////////////////////////
            var lst = this.destsList.getSelected();
            var cat = this.cat.catid;
            $(lst).each(function (id, el) {
                var num = $(el).data('id');
                if (!isNaN(num))
                    R.vo.addCategory(num, cat);
            });

            this.addListing(lst);
            //this.updateCat();
        };

        /*
        private updateCat(): void {
        var out: string = '';
        var total: number;
        this.lstDests.children().each(function (ind, val) { total = ind; out += val.getAttribute('data-id') + ','; });
        
        this.cat.dests = out;
        R.vo.eraseCat(this.cat);
        }
        */
        ManageCategoriesListing.prototype.onCatChange = function (cat) {
            this.showAll.prop('disabled', false);
            this.btnRemove.prop('disabled', true);
            if (cat.enable != 1)
                this.reset();
else
                this.setCategory(cat);
        };

        ManageCategoriesListing.prototype.onSelected = function (evt) {
            if (evt.ctrlKey) {
                this.multy = true;
                $(evt.currentTarget).toggleClass('selected');
            } else if (evt.shiftKey) {
            } else {
                if (this.multy)
                    this.lstDests.children().removeClass('selected');
                this.multy = false;
                if (this.selectedItem)
                    this.selectedItem.removeClass('selected');
                this.selectedItem = $(evt.currentTarget).addClass('selected');
            }
            this.btnRemove.prop('disabled', false);
            //if (this.onChange) this.onChange(this._data[$(evt.currentTarget).data('id')]);
        };
        ManageCategoriesListing.prototype.onSaveClicked = function (evt) {
            var _this = this;
            R.connector.updateCategory(function (resp) {
                return _this.onSave(resp);
            }, this.cat);
        };
        ManageCategoriesListing.prototype.onSave = function (resp) {
        };
        return ManageCategoriesListing;
    })();
    lists.ManageCategoriesListing = ManageCategoriesListing;
})(lists || (lists = {}));

var manageCategoriesListing = new lists.ManageCategoriesListing();
