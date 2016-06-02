/**
 * Created by VladHome on 11/1/2015.
 */
/// <reference path="../DirsAdmin.ts" />
var uplight;
(function (uplight) {
    var Navigation = (function () {
        function Navigation(view) {
            var _this = this;
            this.view = view;
            //dropdown-toggle
            $(document).click(function (evt) { return _this.onClick(evt); });
        }
        Navigation.prototype.onClick = function (evt) {
            var el = $(evt.target);
            if (this.selected) {
                this.selected.removeClass('selected');
                this.selected = null;
            }
            if (el.hasClass('dropdown-toggle')) {
                el = el.parent();
                el.addClass('selected');
                this.selected = el;
            }
        };
        return Navigation;
    }());
    uplight.Navigation = Navigation;
})(uplight || (uplight = {}));
//# sourceMappingURL=Navigation.js.map