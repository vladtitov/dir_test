/// <reference path="../Registry.ts" />
/// <reference path="SearchModel.ts" />
/// <reference path="Categories.ts" />
/// <reference path="KeyboardSimple.ts" />
var uplight;
(function (uplight) {
    var SearchResult = (function () {
        function SearchResult(el) {
            this.el = el;
            this.view = $(el);
            this.R = uplight.Registry.getInstance();
            this.model = uplight.Registry.getInstance().model;
            this.list = $('#list-scroll');
            this.addListeners();
            this.cache = {};
            this.mainport = $('#mainport');
            this.header = this.view.find('[data-id=header]');
            this.HEADER = this.header.text();
            // this.viewDetails = $('#DetailsLarge').click((evt)=>this.onCoverClick(evt))
            //  this.detailsContent = this.viewDetails.find('.content:first');
        }
        SearchResult.prototype.reset = function () {
            this.result = this.data;
            this.render(true);
            this.list.scrollTop(0);
        };
        SearchResult.prototype.addListeners = function () {
            var _this = this;
            this.R.events.on(this.R.CATEGORIES_CHANGE, function (evt, cats) { return _this.onCategoriesChange(cats); });
            this.R.events.on(this.R.INPUT_CHANGED, function (evt, pattern) { return _this.onSearchChange(pattern); });
            this.R.events.on(this.R.TIMEOUT, function () { return _this.reset(); });
            this.model.dispatcher.on(this.model.READY, function () { return _this.onDataReady(); });
            this.list.on(CLICK, 'li', function (evt) { return _this.onListClick(evt); });
            this.R.events.on(this.R.CATEGORY_SELECTED, function (evt, catid) { return _this.onCategorySelected(catid); });
            this.R.events.on(this.R.SEARCH_RESULT_SHOW_DESTINATION, function (evt, id) { return _this.showDestination(id); });
            // console.log('listeners');
        };
        SearchResult.prototype.onCategorySelected = function (catid) {
            var cat = this.model.getCategoryById(catid);
            this.header.html('<span class="' + cat.icon + '"> </span> <span>' + cat.label + '</span>');
            var out = [];
            var ar = this.data;
            for (var i = 0, n = ar.length; i < n; i++) {
                if (ar[i].hasCategory(catid))
                    out.push(ar[i]);
            }
            this.result = out;
            this.render(true);
        };
        SearchResult.prototype.showDestination = function (id) {
            return this.dataInd[id].togleDetails();
        };
        SearchResult.prototype.onListClick = function (evt) {
            console.log(evt.currentTarget);
            var el = $(evt.currentTarget);
            console.log(el.data());
            var id = Number(el.data('id'));
            if (isNaN(Number(id)) || !this.dataInd[id])
                return;
            if (this.selected)
                this.selected.removeClass(SELECTED);
            this.selectedIndex = el.index();
            this.selected = el.addClass(SELECTED);
            this.R.events.triggerHandler(this.R.SEARCH_RESULT_SELECT, id);
            //if(this.onSelect )this.onSelect(id);
            this.R.connector.Stat('sr', id.toString());
        };
        /*
        private hideDetails():void{
            if(this.isDetails){
               // this.viewDetails.hide();
               // this.detailsContent.empty();
                this.isDetails = false;
            }
        }
        private onCoverClick(evt:JQueryEventObject):void{
           // console.log($(evt.target));
            if($(evt.target).data('id')=='btnClose'){
                this.hideDetails();
            }
        }

        private showDetailsLarge(det:JQuery):void{

            //this.viewDetails.show();
          //  this.detailsContent.append(det);
            this.isDetails = true;

        }
*/
        SearchResult.prototype.onSearchChange = function (pattern) {
            this.currentPattern = pattern.toLowerCase();
            //  console.log(pattern);
            if (pattern.length) {
                this.result = this.filterSearch();
                this.render(false);
            }
            else {
                this.result = this.data;
                this.render(true);
            }
            this.header.text(this.HEADER);
        };
        SearchResult.prototype.filterSearch = function () {
            var out1 = [];
            var out2 = [];
            var out3 = [];
            var ar = this.data;
            var str = this.currentPattern;
            for (var i = 0, n = ar.length; i < n; i++) {
                ar[i].clearKeyword();
                var ind = ar[i].filterStr(str);
                if (ind === 1)
                    out1.push(ar[i]);
                else if (ind === 2)
                    out2.push(ar[i]);
                else if (ind === 3)
                    out3.push(ar[i]);
            }
            return out1.concat(out2, out3);
        };
        SearchResult.prototype.onCategoriesChange = function (cats) {
            this.currentCats = cats;
            console.log(cats);
            this.filterCats(cats);
        };
        SearchResult.prototype.filterCats = function (cats) {
            var ar = this.data;
            for (var i = 0, n = ar.length; i < n; i++)
                ar[i].setCats(cats).render();
        };
        SearchResult.prototype.render = function (reset) {
            console.log('reset ' + reset);
            if (this.selected)
                this.selected.removeClass(SELECTED);
            this.selectedIndex = -1;
            var ar = this.result;
            this.list.children().detach();
            var ul = $('<ul>');
            for (var i = 0, n = ar.length; i < n; i++) {
                ar[i].appendTo(ul, reset);
            }
            this.list.append(ul);
        };
        SearchResult.prototype.onDataReady = function () {
            var ar = this.model.getData();
            var list = this.list, out = [];
            var ind = [];
            for (var i = 0, n = ar.length; i < n; i++) {
                var dest = new uplight.DestModel(ar[i]);
                out.push(dest);
                ind[dest.id] = dest;
            }
            this.dataInd = ind;
            this.data = out;
            this.result = out;
            this.render(false);
            // this.list.appendTo(this.view);
            // this.searchController = new SearchController());
        };
        return SearchResult;
    })();
    uplight.SearchResult = SearchResult;
})(uplight || (uplight = {}));
//# sourceMappingURL=SearchResult.js.map