/// <reference path="../Registry.ts" />
var uplight;
(function (uplight) {
    var Details = (function () {
        function Details(view, connector) {
            this.cache = {};
            this.view = view;
            this.content = $('<div>').addClass('details').appendTo(view);
            this.pages = $('<div>').addClass('pages').appendTo(view);
        }
        Details.prototype.setData = function (dest) {
            this.current = dest;
            //if(dest.details)   this.content.html(this.renderDetails(dest.details))
            //this.pages.empty();
            //if(dest.pages) this.loadPages(dest.pages);
        };
        Details.prototype.renderItem = function (item) {
            return '<tr><td>' + item.label + '</td><td>' + item.value + '</td></tr>';
        };
        Details.prototype.renderDetails = function (dest) {
            var details = JSON.parse(dest);
            var out = '<table><tbody>';
            var ar = details;
            for (var i = 0, n = ar.length; i < n; i++) {
                out += this.renderItem(ar[i]);
            }
            out += '</tbody></table>';
            return out;
        };
        Details.prototype.loadPages = function (source) {
            this.pages.load(source, function () {
                console.log(' on pages loaded');
            });
        };
        return Details;
    })();
    uplight.Details = Details;
})(uplight || (uplight = {}));
//# sourceMappingURL=Details.js.map