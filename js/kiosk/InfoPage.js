/// <reference path="Registry.ts" />
/// <reference path="../typing/jquery.d.ts" />
/// <reference path="../typing/underscore.d.ts" />
var uplight;
(function (uplight) {
    var VOPage = (function () {
        function VOPage(obj) {
            var _this = this;
            for (var str in obj)
                this[str] = obj[str];
            this.id = Number(this.id);
            this.view = $('<div>').addClass('page');
            this.header = $('<div>').addClass('header').appendTo(this.view).html('<span class="' + this.icon + '"> </span> <span> ' + this.name + '</span>');
            this.content = $('<div>').addClass('content').appendTo(this.view);
            if (this.url)
                uplight.Registry.getInstance().connector.get(this.url).done(function (data) { _this.content.html(data); });
        }
        return VOPage;
    })();
    uplight.VOPage = VOPage;
    var InfoPagesModel = (function () {
        function InfoPagesModel(el) {
            var _this = this;
            this.prev = -2;
            /*
            loadData(item:any):void {
    
                $.get(item.url).done(function(data){
                 //   console.log(data);
                   item.$div=$('<div>').html(data);
              })
            }
    
            setData(data:any[]):void{
                    var ar = data
                    for(var i=0,n=ar.length;i<n;i++){
                          this.loadData(ar[i]);
                    }
                this.data = data
            }
    */
            this.current = -1;
            console.log('InfoPagesModel');
            this.view = $(el);
            this.R = uplight.Registry.getInstance();
            this.R.connector.getData('pages').done(function (data) { return _this.onData(data); });
            this.R.events.on(this.R.PAGE_SELECED, function (evt, pageid) { _this.showPage(pageid); });
            this.view.css('overfow', 'hidden');
            this.width = this.view.width();
            this.list = $('<div>').appendTo(this.view);
        }
        InfoPagesModel.prototype.onData = function (res) {
            var out = [];
            var ar = JSON.parse(res);
            for (var i = 0, n = ar.length; i < n; i++) {
                out.push(new VOPage(ar[i]));
            }
            this.data = out;
            this.dataInd = _.indexBy(out, 'id');
        };
        InfoPagesModel.prototype.showPage = function (id) {
            var _this = this;
            if (this.inTrans)
                return;
            console.log('showing page ' + id);
            if (id == this.current)
                return;
            var item = this.dataInd[id];
            if (!item) {
                console.log('Error cant find page with id ' + id);
                return;
            }
            this.current = id;
            this.list.append(item.view);
            if (this.list.children().length > 1) {
                this.inTrans = true;
                this.view.animate({ scrollLeft: this.width }, function () {
                    _this.list.children().first().remove();
                    _this.view.scrollLeft(0);
                    _this.inTrans = false;
                });
            }
        };
        /*
        getPage(page:VOItem): JQuery {
            if (!this.cache[page.id]) this.cache[page.id] = this.createPage(page);
            return this.cache[page.id];
        }
      
        private createPage(page: VOItem): JQuery {
            var p:JQuery = $('<div class="view"><div class="mytitle">'+page.label+'</div></div>');
            this.content = $('<div class="view-content">Loading</div>').appendTo(p);
            this.loadPage(page.id.toString());
            return p;

        }

        */
        InfoPagesModel.prototype.onPageLoaded = function (res) {
            // this.content.html(res);
        };
        InfoPagesModel.PAGE_SELECED = 'PAGE_SELECED';
        return InfoPagesModel;
    })();
    uplight.InfoPagesModel = InfoPagesModel;
})(uplight || (uplight = {}));
//# sourceMappingURL=InfoPage.js.map