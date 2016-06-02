/**
 * Created by VladHome on 11/9/2015.
 */
/// <reference path="../../typing/jquery.d.ts" />
/// <reference path="../../typing/underscore.d.ts" />
/// <reference path="../RegA.ts" />
var uplight;
(function (uplight) {
    var VoRate = (function () {
        function VoRate(ar) {
            this.value = ar[0];
            this.rate = ar[1];
        }
        return VoRate;
    }());
    uplight.VoRate = VoRate;
    var TopSearches = (function () {
        function TopSearches(view, search, keywords) {
            this.view = view;
            var kws = this.parseData(keywords);
            var kbs = this.parseData(search);
            // console.log(kws);
            // console.log(kbs);
            // kws = _.sortBy(kws,'rate').reverse();
            //  kbs= _.sortBy(kbs,'rate').reverse();
            this.showKewords(kws);
            this.showKeyboard(kbs);
        }
        TopSearches.prototype.parseData = function (ar) {
            var out = [];
            for (var i = 0, n = ar.length; i < n; i++)
                out.push(new VoRate(ar[i]));
            return out;
        };
        TopSearches.prototype.showKewords = function (ar) {
            var out = '<table class="table"><thead><tr><td>Keyword</td><td>Times</td></tr></thead><tbody>';
            for (var i = 0, n = ar.length; i < n; i++) {
                out += '<tr><td> ' + ar[i].value + ' </td><td> ' + ar[i].rate + ' </td></tr>';
            }
            out += '</tbody></table>';
            this.view.find('[data-id=list1]:first').html(out);
        };
        TopSearches.prototype.showKeyboard = function (ar) {
            var out = '<table class="table"><thead><tr><td>Search</td><td>Times</td></tr></thead><tbody>';
            for (var i = 0, n = ar.length; i < n; i++) {
                out += '<tr><td> ' + ar[i].value + ' </td><td> ' + ar[i].rate + ' </td></tr>';
            }
            out += '</tbody></table>';
            this.view.find('[data-id=list2]:first').html(out);
        };
        return TopSearches;
    }());
    uplight.TopSearches = TopSearches;
    var TopDestinations = (function () {
        function TopDestinations(view, data) {
            this.view = view;
            this.data = data;
            this.render(data);
            // RegA.getInstance().connector.getDestinations().done((res:any)=>this.onDestinations(res))
        }
        TopDestinations.prototype.render = function (ar) {
            // console.log(ar);
            var dests = uplight.RegA.getInstance().model.getDestinationsIndexed();
            //console.log(dests);
            var out = '<thead><tr><td>Clicks</td><td>Name</td><td>Unit</td></tr></thead><tbody>';
            for (var i = 0, n = ar.length; i < n; i++) {
                var dest = dests[ar[i][0]];
                if (dest)
                    out += this.renderItem(dest, ar[i][1]);
                else
                    console.log('error no destination with id: ' + ar[i][0]);
            }
            out += '</tbody>';
            var list = $('<table>').addClass('table').html(out).appendTo(this.view.find('[data-id=list]:first'));
        };
        TopDestinations.prototype.renderItem = function (item, clicks) {
            return '<tr><td>' + clicks + '</td><td>' + item.name + '</td><td >' + item.unit + '</td></tr>';
        };
        return TopDestinations;
    }());
    uplight.TopDestinations = TopDestinations;
})(uplight || (uplight = {}));
//# sourceMappingURL=TopSearches.js.map