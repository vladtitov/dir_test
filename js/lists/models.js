/// <reference path="../admin/regA.ts" />
/// <reference path="../../../scripts/typings/jquery.d.ts" />
var lists;
(function (lists) {
    var DestinantionsModel = (function () {
        function DestinantionsModel() {
            this.searches = {};
            this.hintsLength = 4;
        }
        DestinantionsModel.prototype.getAllByType = function (type) {
            if (!this.searches['type_' + type])
                this.searches['type_' + type] = this._getAllByType(type);
            return this.searches['type_' + type];
        };
        DestinantionsModel.prototype.detDestinationsByUnit = function (unit) {
            if (!this.searches[unit])
                this.searches[unit] = this._detDestinationsByUnit(unit);
            return this.searches[unit];
        };
        DestinantionsModel.prototype.getDestinantionsByPatternAndType = function (type, pattern) {
            if (!this.searches[type + '_' + pattern])
                this.searches[type + '_' + pattern] = this._getDestinantionsByPatternAndType(type, pattern);

            return this.searches[type + '_' + pattern];
        };
        DestinantionsModel.prototype.getHints = function (pattern) {
            pattern = ' ' + pattern.toLowerCase();
            if (!this.hintsCache[pattern])
                this.hintsCache[pattern] = this._getHints(pattern);
            return this.hintsCache[pattern];
        };

        DestinantionsModel.prototype.getAllByPattern = function (pattern) {
            if (!this.searches[pattern])
                this.searches[pattern] = this._getLocationByPattern(pattern);
            ;
            return this.searches[pattern];
        };

        /*
        getAllByCategory(catid: number): VODestination[]{
        var out: VODestination[] = [];
        var data: VODestination[] = this._data;
        // for (var i = 0, n = data.length; i < n; i++)  if (data[i].categoryId == catid) out.push(data[i]);
        
        return out;
        
        }
        */
        DestinantionsModel.prototype.refreshData = function () {
            var _this = this;
            R.connector.getDestinations(function (data) {
                return _this.onDestinations(data);
            });
        };

        DestinantionsModel.prototype._detDestinationsByUnit = function (unit) {
            var out = [];
            var data = this._data;
            for (var i = 0, n = data.length; i < n; i++)
                if (data[i].unit.indexOf(unit) > -1)
                    out.push(data[i]);

            return out;
        };
        DestinantionsModel.prototype._getDestinantionsByPatternAndType = function (type, pattern) {
            pattern = ' ' + pattern.toLowerCase();
            var data = this.getAllByType(type);
            return this.filerByPattern(pattern, data);
        };

        DestinantionsModel.prototype.filerByPattern = function (pattern, data) {
            var out = [];
            for (var i = 0, n = data.length; i < n; i++) {
                var name = ' ' + data[i].name.toLowerCase() + ' ' + data[i].unit;
                if (name.indexOf(pattern) > -1)
                    out.push(data[i]);
            }
            return out;
        };

        DestinantionsModel.prototype._getAllByType = function (type) {
            var data = this._data;
            var out = [];

            for (var i = 0, n = data.length; i < n; i++) {
                if (data[i].type == type)
                    out.push(this._data[i]);
            }
            return out;
        };
        DestinantionsModel.prototype._getLocationByPattern = function (pattern) {
            pattern = ' ' + pattern.toLowerCase();
            var data = this._keywords;
            var out = [];

            for (var i = 0, n = data.length; i < n; i++) {
                if (data[i].indexOf(pattern) > -1)
                    out.push(this._data[i]);
            }
            return out;
        };

        DestinantionsModel.prototype.createSearch = function (data) {
        };
        DestinantionsModel.prototype.onDestinations = function (data) {
            trace(data);
            return;
            var obj = {};
            this._data = data;
            var kw = [];
            for (var i = 0, n = data.length; i < n; i++) {
                // data[i].keywords = ' ' + data[i].keywords;
                // this.pushKeywords(data[i].keywords.split(','), obj);
                kw.push(' ' + data[i].name.toLowerCase() + ' ' + data[i].unit.toLowerCase());
                // kw.push(data[i].keywords.toLowerCase());
            }
            this._keywords = kw;

            // trace('onDestinations');
            this.hints = obj;
            this.hintsCache = {};
            if (this.onReady)
                this.onReady();
        };
        DestinantionsModel.prototype.pushKeywords = function (ar, obj) {
            for (var i = 0, n = ar.length; i < n; i++)
                obj[ar[i]] = true;
        };

        DestinantionsModel.prototype._getHints = function (pattern) {
            var ar = [];
            for (var str in this.hints) {
                if (str.toLowerCase().indexOf(pattern) > -1)
                    ar.push(str.substr(1));
                if (ar.length >= this.hintsLength)
                    break;
            }

            return ar;
        };
        return DestinantionsModel;
    })();
    lists.DestinantionsModel = DestinantionsModel;

    var VODestination = (function () {
        function VODestination() {
        }
        return VODestination;
    })();
    lists.VODestination = VODestination;
})(lists || (lists = {}));
