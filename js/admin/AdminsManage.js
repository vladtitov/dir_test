/**
 * Created by VladHome on 12/30/2015.
 */
///<reference path='../typing/jquery.d.ts' />
///<reference path='../typing/underscore.d.ts' />
///<reference path='../Lists.ts' />
var uplight;
(function (uplight) {
    var AdminsManage = (function () {
        function AdminsManage(container) {
            var _this = this;
            container.load('htms/TableEditor.htm', function () { return _this.init(); });
            container.on('DESTROY', function () { return _this.destroy(); });
        }
        AdminsManage.prototype.init = function () {
            var opt = {
                service: 'admin,users'
            };
            var table = new uplight.TableEditor($('[data-ctr=TableEditor]:first'), opt);
            table.renderItem = function (item, i) {
                return '<tr data-i="' + i + '"><td>' + item.name + '</td><td>' + item.email + '</td><td>' + item.username + '</td></tr>';
            };
        };
        AdminsManage.prototype.destroy = function () {
        };
        return AdminsManage;
    }());
    uplight.AdminsManage = AdminsManage;
})(uplight || (uplight = {}));
//# sourceMappingURL=AdminsManage.js.map