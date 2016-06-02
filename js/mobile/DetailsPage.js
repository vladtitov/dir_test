/// <reference path="../kiosk/registry.ts" />
/// <reference path="../typing/jquery.d.ts" />
var uplight;
(function (uplight) {
    var DetailsPage = (function () {
        function DetailsPage(view, connector, model) {
            this.view = view;
            this.connector = connector;
            this.model = model;
            this.content = view.find('[data-id=content]:first');
            this.hide();
            // this.details = $(id + ' [data-id=details]');
            // this.advanced = $(id + ' [data-id=advanced]');
        }
        DetailsPage.prototype.reset = function () {
        };
        DetailsPage.prototype.showDestination = function (id) {
            var dest = this.model.getDestById(id);
            console.log(dest);
            if (!dest.html)
                dest.html = this.renderDetails(dest);
            this.content.empty().append(dest.html);
            this.show();
        };
        DetailsPage.prototype.show = function () {
            if (this.isHidden) {
                this.isHidden = false;
                this.view.show('fast');
            }
        };
        DetailsPage.prototype.hide = function () {
            if (!this.isHidden) {
                this.isHidden = true;
                this.view.hide('fast');
            }
        };
        DetailsPage.prototype.renderTable = function () {
            var out = '';
            return out;
        };
        DetailsPage.prototype.renderDetails = function (dest) {
            var out = $('<div>').html('<p class="xlarge"><span class="left">' + dest.name + '</span><span class="right">' + dest.unit + '</span></p>');
            // if (dest.email || dest.phone || dest.website) {
            //  out += '<table><tbody>';
            // if (dest.phone) out += '<tr><td>Phone:  </td><td>' + dest.phone + '</td></tr>';
            // if (dest.email) out += '<tr><td>Email:  </td><td>' + dest.email + '</td></tr>';
            // if (dest.website) out += '<tr><td>Website:  </td><td>' + dest.website + '</td></tr>';
            // out += '</tbody></table>';
            //  }
            return out;
        };
        return DetailsPage;
    })();
    uplight.DetailsPage = DetailsPage;
})(uplight || (uplight = {}));
//# sourceMappingURL=DetailsPage.js.map