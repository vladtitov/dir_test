/// <reference path="../kiosk/registry.ts" />
/// <reference path="../typing/jquery.d.ts" />
var uplight;
(function (uplight) {
    var InfoPageMobile = (function () {
        function InfoPageMobile(item) {
            this.item = item;
        }
        InfoPageMobile.prototype.getView = function () {
            if (!this.view)
                this.view = $('<div>').addClass('container').load(this.item.url);
            return this.view;
        };
        return InfoPageMobile;
    })();
    uplight.InfoPageMobile = InfoPageMobile;
})(uplight || (uplight = {}));
//# sourceMappingURL=infopage.js.map