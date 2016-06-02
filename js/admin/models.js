/// <reference path="RegA.ts" />
var uplight;
(function (uplight) {
    var VODestination = (function () {
        function VODestination(obj) {
            for (var str in obj)
                this[str] = obj[str];
        }
        return VODestination;
    }());
    uplight.VODestination = VODestination;
    var DestinantionsModel = (function () {
        function DestinantionsModel() {
            this.dispatcher = $({});
            this.CHANGE = 'CAHBE';
            this.CATEGORIES_CAHANGE = 'CATEGORIES_CAHANGE';
            this.R = uplight.RegA.getInstance();
            this.refreshData();
        }
        DestinantionsModel.prototype.deleteDestination = function (dest, callBack) {
            var _this = this;
            this.R.connector.deleteDestination(dest.id).done(function (res) {
                _this.refreshData();
                callBack(res);
            });
        };
        DestinantionsModel.encodeUID = function (name) {
            return name.replace(/[^a-zA-Z0-9-_]/g, '');
        };
        // saveDestination(vo: VODestination): void {
        //  var p1= this.R.connector.saveDestination(vo).done((res)=>{
        //   this.refreshData();
        // });
        /*
             var p2
             if(pages){
                 if(!vo.uid) vo.uid = 'a_'+vo.id;
                p2 = this.R.connector.savePage('pages/p'+vo.uid+'.htm',pages);
                 $.when(p1,p2).then(function(v1,v2){
                    // console.log('both');
                     //console.log(v1,v2);
                     var res = v1[0];
 
                     callBack(res)
 
                 })
             }else p1.then(function(res){
                 callBack(res);
             })
 
 */
        //   }
        DestinantionsModel.prototype.saveCategoryListing = function (catid, ids, callBack) {
            var _this = this;
            this.R.connector.saveCatDests(catid, ids).done(function (res) {
                callBack(res);
                _this.refreshData();
            });
        };
        DestinantionsModel.prototype.deleteCatChanges = function () {
            this.catChanges = {};
        };
        /*
                getAllByType(type: string): VODestination[]{
                   // trace(' getAllByType : ' + type);
                    if (!this.searches['type_' + type]) this.searches['type_' + type]=this._getAllByType(type);
                    return this.searches['type_' + type];
                }
                */
        DestinantionsModel.prototype._getDestById = function (destid) {
            var data = this._data;
            for (var i = 0, n = data.length; i < n; i++)
                if (data[i].id == destid)
                    return data[i];
            return null;
        };
        DestinantionsModel.prototype.getDestById = function (destid) {
            if (!this.cacheDests[destid])
                this.cacheDests[destid] = this._getDestById(destid);
            return this.cacheDests[destid];
        };
        // getDestInfo(callBack: Function, destid: number): void {
        //  R.connector.getDestInfo(callBack, destid); 
        // }
        ///////////////////
        //getDestinationsByUnitAndCat(unit: string, catid: number): VODestination[]{
        // console.log('unit ' + unit + ' catid: ' + catid);
        // var id: string = 'c' + catid+'u' + unit;
        // if (!this.cacheSearches[id]) this.cacheSearches[id] = this._getDestinationsByUnit(unit, this.getAllByCat(catid));
        //  return this.cacheSearches[id]
        // }
        DestinantionsModel.prototype._getDestinationsByUnit = function (unit, data) {
            if (unit == '')
                return data;
            var out = [];
            for (var i = 0, n = data.length; i < n; i++)
                if (data[i].unit.indexOf(unit) != -1)
                    out.push(data[i]);
            // console.log(' _getDestinationsByUnit: ' + unit+' total: ' + out.length);
            return out;
        };
        ////////////////////
        // getDestinantionsByPatternAndCat(pattern: string, catid: number): VODestination[]{
        //   var id: string = 'c' + catid+ pattern;
        //if (!this.cacheSearches[id]) this.cacheSearches[id] = this._getDestinantionsByPattern(pattern, this.getAllByCat(catid));
        //return this.cacheSearches[id];
        //}
        DestinantionsModel.prototype.getDestinantionsByNumber = function (num) {
            var pat1 = num.toString();
            var ar = this.getData();
            var out = [];
            for (var i = 0, n = ar.length; i < n; i++) {
                var item = ar[i];
                if (item.name.indexOf(pat1) !== -1 || item.unit.indexOf(pat1) !== -1 || item.id.toString().indexOf(pat1) !== -1)
                    out.push(item);
            }
            return out;
        };
        DestinantionsModel.prototype.getDestinantionsByPattern = function (pattern) {
            if (pattern.length == 0)
                return this.getData();
            pattern = pattern.toLowerCase();
            var out;
            if (isNaN(pattern)) {
                var pat2 = ' ' + pattern;
                var out1 = [];
                var out2 = [];
                var out3 = [];
                var ar = this.getData();
                for (var i = 0, n = ar.length; i < n; i++) {
                    var name = ar[i].name.toLowerCase();
                    if (name.indexOf(pattern) === 0)
                        out1.push(ar[i]);
                    else if (name.indexOf(pat2) != -1)
                        out2.push(ar[i]);
                    else {
                        var unit = ar[i].unit.toLowerCase();
                        if (unit.indexOf(pattern) === 0 || unit.indexOf(pat2) !== -1)
                            out1.push(ar[i]);
                        else {
                            var all = ' ' + ar[i].info + ' ' + ar[i].uid; //+' '+ar[i].meta;
                            if (all.indexOf(pat2) !== -1)
                                out3.push(ar[i]);
                        }
                    }
                }
                out = out1.concat(out2, out3);
            }
            else
                out = this.getDestinantionsByNumber(Number(pattern));
            return out;
        };
        /////////////////////////////////////////////
        DestinantionsModel.prototype.getData = function () {
            return this._data;
        };
        DestinantionsModel.prototype.getDestinationsIndexed = function () {
            return this.destInex;
        };
        DestinantionsModel.prototype.getUnassigned = function () {
            var out = [];
            var ar = this.getData();
            for (var i = 0, n = ar.length; i < n; i++)
                if (ar[i].cats.length === 0)
                    out.push(ar[i]);
            return out;
        };
        DestinantionsModel.prototype.getDestinationsInCategory = function (id) {
            var ar = this.getData();
            var yes = [];
            var not = [];
            for (var i = 0, n = ar.length; i < n; i++) {
                if (ar[i].cats.indexOf(id) === -1)
                    not.push(ar[i]);
                else
                    yes.push(ar[i]);
            }
            this.notInCategory = not;
            this.inCategory = yes;
            return yes;
        };
        DestinantionsModel.prototype.getDestinationsNotInCategory = function () {
            return this.notInCategory;
        };
        DestinantionsModel.prototype.removeDestinatinsFromCategory = function (catid, destids) {
            // VODestination[]
        };
        DestinantionsModel.prototype.getCategoryById = function (id) {
            return this.catsIndexed[id];
        };
        DestinantionsModel.prototype.getCategoriesIndexed = function () {
            return this.catsIndexed;
        };
        DestinantionsModel.prototype.getCategoriesNames = function (ar) {
            var out = [];
            for (var i = ar.length - 1; i >= 0; i--) {
                var vo = this.getCategoryById(ar[i]);
                if (vo)
                    out.push(vo.label);
                else
                    ar.splice(i, 1);
            }
            return out.reverse();
        };
        DestinantionsModel.prototype.refreshData = function () {
            console.log('DestinantionsModel refresh');
            this.cache = {};
            var p1 = this.R.connector.getCategories();
            var p2 = this.R.connector.getDestinations();
            var self = this;
            $.when(p1, p2).then(function (v) {
                var v1 = arguments[0];
                var v2 = arguments[1];
                // console.log(v1[0],v2[0]);
                var res = v1[0];
                self.setCategories(res);
                var dests = v2[0];
                self.setDestinations(dests);
                self.dispatcher.triggerHandler(self.CATEGORIES_CAHANGE, res);
                self.dispatcher.triggerHandler(self.CHANGE);
            });
        };
        DestinantionsModel.prototype.setDestinations = function (res) {
            var out = [];
            var destInd = {};
            for (var i = 0, n = res.length; i < n; i++) {
                var cats = res[i].cats.split(',').map(Number);
                res[i].catsStr = this.getCategoriesNames(cats);
                res[i].cats = cats;
                if (!res[i].uid)
                    res[i].uid = DestinantionsModel.encodeUID(res[i].name.toLowerCase());
                var dest = new VODestination(res[i]);
                destInd[dest.id] = dest;
                out.push(dest);
            }
            this.setData(out, destInd);
        };
        /////////////////////////////CATEGORIES//////////////////////////////////
        DestinantionsModel.prototype.saveCategory = function (vo) {
            var _this = this;
            var d = $.Deferred();
            this.R.connector.saveCategory(vo).done(function (res) {
                var result = new uplight.VOResult();
                if (_this.setCategories(res))
                    result.success = 'success';
                else {
                    result.error = 'notarray';
                    result.result = res.toString();
                }
                d.resolve(result);
                // that.mapCategories();
                //  callBack({success:true});
                _this.dispatcher.triggerHandler(_this.CATEGORIES_CAHANGE, res);
            });
            return d.promise();
        };
        DestinantionsModel.prototype.addDestinationToCategories = function (dest, cats) {
            var ar = dest.cats;
            if (ar) {
                for (var i = 0, n = ar.length; i < n; i++) {
                    var cat = cats[ar[i]];
                    if (cat) {
                        if (!cat.dests)
                            cat.dests = [];
                        cat.dests.push(dest.id);
                    }
                }
            }
        };
        DestinantionsModel.prototype.isCategoriesMapped = function () {
            var ar = this.getCategories();
            for (var i = 0, n = ar.length; i < n; i++)
                if (ar[i].dests)
                    return true;
            return false;
        };
        DestinantionsModel.prototype.mapCategories = function () {
            if (this.isCategoriesMapped())
                return;
            var cats = this.catsIndexed;
            var ar = this.getData();
            for (var i = 0, n = ar.length; i < n; i++)
                this.addDestinationToCategories(ar[i], cats);
        };
        DestinantionsModel.prototype.setCategories = function (ar) {
            if (!Array.isArray(ar))
                return false;
            var cats = [];
            var catInd = [];
            for (var i = 0, n = ar.length; i < n; i++) {
                var cat = new uplight.VOCategory(ar[i]);
                cats.push(cat);
                catInd[cat.id] = cat;
            }
            this.categories = cats;
            this.catsIndexed = catInd;
            return true;
        };
        DestinantionsModel.prototype.getCategories = function () {
            return this.categories;
        };
        DestinantionsModel.prototype.deleteCategory = function (cat, callBack) {
            var _this = this;
            this.R.connector.deleteCategory(cat.id).done(function (res) {
                _this.refreshData();
                callBack(res);
            });
        };
        DestinantionsModel.prototype.setData = function (data, destInd) {
            this._data = data;
            this.destInex = destInd;
        };
        DestinantionsModel.prototype.eraseCache = function () {
            this.cacheDests = {};
            this.catChanges = {};
        };
        DestinantionsModel.prototype.addDestination = function (data) {
            this.eraseCache();
            this._data.push(data);
            // if (this.onChange) this.onChange();
        };
        return DestinantionsModel;
    }());
    uplight.DestinantionsModel = DestinantionsModel;
})(uplight || (uplight = {}));
//# sourceMappingURL=models.js.map