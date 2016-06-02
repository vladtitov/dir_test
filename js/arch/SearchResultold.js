/// <reference path="../kiosk/Registry.ts" />
/// <reference path="../../libs/typing/jquery.d.ts" />
var kiosk;
(function (kiosk) {
    var SearchResultold = (function () {
        function SearchResultold(viewport, width) {
            this.viewport = viewport;
            this.width = width;
            this.cache = {};
            this.currentPattern = '';
            console.log('SearchResult width: ' + width);
            this.R = kiosk.Registry.getInstance();
            this.model = this.R.modelDests;
            // this.R.onKeyboardTyping = (res) => this.onKeyboardTyping(res);
            //viewport.onListClick = (evt) => this.onSearchResultClick(evt);
        }
        SearchResultold.prototype.getListByCatId = function (catid) {
            var id = 'c__' + catid;
            if (!this.cache[id])
                this.cache[id] = this.renderList(this.R.modelDests.getDestsByCat(catid), this.width - 10);
            return this.cache[id];
        };
        SearchResultold.prototype.filterView = function (pattern) {
            var id = '__' + pattern;
            if (!this.cache[id]) {
                var num = Number(pattern);
                var ar;
                if (isNaN(num))
                    ar = this.R.modelDests.getDestsByPattern(pattern);
                else
                    ar = this.R.modelDests.getDestsByUnit(num);
                this.cache[id] = this.renderList(ar, this.width);
            }
            return this.cache[id];
        };
        SearchResultold.prototype.reset = function () {
            this.currentPattern = '';
        };
        SearchResultold.prototype.onKeyboardTyping = function (pattern) {
            var el = this.filterView(pattern);
            if (this.currentPattern.length < pattern.length)
                this.viewport.showView(el);
            else
                this.viewport.showViewBack(el);
            //v.on(CLICK, 'li', (evt) => this.onSearchResultClick(evt));
        };
        SearchResultold.prototype.getResultsByPattern = function (str) {
            var id = '_' + str;
            if (!this.cache[id]) {
                var num = Number(str);
                var ar;
                if (isNaN(num))
                    ar = this.R.modelDests.getDestsByPattern(str);
                else
                    ar = this.R.modelDests.getDestsByUnit(num);
                this.cache[id] = this.renderList2(ar);
            }
            return this.cache[id];
        };
        SearchResultold.prototype.getAll = function () {
            if (!this.all)
                this.all = this.renderList(this.R.modelDests.getData(), this.width - 10);
            return this.all;
        };
        SearchResultold.prototype.getAll2 = function () {
            if (!this.all2)
                this.all2 = this.renderList2(this.R.modelDests.getData());
            return this.all2;
        };
        SearchResultold.prototype.showAll = function () {
            this.currentPattern = '';
            this.currentCat = -1;
            this.currentDest = null;
            // this.viewport.showView(this.getAll());
            // this.all.on(CLICK, 'li', (evt) => this.onSearchResultClick(evt));
        };
        SearchResultold.prototype.showListByCatId = function (catid) {
            this.currentCat = catid;
            this.viewport.showView(this.getListByCatId(catid));
        };
        SearchResultold.prototype.getDestinationById = function (destid) {
            var id = 'd__' + destid;
            if (!this.cache[id])
                this.cache[id] = this.renderDestination(this.R.modelDests.getDestById(destid), this.width);
            return this.cache[id];
        };
        SearchResultold.prototype.onSearchResultClick = function (evt) {
            console.log(evt.currentTarget);
            var id = Number($(evt.currentTarget).data().did);
            if (isNaN(id))
                return;
            if (this.onDestination)
                this.onDestination(id);
            else
                this.viewport.pushViewAhead(this.getDestinationById(id));
        };
        SearchResultold.prototype.renderList2 = function (data) {
            var out = '';
            var color = this.R.settings.color;
            for (var i = 0, n = data.length; i < n; i++) {
                out += this._renderItem(data[i], color);
            }
            return out;
        };
        SearchResultold.prototype.renderList = function (data, w) {
            var out = '<ul class="destlist listHolder" style="width:' + w + 'px" >';
            var color = this.R.settings.color;
            for (var i = 0, n = data.length; i < n; i++) {
                out += this._renderItem(data[i], color);
            }
            return out + '</ul>';
        };
        SearchResultold.prototype._renderItem = function (item, color) {
            var src = (item.email + item.phone + item.website).length > 5 ? 'css/icons/touch2.png' : 'css/icons/notouch.png';
            if (item.advanced.length > 5)
                src = 'css/icons/touch1.png';
            //  return '<li data-did="' + item.destid + '" class="ubutton" >' +( (more1 || more2) ? ('<img src="css/icons/' + (more1 ? 'touch1.png' :'touch2.png')+'" />'):'')+'<span class="name">'+item.name+'</span><span class="unit">'+item.unit+'</span></li>';
            return '<li data-did="' + ((src == 'css/icons/notouch.png') ? '' : item.destid.toString()) + '" class="ubutton" ><img src="' + src + '"/><span class="name">' + item.name + '</span><span class="unit">' + item.unit + '</span></li>';
        };
        SearchResultold.prototype.renderDestination = function (dest, w) {
            var page = $('<div class="page" style="width:' + w + 'px"></div>');
            var out = '<h2><span class="name">' + dest.name + '</span><span class="unit">' + dest.unit + '</span></h2>';
            if (dest.email || dest.phone || dest.website) {
                out += '<table><tbody>';
                if (dest.phone)
                    out += '<tr><td>Phone:  </td><td>' + dest.phone + '</td></tr>';
                if (dest.email)
                    out += '<tr><td>Email:  </td><td>' + dest.email + '</td></tr>';
                if (dest.website)
                    out += '<tr><td>Website:  </td><td>' + dest.website + '</td></tr>';
                out += '</tbody></table>';
            }
            page.html(out);
            if (dest.advanced) {
                this.page = page;
            }
            return page;
        };
        SearchResultold.prototype.onAdvanced = function (resp) {
            this.page.append(resp);
        };
        return SearchResultold;
    })();
    kiosk.SearchResultold = SearchResultold;
})(kiosk || (kiosk = {}));
//# sourceMappingURL=SearchResultold.js.map