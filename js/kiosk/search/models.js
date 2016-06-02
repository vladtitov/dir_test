/// <reference path="../Registry.ts" />
var uplight;
(function (uplight) {
    var VODestination = (function () {
        function VODestination(obj) {
            for (var str in obj)
                this[str] = obj[str];
        }
        return VODestination;
    })();
    uplight.VODestination = VODestination;
    var VOCategory = (function () {
        function VOCategory(obj) {
            for (var str in obj)
                this[str] = obj[str];
            if (!this.dests)
                this.dests = [];
        }
        return VOCategory;
    })();
    uplight.VOCategory = VOCategory;
    var Model = (function () {
        //  warn:Function;
        //  error:Function;
        function Model(connector, logger) {
            var _this = this;
            this.connector = connector;
            this.logger = logger;
            this.READY = 'READY';
            // this.R = Registry.getInstance();
            this.dispatcher = $({});
            //this.error= this.R.error;
            // this.warn= this.R.warn;
            console.log('get destinations');
            this.connector.getDestinations().done(function (res) { return _this.onResult(res); });
        }
        Model.prototype.getDestById = function (id) {
            return this.destInd[id];
        };
        Model.prototype.getKeywords = function () {
            return this.keywords;
        };
        Model.prototype.getCategories = function () {
            return this.cats;
        };
        Model.prototype.getCategoryById = function (id) {
            return this.catsInd[id];
        };
        Model.prototype.getDestsByCat = function (catid) {
            // trace(' getAllByType : ' + type);
            var id = 'c__' + catid;
            if (!this.cache[id])
                this.cache[id] = this._getDestsByCat(catid, this.dests);
            return this.cache[id];
        };
        Model.prototype.getDestsByUnit = function (unit) {
            var id = 'u__' + unit;
            if (!this.cache[id])
                this.cache[id] = this._getDestsByUnit(unit.toString(), this.dests);
            return this.cache[id];
        };
        Model.prototype.getDestsByPatternAndCat = function (cat, pattern) {
            var id = cat + '__' + pattern;
            if (!this.cache[id])
                this.cache[id] = this._getDestsByPattern(pattern, this.getDestsByCat(cat));
            return this.cache[id];
        };
        Model.prototype.getDestsByUnitAndCat = function (cat, unit) {
            var id = cat + '_u_' + unit;
            if (!this.cache[id])
                this.cache[id] = this._getDestsByUnit(unit.toString(), this.getDestsByCat(cat));
            return this.cache[id];
        };
        Model.prototype.getDestsByPattern = function (pattern) {
            if (!this.cache[pattern])
                this.cache[pattern] = this._getDestsByPattern(pattern, this.dests);
            return this.cache[pattern];
        };
        Model.prototype.refreshData = function () {
            // this.connector.getDestinations((data) => this.onDestinations(data));
            // $.post(this.service, Registry.getInstance().device,'application/json').done((data) => this.onDestinations(data));
        };
        Model.prototype.getData = function () {
            return this.dests;
        };
        // R:Registry;
        Model.prototype.setData = function (data) {
            this.dests = data;
            this.cache = {};
        };
        Model.prototype.makeCats = function (ar) {
            //console.log(ar);
            var out = [];
            var ind = [];
            for (var i = 0, n = ar.length; i < n; i++) {
                var cat = new VOCategory(ar[i]);
                ind[cat.id] = cat;
                out.push(cat);
            }
            this.cats = out;
            this.catsInd = ind;
        };
        Model.prototype.addKeywords = function (str) {
        };
        Model.prototype.makeDests = function (ar) {
            var out = [];
            var ind = [];
            var kws = [];
            for (var i = 0, n = ar.length; i < n; i++) {
                if (!ar[i].name)
                    continue;
                if (typeof ar[i].cats === 'string' && ar[i].cats.length)
                    ar[i].cats = ar[i].cats.split(',').map(Number);
                var dest = new VODestination(ar[i]);
                ind[dest.id] = dest;
                if (dest.kws && dest.kws.length) {
                    var kwsN = [];
                    dest.kws.split(',').forEach(function (val) {
                        val = val.trim();
                        kwsN.push(val);
                        if (val && kws.indexOf(val) === -1)
                            kws.push(val);
                        // kws[val].push(dest.id);
                    });
                    dest.kws = kwsN.join(',');
                }
                out.push(dest);
            }
            this.keywords = kws;
            this.dests = out;
            this.destInd = ind;
        };
        Model.prototype.onResult = function (res) {
            this.makeCats(res.cats);
            this.makeDests(res.dests);
            this.addIcon();
            this.cache = {};
            console.log(this.READY);
            this.dispatcher.triggerHandler(this.READY);
        };
        Model.prototype.addIcon = function () {
            var catsI = this.catsInd;
            var ar = this.dests;
            for (var i = 0, n = ar.length; i < n; i++) {
                var item = ar[i];
                if (item.cats && item.cats.length) {
                    if (catsI[item.cats[0]])
                        item.icon = catsI[item.cats[0]].icon;
                    else
                        this.logger('cant find icon for category ' + item.cats[0] + ' ib dest: ' + item.name);
                }
            }
        };
        Model.prototype._getDestsByUnit = function (unit, data) {
            var out = [];
            for (var i = 0, n = data.length; i < n; i++)
                if (data[i].unit.indexOf(unit) != -1)
                    out.push(data[i]);
            return out;
        };
        Model.prototype._getDestsByPattern = function (pattern, data) {
            pattern = pattern.toLowerCase();
            var out1 = [];
            var out2 = [];
            var out3 = [];
            for (var i = 0, n = data.length; i < n; i++) {
                var name = data[i].name.toLowerCase();
                if (name.indexOf(pattern) == 0)
                    out1.push(data[i]);
                else if (name.indexOf(' ' + pattern) !== -1)
                    out2.push(data[i]);
                else if (data[i].unit.indexOf(pattern) !== -1)
                    out3.push(data[i]);
            }
            return out1.concat(out2, out3);
        };
        Model.prototype._getDestsByCat = function (cat, data) {
            if (cat == 0)
                return data;
            var out = [];
            for (var i = 0, n = data.length; i < n; i++)
                if (data[i].cats.indexOf(cat) != -1)
                    out.push(data[i]);
            return out;
        };
        Model.prototype.onDestinations = function (data) {
            this.dests = data;
            this.cache = {};
            this._dataid = {};
            if (this.onReady)
                this.onReady();
        };
        Model.prototype.pushKeywords = function (ar, obj) {
            for (var i = 0, n = ar.length; i < n; i++)
                obj[ar[i]] = true;
        };
        return Model;
    })();
    uplight.Model = Model;
})(uplight || (uplight = {}));
//# sourceMappingURL=models.js.map