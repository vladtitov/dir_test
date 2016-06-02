/**
 * Created by VladHome on 7/2/2015.
 */
/// <reference path="../RegA.ts" />
var uplight;
(function (uplight) {
    var DetailsImages = (function () {
        function DetailsImages(view) {
            var _this = this;
            this.R = uplight.RegA.getInstance();
            this.list = view.find('[data-id=list]:first');
            this.list.on(CLICK, 'a', function (evt) { return _this.onItemClick(evt); });
            this.view = view;
            view.find('[data-id=btnCancel]:first').click(function () { if (_this.onCancel)
                _this.onCancel(); });
            view.find('[data-id=btnClose]:first').click(function () {
                console.log('close');
                if (_this.onClose)
                    _this.onClose();
            });
            view.find('[data-id=btnSave]:first').click(function () {
                _this.current.imgs = _this.data ? _this.data.toString() : '';
                if (_this.onSave)
                    _this.onSave();
            });
            ;
            this.uploadAdd = view.find('[data-id=uploadAdd]:first').change(function (evt) { return _this.onFileSelected(evt); });
            this.uploadEdit = view.find('[data-id=uploadEdit]:first').change(function (evt) { return _this.onFileSelected(evt); });
            this.btnAdd = view.find('[data-id=btnAdd]:first').on(CLICK, function () { return _this.onAddClick(); });
            this.btnEdit = view.find('[data-id=btnEdit]:first').on(CLICK, function () { return _this.onEditClick(); });
            this.btnDel = view.find('[data-id=btnDel]:first').on(CLICK, function () { return _this.onDeleteClick(); });
            this.preview = view.find('[data-id=preview]:first');
            this.title = view.find('[data-id=title]:first');
        }
        DetailsImages.prototype.hide = function () {
            this.view.hide();
            this.preview.empty();
            this.list.empty();
        };
        DetailsImages.prototype.show = function () {
            this.view.show();
        };
        DetailsImages.prototype.setData = function (vo) {
            this.current = vo;
            this.data = vo.imgs.length ? vo.imgs.split(',') : [];
            //  this.resetData();
            this.resetButtons();
        };
        DetailsImages.prototype.getData = function () {
            return this.data;
        };
        DetailsImages.prototype.getDeleted = function () {
            return this.dataDelete;
        };
        DetailsImages.prototype.onItemClick = function (evt) {
            this.resetButtons();
            var el = $(evt.currentTarget);
            var i = Number(el.data('i'));
            if (isNaN(i))
                return;
            this.selectedItem = this.data[i];
            if (!this.selectedItem) {
                this.data.splice(i, 1);
                this.render();
                return;
            }
            if (this.selected)
                this.selected.removeClass(SELECTED);
            el.addClass(SELECTED);
            this.selected = el;
            this.preview.empty();
            this.preview.html(el.clone());
            this.mode = '';
        };
        DetailsImages.prototype.renderItem = function (str, i) {
            var img = '<img class="item"   src="' + str + '"/>';
            return '<a data-i="' + i + '" >' + img + '</li>';
        };
        DetailsImages.prototype.render = function () {
            this.title.html(this.current.name + ' &nbsp;&nbsp;unit:' + this.current.unit);
            var ar = this.data;
            if (!ar) {
                this.list.html('');
                return;
            }
            ;
            var out = '';
            for (var i = 0, n = ar.length; i < n; i++) {
                out += this.renderItem(ar[i], i);
            }
            this.list.html(out);
        };
        DetailsImages.prototype.resetButtons = function () {
            this.uploadEdit.addClass(HIDDEN);
            this.uploadAdd.addClass(HIDDEN);
        };
        DetailsImages.prototype.onAddClick = function () {
            this.resetButtons();
            if (this.mode == 'add') {
                this.mode = '';
                return;
            }
            this.uploadAdd.removeClass(HIDDEN);
            this.mode = 'add';
            this.preview.empty();
            if (this.selected)
                this.selected.removeClass(SELECTED);
            this.selected = null;
            this.selectedItem = null;
        };
        DetailsImages.prototype.onEditClick = function () {
            this.resetButtons();
            if (this.mode == 'update') {
                this.mode = '';
                return;
            }
            if (!this.selectedItem) {
                this.mode = '';
                return;
            }
            this.uploadEdit.removeClass(HIDDEN);
            this.mode = 'update';
        };
        DetailsImages.prototype.onUploadResult = function (res) {
            console.log(res);
            if (res.success) {
                if (this.mode === 'add') {
                    if (!this.data)
                        this.data = [];
                    this.data.push(res.result);
                    var item = this.renderItem(res.result, this.data.length - 1);
                    this.preview.empty();
                    this.preview.html(item);
                    this.list.append(item);
                    this.mode = '';
                }
                else if (this.mode === 'update') {
                    var i = Number(this.selected.data('i'));
                    this.data[i] = res.result;
                    this.selectedItem = this.data[i];
                    this.render();
                    var item = this.renderItem(this.selectedItem, i);
                    this.preview.empty();
                    this.preview.html(item);
                    this.mode = '';
                }
            }
        };
        DetailsImages.prototype.onFileSelected = function (evt) {
            var _this = this;
            this.resetButtons();
            var input = evt.target;
            var files = input.files;
            if (files.length) {
                var form = new FormData();
                form.append('file', files[0]);
                this.R.connector.uploadImage(form, 'details', 'gal_' + this.current.uid).done(function (res) { return _this.onUploadResult(res); });
            }
        };
        DetailsImages.prototype.onDeleteClick = function () {
            this.resetButtons();
            this.mode = '';
            if (!this.selectedItem)
                return;
            var isDel = confirm('You want to delete selected Image from records?');
            if (isDel) {
                var ind = this.data.indexOf(this.selectedItem);
                if (!this.dataDelete)
                    this.dataDelete = [];
                this.dataDelete.push(this.data.splice(ind, 1)[0]);
                this.render();
                this.preview.empty();
            }
        };
        DetailsImages.prototype.onFileChoosen = function (input) {
            var files = input.files;
            if (files.length) {
                var form = new FormData();
                form.append('file', files[0]);
            }
        };
        return DetailsImages;
    }());
    uplight.DetailsImages = DetailsImages;
})(uplight || (uplight = {}));
//# sourceMappingURL=DetailsImages.js.map