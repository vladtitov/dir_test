/**
 * Created by VladHome on 6/7/2015.
 */
/// <reference path="../RegA.ts" />
/// <reference path="../../typing/jquery.d.ts" />
var uplight;
(function (uplight) {
    var AdminMenu = (function () {
        function AdminMenu(view) {
            this.R = uplight.RegA.getInstance();
            if (view.length)
                this.init(view);
            this.btnOn = $('#menu-on').hide();
        }
        AdminMenu.prototype.init = function (view) {
            var _this = this;
            this.content = view.find('[data-id=content]:first');
            view.find('[data-id=btnMenu]:first').on(CLICK, function () {
                _this.toggle();
            });
            this.content.find('[data-id=btnClose]').click(function () { _this.content.addClass('closed'); });
        };
        AdminMenu.prototype.toggle = function () {
            if (this.content.hasClass('closed'))
                this.content.removeClass('closed');
            else
                this.content.addClass('closed');
        };
        return AdminMenu;
    }());
    uplight.AdminMenu = AdminMenu;
})(uplight || (uplight = {}));
//# sourceMappingURL=Menu.js.map