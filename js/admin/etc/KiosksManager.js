/**
 * Created by VladHome on 11/23/2015.
 */
/// <reference path="../RegA.ts" />
/// <reference path="../../typing/jquery.d.ts" />
/// <reference path="../../typing/underscore.d.ts" />
var uplight;
(function (uplight) {
    var VOTemplate = (function () {
        function VOTemplate() {
        }
        return VOTemplate;
    }());
    uplight.VOTemplate = VOTemplate;
    var VOKiosks = (function () {
        function VOKiosks(obj) {
            for (var str in obj)
                this[str] = obj[str];
        }
        return VOKiosks;
    }());
    uplight.VOKiosks = VOKiosks;
    var KiosksManager = (function () {
        function KiosksManager(container) {
            var _this = this;
            this.ID = 'uplight.KiosksManager';
            this.$view = $('<div>').appendTo(container).load('htms/admin/KiosksManager.htm', function () { return _this.init(); });
            this.kiosks = new VOKiosks(uplight.RegA.getInstance().admin.kiosks);
        }
        KiosksManager.prototype.detach = function () {
            this.$view.detach();
        };
        KiosksManager.prototype.appendTo = function (cont) {
            this.$view.appendTo(cont);
            return this;
        };
        KiosksManager.prototype.getName = function () {
            return this.ID;
        };
        KiosksManager.prototype.destroy = function () {
        };
        KiosksManager.prototype.init = function () {
            var _this = this;
            this.btnAdd = this.$view.find('[data-id=btnAdd]:first').click(function () { return _this.onAddClicked(); });
            this.btnEdit = this.$view.find('[data-id=btnEdit]:first').click(function () { return _this.onEditClicked(); });
            this.btnDelete = this.$view.find('[data-id=btnDelete]').click(function () { return _this.onDelClicked(); });
            this.btnSave = this.$view.find('[data-id=btnSave]').click(function () { return _this.onSaveClicked(); });
            this.btnClose = this.$view.find('[data-id=btnClose]').click(function () { return _this.onCloseClicked(); });
            this.$list = this.$view.find('[data-id=list]:first').on(CLICK, 'li', function (evt) { return _this.onListClicked(evt); });
            this.$select = this.$view.find('[data-id=selectKisosk]:first').change(function () { return _this.onSelectChanged(); });
            //  this.$descr =  this.$view.find('[data-id=descr]:first')
            this.$editor = this.$view.find('[data-id=editor]:first');
            this.$index = this.$view.find('[data-id=kioskindex]:first');
            this.$name = this.$view.find('[data-id=kioskname]:first');
            this.$title = this.$view.find('[data-id=title]:first');
            this.renderSelectKiosk();
            this.loadData();
        };
        KiosksManager.prototype.onCloseClicked = function () {
            this.hideEditor();
        };
        KiosksManager.prototype.getKioskTypeById = function (id) {
            var ar = this.kiosks.templates;
            for (var i = 0, n = ar.length; i < n; i++) {
                if (ar[i].id == id)
                    return ar[i];
            }
            return null;
        };
        KiosksManager.prototype.renderSelectKiosk = function () {
            var ar = this.kiosks.templates;
            var out = '';
            for (var i = 0, n = ar.length; i < n; i++) {
                if (ar[i].type === 'kiosk')
                    out += '<option value="' + ar[i].id + '">' + ar[i].descr + '</option>';
            }
            this.$select.html(out);
        };
        KiosksManager.prototype.hideEditor = function () {
            if (this.isEditor) {
                this.isEditor = false;
                this.$editor.fadeOut();
            }
        };
        KiosksManager.prototype.onSelectChanged = function () {
            console.log(this.$select.val());
        };
        KiosksManager.prototype.showEditor = function () {
            this.isEditor = true;
            if (!this.selectedItem)
                return;
            if (this.selectedItem.id !== 0) {
                this.$select.val(this.selectedItem.typeid);
                this.$index.text(this.selectedItem.type + this.selectedItem.id);
                this.$name.text(this.selectedItem.name);
                this.$title.text('Edit kiosk');
            }
            else {
                this.deselect();
                this.max++;
                this.$index.text(this.selectedItem.type + this.max);
                this.$name.text('');
                this.$title.text('Create kiosk');
            }
            this.$editor.fadeIn();
            this.$name.focus();
        };
        KiosksManager.prototype.deselect = function () {
            if (this.$selected)
                this.$selected.removeClass(SELECTED);
            this.$selected = null;
        };
        KiosksManager.prototype.onListClicked = function (evt) {
            var $el = $(evt.currentTarget);
            var i = Number($el.data('i'));
            if (isNaN(i))
                return;
            this.deselect();
            this.$selected = $el;
            this.$selected.addClass(SELECTED);
            var k = this.data[i];
            this.selectedItem = k;
        };
        KiosksManager.prototype.onAddClicked = function () {
            this.selectedItem = new uplight.VODevice({ id: 0, type: 'kiosk' });
            this.selectedItem.tymer = this.kiosks.timer;
            this.selectedItem.maxdelay = this.kiosks.maxdelay;
            this.showEditor();
        };
        KiosksManager.prototype.onEditClicked = function () {
            if (!this.selectedItem)
                return;
            this.showEditor();
        };
        KiosksManager.prototype.onDelete = function () {
            uplight.RegA.getInstance().confirm.hide();
            var ar = this.data;
            for (var i = 0, n = ar.length; i < n; i++) {
                if (ar[i].id == this.selectedItem.id)
                    this.data.splice(i, 1);
            }
            this.selectedItem = null;
            this.save();
        };
        KiosksManager.prototype.onDelClicked = function () {
            var _this = this;
            if (!this.selectedItem)
                return;
            uplight.RegA.getInstance().confirm.show('Delete Device', 'You want to delete device: ' + this.selectedItem.name + '?', function () { return _this.onDelete(); }, null);
        };
        KiosksManager.prototype.onSave = function (res) {
            this.loadData();
            if (res.success)
                uplight.RegA.getInstance().msg('Device Saved', this.btnSave);
            else {
                uplight.RegA.getInstance().connector.error('KioskManager ' + res.error + ' ' + res.result);
                alert('Error was send to administarator');
            }
        };
        KiosksManager.prototype.save = function () {
            var _this = this;
            uplight.RegA.getInstance().connector.saveData(JSON.stringify(this.data), 'devices.json').done(function (data) { return _this.onSave(data); });
        };
        KiosksManager.prototype.onSaveClicked = function () {
            this.selectedItem.name = this.$name.text();
            this.selectedItem.typeid = Number(this.$select.val());
            var k = this.getKioskTypeById(this.selectedItem.typeid);
            this.selectedItem.template = k.url + '?id=' + this.$index.text();
            if (this.selectedItem.id === 0) {
                this.selectedItem.id = this.max;
                this.data.push(this.selectedItem);
            }
            this.save();
        };
        KiosksManager.prototype.onData = function (data) {
            //  console.log(data);
            this.max = 0;
            var ar = JSON.parse(data);
            var out = [];
            for (var i = 0, n = ar.length; i < n; i++) {
                var k = new uplight.VODevice(ar[i]);
                var num = Number(k.id);
                if (this.max < num)
                    this.max = num;
                out.push(k);
            }
            console.log(out);
            this.data = out;
            this.renderList();
        };
        KiosksManager.prototype.loadData = function () {
            var _this = this;
            uplight.RegA.getInstance().connector.getData('devices.json').done(function (data) { return _this.onData(data); });
        };
        KiosksManager.prototype.renderList = function () {
            var ar = this.data;
            var out = '<ul>';
            for (var i = 0, n = ar.length; i < n; i++) {
                var item = ar[i];
                if (item.type !== 'kiosk')
                    continue;
                var k = this.getKioskTypeById(item.typeid);
                out += '<li data-i="' + i + '" class="list-group-item"></span> <span> ' + item.name + '</span><span class="descr">' + k.descr + '</span><a target="_blank" href="' + item.template + '" class="pull-right"><span class="fa fa-external-link"></span></a></li>';
            }
            out += '</ul>';
            this.$list.html(out);
        };
        return KiosksManager;
    }());
    uplight.KiosksManager = KiosksManager;
})(uplight || (uplight = {}));
//# sourceMappingURL=KiosksManager.js.map