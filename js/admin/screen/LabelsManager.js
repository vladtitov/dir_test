/// <reference path="../../typing/jquery.d.ts" />
/// <reference path="../../typing/underscore.d.ts" />
/// <reference path="../RegA.ts" />
var uplight;
(function (uplight) {
    var LabelEditor = (function () {
        function LabelEditor() {
            var _this = this;
            console.log('labels manager');
            this.R = uplight.RegA.getInstance();
            this.view = $('#LabelEditor');
            this.select = this.view.find('[data-id=select]:first').change(function () { return _this.onSelectChange(); });
            this.view.find('[data-id=btnClose]').click(function () {
                _this.hide();
                _this.current = null;
                //  console.log('click');
            });
            this.img = this.view.find('[data-id=img]:first');
            this.text = this.view.find('[data-id=text]:first');
            this.btnSave = this.view.find('[data-id=btnSave]').on(CLICK, function () { return _this.onSaveClick(); });
            this.tiValue = this.view.find('[data-id=tiValue]:first');
            this.tiDescr = this.view.find('[data-id=tiDescr]:first');
            this.tiIndex = this.view.find('[data-id=tiIndex]:first');
            this.imgValue = this.view.find('[data-id=imgValue]:first');
            this.btnDelete = this.view.find('[data-id=btnDelete]:first').click(function () { return _this.onDeleteClick(); });
            this.btnUpload = this.view.find('[data-id=btnUpload]').change(function (evt) { return _this.onFileSelected(evt); });
        }
        /*setAvailable(ar){

        }*/
        LabelEditor.prototype.onSaveClick = function () {
            //  console.log('save');
            if (!this.current)
                return;
            var item = this.current;
            if (item.type == 'img') {
                item.value = this.imgValue.attr('src');
            }
            else {
                item.value = this.tiValue.val();
            }
            item.description = this.tiDescr.val();
            item.index = this.tiIndex.val();
            this.onSave(item);
        };
        LabelEditor.prototype.onFileSelected = function (evt) {
            var _this = this;
            var input = evt.target;
            var files = input.files;
            console.log(files);
            if (files.length) {
                var file = files[0];
                var form = new FormData();
                form.append('file', file);
                this.R.connector.uploadImage(form, 'assets', 'lbl').done(function (res) {
                    console.log(res);
                    if (res.success)
                        _this.imgValue.attr('src', res.result);
                });
            }
        };
        LabelEditor.prototype.setData = function (item) {
            this.current = item;
            return this;
        };
        LabelEditor.prototype.renderImage = function () {
            this.imgValue.attr('src', this.current.value);
            this.text.hide();
            this.img.show();
        };
        LabelEditor.prototype.renderText = function () {
            this.tiValue.val(this.current.value);
            this.img.hide();
            this.text.show();
        };
        LabelEditor.prototype.render = function () {
            var item = this.current;
            if (item.type == 'img')
                this.renderImage();
            else if (item.type == 'text')
                this.renderText();
            this.tiIndex.val(item.index);
            this.select.val(item.type);
            this.tiDescr.val(item.description);
            return this;
        };
        LabelEditor.prototype.hide = function () {
            this.view.hide();
        };
        LabelEditor.prototype.show = function () {
            this.view.show();
        };
        LabelEditor.prototype.onSelectChange = function () {
            this.current.type = this.select.val();
            this.render();
        };
        LabelEditor.prototype.onDeleteClick = function () {
            if (!this.current)
                return;
            var yes = confirm('You wont to delete ' + this.current.description + '?');
            if (yes) {
                this.onDelete(this.current);
                this.current = null;
                this.hide();
            }
        };
        return LabelEditor;
    }());
    uplight.LabelEditor = LabelEditor;
    var VOLabel = (function () {
        function VOLabel() {
        }
        return VOLabel;
    }());
    uplight.VOLabel = VOLabel;
    var LabelsManager = (function () {
        function LabelsManager(container) {
            var _this = this;
            container.load('htms/admin/LabelsManager.htm', function () { _this.init(); });
            this.R = uplight.RegA.getInstance();
        }
        LabelsManager.prototype.onAddClick = function () {
            this.selectedIndex = -1;
            var id = this.max + 1;
            var item = { index: 'index' + id, description: '', id: id, type: 'text', value: '' };
            this.editor.setData(item).render().show();
        };
        //available:string[]=['header','slogan','footer','list-header','list-footer','background','logo'];
        LabelsManager.prototype.init = function () {
            var _this = this;
            this.view = $('#LabelsManager');
            this.btnAdd = this.view.find('[data-id=btnAdd]').click(function () { return _this.onAddClick(); });
            var table = $('<table>').addClass('table').appendTo(this.view.find('[data-id=list]:first'));
            table.append('<tr><th>Description</th><th>Value</th><th>Edit</th></tr>');
            this.list = $('<tbody>').on(CLICK, 'tr .fa-edit', function (evt) { return _this.onEditClick($(evt.currentTarget)); }).appendTo(table);
            this.editor = new LabelEditor();
            this.editor.onSave = function (data) { return _this.saveItem(data); };
            this.editor.onDelete = function (data) { return _this.deleteItem(data); };
            if (this.R.isSuper) {
            }
            else
                this.view.find('[data-role=isSuper]').hide();
            this.refreshData();
        };
        LabelsManager.prototype.saveItem = function (data) {
            if (this.selectedIndex !== -1)
                this.data[this.selectedIndex] = data;
            else {
                var id = -1;
                var ar = this.data;
                for (var i = 0, n = ar.length; i < n; i++) {
                    var item = ar[i];
                    if (item.index == data.index) {
                        id = i;
                        break;
                    }
                }
                if (id !== -1)
                    this.data[i] = data;
                else
                    this.data.push(data);
            }
            this.saveLabels();
        };
        LabelsManager.prototype.deleteItem = function (item) {
            this.data.splice(this.selectedIndex, 1);
            this.saveLabels();
        };
        LabelsManager.prototype.refreshData = function () {
            var _this = this;
            //console.log(this.R.settings);
            this.R.connector.getData(this.R.settings.labels).done(function (res) {
                //   console.log(res);
                _this.data = JSON.parse(res);
                _this.renderLabels();
            });
        };
        LabelsManager.prototype.saveLabels = function () {
            var _this = this;
            this.R.connector.saveData(JSON.stringify(this.data), this.R.settings.labels).done(function (res) {
                _this.refreshData();
                if (res.success) {
                    _this.R.msg('File saved', _this.editor.btnSave);
                }
            });
        };
        LabelsManager.prototype.onSaveClick = function () {
            this.saveLabels();
        };
        LabelsManager.prototype.renderItem = function (item) {
            return '<tr  data-i="' + item.seq + '" class="' + item.type + '" ><td title="' + item.index + '">' + item.description + '</td><td class="value">' + ((item.type == 'img') ? '<img src="' + item.value + '"/>' : item.value) + '</td><td><span class=" btn fa fa-edit"></span></td></tr>';
        };
        LabelsManager.prototype.renderLabels = function () {
            var ar = this.data;
            // var avail= this.available;
            this.max = 0;
            var out = '';
            for (var i = 0, n = ar.length; i < n; i++) {
                var item = ar[i];
                item.seq = i;
                out += this.renderItem(item);
            }
            this.list.html(out);
            this.selectedIndex = -1;
            // this.editor.setAvailable(avail)
        };
        LabelsManager.prototype.onEditClick = function (el) {
            this.selectedIndex = -1;
            var row = el.parent().parent();
            var i = Number(row.data('i'));
            if (isNaN(i))
                return;
            var item = this.data[i];
            if (!item)
                return;
            this.selectedIndex = i;
            this.editor.setData(item).render().show();
        };
        return LabelsManager;
    }());
    uplight.LabelsManager = LabelsManager;
})(uplight || (uplight = {}));
//# sourceMappingURL=LabelsManager.js.map