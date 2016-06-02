/**
 * Created by VladHome on 7/18/2015.
 */
/// <reference path="../Registry.ts" />
/// <reference path="DetailsLarge.ts" />
var uplight;
(function (uplight) {
    var VORow = (function () {
        function VORow(row) {
            var ar = row.split('\t');
            this.col1 = ar[0] || '&nbsp;';
            this.col2 = ar[1] || '&nbsp;';
        }
        return VORow;
    })();
    uplight.VORow = VORow;
    var ButtonView = (function () {
        function ButtonView(model) {
            this.model = model;
            this.$view = $('<li>').addClass('item btn-main').data('id', model.id).append(this.createMain());
        }
        // private $cats:JQuery;
        // setCats(str:string):void{
        //   this.$cats.text(str);
        //}
        ButtonView.prototype.show = function () {
            this.$view.show();
        };
        ButtonView.prototype.hide = function () {
            this.$view.hide();
        };
        ButtonView.prototype.appendTo = function (container) {
            this.$view.appendTo(container);
        };
        ButtonView.prototype.reset = function () {
            this.details.hide();
        };
        ButtonView.prototype.createMain = function () {
            this.$main = $('<div>').addClass('main');
            this.$main.append(this.createFirstRow());
            //  this.$cats=$('<div>').addClass('cats').appendTo(this.$main);
            var icon = '<span class="icon ' + this.model.vo.icon + '"></span>';
            var name = '<span class="name">' + this.model.vo.name + '</span>';
            var unit = '<span class="unit">' + this.model.vo.unit + '</span>';
            this.$main.append('<div class="urow">' + icon + name + unit + '</div>');
            this.$main.append(this.createLastRow());
            return this.$main;
        };
        ButtonView.prototype.createFirstRow = function () {
            this.$kw = $('<span></span>').addClass('kws');
            return $('<div>').addClass('urow').append(this.$kw).append('<span class="unittype">unit</span>');
        };
        ButtonView.prototype.createLastRow = function () {
            return $('<div>').addClass('urow').append(this.createBtnMore()).append('<spam>' + this.model.vo.info + '</spen>');
        };
        ButtonView.prototype.createBtnMore = function () {
            if (this.model.haveMore) {
                this.$txtMore = $('<span>').text(' More...');
                this.$btnMore = $('<a>').addClass('btn').append('<span class="fa fa-plus"></span>').append(this.$txtMore);
            }
            else
                this.$btnMore = $('<a>').addClass('btn');
            return this.$btnMore;
        };
        ButtonView.prototype.showDetails = function () {
            if (!this.details) {
                this.details = this.createDetails(this.model.vo);
                this.$view.append(this.details);
            }
            this.details.show('fast');
            this.$txtMore.text(' Less...');
        };
        ButtonView.prototype.hideDetails = function () {
            this.details.hide('fast');
            this.$txtMore.text(' More...');
        };
        ////////////////////
        ButtonView.prototype.showKW = function (str) {
            this.$kw.text(str);
        };
        ButtonView.prototype.resetKW = function () {
            this.$kw.text('');
        };
        ButtonView.prototype.tableToObject = function (str) {
            var out = [];
            var ar = str.split("\n");
            for (var i = 0, n = ar.length; i < n; i++)
                out.push(new VORow(ar[i]));
            return out;
        };
        ButtonView.prototype.createDetails = function (vo) {
            var ar = this.tableToObject(vo.more); //.split("\n");
            var out = '<div class="more" ><table class="table">';
            for (var i = 0, n = ar.length; i < n; i++)
                out += '<tr><td>' + ar[i].col1 + '</td><td>' + ar[i].col2 + '</td></tr>';
            out += '</table></div>';
            if (vo.tmb)
                out += '<div class="tmb"><img src="' + vo.tmb + '" /></div>';
            return $('<div>').addClass('details').html(out);
        };
        return ButtonView;
    })();
    uplight.ButtonView = ButtonView;
    var DestModel = (function () {
        function DestModel(vo) {
            this.vo = vo;
            this.byCat = true;
            // kw:JQuery;
            this.cache = {};
            this.id = vo.id;
            if (vo.more || vo.tmb || vo.imgs || vo.pgs)
                this.haveMore = true;
            this.view = new ButtonView(this);
            //this.view.setCats(vo.cats.toString())
            this.name = ' ' + vo.name.toLowerCase();
            this.unit = ' ' + vo.unit.toLowerCase();
            this.kws = ',' + vo.kws;
        }
        DestModel.prototype.addDetails = function (el) {
            if (el.children('.details').length === 0) {
                el.append(this.view.createDetails(this.vo));
                el.children('.details').show('fast');
            }
        };
        DestModel.prototype.appendTo = function (container, reset) {
            if (reset)
                this.reset();
            this.view.appendTo(container);
        };
        DestModel.prototype.show = function () {
            if (this.isHiiden) {
                this.isHiiden = false;
                this.view.show();
            }
        };
        DestModel.prototype.hide = function () {
            if (!this.isHiiden) {
                this.isHiiden = true;
                this.view.hide();
            }
        };
        DestModel.prototype.reset = function () {
            if (this.isDetails) {
                this.isDetails = false;
                this.view.reset();
            }
            this.clearKeyword();
            return this;
        };
        DestModel.prototype.togleDetails = function () {
            if (this.haveMore) {
                if (this.isDetails)
                    this.hideDetails();
                else
                    this.showDetails();
                return this.isDetails;
            }
            return false;
        };
        DestModel.prototype.showDetails = function () {
            console.log('showDetails ');
            if (!this.isDetails) {
                this.view.showDetails();
                this.isDetails = true;
            }
        };
        DestModel.prototype.hideDetails = function () {
            if (this.isDetails) {
                console.log('hideDetails ');
                this.isDetails = false;
                this.view.hideDetails();
            }
        };
        DestModel.prototype.tryName = function (pat) {
            var out = 0;
            var ind = this.name.indexOf(pat);
            if (ind === 0)
                out = 1;
            else if (ind !== -1)
                out = 2;
            return out;
        };
        DestModel.prototype.tryUnit = function (pat) {
            var out = 0;
            var ind = this.unit.indexOf(pat);
            if (ind == 0)
                out = 1;
            else if (ind !== -1)
                out = 2;
            return out;
        };
        DestModel.prototype.tryKw = function (pat) {
            var out;
            var kws = this.kws;
            if (this.kws.indexOf(pat) !== -1) {
                var ind = kws.indexOf(pat);
                var end = kws.indexOf(',', ind + 1);
                if (end === -1)
                    out = kws.substr(ind + 1);
                else
                    out = this.kws.substring(ind + 1, end);
            }
            return out;
        };
        DestModel.prototype.filterStr = function (pat) {
            if (this.iskw)
                this.clearKeyword();
            var out = 0;
            if (isNaN(Number(pat))) {
                out = this.tryName(' ' + pat);
                if (out === 0)
                    out = this.tryUnit(' ' + pat);
            }
            else {
                out = this.tryUnit(' ' + pat);
                if (out === 0)
                    out = this.tryName(' ' + pat);
            }
            if (out === 0) {
                var kw = this.tryKw(',' + pat);
                if (kw) {
                    this.showKeyword(kw);
                    out = 3;
                }
            }
            this.ind = out;
            return out;
        };
        DestModel.prototype.showKeyword = function (str) {
            // console.log(this.vo.name+'  showKeyword  '   + str);
            this.view.showKW(str);
            this.iskw = true;
        };
        DestModel.prototype.clearKeyword = function () {
            if (this.iskw) {
                this.view.resetKW();
                this.iskw = false;
            }
        };
        DestModel.prototype.hasCategory = function (num) {
            return this.vo.cats.indexOf(num) !== -1;
        };
        DestModel.prototype.setCats = function (cats) {
            this.cats = ar;
            var ar = this.vo.cats;
            if (!ar) {
                this.byCat = false;
                return this;
            }
            var dif = ar.filter(function (n) {
                return cats.indexOf(n) != -1;
            });
            if (dif.length === 0)
                this.byCat = false;
            else
                this.byCat = true;
            return this;
        };
        DestModel.prototype.render = function () {
            if (this.byCat)
                this.show();
            else
                this.hide();
        };
        DestModel.dispatcher = $({});
        DestModel.DETAILS_LARGE = 'DETAILS_LARGE';
        return DestModel;
    })();
    uplight.DestModel = DestModel;
})(uplight || (uplight = {}));
//# sourceMappingURL=SearchModel.js.map