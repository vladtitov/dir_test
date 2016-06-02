/**
 * Created by VladHome on 12/30/2015.
 */
///<reference path='typing/jquery.d.ts' />
///<reference path='typing/underscore.d.ts' />
///<reference path='Utils.ts' />
///<reference path='Forms.ts' />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var uplight;
(function (uplight) {
    var CLICK = CLICK || 'click';
    var SELECTED = SELECTED || 'selected';
    var TableEditor = (function (_super) {
        __extends(TableEditor, _super);
        function TableEditor($view, options, name) {
            _super.call(this, $view, name);
            this.btn_edit_id = '[data-id=btnEdit]';
            this.btn_close_id = '[data-id=btnClose]';
            this.service = 'service';
            this.getall = 'get_all';
            this.getone = 'get_one';
            this.delete = 'delete';
            this.update = 'update';
            this.insert = 'insert';
            this.header_id = '[data-id=thead]';
            this.list_id = '[data-id=tbody]';
            this.num_records_id = '[data-id=num_records]';
            this.edit_view_id = '[data-id=edit-view]';
            this.delete_view_id = '[data-id=DeleteItem]';
            this.auto_start = true;
            for (var str in options)
                this[str] = options[str];
            this.init();
            this.onInit();
        }
        TableEditor.prototype.init = function () {
            var _this = this;
            var $view = this.$view;
            this.conn = new uplight.Connect(this.service, this.name);
            this.$btnAdd = $view.find('[data-id=btnAdd]').click(function () { return _this.onAddClick(); });
            this.$btnEdit = $view.find(this.btn_edit_id).click(function () { return _this.onEditClick(); });
            this.$btnDelete = $view.find('[data-id=btnDelete]').click(function () { return _this.onDeleteClick(); });
            this.$btnClose = $view.find('[data-id=btnClose]').click(function () { return _this.onCloseClick(); });
            this.$list = $view.find(this.list_id).on(CLICK, 'tr', function (evt) { return _this.onListClick(evt); });
            this.$header = $view.find(this.header_id);
            this.$num_records = $view.find(this.num_records_id);
            // this.$deleteView = $view.find(this.delete_view_id);
            // this.$deleteView.find('[data-id=btnSave]').click(()=>this.onDeleteConfirmed())
            //this.$deleteView.find(this.btn_close_id).click(()=>this.hideDelete());
            if (this.auto_start)
                this.loadData();
        };
        TableEditor.prototype.onInit = function () {
        };
        TableEditor.prototype.onData = function (s) {
            // console.log(s);
            if (typeof s == 'string') {
                try {
                    var res = s;
                }
                catch (e) {
                    console.log(e);
                    return;
                }
            }
            else
                res = s;
            this.data = res;
            this.render();
        };
        TableEditor.prototype.renderHeader = function (header) {
            this.$header.html(header);
        };
        TableEditor.prototype.renderItem = function (item, i) {
            return '<tr data-i="' + i + '"><td><small>' + item.id + '</small></td><td>' + item.name + '</td><td>' + item.description + '</td></tr>';
        };
        TableEditor.prototype.onRendered = function () {
        };
        TableEditor.prototype.render = function () {
            var ar = this.data;
            var out = '';
            for (var i = 0, n = ar.length; i < n; i++)
                out += this.renderItem(ar[i], i);
            this.$list.html(out);
            this.$num_records.text(n);
            this.onRendered();
        };
        TableEditor.prototype.onListClick = function (evt) {
            var $el = $(evt.currentTarget);
            var i = Number($el.data('i'));
            console.log(i);
            if (isNaN(i))
                return;
            this.deselect();
            this.$selected = $el.addClass(SELECTED);
            this.selectedItem = this.data[i];
            this.selectedIndex = $el.index();
            if (this.onSelect)
                this.onSelect(this.selectedItem);
        };
        TableEditor.prototype.destroy = function () {
            this.onSelect = null;
            this.data = null;
        };
        TableEditor.prototype.deselect = function () {
            if (this.$selected) {
                this.$selected.removeClass(SELECTED);
                this.selectedItem = null;
            }
        };
        TableEditor.prototype.onAdd = function () {
            var _this = this;
            if (!this.insertEditor) {
                this.insertEditor = new uplight.ModalForm(this.$view.find('[data-id=AddItem]:first'), this.service + '.insert', 'AddItem');
                this.insertEditor.init();
                this.insertEditor.onComplete = function () {
                    _this.insertEditor.hide();
                    _this.loadData();
                };
            }
            if (this.insertTitle)
                this.insertEditor.setTitle(this.insertTitle);
            else
                this.insertEditor.setTitle('New record');
            this.insertEditor.clear();
            this.insertEditor.show();
        };
        TableEditor.prototype.onAddClick = function () {
            this.deselect();
            this.selectedItem = null;
            this.selectedIndex = -1;
            this.onAdd();
        };
        TableEditor.prototype.onEdit = function (item) {
            var _this = this;
            if (!this.updateEditor) {
                this.updateEditor = new uplight.ModalForm(this.$view.find('[data-id=AddItem]:first'), this.service + '.update', 'EditItem');
                this.updateEditor.init();
                this.updateEditor.onComplete = function () {
                    _this.updateEditor.hide();
                    _this.loadData();
                };
            }
            if (this.updateTitle)
                this.updateEditor.setTitle(this.updateTitle);
            else
                this.updateEditor.setTitle('Update record');
            this.updateEditor.setData(this.selectedItem);
            this.updateEditor.show();
        };
        TableEditor.prototype.showEdit = function () {
            if (!this.selectedItem)
                return;
            this.onEdit(this.selectedItem);
            //this.editItem.setItem(this.selectedItem);
            // this.editItem.$view.show();
        };
        TableEditor.prototype.onEditClick = function () {
            this.showEdit();
        };
        TableEditor.prototype.onEditCloseClick = function () {
            if (this.selectedIndex == -1)
                this.selectedItem = null;
            this.hideEditView();
        };
        TableEditor.prototype.hideEditView = function () {
            //this.editItem.$view.hide();
        };
        TableEditor.prototype.hideDelete = function () {
            this.$deleteView.hide();
        };
        TableEditor.prototype.onDeleteShow = function () {
        };
        TableEditor.prototype.showDelete = function () {
            if (!this.selectedItem)
                return;
            var name = this.selectedItem.name || '';
            this.$deleteView.find('[data-id=message]').html('You want to delete ' + name + '?');
            this.$deleteView.show();
        };
        TableEditor.prototype.onDeleteClick = function () {
            var _this = this;
            if (!this.deleteEditor) {
                this.deleteEditor = new uplight.ModalForm(this.$view.find('[data-id=DeleteItem]:first'), this.service + '.delete', 'DeleteItem');
                this.deleteEditor.init();
                this.deleteEditor.onComplete = function () {
                    _this.deleteEditor.hide();
                    _this.loadData();
                };
            }
            console.log(this.deleteEditor.$view);
            this.deleteEditor.setData(this.selectedItem);
            this.deleteEditor.show();
        };
        TableEditor.prototype.onDeleteConfirmed = function () {
            console.log('delete confirmed');
            this.$deleteView.hide();
            this.deleteRecord();
            this.deselect();
            this.selectedIndex = -1;
        };
        TableEditor.prototype.onSaveResult = function (s) {
            var res = JSON.parse(s);
            if (res.success == 'inserted') {
                var id = Number(res.result);
                // this.editItem.setItem({index:index});
                uplight.Utils.message('New record inserted', this.$btnSave);
            }
            else if (res.success == 'updated') {
            }
        };
        TableEditor.prototype.saveRecord = function (item) {
            // $.post(this.service+'?a='+this.service_id+'.'+this.update,item).done((s)=>this.onSaveResult(s));
        };
        TableEditor.prototype.onDeleteResult = function (s) {
            this.loadData();
        };
        TableEditor.prototype.deleteRecord = function () {
            // $.get(this.service+'?a='+this.service_id+'.'+this.delete+'&id='+this.selectedItem.id).done((s)=>this.onDeleteResult(s));
        };
        TableEditor.prototype.onSaveClick = function () {
            // var item:any = this.editItem.getElement();
            // console.log(item);
            //this.saveRecord(item);
        };
        TableEditor.prototype.onCloseClick = function () {
        };
        TableEditor.prototype.loadData = function () {
            var _this = this;
            this.conn.get(this.getall).done(function (s) { return _this.onData(s); });
        };
        return TableEditor;
    }(uplight.DisplayObject));
    uplight.TableEditor = TableEditor;
})(uplight || (uplight = {}));
//# sourceMappingURL=Lists.js.map