/**
 * Created by VladHome on 7/7/2015.
 */
///<reference path="../RegA"/>
var uplight;
(function (uplight) {
    var DevicesStats = (function () {
        function DevicesStats(container) {
            var _this = this;
            this.container = container;
            this.filename = 'devices.json';
            this.connector = uplight.RegA.getInstance().connector;
            this.R = uplight.RegA.getInstance();
            var p1 = this.connector.getData('admin.json').done(function (res) {
                _this.admin = JSON.parse(res);
            });
            var p2 = container.load('htms/admin/DevicesEdit.htm');
            var p3 = this.connector.getServerTime().done(function (res) {
                _this.s_time = Number(res);
            });
            var p4 = this.loadData();
            $.when(p1, p2, p3, p4).then(function () { return _this.init(); });
        }
        DevicesStats.prototype.init = function () {
            var _this = this;
            console.log('admin', this.admin);
            this.view = $('#KiosksEdit');
            this.view.find('[data-id=btnAll]:first').on(CLICK, function () { return _this.onAllClick(); });
            this.view.find('[data-id=btnRestart]:first').on(CLICK, function () { return _this.onRestartClick(); });
            this.view.find('[data-id=btnDelete]:first').on(CLICK, function () { return _this.onDeleteClick(); });
            this.view.find('[data-id=btnCreate]:first').on(CLICK, function () { return _this.onCreateClick(); });
            this.view.find('[data-id=btnEdit]:first').on(CLICK, function () { return _this.onEditClick(); });
            this.view.find('[data-id=btnClose]').on(CLICK, function () { return _this.onCloseClick(); });
            this.view.find('[data-id=btnSave]:first').on(CLICK, function () { return _this.onSaveClick(); });
            this.editHeader = this.view.find('[data-id=editHeader]:first');
            this.selTemplate = this.view.find('[data-id=selTemplate]:first');
            this.tiName = this.view.find('[data-id=tiName]:first');
            this.list = this.view.find('[data-id=list]:first');
            this.makeTemplates(this.admin.templates);
            this.render();
        };
        DevicesStats.prototype.onSaveClick = function () {
            if (!this.selectedItem) {
                var k = new uplight.VODevice({});
                var ar = this.kiosks;
                var max = 1;
                for (var i = 0, n = ar.length; i < n; i++)
                    if (ar[i].id > max)
                        max = ar[i].id;
                k.id = max + 1;
                k.name = this.tiName.val();
                k.template = this.selTemplate.val();
                k.status = 'new';
                this.kiosks.push(k);
            }
            else {
                this.selectedItem.name = this.tiName.val();
                this.selectedItem.template = this.selTemplate.val();
            }
            this.save();
            this.hidePanel();
        };
        DevicesStats.prototype.hidePanel = function () {
            $('#kioskEditPanel').fadeOut();
        };
        DevicesStats.prototype.showPanel = function () {
            $('#kioskEditPanel').fadeIn();
        };
        DevicesStats.prototype.onCloseClick = function () {
            this.hidePanel();
        };
        DevicesStats.prototype.loadData = function () {
            var _this = this;
            return this.R.connector.getData(this.filename).done(function (res) { return _this.onData(res); });
        };
        DevicesStats.prototype.makeTemplates = function (ar) {
            var out = '';
            for (var i = 0, n = ar.length; i < n; i++) {
                out += '<option value="' + ar[i].value + '">' + ar[i].label + '</option>';
            }
            this.selTemplate.html(out);
        };
        DevicesStats.prototype.onData = function (res) {
            this.data = JSON.parse(res);
        };
        DevicesStats.prototype.render = function () {
            var s_time = this.s_time;
            var ar = this.data;
            var out = '';
            var ks = [];
            for (var i = 0, n = ar.length; i < n; i++) {
                var k = new uplight.VODevice(ar[i]);
                ks.push(k);
                out += this.createDevice(k, s_time);
            }
            this.kiosks = ks;
            this.list.html(out);
        };
        DevicesStats.prototype.onEditClick = function () {
            var ar = this.collectChecked();
            if (ar.length === 0) {
                alert('Please select checkbox in line you want to edit');
                return;
            }
            this.selectedItem = this.getKioskById(ar[0]);
            this.editHeader.text('Edit Kiosk');
            this.tiName.val(this.selectedItem.name);
            this.selTemplate.val(this.selectedItem.template);
            this.showPanel();
        };
        DevicesStats.prototype.onCreateClick = function () {
            this.selectedItem = null;
            this.editHeader.text('New Kiosk');
            this.tiName.val('');
            this.showPanel();
        };
        DevicesStats.prototype.onDataSaved = function (res) {
            var _this = this;
            console.log(res);
            this.loadData().then(function () { return _this.render(); });
        };
        DevicesStats.prototype.save = function () {
            var _this = this;
            this.R.connector.saveData(JSON.stringify(this.kiosks), this.filename).done(function (res) { return _this.onDataSaved(res); });
        };
        DevicesStats.prototype.collectChecked = function () {
            var out = [];
            this.view.find('table input').each(function (ind, el) {
                if ($(el).prop('checked'))
                    out.push($(el).data('id'));
            });
            return out;
        };
        DevicesStats.prototype.onRestartClick = function () {
            var ar = this.collectChecked();
            if (ar.length === 0) {
                alert('Please select checkbox in line you want to Restart');
                return;
            }
            if (confirm('You want to Restart ' + this.getKioskNames(ar).toString() + '?')) {
                this.restartKiosks(ar);
            }
        };
        DevicesStats.prototype.restartKiosks = function (ids) {
            var ar = this.kiosks;
            for (var i = ar.length - 1; i >= 0; i--) {
                if (ids.indexOf(ar[i].id) !== -1)
                    ar[i].status = 'restart';
            }
            this.save();
        };
        DevicesStats.prototype.getKioskById = function (id) {
            var ar = this.kiosks;
            for (var i = 0, n = ar.length; i < n; i++)
                if (ar[i].id == id)
                    return ar[i];
            return null;
        };
        DevicesStats.prototype.deleteKiosks = function (ids) {
            var ar = this.kiosks;
            for (var i = ar.length - 1; i >= 0; i--) {
                if (ids.indexOf(ar[i].id) !== -1)
                    ar.splice(i, 1);
            }
            this.save();
        };
        DevicesStats.prototype.getKioskNames = function (ar) {
            var out = [];
            for (var i = 0, n = ar.length; i < n; i++) {
                var k = this.getKioskById(ar[i]);
                if (k)
                    out.push(k.name);
            }
            return out;
        };
        DevicesStats.prototype.onDeleteClick = function () {
            var ar = this.collectChecked();
            if (ar.length === 0) {
                alert('Please select checkbox in line you want to delete');
                return;
            }
            if (confirm('You want to Delete ' + this.getKioskNames(ar).toString() + '?')) {
                this.deleteKiosks(ar);
            }
        };
        DevicesStats.prototype.onAllClick = function () {
            var isOn;
            this.view.find('table input').each(function (ind, el) {
                if (ind === 0)
                    isOn = !$(el).prop('checked');
                $(el).prop('checked', isOn);
            });
        };
        DevicesStats.prototype.createDevice = function (obj, s_time) {
            // console.log(obj);
            var timer = (obj.timer / 1000);
            timer += timer * 0.1;
            var last_server_time = obj.S_time;
            var delta = s_time - last_server_time;
            var isOK = 0;
            if (delta < timer)
                isOK = 1;
            return '<tr>' + '<td><input type="checkbox" data-id="' + obj.id + '" /> </td>' + '<td>' + obj.name + '</td>' + '<td><a target="_blank" href="' + obj.template + '?kiosk=' + obj.id + '&mode=preview" ><span class="fa fa-external-link"></span></a></td>' + '<td>' + obj.status + '</td>' + '<td>' + isOK + '</td>' + '<td>' + obj.ip + '</td>' + '<td>' + obj.ping + '</td>' + '<td class="text-right">' + new Date(obj.start_at * 1000).toLocaleString() + '</td>' + '<td class="text-right">' + new Date(obj.K_time * 1000).toLocaleString() + '</td>' + '</tr>';
        };
        return DevicesStats;
    })();
    uplight.DevicesStats = DevicesStats;
})(uplight || (uplight = {}));
//# sourceMappingURL=DevicesEdit.js.map