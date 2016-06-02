/**
 * Created by VladHome on 8/16/2015.
 */
/// <reference path="../RegA.ts" />
var uplight;
(function (uplight) {
    var GalleryEditor = (function () {
        function GalleryEditor() {
            this.R = uplight.RegA.getInstance();
            this.init();
        }
        GalleryEditor.prototype.init = function () {
            this.view = $('#Template [data-ctr=GalleryEditor]:first').clone();
            this.btnAdd = this.view.find('[data-id=btnAdd]:first');
            this.btnEdit = this.view.find('[data-id=btnEdit]:first');
            this.btnDelete = this.view.find('[data-id=btnDelete]:first');
            this.viewUploadAdd = this.view.find('[data-id=viewUploadAdd]:first');
            this.btnUplaodAdd = this.view.find('[data-id=btnUploadAdd]:first');
            this.viewUploadEdit = this.view.find('[data-id=viewUploadEdit]:first');
            this.btnUploadEdit = this.view.find('[data-id=btnUploadEdit]:first');
            this.btnClose = this.view.find('[data-id=btnClose]');
            //this.preview = this.view.find('[data-id=preview]:first');
            this.tiDelay = this.view.find('[data-id=delay]');
            this.$size = this.view.find('[data-id=size]');
            this.$title = this.view.find('[data-id=title]');
            this.btnSave = this.view.find('[data-id=btnSave]');
            this.name = this.view.find('[data-id=name]:first');
            //this.preview.width(dem[0]).height(dem[1]);
            this.list = $('<ul>').addClass('list');
            this.listView = this.view.find('.nano:first').append(this.list);
        };
        GalleryEditor.prototype.addListeners = function () {
            var _this = this;
            this.btnAdd.click(function () { return _this.onAddClick(); });
            this.btnEdit.click(function () { return _this.onEditClick(); });
            this.btnDelete.click(function () { return _this.onDeleteClick(); });
            this.btnUplaodAdd.change(function (evt) { return _this.onFileSelected(evt); });
            this.btnUploadEdit.change(function (evt) { return _this.onFileSelected(evt); });
            this.list.on(CLICK, 'li', function (evt) { return _this.selectImage(evt); });
            this.btnClose.click(function () { return _this.onCloseClick(); });
            this.btnSave.click(function () { return _this.onSaveClick(); });
        };
        GalleryEditor.prototype.destroy = function () {
            this.R = null;
        };
        GalleryEditor.prototype.appendTo = function (container) {
            this.view.appendTo(container);
            this.addListeners();
            return this.view;
        };
        GalleryEditor.prototype.setData = function (data) {
            this.data = data;
            this.gallery = data.gallery.slice();
        };
        GalleryEditor.prototype.getData = function () {
            var num = Number(this.tiDelay.val());
            if (isNaN(num) || num < 5)
                num = this.data.template.delay;
            this.data.props.delay = num;
            this.data.gallery = this.gallery;
            return this.data;
        };
        GalleryEditor.prototype.hide = function () {
        };
        GalleryEditor.prototype.onSaveClick = function () {
            if (this.R.isBusy)
                return;
            if (this.btnSave.hasClass(DISABLED))
                return;
            if (this.onSave)
                this.onSave(this.getData());
        };
        GalleryEditor.prototype.resetMode = function () {
            if (this.mode == 1)
                this.viewUploadAdd.addClass(HIDDEN);
            if (this.mode == 2)
                this.viewUploadEdit.addClass(HIDDEN);
            this.mode = 0;
        };
        GalleryEditor.prototype.render = function () {
            this.selected = null;
            this.$size.text(this.data.template.size);
            this.tiDelay.val(this.data.props.delay);
            this.$title.text(this.data.template.name);
            var out = '';
            var ar = this.gallery;
            for (var i = 0, n = ar.length; i < n; i++) {
                out += this.renderItem(ar[i], i);
            }
            this.list.html(out);
            this.checkSize();
        };
        GalleryEditor.prototype.renderItem = function (item, i) {
            return '<li data-i="' + i + '"><img src="' + item + '" /></li>';
        };
        GalleryEditor.prototype.checkSize = function () {
            var size = this.data.template.size;
            var ar = size.split('x');
            var W = Number(ar[0]);
            var H = Number(ar[1]);
            var O = 0;
            if (W / H > 1.2)
                O = 1;
            else if (W / H < 0.8)
                O = 2;
            this.list.children().children('img').each(function (ind, img) {
                var w = img.naturalWidth;
                var h = img.naturalHeight;
                var isWarn = false;
                if (Math.abs(W - w) > W / 10)
                    isWarn = true;
                else if (Math.abs(H - h) > h / 10)
                    isWarn = true;
                if (isWarn) {
                    $(img).addClass('atten');
                    $(img).attr('title', 'Demention is not correct ' + w + 'x' + h + ' where ' + size + ' reqired');
                }
            });
        };
        GalleryEditor.prototype.onUploadResult = function (res) {
            this.R.resetBusy();
            if (res.success) {
                if (this.selected) {
                    var i = Number(this.selected.data('i'));
                    if (isNaN(i)) {
                        this.R.connector.error('GalleryEditor.onUploadResult i is not a number ');
                        console.log('ERROR i is not a number');
                        return;
                    }
                    this.gallery[i] = res.result;
                }
                else
                    this.gallery.push(res.result);
                this.render();
            }
            else {
                this.R.connector.error('Error uplad file GalleryEditor ' + JSON.stringify(res));
                alert('error upload file');
            }
        };
        GalleryEditor.prototype.onFileSelected = function (evt) {
            var _this = this;
            var input = evt.target;
            var files = input.files;
            if (files.length) {
                var form = new FormData();
                var file = files[0];
                form.append('file', file);
                if (files[0].size < 2000000) {
                    this.R.wait();
                    this.R.connector.uploadImage(form, 'al', ('al_size_' + this.data.template.size)).done(function (res) { return _this.onUploadResult(res); });
                }
                else
                    alert('File should be less then 2 Megabite');
            }
            this.resetMode();
        };
        GalleryEditor.prototype.onAddClick = function () {
            if (this.R.isBusy)
                return;
            if (this.viewUploadAdd.hasClass(HIDDEN)) {
                this.resetMode();
                this.mode = 1;
                this.viewUploadAdd.removeClass(HIDDEN);
                this.resetSelected();
            }
            else
                this.resetMode();
        };
        GalleryEditor.prototype.onEditClick = function () {
            if (this.R.isBusy)
                return;
            if (this.viewUploadEdit.hasClass(HIDDEN)) {
                this.resetMode();
                if (!this.selected)
                    return;
                this.mode = 2;
                this.viewUploadEdit.removeClass(HIDDEN);
            }
            else
                this.resetMode();
        };
        GalleryEditor.prototype.onDeleteClick = function () {
            if (this.R.isBusy)
                return;
            this.resetMode();
            if (!this.selected)
                return;
            var i = Number(this.selected.data('i'));
            if (isNaN(i))
                return;
            if (confirm('You want to remove selected image from list?')) {
                this.gallery.splice(i, 1);
                this.selected = null;
                this.render();
            }
        };
        GalleryEditor.prototype.resetSelected = function () {
            if (this.selected)
                this.selected.removeClass(SELECTED);
            this.selected = null;
        };
        GalleryEditor.prototype.selectImage = function (evt) {
            this.resetMode();
            this.resetSelected();
            var $el = $(evt.currentTarget);
            var i = Number($el.data('i'));
            if (isNaN(i))
                return;
            $el.addClass(SELECTED);
            this.selected = $el;
        };
        GalleryEditor.prototype.onCloseClick = function () {
            if (this.onClose)
                this.onClose();
        };
        return GalleryEditor;
    }());
    uplight.GalleryEditor = GalleryEditor;
})(uplight || (uplight = {}));
//# sourceMappingURL=GalleryEditor.js.map