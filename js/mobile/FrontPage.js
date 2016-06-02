/**
 * Created by VladHome on 9/28/2015.
 */
/// <reference path="Mobile.ts" />
var uplight;
(function (uplight) {
    var FrontPage = (function () {
        function FrontPage(view) {
            this.view = view;
            this.list = view.find('[data-id=list]:first');
            this.pages = u_pages;
            // this.renderList();
        }
        FrontPage.prototype.hide = function () {
            this.view.hide();
        };
        FrontPage.prototype.show = function () {
            this.view.show();
        };
        FrontPage.prototype.getView = function () {
            return this.view;
        };
        FrontPage.prototype.init = function () {
            console.log(this.view);
        };
        FrontPage.prototype.renderList = function () {
            var ar = this.pages;
            var out = '<a href="#SearchDirectories" class="list-group-item"><span class="fa fa-search"></span> <span> Search Directory</span></a>';
            out += '<div id="PagesListFront">';
            for (var i = 0, n = ar.length; i < n; i++) {
                var item = ar[i];
                item.seq = i + 1;
                out += '<a href="#page/' + item.id + '/' + item.name + '" class="list-group-item"><span class="' + item.icon + '"></span> <span> ' + item.name + '</span></a>';
            }
            out += '</div>';
            this.list.html(out);
        };
        return FrontPage;
    })();
    uplight.FrontPage = FrontPage;
})(uplight || (uplight = {}));
//# sourceMappingURL=FrontPage.js.map