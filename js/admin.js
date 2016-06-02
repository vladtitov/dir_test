///<reference path="DirsAdmin.ts" />

/*
var LISTVIEW: string = 'ListView';
var DETAILSVIEV: string = 'DetailsView';
var MENUVIEW: string = 'MenuView';
var VPCONTENT: string = 'VpContent';
var SHOW_LISTVIEW: string = 'Show_ListView';
var SHOW_DETAILSVIEW: string = 'Show_DetailsView';
var SHOW_PAGE: string = 'Show_Page';
var SHOW_KEYBOARD: string = 'Show_Keyboard';
var HIDE_KEYBOARD: string = 'Hide_Keyboard';
var TYPING: string = 'typing';
var HASH_CHANGE:string='hash_change';
var CONTENTEDITABLE:string='contenteditable';
var IMG: string = 'img';
var SRC: string = 'src';
var ALERT: string = 'myAlert';
var ALERT_YES: string = 'alert_yes';
var ALERT_NO: string = 'alert_no';
var REMOVE: string = 'remove';
var SHOW: string = 'show';
var HIDE: string = 'hide';
var CLOSE:string='close';
var CREATE:string='create';
//var trace = function (data) { console.log(data); }
var onAlertYes: Function;
var myAlert: JQuery;
var myAlertTitle: JQuery;
var myAlertMsg: JQuery;
*/
var CHANGE = 'change';
var CHECKED = 'checked';
var DISABLED = 'disabled';
var SELECTED = 'selected';
var MOUSE_OVER = 'mouseover';
var MOUSE_OUT = 'mouseout';
var CLICK = 'click';
var HIDDEN = 'hidden';

var uplight;
(function (uplight) {
    var RegA = (function () {
        function RegA() {
            this.CATEGORY_SELECTED = 'CATEGORY_SELECTED';
            this.CATEGORY_NOTINLIS_CLOSE = 'CATEGORY_NOTINLIS_CLOSE';
            this.CATEGORY_ADD_SELECTED = 'CATEGORY_ADD_SELECTED';
            this.CATEGORY_REMOVE_SELECTED = 'CATEGORY_REMOVE_SELECTED';
            this.CATEGORY_REST = 'CATEGORY_REST';
            this.router = {
                'menu preview kiosk': RegA.SHOW_PREVIEW,
                'menu restart kiosks': RegA.RESTART_KIOSKS,
                'preview close': RegA.HIDE_PREVIEW,
                'view listing': RegA.VIEW_LISTING,
                'show-menu': RegA.SHOW_MENU
            };
            this.isSuper = false;
            this.settingsURL = 'settings.json';
            this.device = { device: 'admin', ln: 'en' };
        }
        RegA.prototype.register = function (obj) {
            this[obj.id] = obj;
        };

        RegA.prototype.getObject = function (id) {
            return this[id];
        };

        RegA.prototype.msg = function (message, container) {
        };
        RegA.prototype.message = function (msg) {
        };

        RegA.getInstance = function () {
            return RegA._instance;
        };
        RegA.SHOW_PREVIEW = 'SHOW_PREVIEW';
        RegA.HIDE_PREVIEW = 'HIDE_PREVIEW';
        RegA.RESTART_KIOSKS = 'RESTART_KIOSKS';
        RegA.VIEW_LISTING = 'VIEW_LISTING';
        RegA.HASH_CHANGED = 'HASH_CHANGED';
        RegA.SHOW_MENU = 'SHOW_MENU';
        RegA.ITEM_SELECTED = 'ITEM_SELECTED';

        RegA._instance = new RegA();
        return RegA;
    })();
    uplight.RegA = RegA;
    var VOPage = (function () {
        function VOPage() {
            this.label = '';
        }
        return VOPage;
    })();
    uplight.VOPage = VOPage;
    var VOCategory = (function () {
        function VOCategory(obj) {
            for (var str in obj)
                this[str] = obj[str];
        }
        return VOCategory;
    })();
    uplight.VOCategory = VOCategory;
    var VOResult = (function () {
        function VOResult() {
        }
        return VOResult;
    })();
    uplight.VOResult = VOResult;
    var VOItem = (function () {
        function VOItem(obj) {
            for (var str in obj)
                this[str] = obj[str];
        }
        return VOItem;
    })();
    uplight.VOItem = VOItem;

    var VOAL = (function () {
        function VOAL(obj) {
            for (var str in obj)
                this[str] = obj[str];
        }
        return VOAL;
    })();
    uplight.VOAL = VOAL;

    var VOStat = (function () {
        function VOStat() {
        }
        return VOStat;
    })();
    uplight.VOStat = VOStat;
})(uplight || (uplight = {}));
/// <reference path="RegA.ts" />
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
                            var all = ' ' + ar[i].info + ' ' + ar[i].uid;
                            if (all.indexOf(pat2) !== -1)
                                out3.push(ar[i]);
                        }
                    }
                }
                out = out1.concat(out2, out3);
            } else
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
    })();
    uplight.DestinantionsModel = DestinantionsModel;
})(uplight || (uplight = {}));
/// <reference path="../admin/rega.ts" />
/// <reference path="../typing/jquery.d.ts" />
var uplight;
(function (uplight) {
    var PagesList = (function () {
        function PagesList() {
            var _this = this;
            this.R = uplight.RegA.getInstance();
            this.view = $('#infoListView');

            this.panel1 = $('#panel1');
            this.upDown = $('#panel2').remove();

            this.list = $('#infoList').on(CLICK, 'li', function (evt) {
                return _this.onItemClick(evt);
            });
            this.btnAdd = this.panel1.find('[data-id=btnAdd]:first');
            this.btnDel = this.view.find('[data-id=btnDel]:first');
            this.btnCreate = this.panel1.find('[data-id=btnCreate]:first');

            // this.btnSave = this.view.find('[data-id=btnSave]:first').on(CLICK, () => this.onSaveClicked());
            // this.btnEdit = this.view.find('[data-id=btnEdit]').on(CLICK, () => this.onEditClicked());
            this.btnCancel = this.view.find('[data-id=btnCancel]');

            //  this.btnClose = this.panel2.find('[data-id=btnClose]:first').on(CLICK, () => this.onCloseClicked());
            //  this.tiName = this.panel2.find('[data-id=tiName]:first');
            // this.chkEnable = this.panel2.find('[data-id=chkEnable]:first');
            //  this.panel2.children('img').on(CLICK, (evt) => this.onUpDownClicked(evt));
            //this.editRow.on(CLICK, (evt) => this.onEditRowClick(evt));
            var nid = '#NewPage';
            this.tiNewPage = $(nid + ' input');
            this.pageSort = $(nid + ' b');
            this.newPage = $(nid).remove();

            this.isEdit = false;
            this.reset();
        }
        PagesList.prototype.loadData = function () {
            var _this = this;
            this.R.connector.getAllPages(function (res) {
                return _this.onData(res);
            });
        };

        PagesList.prototype.selectLast = function () {
            this.list.scrollTop(1000);
            if (this.selected)
                this.selected.removeClass(SELECTED);
            this.selected = this.list.children().last();
            this.selected.addClass(SELECTED);
        };

        PagesList.prototype.reset = function () {
            var _this = this;
            this.btnDel.addClass(DISABLED);

            //this.btnAdd.addClass(DISABLED);
            // this.btnEdit.addClass(DISABLED);
            //this.panel2.hide();
            this.btnCancel.remove();
            this.btnCreate.remove();
            this.btnAdd.on(CLICK, function () {
                return _this.onAddClicked();
            }).appendTo(this.panel1);
            this.btnDel.on(CLICK, function () {
                return _this.onDelClicked();
            }).appendTo(this.panel1);
        };

        PagesList.prototype.addPage = function (p) {
        };

        PagesList.prototype.onUpDownClicked = function (evt) {
            var btn = $(evt.currentTarget).data('id');
            var num = Number(this.pageSort.text());
            var max = this.pageSort.data('max');
            if (btn == 'btnUp' && num < max)
                this.pageSort.text((++num).toString());
            if (btn == 'btnDown' && num > 1)
                this.pageSort.text((--num).toString());
        };

        PagesList.prototype.onUpDown2Clicked = function (evt) {
            var _this = this;
            evt.stopPropagation();
            var btn = $(evt.currentTarget).data('id');

            if (btn == 'btnUp' && this.selected.prev().is('li'))
                this.selected.insertBefore(this.selected.prev());
            else if (btn == 'btnDown' && this.selected.next().is('li'))
                this.selected.insertAfter(this.selected.next());
            clearTimeout(this.delay);
            this.delay = setTimeout(function () {
                return _this.saveOrder();
            }, 2000);
        };

        /*
        private onCloneClick():void {
        if (this.btnAdd.hasClass(DISABLED))return;
        if (!this.selectedItem){
        this.btnAdd.addClass(DISABLED);
        return;
        }
        
        this.R.cover.empty();
        this.tiNewPage.val(this.selectedItem.label);
        var ind:number = this.list.children('#separator').index();
        //console.log(ind);
        this.pageSort.text(++ind);
        
        this.R.cover.append(this.newPage).appendTo('body');
        this.newPage.find('img').on(CLICK, (evt) => this.onUpDownClicked(evt));
        this.newPage.on(CLOSE,()=>{this.R.cover.remove();})
        this.newPage.on(CREATE,()=>{
        var name:string=this.tiNewPage.val();
        if(name.length<2) myMsg2('Name has to be 1 chars length',this.tiNewPage);
        else{
        var num:number =  Number(this.pageSort.text());
        var p:page.VOPage = new VOPage();
        p.label=name;
        p.id=0;
        p.sort=num;
        p.enable=1;
        p.old_id=this.selectedItem.id;
        this.selectedItem = p;
        this.R.connector.createPage(p,(resp)=>this.onPageCreated(resp));
        this.R.cover.remove();
        }
        
        });
        }
        */
        PagesList.prototype.updateSelected = function (p) {
            this.selectedItem = p;
            this.loadData();
            //this.selected.text(p.label);
            // if(p.enable==2)this.selected.addClass(DISABLED);
            //else this.selected.removeClass(DISABLED);
        };
        PagesList.prototype.onCreateClicked = function () {
            var _this = this;
            this.reset();
            this.showPages();
            console.log('nCreateClicked');

            // var num:number =  Number(this.pageSort.text());
            var p = new uplight.VOPage();
            p.label = this.selectedItem.label;
            p.id = 0;
            p.sort = 1000;
            p.enable = 2;
            p.old_id = this.selectedItem.id;
            this.selectedItem = p;
            this.R.connector.createPage(p, function (resp) {
                return _this.onPageCreated(resp);
            });
            // this.onChange(p);
            // this.showPages();
            // this.list.append(this.renderItem(p));
        };

        /*
        private onCreateClicked():void{
        if (!this.selectedItem) {
        this.btnCreate.addClass(DISABLED);
        return;
        }
        var data=this._data
        var max:number=1
        for (var i = 0, n = data.length; i < n; i++) {
        if(Number(data[i].enable)) max++;
        }
        this.R.cover.empty();
        this.tiNewPage.val(this.selectedItem.label);
        this.pageSort.data('max',max);
        this.pageSort.text(max);
        this.R.cover.append(this.newPage).appendTo('body');
        this.newPage.find('img').on(CLICK, (evt) => this.onUpDownClicked(evt));
        this.newPage.on(CLOSE,()=>{this.R.cover.remove();})
        this.newPage.on(CREATE,()=>{
        var name:string=this.tiNewPage.val();
        if(name.length<2) myMsg2('Name has to be 1 chars length',this.tiNewPage);
        else{
        var p:page.VOPage = new VOPage();
        p.label=name;
        p.id=0;
        p.sort= Number(this.pageSort.text());
        p.enable=2;
        p.old_id=this.selectedItem.id;
        this.selectedItem = p;
        this.R.connector.createPage(p,(resp)=>this.onPageCreated(resp));
        this.R.cover.remove();
        this.showPages();
        this.resetButtons();
        }
        
        });
        
        
        }
        */
        PagesList.prototype.onAddClicked = function () {
            var _this = this;
            console.log('addclicked');
            this.selectedItem = null;
            this.btnDel.remove();
            this.btnAdd.remove();

            this.btnCreate.on(CLICK, function () {
                return _this.onCreateClicked();
            }).addClass(DISABLED).appendTo(this.panel1);
            this.btnCancel.on(CLICK, function () {
                return _this.onCancelClicked();
            }).appendTo(this.panel1);
            this.showTemplates();
            var p = new uplight.VOPage();
            p.label = '';
            p.id = 0;
            p.enable = 2;
            p.content = '';
            if (this.onChange)
                this.onChange(p);
        };
        PagesList.prototype.onCancelClicked = function () {
            this.reset();
            this.showPages();
        };
        PagesList.prototype.onPageCreated = function (resp) {
            var id = Number(resp);
            if (isNaN(id)) {
                alert(resp);
                return;
            }
            this.selectedItem.id = id;
            this._data.push(this.selectedItem);

            /*
            
            var newEl:JQuery = $(this.renderItem(this.selectedItem));
            //console.log('this.selectedItem.sort',this.selectedItem.sort);
            // var max:number =  this.pageSort.data('max');
            // if(this.selectedItem.sort<max)
            var el:JQuery = this.list.children().eq(this.selectedItem.sort-1);
            console.log('el.length',el.length);
            if(el.length){
            newEl.insertBefore(el);
            this.saveOrder();
            }else this.list.append(newEl);
            
            this.selectIem(newEl);
            
            //  if(el.attr('id')!='separator')
            */
            var newEl = $(this.renderItem(this.selectedItem));
            console.log(newEl);
            this.list.append(newEl);
            this.selectIem(newEl);
            if (this.onChange)
                this.onChange(this.selectedItem);
        };
        PagesList.prototype.saveOrder = function () {
            var _this = this;
            // var ind:number = this.list.children('#separator').index();
            var ar = [];
            var n = this.list.children('p:last').index();
            console.log(n);
            for (var i = 1; i < n; i++) {
                ar.push(this.list.children().eq(i).data('id'));
            }

            // this.list.children().each(function (i, el) {
            //   if(i<max)  ar.push($(el).data('id'));
            // });
            console.log('Save Order ', ar);
            this.R.connector.savePagesSequence(ar, function (res) {
                return _this.onSaveOrder(res);
            });
        };
        PagesList.prototype.onSaveOrder = function (res) {
            console.log(res);
            // this.isOrder = false;
            //R.connector.updatePage(this.selectedItem, (res) => this.onSave(res));
        };

        /*
        private onUpDownClicked(evt: JQueryEventObject): void {
        var btn: string = $(evt.currentTarget).data('id');
        var num:number =  Number(this.pageSort.text());
        if (btn == 'btnUp' && num <= this.pageMax-1) this.pageSort.text((++num).toString());
        if(btn=='btnDown' && num>1 )this.pageSort.text((--num).toString());
        
        
        
        //console.log(this.selected);
        if (btn == 'btnUp') {
        this.isOrder = true;
        this.selected.insertBefore(this.selected.prev());
        } else {
        this.isOrder = true;
        this.selected.insertAfter(this.selected.next());
        }
        ///if (this.btnSave.hasClass(DISABLED)) myMsg("Don't forget save changes", this.btnSave);
        //this.btnSave.removeClass(DISABLED);
        
        }
        
        private onEditClicked(): void {
        if (!this.selectedItem) return;
        this.swithToEdit();
        }
        
        private swithToEdit(): void {
        this.tiName.val(this.selectedItem.label);
        this.chkEnable.prop(CHECKED, this.selectedItem.enable == 1);
        
        this.panel1.hide();
        this.panel2.show();
        this.isEdit = true;
        }
        
        private onCloseClicked(): void {
        this.panel1.show();
        this.panel2.hide();
        this.isEdit = false;
        }
        
        private onAddPage(res:any): void {
        if (!res.result) return;
        var page: VOPage = res.result;
        var el: JQuery
        if (!this._dataid[page.id]) {
        this._dataid[page.id] = page;
        this._data.push(page);
        el = $(this.renderItem(page)).appendTo(this.list);
        } else {
        el = this.list.children('[data-id=' + page.id+']');
        }
        
        // el.attr('tabindex', 1);
        this.selectedItem = this._dataid[page.id];
        this.selectIem(el);
        this.btnAdd.addClass(DISABLED);
        el.focus();
        
        }
        
        private onAddClicked(): void {
        if (this.btnAdd.hasClass(DISABLED)) return;
        // if (this.selectedItem.id == 0) return;
        var vo: VOPage = new VOPage();
        vo.enable = 1;
        vo.id = 0;
        vo.label = 'New Page';
        vo.sort = 1000;
        
        if (this.selected) {
        this.selected.removeClass(SELECTED);
        // this.editRow.remove();
        }
        this.selectedItem = vo;
        this.swithToEdit();
        if (this.onChange) this.onChange(vo);
        // if (this.onChange) this.onChange(vo);
        //R.connector.addPage((res) => this.onAddPage(res));
        
        }
        */
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////
        PagesList.prototype.onDelete = function (res) {
            this.selectedItem = null;
            if (this.onChange)
                this.onChange(null);
            this.loadData();
        };
        PagesList.prototype.onDeleteConfirmed = function () {
            var _this = this;
            this.R.connector.deletePage(this.selectedItem.id, function (res) {
                return _this.onDelete(res);
            });
        };
        PagesList.prototype.onDelClicked = function () {
            if (this.btnDel.hasClass(DISABLED))
                return;
            // showAlert("You want to delete Page " + this.selectedItem.label + '?',()=> this.onDeleteConfirmed(), 'Delete Page');
        };

        /*
        private onSaveClicked(): void {
        if (this.btnSave.hasClass(DISABLED)) return;
        this.btnSave.addClass(DISABLED);
        this.selectedItem.enable = this.chkEnable.prop(CHECKED)?1:0;
        this.selectedItem.label = this.tiName.val();
        
        if (this.isOrder) this.saveOrder();
        
        // else R.connector.updatePage(this.selectedItem, (res) => this.onSave(res));
        // this.saveAllPages();
        }
        */
        /*
        private onSave(resp): void {
        this.onData(resp);
        myMsg('Saved on server', this.btnSave);
        this.btnSave.removeClass(DISABLED);
        
        }
        */
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        /**/
        PagesList.prototype.onItemClick = function (evt) {
            var _this = this;
            if (this.isEdit)
                return;
            var sel = $(evt.currentTarget);
            var id = sel.data('id');
            if (isNaN(id))
                return;
            this.selectedItem = this.getItemById(id);
            if (!this.selectedItem)
                return;
            this.selectIem(sel);
            if (Number(this.selectedItem.enable == 1)) {
                this.upDown.off(CLICK);
                this.selected.prepend(this.upDown);
                this.upDown.on(CLICK, 'img', function (evt) {
                    return _this.onUpDown2Clicked(evt);
                });
            } else
                this.upDown.remove();

            //  this.btnEdit.removeClass(DISABLED);
            if (this.selectedItem.enable)
                this.btnDel.removeClass(DISABLED);
            else
                this.btnDel.addClass(DISABLED);
            this.btnCreate.removeClass(DISABLED);

            //this.btnAdd.removeClass(DISABLED);
            if (this.onChange)
                this.onChange(this.selectedItem);
        };

        PagesList.prototype.selectIem = function (el) {
            if (this.selected)
                this.selected.removeClass(SELECTED);
            this.selected = el;
            this.selected.addClass(SELECTED);
        };

        ////////////////////////////////////////////////////////////////
        PagesList.prototype.onData = function (resp) {
            this._data = resp;
            for (var i = 0, n = resp.length; i < n; i++)
                resp[i].enable = Number(resp[i].enable);

            console.log(resp);
            this.showPages();
            if (this.selectedItem) {
                this.selected = this.list.children('[data-id=' + this.selectedItem.id + ']').addClass(SELECTED);
            }
        };

        PagesList.prototype.showPages = function () {
            var data = this._data;

            // var out:string='';
            var out1 = '<p class="uplight title">Published:</p>';
            var out2 = '<p class="uplight title">Drafts:</p>';
            for (var i = 0, n = data.length; i < n; i++) {
                if (data[i].enable) {
                    if (data[i].enable == 1)
                        out1 += this.renderItem(data[i]);
                    else
                        out2 += this.renderItem(data[i]);
                }
            }

            this.list.removeClass('temp');
            this.list.html(out1 + out2);
            this.view.find('[data-id=title]').html('Pages');
        };
        PagesList.prototype.showTemplates = function () {
            var data = this._data;
            var out = '';
            for (var i = 0, n = data.length; i < n; i++) {
                if (!Number(data[i].enable))
                    out += this.renderItem(data[i]);
            }
            this.list.addClass('temp');
            this.list.html(out);
            this.view.find('[data-id=title]').html('Templates');
        };

        PagesList.prototype.getItemById = function (num) {
            for (var i = 0, n = this._data.length; i < n; i++)
                if (this._data[i].id == num)
                    return this._data[i];
            return null;
        };
        PagesList.prototype.renderItem = function (item) {
            return '<li class="uplight ' + ((item.enable == 2) ? 'disabled' : '') + '" data-id="' + item.id + '" >' + item.label + '</li>';
        };
        return PagesList;
    })();
    uplight.PagesList = PagesList;
})(uplight || (uplight = {}));
/// <reference path="models.ts" />
/// <reference path="rega.ts" />
/// <reference path="../typing/jquery.d.ts" />
/// <reference path="../page/PagesList.ts" />
var uplight;
(function (uplight) {
    var Connector = (function () {
        function Connector() {
            this.service = 'rem/admin.php';
            this.serviceK = 'rem/kiosk.php';
        }
        Connector.prototype.logout = function () {
            return $.post('rem/login.php', { credetials: 'logout' });
        };

        //////////////////////////Categories/////////////////////////////////////
        Connector.prototype.getCategories = function () {
            return $.get(this.service, { a: 'cats.get_all' }, 'application/json');
        };
        Connector.prototype.deleteCategory = function (id) {
            return $.get(this.service, { a: 'cats.delete', id: id }, 'application/json');
        };

        //addCategory(callBack: Function, label:string): void {
        //  $.get(this.service, { a: 'data.add_category', label: label }, 'application/json').done(callBack);
        // }
        Connector.prototype.saveCategorySortOrder = function (data) {
            return $.post(this.service + '?a=cats.sortorder', { sort: data }, 'application/json');
        };

        Connector.prototype.saveCategory = function (cat) {
            var data = cat;
            return $.post(this.service + '?a=cats.save', data, 'application/json');
        };
        Connector.prototype.saveCatDests = function (catid, destsIds) {
            return $.post(this.service + '?a=cats.save_cat_dests&id=' + catid, JSON.stringify(destsIds), 'application/json');
        };
        Connector.prototype.getIcons = function () {
            return $.get(this.service + '?a=cats.get_icons', 'application/json');
        };

        ////////////////////////////////////////////////////////////////////////////////////////////////
        //////////////////////////////////////Pages/////////////////////////////////////////
        Connector.prototype.savePageInfo = function (page, callBack) {
            $.post(this.service + '?a=pages.save_info&pageid=' + page.id, page.content).done(callBack);
        };
        Connector.prototype.getPageInfo = function (callBack, pageid) {
            $.get(this.service, { a: 'pages.get_info', pageid: pageid }).done(callBack);
        };
        Connector.prototype.getAllPages = function (callBack) {
            $.get(this.service + '?a=pages.get_all').done(callBack);
        };
        Connector.prototype.savePagesSequence = function (seq, callBack) {
            $.post(this.service + '?a=pages.save_order', { seq: seq }).done(callBack);
        };
        Connector.prototype.deletePage = function (pageid, callBack) {
            $.post(this.service + '?a=pages.delete', { pageid: pageid }).done(callBack);
        };
        Connector.prototype.createPage = function (page, callBack) {
            $.post(this.service + '?a=pages.add', page).done(callBack);
        };

        Connector.prototype.updatePage = function (page, callBack) {
            $.post(this.service + '?a=pages.update', page).done(callBack);
        };

        ///////////////////////////////////
        ////////////////////ImportExport////////////////////
        Connector.prototype.getStatistics = function () {
            var q = {};
            q.a = 'get_statistics';
            return $.get(this.service, q);
        };
        Connector.prototype.getUsage = function (devices, from, to) {
            var q = {};
            q.a = 'get_usage';
            q.from = from;
            q.to = to;
            q.devices = devices;
            console.log(devices);
            return $.get(this.service, q);
        };
        Connector.prototype.exportDestination = function () {
            return $.get(this.service + '?a=importexport.get_all');
        };

        Connector.prototype.insertdDestinations = function (data, overwrite) {
            var and = overwrite ? '&overwrite=true' : '';

            return $.post(this.service + '?a=importexport.insert_destinations' + and, data);
        };

        Connector.prototype.insertCategories = function (data, overwrite) {
            var and = overwrite ? '&overwrite=true' : '';
            return $.post(this.service + '?a=importexport.insert_categories' + and, JSON.stringify(data));
        };

        Connector.prototype.saveInFile = function (ar, filename) {
            return $.post(this.service + '?a=importexport.save_file&filename=' + filename, JSON.stringify(ar));
        };

        Connector.prototype.uploadCSV = function (form, completeHandler, errorHandler, onProgress) {
            $.ajax({
                url: this.service + '?a=importexport.parse_csv',
                type: 'POST',
                xhr: function () {
                    var myXhr = $.ajaxSettings.xhr();
                    if (myXhr.upload) {
                        myXhr.upload.addEventListener('progress', onProgress, false);
                    }
                    return myXhr;
                },
                // Form data
                data: form,
                //Options to tell jQuery not to process data or worry about content-type.
                cache: false,
                contentType: false,
                processData: false
            }).done(completeHandler).fail(errorHandler);
        };

        //////////////////////////////Destinations///////////////////
        // saveCatDests(callBack: Function, data: {}): void {
        //    $.post(this.service + '?a=dests.saveCatDests', data).done(callBack);
        // }
        //  addDests(callBack: Function, data: {}): void {
        //    $.post(this.service + '?a=dests.add', JSON.stringify(data)).done(callBack);
        // }
        // overWriteDests(callBack: Function, data: {}): void {
        //   $.post(this.service + '?a=dests.overwrite', JSON.stringify(data)).done(callBack);
        // }
        Connector.prototype.dropTable = function (table) {
            return $.get(this.service + '?a=dests.drop_table&table=' + table);
        };

        Connector.prototype.uploadDestinationImage = function (form, uid) {
            return $.ajax({
                url: this.service + '?a=dests.dest_image&id=' + uid,
                type: 'POST',
                dataType: 'json',
                data: form,
                cache: false,
                contentType: false,
                processData: false
            });
        };
        Connector.prototype.deleteDestination = function (id) {
            return $.get(this.service + '?a=dests.delete&destid=' + id);
        };
        Connector.prototype.saveDestination = function (data) {
            // console.log(vo);
            return $.post(this.service + '?a=destination.save', data);
        };
        Connector.prototype.savePage = function (url, data) {
            return $.post(this.service + '?a=save_page&url=' + url, data);
        };
        Connector.prototype.getPage = function (url) {
            return $.get(this.service + '?a=get_page&url=' + url);
        };
        Connector.prototype.getAdvanced = function (callBack, destid) {
            $.get(this.service + '?a=dests.get_advanced&destid=' + destid).done(callBack);
        };

        Connector.prototype.getDestinations = function () {
            return $.get(this.service + '?a=dests.get_dests');
        };

        ///////////////////////////////////////////////////////SCREEN/////////////////////////////////////////////
        Connector.prototype.uploadImage = function (form, folder, prefix) {
            return $.ajax({
                url: this.service + '?a=upload_image&folder=' + folder + '&prefix=' + prefix,
                type: 'POST',
                dataType: 'json',
                data: form,
                cache: false,
                contentType: false,
                processData: false
            });
        };
        Connector.prototype.getServerTime = function () {
            return $.get(this.service + '?a=screen.get_server_time');
        };
        Connector.prototype.getDevices = function () {
            return $.get(this.service + '?a=get_devices');
        };
        Connector.prototype.getDevicesData = function () {
            return $.get(this.service + '?a=get_devices_data');
        };
        Connector.prototype.restartKiosks = function () {
            return $.get(this.service + '?a=restart_kiosks');
        };

        Connector.prototype.getData = function (filename) {
            return $.get(this.service + '?a=get_data&file_name=' + filename);
        };
        Connector.prototype.saveData = function (data, filename) {
            console.log('save data ' + filename);
            return $.post(this.service + '?a=save_data&file_name=' + filename, data);
        };

        Connector.prototype.getLabels = function () {
            return $.get(this.service + '?a=screen.get_labels', 'application/json');
        };

        Connector.prototype.getImages = function () {
            return $.get(this.service + '?a=screen.get_images', 'application/json');
        };

        Connector.prototype.saveLabels = function (data) {
            return $.post(this.service + '?a=screen.save_labels', JSON.stringify(data));
        };
        return Connector;
    })();
    uplight.Connector = Connector;
})(uplight || (uplight = {}));
/**
* Created by VladHome on 8/16/2015.
*/
/// <reference path="../RegA.ts" />
var uplight;
(function (uplight) {
    var GalleryList = (function () {
        function GalleryList(data_url) {
            var _this = this;
            this.data_url = data_url;
            this.connector = uplight.RegA.getInstance().connector;

            this.view = $('#Template [data-ctr=GalleryPreview]:first').clone();
            this.list = $('<ul>').appendTo(this.view.find('.nano')).hide();

            this.btnShowImages = this.view.find('[data-id=btnShowImages]').click(function () {
                return _this.onShowImages();
            });
            this.btnEdit = this.view.find('[data-id=btnEdit]:first').click(function () {
                return _this.onEditClick();
            });
            this.loadData();
            // this.renderProp();
        }
        GalleryList.prototype.getVOAL = function () {
            return this.vo;
        };

        GalleryList.prototype.getEditorView = function () {
            return this.editor.getView();
        };

        GalleryList.prototype.onEditorClose = function () {
            this.view.show();
            this.editor.view.remove();
            this.loadData();
            if (this.onEditExit)
                this.onEditExit();
        };
        GalleryList.prototype.onEditClick = function () {
            var _this = this;
            console.log(this.data);
            if (!this.editor)
                this.editor = new GalleryAdmin({});
            this.editor.onClose = function () {
                return _this.onEditorClose();
            };
            this.editor.setData(this.data);
            this.view.hide();
            this.editor.getView().insertAfter(this.view);
            if (this.onEdit)
                this.onEdit();
        };

        GalleryList.prototype.onShowImages = function () {
            if (this.btnShowImages.data('vis')) {
                this.list.hide('fast');
                this.btnShowImages.data('vis', false);
                this.btnShowImages.children().last().text('Show Images');
            } else {
                this.btnShowImages.data('vis', true);
                this.list.show('fast');
                this.btnShowImages.children().last().text('Hide Images');
            }
        };

        GalleryList.prototype.setData = function (data) {
            this.data = data;
            this.vo = data.props;
            this.renderData();
            this.renderProp();
        };

        GalleryList.prototype.renderProp = function () {
            this.view.find('[data-id=name]').text(this.vo.name);
            this.view.find('[data-id=delay]').text(this.vo.delay);
            this.view.find('[data-id=size]').text(this.vo.size);
        };
        GalleryList.prototype.renderData = function () {
            var ar = this.data.gallery;
            var out = '';
            for (var i = 0, n = ar.length; i < n; i++) {
                out += '<li data-i="' + i + '"><img src="' + ar[i] + '" /></li>';
            }
            this.list.html(out);
        };
        GalleryList.prototype.loadData = function () {
            var _this = this;
            this.connector.getData(this.data_url).done(function (res) {
                return _this.setData(JSON.parse(res));
            });
        };
        return GalleryList;
    })();
    uplight.GalleryPreview = GalleryList;

    var GalleryAdmin = (function () {
        function GalleryAdmin(opt) {
            this.selector = '#Template [data-ctr=GalleryAdmin]:first';
            this.connector = uplight.RegA.getInstance().connector;
            for (var str in opt)
                this[str] = opt[str];
            this.init();
        }
        GalleryAdmin.prototype.getView = function () {
            var _this = this;
            setTimeout(function () {
                return _this.addListeners();
            }, 100);
            ;
            this.reset();
            return this.view;
        };

        GalleryAdmin.prototype.setData = function (data) {
            this.data = data;
            this.props = data.props;
            this.gallery = data.gallery;
            this.render();
        };

        GalleryAdmin.prototype.onSaveResult = function (res) {
            if (res.success) {
                uplight.RegA.getInstance().msg('Saved', this.btnSave);
            } else {
                if (typeof res == 'Object')
                    res = JSON.stringify(res);
                alert(res);
            }
        };

        GalleryAdmin.prototype.onSaveClick = function () {
            var btn = this.btnSave.addClass(DISABLED);
            setTimeout(function () {
                btn.removeClass(DISABLED);
            }, 1000);
            this.save();
        };

        GalleryAdmin.prototype.save = function () {
            var _this = this;
            var del = Number(this.tiDelay.val());
            if (isNaN(del)) {
                alert('Delay has to be a number');
            } else {
                this.props.delay = del;

                // console.log(this.props.data_url,this.data);;
                this.connector.saveData(JSON.stringify(this.data), this.props.data_url).done(function (res) {
                    return _this.onSaveResult(res);
                });
            }
        };

        GalleryAdmin.prototype.loadData = function () {
            var _this = this;
            this.connector.getData(this.props.data_url).done(function (res) {
                return _this.setData(JSON.parse(res));
            });
            return this;
        };

        GalleryAdmin.prototype.reset = function () {
            if (this.mode == 1)
                this.viewUploadAdd.addClass('hidden');
            if (this.mode == 2)
                this.viewUploadEdit.addClass('hidden');
        };

        GalleryAdmin.prototype.renderProp = function () {
            this.selected = null;
            this.view.find('[data-id=name]').text(this.props.name);
            this.tiDelay.val(this.props.delay);
            this.view.find('[data-id=size]').text(this.props.size);
        };
        GalleryAdmin.prototype.render = function () {
            this.renderProp();
            var out = '';
            var ar = this.gallery;
            for (var i = 0, n = ar.length; i < n; i++) {
                out += this.renderItem(ar[i], i);
            }

            this.list.html(out);
        };

        GalleryAdmin.prototype.renderItem = function (item, i) {
            return '<li data-i="' + i + '"><img src="' + item + '" /></li>';
        };

        GalleryAdmin.prototype.getData = function () {
            return this.data;
        };

        //src:string;
        //data_url:string;
        //id:number;
        // size:string;
        GalleryAdmin.prototype.init = function () {
            this.view = $(this.selector).clone();
            this.btnAdd = this.view.find('[data-id=btnAdd]:first');
            this.btnEdit = this.view.find('[data-id=btnEdit]:first');
            this.btnDelete = this.view.find('[data-id=btnDelete]:first');
            this.viewUploadAdd = this.view.find('[data-id=viewUploadAdd]:first');
            this.btnUplaodAdd = this.view.find('[data-id=btnUploadAdd]:first');
            this.viewUploadEdit = this.view.find('[data-id=viewUploadEdit]:first');
            this.btnUploadEdit = this.view.find('[data-id=btnUploadEdit]:first');
            this.btnClose = this.view.find('[data-id=btnClose]');

            this.preview = this.view.find('[data-id=preview]:first');

            this.tiDelay = this.view.find('[data-id=delay]');

            this.btnSave = this.view.find('[data-id=btnSave]');
            this.name = this.view.find('[data-id=name]:first');

            //this.preview.width(dem[0]).height(dem[1]);
            this.list = $('<ul>').addClass('list');
            this.listView = this.view.find('.nano:first').append(this.list);
        };

        GalleryAdmin.prototype.onUploadResult = function (res) {
            if (res.success) {
                if (this.selected) {
                    var i = this.selected.data('i');
                    this.gallery[i] = res.result;
                } else
                    this.gallery.push(res.result);

                this.render();
            }
        };

        GalleryAdmin.prototype.onUploadResultAdd = function (res) {
            console.log(res);
            if (res.success) {
                this.data.push(res.result);
                this.render();
            }
        };

        GalleryAdmin.prototype.onFileSelected = function (evt) {
            var _this = this;
            var input = evt.target;
            var files = input.files;
            if (files.length) {
                var form = new FormData();
                form.append('file', files[0]);
                this.connector.uploadImage(form, 'al', ('al' + this.props.id)).done(function (res) {
                    return _this.onUploadResult(res);
                });
            }
            this.reset();
        };

        GalleryAdmin.prototype.onAddClick = function () {
            this.reset();
            this.mode = 1;
            this.viewUploadAdd.removeClass('hidden');
            this.resetSelected();
        };

        GalleryAdmin.prototype.onEditClick = function () {
            this.reset();
            if (!this.selected)
                return;
            this.mode = 2;
            this.viewUploadEdit.removeClass('hidden');
        };

        GalleryAdmin.prototype.onDeleteClick = function () {
            this.reset();
            if (!this.selected)
                return;
            var i = this.selected.data('i');
            if (isNaN(i))
                return;
            if (confirm('You want to remove selected image from list?')) {
                this.gallery.splice(i, 1);
                this.selected = null;
                this.render();
            }
        };

        GalleryAdmin.prototype.resetSelected = function () {
            if (this.selected)
                this.selected.removeClass(SELECTED);
            this.selected = null;
        };

        GalleryAdmin.prototype.selectImage = function (evt) {
            this.reset();
            this.resetSelected();
            var $el = $(evt.currentTarget);
            var i = $el.data('i');
            if (isNaN(i))
                return;
            $el.addClass(SELECTED);
            this.selected = $el;
        };

        GalleryAdmin.prototype.onCloseClick = function () {
            if (this.onClose)
                this.onClose();
        };
        GalleryAdmin.prototype.addListeners = function () {
            var _this = this;
            this.btnAdd.click(function () {
                return _this.onAddClick();
            });
            this.btnEdit.click(function () {
                return _this.onEditClick();
            });
            this.btnDelete.click(function () {
                return _this.onDeleteClick();
            });
            this.btnUplaodAdd.change(function (evt) {
                return _this.onFileSelected(evt);
            });
            this.btnUploadEdit.change(function (evt) {
                return _this.onFileSelected(evt);
            });
            this.list.on(CLICK, 'li', function (evt) {
                return _this.selectImage(evt);
            });
            this.btnClose.click(function () {
                return _this.onCloseClick();
            });
            this.btnSave.click(function () {
                return _this.onSaveClick();
            });
        };
        return GalleryAdmin;
    })();
    uplight.GalleryAdmin = GalleryAdmin;
})(uplight || (uplight = {}));
/// <reference path="../../typing/jquery.d.ts" />
var uplight;
(function (uplight) {
    var BreadCrumbs = (function () {
        function BreadCrumbs(view) {
            var _this = this;
            this.view = view;
            this.list = $('<ul>').addClass('breadcrumb').appendTo(view);
            this.list.on(CLICK, 'li', function (evt) {
                return _this.onListClick(evt);
            });
        }
        BreadCrumbs.prototype.addCrumb = function (url, text) {
            if (this.selected)
                this.selected.removeClass('active');

            // this.selected =$('<li>').addClass('active').data('id',url).append($('<a>').attr('href',this.home+'/'+url).text(text)).appendTo(this.list);
            this.selected = $('<li>').addClass('active').data('id', url).text(text).appendTo(this.list);
        };
        BreadCrumbs.prototype.clear = function () {
            this.selected = null;
            this.list.html('');
        };
        BreadCrumbs.prototype.removeLast = function () {
            this.list.children().last().detach();
            this.selected = this.list.children().last().addClass('active');
        };
        BreadCrumbs.prototype.onListClick = function (evt) {
            var el = $(evt.currentTarget);
            if (this.onCiick)
                this.onCiick(el.data('id'));
        };
        return BreadCrumbs;
    })();
    uplight.BreadCrumbs = BreadCrumbs;
    var Confirm = (function () {
        function Confirm(view) {
            var _this = this;
            this.view = view;
            this.title = view.find('[data-id=title]:first');
            this.text = view.find('[data-id=text]:first');
            this.btnClose = view.find('[data-id=btnClose]:first').click(function () {
                _this.hide();
            });
            this.btnYes = view.find('[data-id=btnYes]:first').click(function () {
                _this.hide();
                if (_this.onYes)
                    _this.onYes();
            });
            this.btnNo = view.find('[data-id=btnNo]:first').click(function () {
                _this.hide();
                if (_this.onNo)
                    _this.onNo();
            });
        }
        Confirm.prototype.hide = function () {
            this.view.fadeOut();
        };
        Confirm.prototype.show = function (title, text, onYes, onNo) {
            this.title.text(title);
            this.text.html(text);
            this.onYes = onYes;
            this.onNo = onNo;
            this.view.fadeIn();
            this.view.show();
        };
        return Confirm;
    })();
    uplight.Confirm = Confirm;
})(uplight || (uplight = {}));
/**
* Created by VladHome on 9/2/2015.
*/
/// <reference path="../../typing/jquery.d.ts" />
/// <reference path="../DirsAdmin.ts" />
/// <reference path="../com/Utils.ts" />
var uplight;
(function (uplight) {
    var IconsLibrary = (function () {
        function IconsLibrary(view) {
            var _this = this;
            this.view = view;
            this.iconsLibrary = $('<div>').appendTo(view);
            this.R = uplight.RegA.getInstance();
            this.R.connector.getIcons().done(function (data) {
                return _this.onIconsLoaded(data);
            });
            this.iconPreview = $('<div>').addClass('abs preview').appendTo(this.view);
            this.view.find('[data-id=btnCloseL]:first').click(function () {
                return _this.hide();
            });
        }
        IconsLibrary.prototype.hide = function () {
            if (this.isVis) {
                this.view.hide('fast');
                this.isVis = false;
            }
        };

        IconsLibrary.prototype.show = function () {
            if (!this.isVis) {
                this.view.show('fast');
                this.view.removeClass(HIDDEN);
                this.isVis = true;
            }
        };

        IconsLibrary.prototype.toggle = function () {
            if (this.isVis)
                this.hide();
            else
                this.show();
        };

        IconsLibrary.prototype.renderIconsTopic = function (topic) {
            var out = '<div class="topic"><h3>' + topic[0] + '</h3><div class="list">';
            ;
            var ar = topic;
            for (var i = 1, n = ar.length; i < n; i++) {
                out += '<div class="fa fa-' + ar[i] + '" ></div>';
            }
            return out + '</div></div>';
        };

        IconsLibrary.prototype.onIconsLoaded = function (data) {
            var _this = this;
            var topics;
            var out = '';
            var ar = data;
            for (var i = 0, n = ar.length; i < n; i++) {
                out += this.renderIconsTopic(ar[i]);
            }

            this.iconsLibrary.html(out);
            this.iconsLibrary.on(CLICK, '.fa', function (evt) {
                return _this.onIcionLibraryClick($(evt.currentTarget));
            });
            this.iconsLibrary.on(MOUSE_OVER, '.fa', function (evt) {
                return _this.onIcionLibraryOver($(evt.currentTarget));
            });
            this.iconPreview.on(MOUSE_OUT, '.fa', function (evt) {
                return _this.onIcionLibraryOut($(evt.currentTarget));
            });
            this.iconPreview.on(CLICK, '.fa', function (evt) {
                return _this.onIcionLibraryClick($(evt.currentTarget));
            });
        };

        IconsLibrary.prototype.onIcionLibraryClick = function (el) {
            var cl = el.attr('class');
            if (this.onSelect)
                this.onSelect(cl);
        };

        IconsLibrary.prototype.onIcionLibraryOver = function (el) {
            this.iconPreview.html(el.clone());
            this.iconPreview.css('left', el.position().left).css('top', el.position().top);
            this.iconPreview.fadeIn();
        };
        IconsLibrary.prototype.onIcionLibraryOut = function (el) {
            this.iconPreview.hide();
        };
        return IconsLibrary;
    })();
    uplight.IconsLibrary = IconsLibrary;

    var TextEditor = (function () {
        function TextEditor(view) {
            var _this = this;
            this.view = view;
            this.R = uplight.RegA.getInstance();

            view.find('[data-id=btnCloseT]:first:first').click(function () {
                return _this.hide();
            });

            this.editor = new nicEditor({ fullPanel: true });
            this.editor.setPanel('NicPanelPage');
            this.editor.addInstance('PageBody');
            this.content = $('#PageBody');
            this.content.width(730).height(1100);

            this.btnDisregard = view.find('[data-id=btnDisregard]:first').click(function () {
                _this.loadPage(_this.data);
            });
        }
        TextEditor.prototype.show = function () {
            if (!this.isVis) {
                this.isVis = true;
                this.view.show();
                this.view.removeClass(HIDDEN);
            }
        };
        TextEditor.prototype.hide = function () {
            if (this.isVis) {
                this.isVis = false;
                this.view.hide();
            }
        };

        TextEditor.prototype.saveClicked = function () {
        };

        TextEditor.prototype.toggle = function () {
            if (this.isVis)
                this.hide();
            else
                this.show();
        };
        TextEditor.prototype.setData = function (data) {
            this.data = data;
            this.loadPage(data);
        };
        TextEditor.prototype.loadPage = function (url) {
            if (url)
                $('#PageBody').load(url + '?' + (new Date()).getSeconds(), function (res) {
                    //console.log(res);
                });
            else
                $('#PageBody').html('');
            // nicEditors.findEditor(this.contId.substr(1)).setContent(resp);
        };

        TextEditor.prototype.savePage = function (url) {
            return this.R.connector.savePage(url, this.content.html());
        };
        TextEditor.prototype.getData = function () {
            return this.data;
        };
        return TextEditor;
    })();
    uplight.TextEditor = TextEditor;

    var InfoEditor = (function () {
        function InfoEditor() {
            var _this = this;
            this.view = $('#InfoPagesEditor');
            this.view.find('[data-id=btnClose]').click(function () {
                _this.iconsLibrary.hide();
                _this.textEditor.hide();
                _this.onClose();
            });

            this.btnSave = this.view.find('[data-id=btnSave]:first').click(function () {
                _this.btnSave.prop('disabled', true);
                _this.iconsLibrary.hide();
                _this.textEditor.saveClicked();
                setTimeout(function () {
                    _this.btnSave.prop('disabled', false);
                }, 3000);
                if (_this.onSave)
                    _this.onSave();
            });
            this.selSeq = this.view.find('[data-id=selSeq]:first');
            this.icon = this.view.find('[data-id=icon]:first');
            this.btnEditIcon = this.view.find('[data-id=btnEditIcon]:first');
            this.tiName = this.view.find('[data-id=tiName]:first');
            this.chkEnabled = this.view.find('[data-id=chkEnabled]:first');
            this.iconsLibrary = new IconsLibrary(this.view.find('[data-id=iconsLibrary]:first'));
            this.iconsLibrary.onSelect = function (str) {
                _this.icon.attr('class', str);
            };

            this.btnBlankIcon = this.view.find('[data-id=btnBlankIcon]:first').click(function () {
                _this.icon.attr('class', 'fa fa-fw');
            });

            this.btnFromTemplate = this.view.find('[data-id=btnFromTemplate]:first').click(function () {
                if (!_this.selTemplate)
                    _this.selTemplate = _this.createSelect();
                if (_this.selTemplate.hasClass(HIDDEN))
                    _this.selTemplate.removeClass(HIDDEN);
                else
                    _this.selTemplate.addClass(HIDDEN);
            });

            this.textEditor = new TextEditor(this.view.find('[data-ctr=TextEditor]:first'));

            this.btnEditIcon.on(CLICK, function () {
                return _this.onEditIconClick();
            });

            this.btnEditText = this.view.find('[data-id=btnEditText]:first').click(function () {
                _this.textEditor.toggle();
                _this.iconsLibrary.hide();
            });

            this.icon.parent().on(CLICK, function () {
                return _this.onEditIconClick();
            });
            //this.iconPreview=$('<div>').addClass('absolute preview').appendTo(this.iconsLibrary.view.parent());
        }
        InfoEditor.prototype.createSelect = function () {
            var _this = this;
            var selTemplate = this.view.find('[data-id=selTemplate]:first').change(function () {
                var url = _this.selTemplate.val();

                _this.textEditor.loadPage(url);
            });

            this.R.connector.getData('pages_templates.json').done(function (res) {
                console.log(res);
                var ar = JSON.parse(res);
                if (!Array.isArray(ar)) {
                    alert('Error loading templates');
                    return;
                }
                var out = '<option></option>';
                for (var i = 0, n = ar.length; i < n; i++) {
                    var item = ar[i];
                    out += '<option value="' + item.url + '">' + item.name + '</option>';
                }
                _this.selTemplate.html(out);
            });
            return selTemplate;
        };

        InfoEditor.prototype.onEditIconClick = function () {
            this.iconsLibrary.toggle();
            this.textEditor.hide();
        };
        InfoEditor.prototype.savePage = function () {
            return this.textEditor.savePage(this.data.url);
        };

        InfoEditor.prototype.render = function () {
            this.icon.attr('class', this.data.icon);
            this.selSeq.val(this.data.seq);
            this.tiName.val(this.data.name);
            this.chkEnabled.prop('checked', this.data.enabled);
        };

        InfoEditor.prototype.setSeq = function (num) {
            var out = '';
            for (var i = 1, n = num; i < n; i++) {
                out += '<option value="' + i + '">' + i + '</option>';
            }
            this.selSeq.html(out);
        };

        InfoEditor.prototype.setData = function (data) {
            this.data = data;
            this.textEditor.setData(data.url);
            if (data.id === 0)
                this.textEditor.show();

            /////////////////////////////////////////////
            this.render();
        };
        InfoEditor.prototype.getData = function () {
            if (!this.data)
                return null;
            this.data.icon = this.icon.attr('class');
            this.data.seq = this.selSeq.val();
            this.data.name = this.tiName.val();
            this.data.enabled = this.chkEnabled.prop('checked');

            return this.data;
        };
        InfoEditor.prototype.hide = function () {
            this.view.hide();
        };
        InfoEditor.prototype.show = function () {
            this.view.show();
            this.view.removeClass('hidden');
        };
        return InfoEditor;
    })();
    uplight.InfoEditor = InfoEditor;

    var InfoPagesManager = (function () {
        function InfoPagesManager(content) {
            var _this = this;
            this.selectedIndex = -1;
            this.max = 0;
            this.R = uplight.RegA.getInstance();
            content.load('htms/admin/InfoPagesEditor.html', function () {
                return _this.init();
            });
        }
        InfoPagesManager.prototype.init = function () {
            var _this = this;
            this.view = $('#InfoPagesManager');
            this.listing = $('#InfoPagesListing');
            this.breadCrumbs = new uplight.BreadCrumbs(this.view.find('[data-ctr=BreadCrumbs]:first'));
            this.breadCrumbs.onCiick = function (url) {
                console.log(url);
                if (url == 'listing') {
                    _this.showListing();
                }
                // else if (url=='DetailsForm')this.detailsForm.showDetails();
            };
            this.breadCrumbs.addCrumb('listing', 'Listing');
            this.url = this.R.settings.pages;

            this.iEditor = new InfoEditor();
            this.iEditor.onClose = function () {
                _this.showListing();
            };
            this.iEditor.R = this.R;

            this.iEditor.onSave = function () {
                return _this.onSaveClicked();
            };

            this.btnAdd = this.view.find('[data-id=btnAdd]:first').click(function () {
                return _this.onAddClicked();
            });
            this.btnEdit = this.view.find('[data-id=btnEdit]:first').click(function () {
                return _this.onEditClicked();
            });
            this.btnDelete = this.view.find('[data-id=btnDelete]').click(function () {
                return _this.onDelClicked();
            });
            var table = $('<table>').addClass('table').html('<tr><th>ID</th><th>Icon</th><th>Name</th><th>Sequence</th><th>Enabled</th></tr>');
            this.list = $('<tbody>').appendTo(table);
            this.list.on(CLICK, 'tr', function (evt) {
                return _this.onListClick(evt);
            });
            $('#InfoPagesList').append(table);
            this.loadData();
        };

        InfoPagesManager.prototype.onListClick = function (evt) {
            var i = $(evt.currentTarget).data('i');
            if (isNaN(i))
                return;
            if (this.selected)
                this.selected.removeClass(SELECTED);
            this.selected = $(evt.currentTarget);
            this.selected.addClass(SELECTED);
            this.selectedIndex = i;
            this.iEditor.setData(this.data[i]);
        };
        InfoPagesManager.prototype.hideListing = function () {
            this.listing.hide();
        };
        InfoPagesManager.prototype.showListing = function () {
            this.iEditor.hide();
            this.breadCrumbs.clear();
            this.breadCrumbs.addCrumb('listing', 'Listing');
            this.listing.show();
        };
        InfoPagesManager.prototype.onAddClicked = function () {
            this.max++;
            var item = { id: 0, icon: '', name: '', seq: this.data.length, enabled: true };
            this.iEditor.setData(item);
            this.iEditor.show();
            this.hideListing();
            this.breadCrumbs.addCrumb('pageeditor', 'Page Editor');
        };
        InfoPagesManager.prototype.onSaveClicked = function () {
            var _this = this;
            var item = this.iEditor.getData();
            if (!item)
                return;
            if (item.id === 0) {
                this.max++;
                item.id = this.max;
                item.url = 'pages/page' + item.id + '.htm';
                this.data.push(item);
            }
            this.iEditor.savePage();
            this.save().done(function (res) {
                console.log(res);
                if (res.success)
                    _this.R.msg('Data saved', _this.iEditor.btnSave);
            });
        };

        InfoPagesManager.prototype.onData = function (data) {
            this.data = JSON.parse(data);

            this.render();
        };
        InfoPagesManager.prototype.render = function () {
            this.max = 0;
            var ar = this.data;
            var out = '';
            for (var i = 0, n = ar.length; i < n; i++) {
                var item = ar[i];
                item.seq = i + 1;
                if (item.id > this.max)
                    this.max = item.id;
                out += '<tr data-i="' + i + '" class="item"><td>' + item.id + '</td><td><span class="' + item.icon + '"></span></td><td>' + item.name + '</td><td>' + item.seq + '</td><td>' + item.enabled + '</td></tr>';
            }
            this.list.html(out);
            this.iEditor.setSeq(n + 2);

            if (this.selectedIndex != -1) {
                this.list.find('[data-i=' + this.selectedIndex + ']').addClass(SELECTED);
            }
        };

        InfoPagesManager.prototype.onEditClicked = function () {
            var _this = this;
            if (this.selectedIndex == -1)
                return;
            var item = this.data[this.selectedIndex];
            this.iEditor.setData(item);
            this.iEditor.onSave = function () {
                return _this.onSaveClicked();
            };
            this.iEditor.show();
            this.hideListing();
            this.breadCrumbs.addCrumb('pageeditor', 'Page Editor');
        };

        InfoPagesManager.prototype.loadData = function () {
            var _this = this;
            this.R.connector.getData(this.url).done(function (res) {
                return _this.onData(res);
            });
        };

        InfoPagesManager.prototype.onDeleteSuccess = function (res) {
            console.log(res);
            this.R.msg('Item Deleted', this.btnDelete);
            this.loadData();
        };
        InfoPagesManager.prototype.save = function () {
            var data = _.sortBy(this.data, 'seq');
            return this.R.connector.saveData(JSON.stringify(data), this.url);
        };
        InfoPagesManager.prototype.onDelClicked = function () {
            var _this = this;
            if (this.selectedIndex == -1)
                return;
            var item = this.data[this.selectedIndex];
            if (confirm('Yoy want to delete Page ' + item.name + '?')) {
                this.data.splice(this.selectedIndex, 1);
                this.selectedIndex = -1;
                this.save().done(function (res) {
                    return _this.onDeleteSuccess(res);
                });
                ;
            }
        };
        return InfoPagesManager;
    })();
    uplight.InfoPagesManager = InfoPagesManager;
})(uplight || (uplight = {}));
/**
* Created by VladHome on 10/3/2015.
*/
///<reference path="../DirsAdmin.ts" />
var uplight;
(function (uplight) {
    var FrontPageEditor = (function () {
        function FrontPageEditor(container) {
            var _this = this;
            container.load('htms/admin/FrontPageEditor.htm', function () {
                return _this.init();
            });
        }
        FrontPageEditor.prototype.appendTo = function (container) {
            container.append(this.view);
            this.reloadPage();
        };

        FrontPageEditor.prototype.init = function () {
            var _this = this;
            this.view = $('#FrontPageEditor');
            this.btnAdd = this.view.find('[data-id=btnAdd]:first').click(function () {
                return _this.onAddClicked();
            });
            this.btnEdit = this.view.find('[data-id=btnEdit]:first').click(function () {
                return _this.onEditClicked();
            });
            this.btnDelete = this.view.find('[data-id=btnDelete]').click(function () {
                return _this.onDelClicked();
            });
            this.btnSave = this.view.find('[data-id=btnSave]').click(function () {
                return _this.onSaveClicked();
            });
            this.editor = this.view.find('[data-id=editor]:first');

            if (uplight.RegA.getInstance().settings.front_page) {
                this.btnAdd.addClass(HIDDEN);
                this.btnDelete.addClass(HIDDEN);
                //TODO make add and delrtr work
            } else {
                this.btnDelete.addClass(HIDDEN);
                this.btnEdit.addClass(HIDDEN);
                this.btnSave.addClass(HIDDEN);
            }
            this.reloadPage();
        };

        FrontPageEditor.prototype.onAddClicked = function () {
        };
        FrontPageEditor.prototype.hideEdit = function () {
            this.isEdit = false;
            $('#NicPanelPage').hide();
            this.editor.attr('contenteditable', false);
        };

        FrontPageEditor.prototype.onEditClicked = function () {
            if (!this.nicEdit) {
                this.nicEdit = new nicEditor({ fullPanel: true });
                this.nicEdit.setPanel('NicPanelPage');
                this.nicEdit.addInstance('PageBody');
            }
            if (this.isEdit)
                this.hideEdit();
            else {
                this.isEdit = true;
                this.editor.attr('contenteditable', true);
                $('#NicPanelPage').show();
            }
        };
        FrontPageEditor.prototype.onDelClicked = function () {
        };

        FrontPageEditor.prototype.onSave = function (res) {
            console.log(res);
        };

        FrontPageEditor.prototype.onSaveClicked = function () {
            var _this = this;
            this.hideEdit();
            if (confirm('You want to save Front page?')) {
                var url = uplight.RegA.getInstance().settings.front_page;
                var tmp = this.list.children().detach();
                uplight.RegA.getInstance().connector.savePage(url, this.editor.html()).done(function (res) {
                    return _this.onSave(res);
                });
                this.list.append(tmp);
            }
        };

        FrontPageEditor.prototype.onPages = function (data) {
            console.log(data);
            this.pages = JSON.parse(data);
            this.renderList();
        };
        FrontPageEditor.prototype.loadMenu = function () {
            var _this = this;
            var url = uplight.RegA.getInstance().settings.pages;
            if (url)
                uplight.RegA.getInstance().connector.getData(url).done(function (data) {
                    return _this.onPages(data);
                });
            else
                this.renderList();
        };

        FrontPageEditor.prototype.reloadPage = function () {
            var _this = this;
            uplight.RegA.getInstance().connector.getPage(uplight.RegA.getInstance().settings.front_page).done(function (data) {
                return _this.onContent(data);
            });
        };

        FrontPageEditor.prototype.onContent = function (data) {
            this.editor.html(data);
            this.menu = this.editor.find('[data-id=menu]:first');
            this.list = this.menu.find('[data-id=list]:first');
            this.loadMenu();
        };

        FrontPageEditor.prototype.renderList = function () {
            var ar = this.pages;
            var out = '<a class="list-group-item"><span class="fa fa-search"></span> <span> Search Directory</span></a>';
            for (var i = 0, n = ar.length; i < n; i++) {
                var item = ar[i];
                item.seq = i + 1;
                out += '<a class="list-group-item"><span class="' + item.icon + '"></span> <span> ' + item.name + '</span></a>';
            }
            this.list.html(out);
        };
        return FrontPageEditor;
    })();
    uplight.FrontPageEditor = FrontPageEditor;
})(uplight || (uplight = {}));
/**
* Created by VladHome on 6/7/2015.
*/
/// <reference path="../RegA.ts" />
/// <reference path="../../typing/jquery.d.ts" />
var uplight;
(function (uplight) {
    var AdminMenu = (function () {
        function AdminMenu(view) {
            this.R = uplight.RegA.getInstance();
            if (view.length)
                this.init(view);
            this.btnOn = $('#menu-on').hide();
        }
        AdminMenu.prototype.init = function (view) {
            var _this = this;
            this.content = view.find('[data-id=content]:first');
            view.find('[data-id=btnMenu]:first').on(CLICK, function () {
                _this.toggle();
            });
            this.content.find('[data-id=btnClose]').click(function () {
                _this.content.addClass('closed');
            });
        };

        AdminMenu.prototype.toggle = function () {
            if (this.content.hasClass('closed'))
                this.content.removeClass('closed');
            else
                this.content.addClass('closed');
        };
        return AdminMenu;
    })();
    uplight.AdminMenu = AdminMenu;
})(uplight || (uplight = {}));
/**
* Created by VladHome on 11/1/2015.
*/
/// <reference path="../DirsAdmin.ts" />
var uplight;
(function (uplight) {
    var Navigation = (function () {
        function Navigation(view) {
            var _this = this;
            this.view = view;
            //dropdown-toggle
            $(document).click(function (evt) {
                return _this.onClick(evt);
            });
        }
        Navigation.prototype.onClick = function (evt) {
            var el = $(evt.target);
            if (this.selected) {
                this.selected.removeClass('selected');
                this.selected = null;
            }
            if (el.hasClass('dropdown-toggle')) {
                el = el.parent();
                el.addClass('selected');
                this.selected = el;
            }
        };
        return Navigation;
    })();
    uplight.Navigation = Navigation;
})(uplight || (uplight = {}));
/**
* Created by VladHome on 6/18/2015.
*/
/// <reference path="../RegA.ts" />
var uplight;
(function (uplight) {
    var DetailsCategory = (function () {
        function DetailsCategory(view) {
            var _this = this;
            this.view = view;
            this.R = uplight.RegA.getInstance();
            this.categories = view.find('[data-id=categories]:first').on('click', function () {
                return _this.showHideCategories();
            });
            this.categoriesAll = $('#details-categories-list').on('click', 'input', function (evt) {
                return _this.onCategoryClick($(evt.currentTarget));
            }).hide();
        }
        DetailsCategory.prototype.render = function () {
            var cats = this.current.catsStr ? this.current.catsStr.toString() : '';
            this.categories.val(cats);
        };

        DetailsCategory.prototype.reset = function () {
            this.hideEditCategories();
            this.categories.val('');
            this.current.cats = null;
        };

        DetailsCategory.prototype.setCurrent = function (dest) {
            this.current = dest;
            this.hideEditCategories();
        };

        DetailsCategory.prototype.hideEditCategories = function () {
            if (this.catsVisible) {
                this.categoriesAll.hide('fast');
                this.catsVisible = false;
            }
        };

        DetailsCategory.prototype.showEditCategories = function () {
            if (this.catsVisible)
                return;
            this.categoriesAll.show('fast');
            this.catsVisible = true;
        };

        DetailsCategory.prototype.showHideCategories = function () {
            if (this.catsVisible)
                this.hideEditCategories();
            else {
                this.editCategories();
                this.showEditCategories();
            }
        };

        DetailsCategory.prototype.addCategory = function (cat) {
            var id = cat.id;
            var ar = this.current.cats;
            console.log(ar);
            if (ar.indexOf(id) === -1) {
                ar.push(id);
                this.current.catsStr = this.R.model.getCategoriesNames(ar);
                this.render();
            }
        };

        DetailsCategory.prototype.removeCategory = function (cat) {
            var id = cat.id;
            var ar = this.current.cats;
            var ind = ar.indexOf(id);
            if (ind !== -1) {
                ar.splice(ind, 1);
                this.current.catsStr = this.R.model.getCategoriesNames(ar);
                this.render();
            }
        };

        DetailsCategory.prototype.onCategoryClick = function (el) {
            var cat = this.R.model.getCategoryById(el.val());
            if (el.prop('checked'))
                this.addCategory(cat);
            else
                this.removeCategory(cat);
        };

        DetailsCategory.prototype.editCategories = function () {
            if (!this.current.cats) {
                this.current.cats = [];
                this.renderAllCats();
                return;
            }

            var ar1 = [];
            var ar2 = [];
            var cats = this.R.model.getCategories();
            var catsAr = this.current.cats;

            for (var i = 0, n = cats.length; i < n; i++) {
                if (catsAr.indexOf(cats[i].id) == -1)
                    ar2.push(cats[i]);
                else
                    ar1.push(cats[i]);
            }
            var out = this.renderCats(ar1, true);
            out += this.renderCats(ar2, false);
            this.categoriesAll.html(out);
        };

        DetailsCategory.prototype.renderAllCats = function () {
            this.categoriesAll.html(this.renderCats(this.R.model.getCategories(), false));
        };
        DetailsCategory.prototype.renderCats = function (cats, selected) {
            var out = '';

            for (var i = 0, n = cats.length; i < n; i++) {
                out += '<div><input type="checkbox" value="' + cats[i].id + '" ' + (selected ? 'checked="true"' : '') + '/><label>' + cats[i].label + '</label></div>';
            }
            return out;
        };
        return DetailsCategory;
    })();
    uplight.DetailsCategory = DetailsCategory;
})(uplight || (uplight = {}));
/**
* Created by VladHome on 7/2/2015.
*/
/// <reference path="../RegA.ts" />
var uplight;
(function (uplight) {
    var DetailsImages = (function () {
        function DetailsImages(view) {
            var _this = this;
            this.R = uplight.RegA.getInstance();

            this.list = view.find('[data-id=list]:first');
            this.list.on(CLICK, 'a', function (evt) {
                return _this.onItemClick(evt);
            });
            this.view = view;

            view.find('[data-id=btnCancel]:first').click(function () {
                if (_this.onCancel)
                    _this.onCancel();
            });
            view.find('[data-id=btnClose]:first').click(function () {
                console.log('close');
                if (_this.onClose)
                    _this.onClose();
            });
            view.find('[data-id=btnSave]:first').click(function () {
                _this.current.imgs = _this.data ? _this.data.toString() : '';
                if (_this.onSave)
                    _this.onSave();
            });
            ;
            this.uploadAdd = view.find('[data-id=uploadAdd]:first').change(function (evt) {
                return _this.onFileSelected(evt);
            });
            this.uploadEdit = view.find('[data-id=uploadEdit]:first').change(function (evt) {
                return _this.onFileSelected(evt);
            });

            this.btnAdd = view.find('[data-id=btnAdd]:first').on(CLICK, function () {
                return _this.onAddClick();
            });
            this.btnEdit = view.find('[data-id=btnEdit]:first').on(CLICK, function () {
                return _this.onEditClick();
            });
            this.btnDel = view.find('[data-id=btnDel]:first').on(CLICK, function () {
                return _this.onDeleteClick();
            });

            this.preview = view.find('[data-id=preview]:first');
            this.title = view.find('[data-id=title]:first');
        }
        DetailsImages.prototype.hide = function () {
            this.view.hide();
            this.preview.empty();
            this.list.empty();
        };

        DetailsImages.prototype.show = function () {
            this.view.show();
        };

        DetailsImages.prototype.setData = function (vo) {
            this.current = vo;
            this.data = vo.imgs.length ? vo.imgs.split(',') : [];

            //  this.resetData();
            this.resetButtons();
        };

        DetailsImages.prototype.getData = function () {
            return this.data;
        };
        DetailsImages.prototype.getDeleted = function () {
            return this.dataDelete;
        };

        DetailsImages.prototype.onItemClick = function (evt) {
            this.resetButtons();
            var el = $(evt.currentTarget);
            var i = Number(el.data('i'));
            if (isNaN(i))
                return;
            this.selectedItem = this.data[i];
            if (!this.selectedItem) {
                this.data.splice(i, 1);
                this.render();
                return;
            }
            if (this.selected)
                this.selected.removeClass(SELECTED);
            el.addClass(SELECTED);
            this.selected = el;
            this.preview.empty();
            this.preview.html(el.clone());
            this.mode = '';
        };

        DetailsImages.prototype.renderItem = function (str, i) {
            var img = '<img class="item"   src="' + str + '"/>';
            return '<a data-i="' + i + '" >' + img + '</li>';
        };

        DetailsImages.prototype.render = function () {
            this.title.html(this.current.name + ' &nbsp;&nbsp;unit:' + this.current.unit);
            var ar = this.data;
            if (!ar) {
                this.list.html('');
                return;
            }
            ;
            var out = '';
            for (var i = 0, n = ar.length; i < n; i++) {
                out += this.renderItem(ar[i], i);
            }
            this.list.html(out);
        };

        DetailsImages.prototype.resetButtons = function () {
            this.uploadEdit.addClass(HIDDEN);
            this.uploadAdd.addClass(HIDDEN);
        };

        DetailsImages.prototype.onAddClick = function () {
            this.resetButtons();
            if (this.mode == 'add') {
                this.mode = '';
                return;
            }
            this.uploadAdd.removeClass(HIDDEN);
            this.mode = 'add';
            this.preview.empty();
            if (this.selected)
                this.selected.removeClass(SELECTED);
            this.selected = null;
            this.selectedItem = null;
        };

        DetailsImages.prototype.onEditClick = function () {
            this.resetButtons();
            if (this.mode == 'update') {
                this.mode = '';
                return;
            }
            if (!this.selectedItem) {
                this.mode = '';
                return;
            }
            this.uploadEdit.removeClass(HIDDEN);
            this.mode = 'update';
        };

        DetailsImages.prototype.onUploadResult = function (res) {
            console.log(res);
            if (res.success) {
                if (this.mode === 'add') {
                    if (!this.data)
                        this.data = [];
                    this.data.push(res.result);
                    var item = this.renderItem(res.result, this.data.length - 1);
                    this.preview.empty();
                    this.preview.html(item);
                    this.list.append(item);
                    this.mode = '';
                } else if (this.mode === 'update') {
                    var i = this.selected.data('i');
                    this.data[i] = res.result;
                    this.selectedItem = this.data[i];

                    this.render();
                    var item = this.renderItem(this.selectedItem, i);
                    this.preview.empty();
                    this.preview.html(item);
                    this.mode = '';
                }
            }
        };

        DetailsImages.prototype.onFileSelected = function (evt) {
            var _this = this;
            this.resetButtons();
            var input = evt.target;
            var files = input.files;
            if (files.length) {
                var form = new FormData();
                form.append('file', files[0]);
                this.R.connector.uploadDestinationImage(form, this.current.uid).done(function (res) {
                    return _this.onUploadResult(res);
                });
            }
        };
        DetailsImages.prototype.onDeleteClick = function () {
            this.resetButtons();
            this.mode = '';
            if (!this.selectedItem)
                return;
            var isDel = confirm('You want to delete selected Image from records?');
            if (isDel) {
                var ind = this.data.indexOf(this.selectedItem);
                if (!this.dataDelete)
                    this.dataDelete = [];
                this.dataDelete.push(this.data.splice(ind, 1)[0]);
                this.render();
                this.preview.empty();
            }
        };

        DetailsImages.prototype.onFileChoosen = function (input) {
            var files = input.files;
            if (files.length) {
                var form = new FormData();
                form.append('file', files[0]);
            }
        };
        return DetailsImages;
    })();
    uplight.DetailsImages = DetailsImages;
})(uplight || (uplight = {}));
/**
* Created by VladHome on 6/17/2015.
*/
/// <reference path="../RegA.ts" />
/// <reference path="DetailsCategory.ts" />
/// <reference path="DetailsImages.ts" />
var uplight;
(function (uplight) {
    var DetailsForm = (function () {
        function DetailsForm(form) {
            var _this = this;
            this.div = $('<div>');
            this.haveChanges = true;
            this.view = form;
            this.R = uplight.RegA.getInstance();

            this.view.find('[data-id=btnClose]').click(function () {
                if (_this.onClose)
                    _this.onClose();
            });
            this.btnSave = this.view.find('[data-id=btnSave]').click(function () {
                var btn = _this.btnSave;
                btn.prop('disabled', true);
                setTimeout(function () {
                    btn.prop('disabled', false);
                }, 1500);
                if (_this.onSave)
                    _this.onSave();
            });
            this.pages = $('#details-pages');
            this.images = this.view.find('[data-id=images]:first');
            this.name = form.find('[data-id=tiName]:first');
            this.unit = form.find('[data-id=tiUnit]:first');
            this.form = form;
            this.info = form.find('[data-id=info]:first');
            this.details = form.find('[data-id=details]:first');

            this.keywords = form.find('[data-id=keywords]:first');

            this.tmbImg = form.find('[data-id=imgThumbnail]:first');
            this.tmbInput = form.find('[data-id=tmbInput]:first');
            this.tmbInput.on(CHANGE, function (evt) {
                return _this.onTmbInputChange(evt);
            });

            this.meta = form.find('[data-id=meta]:first');
            this.uid = form.find('[data-id=uid]:first');
            this.dbid = form.find('[data-id=dbid]:first');
            this.saveBtn = form.find('[data-id=save]:first');

            this.btnAddRow = this.form.find('[data-id=btnAddRow]:first').on(CLICK, function () {
                return _this.onAddRowClicked();
            });
            this.btnDeleteRow = this.form.find('[data-id=btnDeleteRow]:first').on(CLICK, function () {
                return _this.onDeleteRowClicked();
            });
            this.details.on(CLICK, 'tr', function (evt) {
                return _this.onRowSelected($(evt.currentTarget));
            });

            this.categories = new uplight.DetailsCategory(form);

            this.imagesEditor = new uplight.DetailsImages($('#DetailsImagesEdit'));

            this.imagesEditor.hide();
            this.imagesEditor.onSave = function () {
                return _this.showDetailsView();
            };
            this.imagesEditor.onClose = function () {
                return _this.showDetailsView();
            };
            this.imagesEditor.onCancel = function () {
                return _this.showDetailsView();
            };

            $('#DetailsImages [data-id=btnEdit]:first').on(CLICK, function () {
                return _this.onEditImagesClick();
            });
        }
        DetailsForm.prototype.showDetails = function () {
            this.showDetailsView();
        };
        DetailsForm.prototype.encode = function (str) {
            return str;
        };

        DetailsForm.prototype.getDestination = function () {
            if (!this.current)
                return null;

            var vo = this.current;
            vo.name = this.encode(this.name.val());

            if (vo.name.length < 2) {
                this.R.msg('Name is required', this.name);
                return null;
            }
            vo.unit = this.encode(this.unit.val() || '');
            vo.info = this.encode(this.info.val() || '');
            vo.imgs = this.imagesEditor.getData().toString();

            // vo.imgsD = this.imagesEditor.getDeleted();
            // vo.cats = this.categories.getCurrent();
            vo.more = this.collectDataFromTable();
            vo.meta = this.encode(this.meta.val() || '');
            vo.kws = this.encode(this.keywords.val() || '');
            vo.uid = this.encode(this.uid.val());

            vo.tmb = this.tmbImg.attr('src');
            var pages = this.pages.html();
            if (pages.length > 20) {
                vo.pgs = 'pages';
                this.pgs = pages;
            } else {
                vo.pgs = null;
                this.pgs = null;
            }

            // this.current=vo;
            return vo;
        };

        DetailsForm.prototype.show = function () {
            this.view.show();
        };

        DetailsForm.prototype.focusName = function () {
            this.name.focus();
        };

        DetailsForm.prototype.hide = function () {
            this.view.hide();
            this.imagesEditor.hide();
        };

        DetailsForm.prototype.reset = function () {
            this.name.val('');
            this.unit.val('');
            this.info.val('');
            this.renderTable('');
            this.categories.reset();
            this.uid.val('');
            this.meta.val('');
            this.dbid.text('');
            this.keywords.val('');
            this.pages.html('');
            this.tmbImg.attr('src', null);
            // this.showItemCategories();
        };

        DetailsForm.prototype.setDestination = function (vo) {
            this.current = vo;
            this.categories.setCurrent(vo);
            this.imagesEditor.setData(vo);
        };

        DetailsForm.prototype.setID = function (id) {
            this.current.id = id;
            this.dbid.text(id);
            if (!this.current.uid.length) {
                this.current.uid = '' + id;
                this.uid.val(this.current.uid);
            }
        };

        DetailsForm.prototype.onUploadTumb = function (res) {
            this.tmbImg.attr('src', res.result);
            console.log(res);
        };

        DetailsForm.prototype.onTmbInputChange = function (evt) {
            var _this = this;
            var input = evt.target;
            var files = input.files;
            if (files.length) {
                var form = new FormData();
                form.append('file', files[0]);
                this.R.connector.uploadDestinationImage(form, this.current.uid).done(function (res) {
                    return _this.onUploadTumb(res);
                });
            }
        };

        DetailsForm.prototype.showDetailsView = function () {
            if (this.current.imgs)
                this.images.html(this.renderImages(this.current.imgs));
            this.view.show();
            this.imagesEditor.hide();
        };

        DetailsForm.prototype.onEditImagesClick = function () {
            this.view.hide();
            this.imagesEditor.setData(this.current);
            this.imagesEditor.render();
            this.imagesEditor.show();
            if (this.onImageEditor)
                this.onImageEditor();
        };

        //////////TABLE/////////////////////
        DetailsForm.prototype.onRowSelected = function (el) {
            this.selectedRow = el;
        };

        DetailsForm.prototype.onAddRowClicked = function () {
            this.details.append('<tr><td></td><td>&nbsp;</td></tr>');
        };

        DetailsForm.prototype.onDeleteRowClicked = function () {
            if (this.selectedRow) {
                //if (this.details.children().length < 2) {
                //   this.selectedRow.html('<td>&nbsp;</td><td>&nbsp;</td>');
                //  this.selectedRow = null;
                //  return
                // }
                var tr = this.selectedRow;
                var out = tr.children('td:nth-child(1)').text() + "  " + tr.children('td:nth-child(2)').text();

                var del = true;
                if (out.length > 2) {
                    del = confirm('You want to delete row? \n' + out);
                }

                if (del) {
                    this.selectedRow.remove();
                    this.selectedRow = null;
                }
            }
        };

        DetailsForm.prototype.renderCell = function (label, value) {
            return '<tr><td>' + label + '</td><td>' + value + '</td></tr>';
        };

        DetailsForm.prototype.renderTable = function (details) {
            if (!details)
                details = " ";
            var ar = details.split("\n");
            console.log(ar.length);

            //  console.log('renderTable   ',ar);
            var out = '';
            for (var i = 0, n = ar.length; i < n; i++) {
                var line = ar[i].split("\t");
                out += this.renderCell(line[0] || '', line[1] || '&nbsp');
            }
            this.details.html(out);
        };

        DetailsForm.prototype.collectDataFromTable = function () {
            var list = this.details.children('tr');
            var out = [];
            list.each(function (ind, el) {
                var tr = $(el);
                if (tr.text().length > 5) {
                    var str = tr.children('td:nth-child(1)').text() + "\t" + tr.children('td:nth-child(2)').text();
                    out.push(str.replace('\u00a0', ''));
                }
            });

            return out.join('\n');
        };

        ////////////////////////////DESTINATION///////////////////////////////////
        DetailsForm.prototype.render = function () {
            if (this.current) {
                var vo = this.current;
                this.name.val(vo.name);
                this.unit.val(vo.unit);
                this.info.val(vo.info);
                this.renderTable(vo.more);
                this.categories.render();
                if (vo.imgs.length)
                    this.images.html(this.renderImages(vo.imgs));
                else
                    this.images.html('');
                this.uid.val(vo.uid);
                this.meta.val(vo.meta);
                this.dbid.text(vo.id);
                this.keywords.val(vo.kws);
                this.pages.html('');
                this.tmbImg.attr('src', vo.tmb);
                if (vo.pgs == 'pages')
                    this.pages.load('data/pages/' + vo.uid + '.htm');

                // this.showItemCategories();
                return true;
            } else
                return false;
        };

        DetailsForm.prototype.renderImages = function (imgs) {
            var ar = imgs.split(',');
            var out = '';
            for (var i = 0, n = ar.length; i < n; i++) {
                out += '<a><img src="' + ar[i] + '" /></a>';
            }
            return out;
        };
        DetailsForm.prototype.getDestinationId = function () {
            if (this.current)
                return this.current.id;
            else
                return 0;
        };
        DetailsForm.prototype.getDestinationName = function () {
            if (this.current)
                return this.current.name;
            else
                return null;
        };

        DetailsForm.prototype.getPages = function () {
            return this.pgs;
        };
        return DetailsForm;
    })();
    uplight.DetailsForm = DetailsForm;
})(uplight || (uplight = {}));
/// <reference path="../rega.ts" />
/// <reference path="DestinationsController.ts" />
var uplight;
(function (uplight) {
    var DestinationsList = (function () {
        function DestinationsList(view) {
            this.dispatcher = $({});
            this.SELECTED = 'SELECTED';
            this.view = view;
            this.R = uplight.RegA.getInstance();
            this.init();
        }
        // isMultyselect: boolean = true;
        DestinationsList.prototype.setSelectedItem = function (vo) {
            this.selectedItem = vo;
        };
        DestinationsList.prototype.getSelectedItem = function () {
            return this.selectedItem;
        };

        DestinationsList.prototype.show = function () {
            this.view.show();
            if (this.selectedEl) {
                var num = this.selectedEl.offset().top;
                if (num > 700 || num < 200)
                    this.scrollToElemnt(this.selectedEl);
            }
        };

        DestinationsList.prototype.hide = function () {
            this.view.hide();
        };

        DestinationsList.prototype.reset = function () {
            this.selectedItem = null;
            this.listContainer.scrollTop(0);
            this.selectedEl = null;
        };

        DestinationsList.prototype.init = function () {
            var _this = this;
            this.listContainer = this.view.find('.nano:first');
            this.thead = $('<thead>').html('<tr class="item-header">' + '<th class="item-id">id</th>' + '<th class="item-name">Name</th>' + '<th class="item-unit">Unit</th>' + '<th class="item-categories">Categories</th>' + '<th class="">Short Info</th>' + '<th class="">Thumb</th>' + '<th class="">Info Table</th>' + '<th class="">Images</th>' + '<th class="">KWs</th>' + '<th class="item-uid">UID</th>' + '</tr>');
            this.table = $('<table>').addClass('table table-striped').append(this.thead).appendTo(this.listContainer);
            this.list = $('<tbody>').appendTo(this.table);

            // this.listContainer =$('<div>').addClass('list-container').append(this.list).appendTo(this.table);
            //  this.listView =
            this.list.on(CLICK, 'tr', function (evt) {
                return _this.onSelected(evt);
            });

            this.tiFilter = $('#txtFilter');
            this.tiFilter.bind('input', function () {
                return _this.onFilterChange();
            });
            this.selectCats = this.view.find('[data-id=select]').on(CHANGE, function (evt) {
                return _this.onSelectChange(evt);
            });

            this.total = this.view.find('[data-id=total]');
            this.currentCat = 0;

            this.R.model.dispatcher.on(this.R.model.CHANGE, function () {
                return _this.onModelChange();
            });
            this.destinations = this.R.model.getData();
            if (this.destinations) {
                this.renderDestinations();
                this.renderCategories();
            }
        };

        DestinationsList.prototype.onFilterChange = function () {
            this.filterList(this.tiFilter.val());
        };

        DestinationsList.prototype.filterList = function (pattern) {
            this.destinations = this.R.model.getDestinantionsByPattern(pattern);
            this.reset();
            this.renderDestinations();
        };
        DestinationsList.prototype.onModelChange = function () {
            this.tiFilter.val('');
            this.renderCategories();
            this.destinations = this.R.model.getData();
            this.renderDestinations();
        };

        DestinationsList.prototype.onSelected = function (evt) {
            var el = $(evt.currentTarget);
            var i = this.selectElement(el);
            var dest = this.destinations[i];
            console.log(dest);
            this.selectedItem = dest;
            this.dispatcher.triggerHandler(this.SELECTED, dest);
        };

        DestinationsList.prototype.renderItem = function (item, i) {
            return '<tr class="item" data-i="' + i + '" data-id="' + item.id + '" >' + '<td class="id">' + item.id + '</td>' + '<td class="name">' + item.name + '</td>' + '<td class="unit">' + item.unit + '</td>' + '<td class="cats">' + (item.catsStr ? item.catsStr.join(', ') : '&nbsp') + '</td>' + '<td class="small"><div>' + item.info + '</div></td>' + '<td class="tmb">' + (item.tmb ? '<img src="' + item.tmb + '" />' : '') + '</td>' + '<td class="more"><div>' + item.more + '</div></td>' + '<td class="imgs">' + (item.imgs ? (item.imgs.split(',').length + '') : '&nbsp') + '</td>' + '<td class="kws">' + (item.kws ? (item.kws.split(',').length + '') : '&nbsp') + '</td>' + '<td title="' + item.uid + '" class="uid">' + (item.uid || '&nbsp') + '</td>' + '</tr>';
        };

        DestinationsList.prototype.renderDestinations = function () {
            this.selectedEl = null;
            var ar = this.destinations;

            //  console.log(ar);
            var out = '';
            for (var i = 0, n = ar.length; i < n; i++) {
                out += this.renderItem(ar[i], i);
            }

            this.list.html(out);
            this.total.text(n);
            if (this.selectedItem)
                this.selectItemById(this.selectedItem.id);
        };

        DestinationsList.prototype.selectElement = function (el) {
            console.log('selecting ' + el.offset().top);
            var i = el.data('i');
            if (isNaN(i))
                return 0;
            if (this.selectedEl)
                this.selectedEl.removeClass('selected');
            el.addClass('selected');
            this.selectedEl = el;
            return i;
        };
        DestinationsList.prototype.selectItemById = function (id) {
            var el = this.list.children('[data-id=' + id + ']:first');
            if (el)
                this.selectElement(el);
            return el;
        };

        DestinationsList.prototype.scrollToElemnt = function (el) {
            console.log('scrolling ');
            this.listContainer.scrollTop(0);
            var num = +el.offset().top;
            this.listContainer.scrollTop(num - 300);
        };

        /*
        renderHeader(){
        var tr = this.list.children()[0]
        
        var thead = this.thead.find('th');
        $(tr).children('td').each(function(ind,el){
        
        $(thead[ind]).width($(el).width());
        // console.log($(el).width());
        });
        this.table.prepend(this.thead);
        }
        */
        // private listContainer:JQuery;
        DestinationsList.prototype.renderCategories = function () {
            var ar = this.R.model.getCategories();

            // console.log(ar);
            var str = '<option value="0">All</option>';
            str += '<option value="-1">unassigned</option>';
            for (var i = 0, n = ar.length; i < n; i++)
                str += this.renderCats(ar[i]);
            this.selectCats.html(str);
        };

        DestinationsList.prototype.renderCats = function (vo) {
            return '<option value="' + vo.id + '">' + vo.label + '</option>';
        };

        DestinationsList.prototype.onSelectChange = function (evt) {
            var cat = Number($(evt.target).prop('value'));
            if (!isNaN(cat))
                this.filterByCategory(cat);
        };
        DestinationsList.prototype.filterByCategory = function (cat) {
            this.currentCat = cat;
            if (this.currentCat == 0)
                this.destinations = this.R.model.getData();
            else if (this.currentCat == -1)
                this.destinations = this.R.model.getUnassigned();
            else
                this.destinations = this.R.model.getDestinationsInCategory(this.currentCat);
            this.tiFilter.val('');

            this.reset();
            this.renderDestinations();
        };
        return DestinationsList;
    })();
    uplight.DestinationsList = DestinationsList;
})(uplight || (uplight = {}));
/// <reference path="../DirsAdmin.ts" />
/// <reference path="DetailsForm.ts" />
/// <reference path="DestinationsList.ts" />
/// <reference path="DetailsCategory.ts" />
var uplight;
(function (uplight) {
    var DestinationsController = (function () {
        function DestinationsController(container) {
            var _this = this;
            container.load('htms/admin/DestinationsEditor.htm', function () {
                return _this.init();
            });
            this.R = uplight.RegA.getInstance();
            if (!this.R.model)
                this.R.model = new uplight.DestinantionsModel();
        }
        DestinationsController.prototype.init = function () {
            var _this = this;
            this.view = $('#DestinationsEditor');

            this.list = new uplight.DestinationsList($('#DestinationsList'));
            this.breacrumb = new uplight.BreadCrumbs(this.view.find('[data-ctr=Breadcrumbs]:first'));
            this.breacrumb.onCiick = function (url) {
                if (url == 'listing') {
                    _this.hideForm();
                } else if (url == 'DetailsForm')
                    _this.detailsForm.showDetails();
            };
            this.breacrumb.addCrumb('listing', 'Listing');
            this.detailsForm = new uplight.DetailsForm($('#DetailsForm'));

            this.detailsForm.onClose = function () {
                return _this.hideForm();
            };
            this.detailsForm.onSave = function () {
                return _this.onBtnSaveClick();
            };
            this.detailsForm.hide();
            this.detailsForm.onImageEditor = function () {
                _this.breacrumb.addCrumb('imageeditor', 'Image Editor');
            };

            if (this.R.isSuper)
                this.btnDrop = $('<a>').addClass('btn').html('<span class="fa fa-bolt"> Drop Table</span>').appendTo(this.list.view.find('[data-id=tools]:first')).click(function () {
                    return _this.onDrop();
                });

            //= this.view.find('[data-id=btnDrop]:first').click(()=>this.onDrop())
            this.btnAdd = this.view.find('[data-id=btnAdd]:first').on(CLICK, function () {
                return _this.onBtnAddClick();
            });
            this.btnDel = this.view.find('[data-id=btnDel]:first').on(CLICK, function () {
                return _this.onBtnDelClick();
            });

            this.btnEdit = this.view.find('[data-id=btnEdit]:first').on(CLICK, function () {
                return _this.onBtnEditClick();
            });
            //this.showForm();
        };

        DestinationsController.prototype.onDrop = function () {
            var _this = this;
            if (confirm('You want to delete whole table tenats?'))
                this.R.connector.dropTable('tenants').done(function () {
                    _this.R.model.refreshData();
                });
        };

        DestinationsController.prototype.hideForm = function () {
            this.breacrumb.clear();
            this.breacrumb.addCrumb('listing', 'Listing');
            this.detailsForm.hide();
            this.list.show();
        };

        DestinationsController.prototype.onBtnAddClick = function () {
            var dest = new uplight.VODestination({ id: 0, cats: [], imgs: '' });
            this.detailsForm.setDestination(dest);
            this.detailsForm.render();
            this.list.hide();
            this.detailsForm.show();
            this.detailsForm.focusName();
            this.breacrumb.addCrumb('DetailsForm', 'Details form');
        };

        DestinationsController.prototype.onBtnEditClick = function () {
            var dest = this.list.getSelectedItem();
            if (dest) {
                this.detailsForm.setDestination(dest);
                this.detailsForm.render();
                this.list.hide();
                this.detailsForm.show();
                this.detailsForm.focusName();
                this.breacrumb.addCrumb('DetailsForm', 'Details form');
            }
        };

        DestinationsController.prototype.onSave = function (res) {
            console.log(res);

            if (res.success) {
                if (res.success == 'inserted') {
                    this.detailsForm.setID(Number(res.result));
                    var dest = this.detailsForm.getDestination();
                    this.list.setSelectedItem(dest);
                }
                this.R.msg('Record Saved', this.detailsForm.btnSave);
            } else
                this.R.msg('ERROR Saving record', this.detailsForm.btnSave);

            this.R.model.refreshData();
        };

        DestinationsController.prototype.onBtnSaveClick = function () {
            var _this = this;
            var vo = this.detailsForm.getDestination();
            if (!vo)
                return;
            if (!vo.uid)
                vo.uid = uplight.DestinantionsModel.encodeUID(vo.name);
            var out = JSON.stringify(vo);
            this.R.connector.saveDestination(out).done(function (res) {
                return _this.onSave(res);
            });
            //this.R.model.saveDestination((res) => this.onSave(res),dest,this.detailsForm.getPages());
        };

        ////////////////////////////////////////////////////////////////////////////////////////////////
        DestinationsController.prototype.onDelete = function (res) {
            this.R.msg('Record deleted', this.btnDel);
            this.list.selectedItem = null;
        };

        // private onDeleteConfirmed(): void {
        // this.R.vo.deleteDestination(this.detailsForm., (res) => this.onDelete(res));
        //}
        DestinationsController.prototype.onBtnDelClick = function () {
            var _this = this;
            var dest = this.list.getSelectedItem();
            if (dest) {
                this.R.confirm.show('Delete record', 'You want to delete ' + dest.name + ' from database?', function () {
                    _this.R.model.deleteDestination(dest, function (res) {
                        return _this.onDelete(res);
                    });
                });
            }
            // showAlert('You want to delete record: ' + name + '?', () => this.onDeleteConfirmed(),'Delete');
        };
        return DestinationsController;
    })();
    uplight.DestinationsController = DestinationsController;
})(uplight || (uplight = {}));
/// <reference path="../rega.ts" />
var uplight;
(function (uplight) {
    var CategoryForm = (function () {
        function CategoryForm(view) {
            var _this = this;
            this.R = uplight.RegA.getInstance();

            this.model = this.R.model;
            this.view = view;
            this.tiName = view.find('[data-id=tiName]:first');

            this.chkEnable = view.find('[data-id=chkEnable]:first').on('click', function () {
                return _this.onCheckClick();
            });
            this.icon = view.find('[data-id=icon]:first');
            this.iconsLibrary = view.find('[data-id=iconsLibrary]:first');
            this.btnEditIcon = view.find('[data-id=btnEditIcon]:first');
            this.btnClose = view.find('[data-id=btnClose]');
            this.btnSave = view.find('[data-id=save]:first');
            this.selectSeq = view.find('[data-id=selectSeq]:first');

            this.btnBlankIcon = view.find('[data-id=btnBlankIcon]:first').click(function () {
                _this.icon.attr('class', 'fa fa-fw');
            });

            this.btnSave.on(CLICK, function () {
                return _this.onSaveClicked();
            });

            this.R.dispatcher.on(this.R.CATEGORY_SELECTED, function (evt, cat) {
                return _this.onCategorySelected(cat);
            });

            if (this.model.getCategories())
                this.renderSequance();
            else
                this.model.dispatcher.on(this.model.CHANGE, function () {
                    return _this.renderSequance();
                });

            this.iconsLibrary.parent().hide();
            this.btnEditIcon.on(CLICK, function () {
                return _this.onEditIconClick();
            });
            this.icon.parent().on(CLICK, function () {
                return _this.onEditIconClick();
            });
            this.R.connector.getIcons().done(function (data) {
                return _this.onIconsLoaded(data);
            });
            this.iconPreview = $('<div>').addClass('abs preview').appendTo(this.iconsLibrary.parent());

            this.btnClose.on(CLICK, function () {
                if (_this.onClose)
                    _this.onClose();
                _this.hide();
            });

            this.hide();
        }
        CategoryForm.prototype.toggle = function () {
            if (this.isVisible)
                this.hide();
            else
                this.show();
        };
        CategoryForm.prototype.hide = function () {
            this.isVisible = false;
            this.view.hide();
            this.hideLibrary();
        };
        CategoryForm.prototype.show = function () {
            this.isVisible = true;
            if (this.current)
                this.renderItem();
            this.view.show();
        };
        CategoryForm.prototype.renderIconsTopic = function (topic) {
            var out = '<div class="topic"><h3>' + topic[0] + '</h3><div class="list">';
            ;
            var ar = topic;
            for (var i = 1, n = ar.length; i < n; i++) {
                out += '<div class="fa fa-' + ar[i] + '" ></div>';
            }
            return out + '</div></div>';
        };
        CategoryForm.prototype.onIconsLoaded = function (data) {
            var _this = this;
            var topics;
            var out = '';
            var ar = data;
            for (var i = 0, n = ar.length; i < n; i++) {
                out += this.renderIconsTopic(ar[i]);
            }

            this.iconsLibrary.html(out);
            this.iconsLibrary.on(CLICK, '.fa', function (evt) {
                return _this.onIcionLibraryClick($(evt.currentTarget));
            });
            this.iconsLibrary.on(MOUSE_OVER, '.fa', function (evt) {
                return _this.onIcionLibraryOver($(evt.currentTarget));
            });
            this.iconPreview.on(MOUSE_OUT, '.fa', function (evt) {
                return _this.onIcionLibraryOut($(evt.currentTarget));
            });
            this.iconPreview.on(CLICK, '.fa', function (evt) {
                return _this.onIcionLibraryClick($(evt.currentTarget));
            });
        };
        CategoryForm.prototype.onIcionLibraryClick = function (el) {
            var cl = el.attr('class');
            console.log(cl);
            this.icon.attr('class', cl);
        };

        CategoryForm.prototype.onIcionLibraryOver = function (el) {
            this.iconPreview.html(el.clone());
            this.iconPreview.css('left', el.position().left).css('top', el.position().top);
            this.iconPreview.fadeIn();
        };
        CategoryForm.prototype.onIcionLibraryOut = function (el) {
            this.iconPreview.hide();
        };

        CategoryForm.prototype.hideLibrary = function () {
            if (this.isLibraryVisible) {
                this.isLibraryVisible = false;
                this.iconsLibrary.parent().hide('slow');
            }
        };
        CategoryForm.prototype.showLibrary = function () {
            if (this.isLibraryVisible)
                return;
            this.isLibraryVisible = true;
            this.iconsLibrary.parent().show('slow');
        };
        CategoryForm.prototype.onEditIconClick = function () {
            if (this.isLibraryVisible)
                this.hideLibrary();
            else
                this.showLibrary();
        };

        CategoryForm.prototype.onSaveResult = function (res) {
            if (res.success) {
                this.R.msg('Record Saved', this.btnSave);
                this.R.model.mapCategories();
            } else
                this.R.msg('ERROR ', this.btnSave);
            console.log(res);
        };

        CategoryForm.prototype.onSaveClicked = function () {
            var _this = this;
            var vo = this.getCurrent();
            if (!vo)
                return;
            var btn = this.btnSave;
            btn.prop('disabled', true);
            setTimeout(function () {
                btn.prop('disabled', false);
            }, 1500);
            this.R.model.saveCategory(vo).done(function (res) {
                return _this.onSaveResult(res);
            });
        };
        CategoryForm.prototype.onCategorySelected = function (cat) {
            this.current = cat;
            if (this.isVisible)
                this.renderItem();
        };
        CategoryForm.prototype.setCurrent = function (vo) {
            this.current = vo;
            if (vo.id == 0) {
                this.addSequance();
            }
            this.renderItem();
        };
        CategoryForm.prototype.addSequance = function () {
            var max = this.R.model.getCategories().length + 1;
            this.selectSeq.append('<option value="' + max + '">' + max + '</option>');
        };
        CategoryForm.prototype.renderSequance = function () {
            console.log('renedr');
            var max = this.R.model.getCategories().length;
            var out = '';
            for (var i = 1, n = max; i <= n; i++) {
                out += '<option value="' + i + '">' + i + '</option>';
            }
            this.selectSeq.html(out);
        };

        CategoryForm.prototype.renderItem = function () {
            var vo = this.current;
            if (vo) {
                //console.log(vo);
                this.tiName.val(vo.label);
                this.selectSeq.val(vo.sort);
                this.icon.attr('class', (vo.icon || 'icon'));

                // this.setSelectSequance(vo.sort);
                this.chkEnable.prop('checked', vo.enable == 1);
            }
        };
        CategoryForm.prototype.getCurrent = function () {
            var vo = this.current;
            vo.label = this.tiName.val();
            vo.enable = this.chkEnable.prop('checked') ? 1 : 0;
            vo.sort = this.selectSeq.val();
            vo.icon = this.icon.attr('class');

            return vo;
        };
        CategoryForm.prototype.onCheckClick = function () {
        };
        CategoryForm.prototype.onTextChanged = function () {
            // console.log(this.tiCat.val());
        };

        CategoryForm.prototype.onEnableClicked = function () {
        };
        CategoryForm.prototype.reset = function () {
            // this.btnEdit.addClass(DISABLED);
            // this.refreshList();
            // this.editpanel.hide();
            // this.addremove.show();
        };
        return CategoryForm;
    })();
    uplight.CategoryForm = CategoryForm;
})(uplight || (uplight = {}));
/**
* Created by VladHome on 6/20/2015.
*/
///<reference path="../RegA.ts" />
var uplight;
(function (uplight) {
    var CategoriesList = (function () {
        function CategoriesList(view) {
            var _this = this;
            this.view = view;

            var table = view.find('.table:first');

            var head = $('<thead>');
            head.html('<tr class="header"><th class="id">ID</th><th class="icon">Icon</th><th class="name">Name</th><th class="seq">Sequence</th><th class="seq">Enabled</th><th class="recs">Records</th></tr>');
            table.append(head);

            this.list = $('<tbody>');
            table.append(this.list);
            this.listView = $('#CategoriesList-container');
            this.R = uplight.RegA.getInstance();
            this.R.model.dispatcher.on(this.R.model.CHANGE, function () {
                _this.onModelChanged();
            });
            if (this.R.model.getCategories())
                this.renderList();
            this.list.on(CLICK, 'tr', function (evt) {
                return _this.onClick($(evt.currentTarget));
            });
            this.R.model.dispatcher.on(this.R.model.CATEGORIES_CAHANGE, function (evt, cata) {
                return _this.onCategoriesChanged();
            });
        }
        CategoriesList.prototype.onCategoriesChanged = function () {
            this.renderList();
            if (this.selectedItem)
                this.selectElementById(this.selectedItem.id);
        };

        CategoriesList.prototype.onClick = function (el) {
            var i = el.data('i');
            if (isNaN(i))
                return;
            var cat = this.data[i];
            if (cat) {
                // console.log(cat);
                this.selectedItem = cat;
                this.selectElement(el);
                this.R.dispatcher.triggerHandler(this.R.CATEGORY_SELECTED, cat);
            }
        };

        CategoriesList.prototype.selectElementById = function (id) {
            var el = this.list.find('[data-id=' + id + ']');
            if (el)
                this.selectElement(el);
        };

        CategoriesList.prototype.selectElement = function (el) {
            if (this.selected)
                this.selected.removeClass(SELECTED);
            el.addClass(SELECTED);
            this.selected = el;
        };

        CategoriesList.prototype.onModelChanged = function () {
            this.renderList();
        };

        CategoriesList.prototype.renderList = function () {
            this.R.model.mapCategories();
            var ar = this.R.model.getCategories();
            var out = '';
            for (var i = 0, n = ar.length; i < n; i++) {
                out += this.renderItem(ar[i], i);
            }
            this.list.html(out);
            this.data = ar;
        };

        CategoriesList.prototype.renderItem = function (item, i) {
            var total = 0;
            var enbl = 'fa fa-check';
            if (!item.enable)
                enbl = 'fa fa-minus';
            if (item.dests)
                total = item.dests.length;

            //if (this.isChange) return '<li class="uplight" data-id="' + item.catid + '"    ><div class="catname ' + (item.enable == 1 ? '' : ' disabled') + '" contentEditable="true">' + item.label + '</div></li>';
            return '<tr  class="item ' + (item.enable == 1 ? '' : ' disabled') + '" data-i="' + i + '" data-id="' + item.id + '" >' + '<td class="id">' + item.id + '</td>' + '<td class="icon"><span class="' + item.icon + '"></td>' + '<td >' + item.label + '</td>' + '<td >' + item.sort + '</td>' + '<td ><span class="' + enbl + '"></span></td>' + '<td >' + total + '</td>' + '</tr>';
            // return '<li class="uplight" data-id="' + item.catid + '"    ><div class="catname ' + (item.enable == 1 ? '' : ' disabled') + '" >' + item.label + '</div></li>';
        };
        return CategoriesList;
    })();
    uplight.CategoriesList = CategoriesList;
})(uplight || (uplight = {}));
/// <reference path="../rega.ts" />
/// <reference path="CategoryForm.ts" />
/// <reference path="CategoriesList.ts" />
var uplight;
(function (uplight) {
    var CategoriesManager = (function () {
        function CategoriesManager(container) {
            var _this = this;
            this.R = uplight.RegA.getInstance();
            if (!this.R.model)
                this.R.model = new uplight.DestinantionsModel();
            container.load('htms/admin/CategoriesManager.htm', function () {
                _this.init();
            });
        }
        CategoriesManager.prototype.show = function () {
            this.isVisible = true;
            this.view.show('fast');
        };

        CategoriesManager.prototype.hide = function () {
            if (this.isVisible) {
                this.isVisible = false;
                this.view.hide('fast');
            }
        };
        CategoriesManager.prototype.init = function () {
            var _this = this;
            this.view = $('#CategoriesManager');
            this.categoryForm = new uplight.CategoryForm($('#CategoryForm'));
            this.categoryForm.onClose = function () {
                _this.show();
            };
            this.list = new uplight.CategoriesList($('#CategoriesList'));
            this.R.model.dispatcher.on(this.R.model.CHANGE, function () {
                _this.onModelChanged();
            });

            this.btnAdd = $('#CategoriesView [data-id=btnAdd]:first').on(CLICK, function () {
                return _this.onAddClicked();
            });
            this.btnEdit = $('#CategoriesView [data-id=btnEdit]:first').on(CLICK, function () {
                return _this.onEditClicked();
            });
            this.btnDel = $('#CategoriesView [data-id=btnDel]').on(CLICK, function () {
                return _this.onDelClicked();
            });
            this.total = this.view.find('[data-id=total]');
            this.title = this.view.find('[data-id=title]');
            this.isVisible = true;
        };

        CategoriesManager.prototype.onModelChanged = function () {
            // this.editCategories.renderList();
        };

        CategoriesManager.prototype.onAddClicked = function () {
            var cat = new uplight.VOCategory({ id: 0 });
            cat.dests = [];
            cat.sort = this.R.model.getCategories().length + 1;
            cat.icon = 'icon';
            cat.enable = 1;
            this.categoryForm.setCurrent(cat);
            this.categoryForm.show();
            this.hide();
        };

        CategoriesManager.prototype.onEditClicked = function () {
            this.categoryForm.show();
            this.hide();
        };

        CategoriesManager.prototype.onDeleteSuccess = function (res) {
            console.log(res);
        };
        CategoriesManager.prototype.onDelClicked = function () {
            var _this = this;
            // console.log('delite');
            var item = this.list.selectedItem;

            // console.log(item);
            if (!item)
                return;
            this.R.confirm.show('Delete Category', 'Yoy want to delete category ' + item.label + '?', function () {
                _this.R.model.deleteCategory(item, function (res) {
                    return _this.onDeleteSuccess(res);
                });
            });
        };
        return CategoriesManager;
    })();
    uplight.CategoriesManager = CategoriesManager;
})(uplight || (uplight = {}));
/**
* Created by VladHome on 6/22/2015.
*/
/// <reference path="../RegA.ts" />
var uplight;
(function (uplight) {
    var CategoryInListing = (function () {
        function CategoryInListing(view) {
            var _this = this;
            this.view = view;
            this.R = uplight.RegA.getInstance();

            this.R.dispatcher.on(this.R.CATEGORY_REST, function () {
                return _this.render();
            });
            this.list = $('<ul>').appendTo(view.find('[data-id=list]:first'));
            this.list.on(CLICK, 'li', function (evt) {
                return _this.onListClick($(evt.currentTarget));
            });
            this.title = view.find('[data-id=title]:first');
            this.R.dispatcher.on(this.R.CATEGORY_ADD_SELECTED, function (evt, elms) {
                return _this.onAddSelected(elms);
            });
            this.total = view.find('[data-id=total]:first');
            this.btnDel = view.find('[data-id=btnDel]').on(CLICK, function () {
                return _this.onDelClicked();
            });
            this.btnReset = view.find('[data-id=btnReset]').on(CLICK, function () {
                _this.R.dispatcher.triggerHandler(_this.R.CATEGORY_REST);
            });
        }
        CategoryInListing.prototype.onDelClicked = function () {
            var _this = this;
            var elms = this.list.children('.selected');
            this.R.dispatcher.triggerHandler(this.R.CATEGORY_REMOVE_SELECTED, [elms]);
            setTimeout(function () {
                return _this.refreshList();
            }, 500);
        };
        CategoryInListing.prototype.onAddSelected = function (elms) {
            var _this = this;
            // console.log(elms);
            this.list.prepend(elms);
            setTimeout(function () {
                return _this.refreshList();
            }, 2000);
        };

        CategoryInListing.prototype.refreshList = function () {
            this.list.children().removeClass(SELECTED);
            this.sortList();
            this.total.text(this.sortList());
        };
        CategoryInListing.prototype.onListClick = function (el) {
            var id = el.data('id');
            if (isNaN(id))
                return;
            el.toggleClass(SELECTED);
        };
        CategoryInListing.prototype.getCatId = function () {
            return this.current.id;
        };
        CategoryInListing.prototype.getAllIds = function () {
            var out = [];
            this.list.children().each(function (ind, el) {
                out.push(Number($(el).data('id')));
            });

            return out;
        };

        CategoryInListing.prototype.setCurrent = function (vo) {
            // console.log(vo);
            this.current = vo;
            // this.render();
        };

        CategoryInListing.prototype.render = function () {
            if (!this.current)
                return;
            var ar = this.R.model.getDestinationsInCategory(this.current.id);

            ///  console.log(ar);
            var out = '';
            for (var i = 0, n = ar.length; i < n; i++) {
                out += this.renderItem(ar[i], i);
            }

            this.list.html(out);
            this.title.text(this.current.label);
            this.total.text(n);
        };

        CategoryInListing.prototype.renderItem = function (item, i) {
            return '<li data-i="' + i + '" data-type="old" data-id="' + item.id + '" class="item" ><span class="name">' + item.name + '</span><span class="unit pull-right">' + item.unit + '</span></li>';
        };

        CategoryInListing.prototype.sortList = function () {
            var mylist = this.list;
            var listitems = mylist.children().get();
            listitems.sort(function (a, b) {
                return $(a).text().toUpperCase().localeCompare($(b).text().toUpperCase());
            });
            $.each(listitems, function (idx, itm) {
                mylist.append(itm);
            });
            return listitems.length;
        };
        return CategoryInListing;
    })();
    uplight.CategoryInListing = CategoryInListing;
})(uplight || (uplight = {}));
/**
* Created by VladHome on 6/22/2015.
*/
/// <reference path="../RegA.ts" />
var uplight;
(function (uplight) {
    var CategoryList = (function () {
        function CategoryList(view) {
            var _this = this;
            this.view = view;
            this.CATEGORY_SELECTED = 'CATEGORY_SELECTED';
            this.dispatcher = $({});
            this.R = uplight.RegA.getInstance();

            //console.log(this.R.vo);
            // view.find('[data-id=header]:first').html('<div class="icon">Icon</div><div class="name">Name</div>');
            this.list = $('<ul>').on(CLICK, 'li', function (evt) {
                return _this.onItemClick($(evt.currentTarget));
            }).appendTo(this.view.find('[data-id=list]:first'));
            if (this.R.model.getCategories())
                this.render();
            this.R.model.dispatcher.on(this.R.model.CHANGE, function () {
                return _this.render();
            });
            this.R.dispatcher.on(this.R.CATEGORY_NOTINLIS_CLOSE, function () {
                return _this.show();
            });
        }
        CategoryList.prototype.render = function () {
            var ar = this.R.model.getCategories();
            var out = '';
            for (var i = 0, n = ar.length; i < n; i++) {
                out += this.renderItem(ar[i], i);
            }

            this.list.html(out);
            this.data = ar;
        };

        CategoryList.prototype.hide = function () {
            this.view.hide('fast');
        };

        CategoryList.prototype.show = function () {
            this.view.show('fast');
        };

        CategoryList.prototype.renderItem = function (item, i) {
            return '<li  class="item ' + (item.enable == 1 ? '' : ' disabled') + '" data-i="' + i + '" data-id="' + item.id + '" ><span class="' + item.icon + '"></span> <span class="name">' + item.label + '</span></li>';
        };
        CategoryList.prototype.onItemClick = function (el) {
            var i = el.data('i');
            if (isNaN(i))
                return;
            var item = this.data[i];

            this.dispatcher.triggerHandler(this.CATEGORY_SELECTED, item);
            this.selectElement(el);
        };

        CategoryList.prototype.selectElement = function (el) {
            if (this.selected)
                this.selected.removeClass(SELECTED);
            this.selected = el;
            el.addClass(SELECTED);
        };
        return CategoryList;
    })();
    uplight.CategoryList = CategoryList;
})(uplight || (uplight = {}));
/**
* Created by VladHome on 6/20/2015.
*/
/// <reference path="../rega.ts" />
var uplight;
(function (uplight) {
    var CategoryNotListing = (function () {
        function CategoryNotListing(view) {
            var _this = this;
            this.R = uplight.RegA.getInstance();
            this.view = view.hide();
            this.total = view.find('[data-id=total]:first');
            this.list = $('<ul>').appendTo(view.find('[data-id=list]:first'));
            this.list.on(CLICK, 'li', function (evt) {
                return _this.onListClick($(evt.currentTarget));
            });
            this.btnAdd = view.find('[data-id=btnAdd]:first').on(CLICK, function () {
                return _this.onAddClick();
            });
            this.tiSearch = view.find('[data-id=tiSearch]:first').on('input', function () {
                return _this.onSearchInput();
            });
            this.btnClose = view.find('[data-id=btnClose]:first').on(CLICK, function () {
                return _this.onCloseClicked();
            });
            this.btnBack = view.find('[data-id=btnBack]:first').on(CLICK, function () {
                return _this.onCloseClicked();
            });

            // this.R.events.on(this.R.CATEGORY_SELECTED,(evt,cat)=>this.onCategorySelected(cat));
            this.R.dispatcher.on(this.R.CATEGORY_REMOVE_SELECTED, function (evt, elms) {
                return _this.onRemoved(elms);
            });
            this.R.dispatcher.on(this.R.CATEGORY_REST, function () {
                return _this.render();
            });
            this.btnClear = view.find('.fa-times-circle:first').on(CLICK, function () {
                return _this.onClearClicked();
            });
        }
        CategoryNotListing.prototype.onClearClicked = function () {
            this.tiSearch.val('');
            this.sortList();
        };

        CategoryNotListing.prototype.sortList = function () {
            var mylist = this.list;
            var listitems = mylist.children().get();
            listitems.sort(function (a, b) {
                return $(a).text().toUpperCase().localeCompare($(b).text().toUpperCase());
            });
            $.each(listitems, function (idx, itm) {
                mylist.append(itm);
            });
            return listitems.length;
        };
        CategoryNotListing.prototype.onRemoved = function (elms) {
            var _this = this;
            this.list.prepend(elms);
            setTimeout(function () {
                return _this.refreshList();
            }, 2000);
        };
        CategoryNotListing.prototype.refreshList = function () {
            this.list.children().removeClass(SELECTED);
            this.total.text(this.sortList());
        };
        CategoryNotListing.prototype.onCloseClicked = function () {
            this.hide();
            this.R.dispatcher.triggerHandler(this.R.CATEGORY_NOTINLIS_CLOSE);
        };

        CategoryNotListing.prototype.setCurrent = function (cat) {
            this.current = cat;
            // this.render();
        };
        CategoryNotListing.prototype.onAddClick = function () {
            var _this = this;
            var elms = this.list.children('.selected');
            this.R.dispatcher.triggerHandler(this.R.CATEGORY_ADD_SELECTED, [elms]);
            setTimeout(function () {
                return _this.refreshList();
            }, 500);
        };

        CategoryNotListing.prototype.onSearchInput = function () {
            var pat = this.tiSearch.val().toLowerCase();
            if (pat.length) {
                var mylist = this.list;
                var listitems = mylist.children().get();

                $.each(listitems, function (idx, itm) {
                    if (itm.innerText.toLowerCase().indexOf(pat) !== -1)
                        mylist.prepend(itm);
                });
            } else
                this.sortList();
        };

        CategoryNotListing.prototype.onListClick = function (el) {
            if (el.hasClass(SELECTED))
                el.removeClass(SELECTED);
            else
                el.addClass(SELECTED);
        };

        CategoryNotListing.prototype.show = function () {
            if (this.isVisible)
                return;
            this.view.show('fast');
            this.isVisible = true;
        };

        CategoryNotListing.prototype.hide = function () {
            if (this.isVisible) {
                this.view.hide('fast');
                this.isVisible = false;
            }
        };

        CategoryNotListing.prototype.renderItem = function (item, i) {
            return '<li data-type="new" data-id="' + item.id + '" class="item" ><span class="name">' + item.name + '</span><span class="unit pull-right">' + item.unit + '</span></li>';
        };

        // resetData():CategoryNotListing{
        //   if(!this.current) return;
        //return this;
        // }
        CategoryNotListing.prototype.render = function () {
            if (!this.current)
                return;
            var out = '';
            var ar = this.R.model.getDestinationsNotInCategory();
            for (var i = 0, n = ar.length; i < n; i++) {
                out += this.renderItem(ar[i], i);
            }
            this.list.html(out);
            this.data = ar;
            this.total.text(n);
        };
        return CategoryNotListing;
    })();
    uplight.CategoryNotListing = CategoryNotListing;
})(uplight || (uplight = {}));
/**
* Created by VladHome on 6/20/2015.
*/
/// <reference path="../rega.ts" />
///<reference path="CategoryInListing.ts" />
///<reference path="CategoryList.ts" />
///<reference path="CategoryNotListing.ts" />
var uplight;
(function (uplight) {
    var CategoryListing = (function () {
        function CategoryListing(container) {
            this.R = uplight.RegA.getInstance();
            var that = this;
            if (!this.R.model)
                this.R.model = new uplight.DestinantionsModel();
            container.load('htms/admin/CategoryListing.htm', function () {
                that.init();
            });
        }
        CategoryListing.prototype.init = function () {
            var _this = this;
            this.view = $('#CategoryListing');
            var tools = this.view;

            // this.show();
            this.inListing = new uplight.CategoryInListing($('#CategoryInListing'));
            this.list = new uplight.CategoryList($('#CategoryList'));
            this.list.dispatcher.on(this.list.CATEGORY_SELECTED, function (evt, cat) {
                return _this.onCategorySelected(cat);
            });
            this.notInListing = new uplight.CategoryNotListing($('#CategoryNotListing'));

            this.btnAdd = tools.find('[data-id=btnAdd]:first').on(CLICK, function () {
                return _this.onAddClicked();
            });

            this.btnSave = tools.find('[data-id=btnSave]:first').on(CLICK, function () {
                return _this.onSaveClicked();
            });
        };

        CategoryListing.prototype.onCategorySelected = function (cat) {
            //console.log(cat);
            this.inListing.setCurrent(cat);

            this.inListing.render();
            this.notInListing.setCurrent(cat);
            this.notInListing.render();
        };

        CategoryListing.prototype.onAddClicked = function () {
            this.list.hide();
            this.notInListing.show();
        };

        CategoryListing.prototype.onSave = function (res) {
            if (res.success)
                this.R.msg('Records Saved', this.btnSave);
            else
                this.R.msg('ERROR ', this.btnSave);
            console.log(res);
        };
        CategoryListing.prototype.onSaveClicked = function () {
            var _this = this;
            var btn = this.btnSave;
            btn.prop('disabled', true);
            setTimeout(function () {
                btn.prop('disabled', false);
            }, 1500);
            var ids = this.inListing.getAllIds();
            var catid = this.inListing.getCatId();
            this.R.model.saveCategoryListing(catid, ids, function (res) {
                return _this.onSave(res);
            });
        };
        return CategoryListing;
    })();
    uplight.CategoryListing = CategoryListing;
})(uplight || (uplight = {}));
/// <reference path="../RegA.ts" />

var uplight;
(function (uplight) {
    var ImportExport = (function () {
        function ImportExport(container) {
            var _this = this;
            this.headers = ['UID', 'Name', 'Unit', 'Info', 'Categories', 'Keywords', 'Table', 'Meta', 'Thumbnail', 'Images'];
            this.R = uplight.RegA.getInstance();
            container.load('htms/admin/ImportExport.htm', function () {
                _this.init();
            });
        }
        ImportExport.prototype.init = function () {
            var _this = this;
            this.view = $('#ImportExport');
            this.tableView = $('#table-container');
            this.table = $('<table>').addClass('table table-bordered').appendTo(this.tableView);
            this.tbody = $('<tbody>').appendTo(this.table);
            this.total = this.view.find('[data-id=total]');

            this.tbody.on(CLICK, 'tr', function (evt) {
                return _this.onItemClick(evt);
            });

            this.btnDel = this.view.find('[data-id=btnDel]').on(CLICK, function () {
                return _this.onDelClicked();
            });

            // this.viewAddOver = this.viewWiz.find('[data-id=addover]').eq(0);
            this.rdAdd = this.view.find('[data-id=rdAdd]:first');
            this.rdOver = this.view.find('[data-id=rdOver]:first');
            this.btnUpload = this.view.find('[data-id=btnUpload]').on(CLICK, function () {
                return _this.onUploadClicked();
            });

            this.btnDownload = this.view.find('[data-id=btnDownload]').on(CLICK, function () {
                return _this.onDownloadClick();
            });

            // this.btnDownload.attr('href',this.R.connector.service+'?a=importexport.export_CSV');
            this.btnSelect = this.view.find('[data-id=btnImport]').change(function (evt) {
                _this.onFileSelected(evt.target.files);
            });

            this.table.append(this.renderHead());
            this.getData();
            this.R.model.dispatcher.on(this.R.model.CHANGE, function () {
                return _this.getData();
            });
        };

        ImportExport.prototype.convertToArray = function (ar) {
            var out = [];

            for (var i = 0, n = ar.length; i < n; i++) {
                var item = ar[i];
                var cats = this.R.model.getCategoriesNames(item.cats).join(',');
                out.push([item.uid, item.name, item.unit, item.info, cats, item.kws, item.more, item.meta, item.tmb, item.imgs]);
            }
            return out;
        };
        ImportExport.prototype.onDownloadClick = function () {
            var _this = this;
            var ar = this._data;
            var out = this.convertToArray(this._data);
            out.unshift(this.headers);
            $.post(this.R.connector.service + '?a=importexport.saveAsCSV', JSON.stringify(out)).done(function (res) {
                var idown = $('<iframe>', { id: 'idown', src: _this.R.connector.service + '?a=importexport.get_CSV' }).hide().appendTo('body');
            });
        };

        // private catInd:any;
        ImportExport.prototype.onCategories = function (res) {
            this.categories = res;
            // this.catInd = _.indexBy(res,'label');
        };
        ImportExport.prototype.getData = function () {
            this._data = this.R.model.getData();

            //    console.log(ar);
            this.renderData();
            this.isNewData = false;
            this.btnUpload.prop('disabled', true);
            // this.R.connector.getCategories().done((res)=>this.onCategories(res));
            // this.R.connector.exportDestination().done((res) => this.onDataComplete(res));
        };

        ImportExport.prototype.onError = function (res) {
            console.log('ERROR ', res);
        };
        ImportExport.prototype.renderHead = function () {
            return '<thead><th>' + this.headers.join('</th><th>') + '</th></thead><tbody>';
        };

        ImportExport.prototype.renderItem = function (item, i, cats) {
            return '<tr data-i="' + i + '"><td>' + item.uid + '</td><td>' + item.name + '</td><td>' + item.unit + '</td><td>' + item.info + '</td><td>' + cats + '</td><td>' + item.kws + '</td><td>' + item.more + '</td><td>' + item.meta + '</td><td>' + item.tmb + '</td><td>' + item.imgs + '</td></tr>';
        };

        /* private onDataComplete(ar:any[]): void {
        this._data = ar;
        //    console.log(ar);
        this.renderData();
        this.isNewData = false;
        this.btnUpload.prop('disabled',true);
        }*/
        ImportExport.prototype.renderData = function () {
            var out = '';
            var ar = this._data;

            for (var i = 0, n = ar.length; i < n; i++) {
                var cats = '';
                if (ar[i].cats)
                    cats = this.R.model.getCategoriesNames(ar[i].cats).join(',');
                out += this.renderItem(ar[i], i, cats);
            }

            this.tbody.html(out);
            this.total.text(n);
        };

        ImportExport.prototype.checkHeaders = function (ar) {
            if (ar.length < 9)
                return false;

            return true;
        };

        ImportExport.prototype.getCategoryIdbyLabel = function (label) {
            var ar = this.R.model.getCategories();
            for (var i = 0, n = ar.length; i < n; i++) {
                if (ar[i].label == label)
                    return ar[i].id;
            }
            return 0;
        };

        ImportExport.prototype.onCSVComplete = function (res) {
            var ar = res;
            console.log('onCSVComplete ', res);
            var out = [];
            this.checkHeaders(ar.shift());

            console.log(ar);
            for (var i = 0, n = ar.length; i < n; i++) {
                var item = ar[i];
                if (item.length > 9) {
                    item[4] = this.convertCategories(item[4]);
                    out.push(new uplight.VODestination({ uid: item[0], name: item[1], unit: item[2], info: item[3], cats: item[4], kws: item[5], more: item[6], meta: item[7], tmb: item[8], imgs: item[9] }));
                }
            }

            this._data = out;
            console.log('onCSVComplete out ', out);
            this.renderData();
            this.isNewData = true;
            this.btnUpload.prop('disabled', false);
            // if(this.newCategories.length) alert('New categories will be added: '+"\n"+this.newCategories.join("\n"));
        };

        ImportExport.prototype.onFileSelected = function (files) {
            var _this = this;
            //  var file: File = files[0];
            // console.log(files);
            if (files.length === 1) {
                var form = new FormData();
                form.append('file', files[0]);
                this.R.connector.uploadCSV(form, function (res) {
                    return _this.onCSVComplete(res);
                }, this.onError, this.onProgress);
            }
            // console.log(file);
        };

        /*
        
        private createCategories(ar:string[],start:number):VOCategory[]{
        var out:VOCategory[]=[];
        
        for(var i=0,n=ar.length;i<n;i++){
        var cat = new VOCategory({id:0});
        cat.label=ar[i];
        cat.icon='';
        cat.enable=1;
        cat.type=0;
        cat.sort=i+start;
        out.push(cat);
        }
        
        return out;
        }
        
        
        private  collectCategories():VOCategory[]{
        var cats:string[]=[];
        var ar = this._data;
        for(var i=0,n=ar.length;i<n;i++){
        if(ar[i].cats.length<4) continue;
        // var ar2 = ar[i].categories;
        // for(var i2=0,n2=ar2.length;i2<n2;i2++){
        //  if(cats.indexOf(ar2[i2])===-1)cats.push(ar2[i2]);
        // }
        }
        return this.createCategories(cats,1);
        
        }
        */
        ImportExport.prototype.convertCategories = function (cats) {
            if (!cats)
                return [];
            var out = [];
            var ar = cats.split(',');
            for (var i = 0, n = ar.length; i < n; i++) {
                out.push(this.getCategoryIdbyLabel(ar[i]));
            }
            return out;
        };

        ImportExport.prototype.onNewCategories = function (res) {
            this.categories = res;
            this.sendData();
        };

        ImportExport.prototype.sendData = function () {
            var _this = this;
            var ar = this._data;
            var is_overwrite = this.rdOver.prop(CHECKED);
            console.log('sendData total ' + ar.length + ' is_overwrite ' + is_overwrite);

            for (var i = 0, n = ar.length; i < n; i++) {
                ar[i].cats = ar[i].cats.join(',');
            }

            this.R.connector.insertdDestinations(JSON.stringify(ar), is_overwrite).done(function (res) {
                console.log(res);
                _this.R.model.refreshData();
            });
        };

        /*   private uploadNewCategories():void{
        var is_overwrite:boolean = this.rdOver.prop(CHECKED);
        console.log('is_overwrite '+is_overwrite);
        var ar:VOCategory[]
        if(is_overwrite) ar= this.collectCategories();
        else ar = this.createCategories(this.newCategories,this.categories.length);
        console.log(ar);
        
        this.R.connector.insertCategories(ar,is_overwrite).done((r)=>{
        console.log('insertCategories   ',r);
        this.R.connector.getCategories().done((res)=>this.onNewCategories(res));
        });
        }*/
        ImportExport.prototype.onUploadClicked = function () {
            console.log('uploding');
            this.btnUpload.prop('disabled', true);
            this.R.msg('Uploading...', this.btnUpload);

            // setTimeout(()=>{this.btnUpload.prop('disabled',false)},3000);
            // if(this.newCategories.length) this.uploadNewCategories();
            // else
            this.sendData();
        };

        /*
        private onUploadComplete(res): void {
        
        console.log(res);
        if (res.result) {
        this.R.msg('Complete', this.btnUpload);
        this._data = null;
        //this.resetButtons();
        this.getData();
        this.R.model.refreshData();
        }
        }
        
        
        private renderData(data:VODestination[]): void {
        var out: string = '<thead><th>id</th><th>Name</th><th>Unit</th><th>Personal info</th><th>Categories</th></thead><tbody>';
        for (var i = 0, n = data.length; i < n; i++) out += this.renderItem(data[i]);
        out += '</tbody>';
        this.table.html(out);
        }
        
        
        private renderItem(item: VODestination): string {
        
        return '<tr data-id="' + item.destid + '"><td>' + item.destid + '</td><td>' + item.name + '</td><td>' + item.unit + '</td><td>' + item.personal + '</td><td>' + item.cats + '</td></tr>';
        }
        
        private onExportClick(evt): void {
        
        var el: HTMLElement = document.getElementById('tblDest');
        
        document.execCommand('SaveAs', true, 'directrories.html');
        
        
        var file = {
        worksheets: [[]], // worksheets has one empty worksheet (array)
        creator: 'Electronic Directory', created: new Date(),
        lastModifiedBy: 'Interactive Directory', modified: new Date(),
        activeWorksheet: 0
        }
        var w:any = file.worksheets[0]; // cache current worksheet
        w.name = "DirectoriesData";
        $('#tblDest').find('tr').each(function () {
        var r = w.push([]) - 1; // index of current row
        $(this).find('td').each(function () { w[r].push(this.innerText); });
        });
        
        
        // trace(file.worksheets);
        
        trace(xlsx(file).base64);
        */
        //   }
        // private onImportClick(evt): void {
        // this.R.connector.uploadTempFile('uploadFile', (res) => this.onUploadComplete(res), null,this.onProgress);
        //$('#ImportExport progress').show();
        // }
        ImportExport.prototype.onProgress = function (evt) {
            console.log(evt);
            if (evt.lengthComputable) {
                // $('#ImportExport progress').attr({ value: evt.loaded, max: evt.total });
            }
        };
        ImportExport.prototype.onDelClicked = function () {
            if (this.btnDel.hasClass(DISABLED))
                return;

            // console.log(this.table.find('.selected').each);
            if (confirm('You want to delete selected records?')) {
                var data = this._data;
                $(this.table.find('.selected').get().reverse()).each(function (ind, el) {
                    if (el.rowIndex) {
                        data.splice(el.rowIndex - 1, 1);
                        $(el).remove();
                    }
                });
            }
        };

        ImportExport.prototype.onItemClick = function (evt) {
            if (this.btnDel.hasClass(DISABLED))
                return;
            var el = evt.currentTarget;
            el.classList.toggle('selected');
        };
        return ImportExport;
    })();
    uplight.ImportExport = ImportExport;
})(uplight || (uplight = {}));
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/**
* Created by VladHome on 11/9/2015.
*/
var uplight;
(function (uplight) {
    var VODevice = (function () {
        function VODevice(obj) {
            this.start = 0;
            this.s_time = 0;
            this.now = 0;
            this.ip = '';
            this.ping = 0;
            this.start_at = 0;
            this.timer = 15000;
            for (var str in obj)
                this[str] = obj[str];
        }
        return VODevice;
    })();
    uplight.VODevice = VODevice;

    var DeviceModel = (function (_super) {
        __extends(DeviceModel, _super);
        function DeviceModel(dev, s_time, timer) {
            _super.call(this, dev.track);
            for (var str in dev)
                this[str] = dev[str];
            var delta = (s_time - this.s_time);
            if (delta < timer)
                this.status = 1;
            else
                this.status = 0;
        }
        return DeviceModel;
    })(VODevice);
    uplight.DeviceModel = DeviceModel;
})(uplight || (uplight = {}));
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
    })();
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
    })();
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
    })();
    uplight.TopDestinations = TopDestinations;
})(uplight || (uplight = {}));
/**
* Created by VladHome on 11/9/2015.
*/
/// <reference path="../../typing/jquery.d.ts" />
/// <reference path="../../typing/underscore.d.ts" />
/// <reference path="../RegA.ts" />
var uplight;
(function (uplight) {
    var CategoriesChart = (function () {
        function CategoriesChart(view, data, colors) {
            this.view = view;
            this.data = data;
            this.colors = colors;
            // console.log(data);
            var ar = data;
            var out = {};
            var max = 0;
            for (var i = 0, n = ar.length; i < n; i++) {
                var val = ar[i][1];
                if (isNaN(val))
                    val = 10000;
                val = 10000 - val;
                if (val > max)
                    max = val;
                out[ar[i][0]] = val;
            }

            for (var str in out)
                out[str] -= max;

            this.render(out);
            //RegA.getInstance().connector.getCategories().done((res)=>this.onCategories(res))
        }
        /* private getCategryStat(id:number){
        var ar = this.data
        for(var i=0,n=ar.length;i<n;i++){
        var item = ar[i];
        }
        }
        */
        /* private parseData(cats:any,data:any):void{
        console.log(data);
        var ar = data
        for(var i=0,n=ar.length;i<n;i++){
        if(ar[i].type=='cp'){ cats[ar[i].val]++}
        else if(ar[i].type=='cm'){cats[ar[i].val]--};
        }
        
        }
        
        private rateCategories(cats:VOCategory[],obj:any):VOPie[]{
        var ar = cats;
        var out:VOPie[]=[]
        for(var i=0,n=ar.length;i<n;i++){
        var item = ar[i];
        var vo:VOPie = new VOPie();
        vo.color=ar[i].color;
        vo.label = ar[i].label;
        vo.value = obj[ar[i].id];
        out.push(vo);
        }
        return out;
        }
        private cats:any;*/
        CategoriesChart.prototype.render = function (data) {
            var list = $('<ul>');
            var out = '';

            // var ar = res
            var obj = {};
            var pies = [];

            var ar = uplight.RegA.getInstance().model.getCategories();

            var total = 0;
            for (var i = 0, n = ar.length; i < n; i++) {
                // var cat:VOCategory = new VOCategory(ar[i]);
                var vo = new VOPie();
                vo.color = this.colors[i];
                vo.label = ar[i].label;
                var val = data[ar[i].id] || 1;
                if (val === 0)
                    val = 1;
                val = 1 / Math.abs(val);
                total += val;
                vo.value = val; // 100+(data[cat.id] || 0);
                pies.push(vo);
                out += '<li><span class="glyphicon glyphicon-stop" style="color:' + vo.color + ';"></span> <span> ' + vo.label + '</span></li>';
                /// console.log(cat);
            }

            for (var i = 0, n = pies.length; i < n; i++) {
                pies[i].value = pies[i].value / total * 100;
            }

            // console.log(pies);
            // this.parseData(obj,this.data);
            ///  var vis =  this.rateCategories(cats,obj);
            // console.log(cats);
            list.html(out);
            this.list = list;
            var cont = this.view.find('[data-id=list]:first').empty();
            list.appendTo(cont);

            var canvas = this.view.find('[data-id=canvas]:first');

            //console.log('vis',vis);
            var myPieChart = new Chart(canvas.get(0).getContext("2d")).Pie(pies, this.getOptions());
            //console.log(res);
        };

        CategoriesChart.prototype.getOptions = function () {
            return {
                //Boolean - Whether we should show a stroke on each segment
                segmentShowStroke: true,
                //String - The colour of each segment stroke
                segmentStrokeColor: "#fff",
                //Number - The width of each segment stroke
                segmentStrokeWidth: 2,
                //Number - The percentage of the chart that we cut out of the middle
                percentageInnerCutout: 0,
                //Number - Amount of animation steps
                animationSteps: 100,
                //String - Animation easing effect
                animationEasing: "easeOutBounce",
                //Boolean - Whether we animate the rotation of the Doughnut
                animateRotate: true,
                //Boolean - Whether we animate scaling the Doughnut from the centre
                animateScale: false
            };
        };
        return CategoriesChart;
    })();
    uplight.CategoriesChart = CategoriesChart;

    var VOPie = (function () {
        function VOPie() {
        }
        return VOPie;
    })();
    var VOKs = (function () {
        function VOKs(id) {
            this.id = id;
            this.clicks = [];
        }
        VOKs.prototype.buildDays = function () {
            var out;
            var ar = this.clicks;
            for (var i = 0, n = ar.length; i < n; i++) {
                var date = new Date(ar[i] * 1000);
                var day = date.getDay();
                if (!out[day])
                    out[day] = 0;
                out[day]++;
            }
            return out;
        };
        return VOKs;
    })();

    var KiosksChart = (function () {
        function KiosksChart(view, colors, fromto) {
            var _this = this;
            this.view = view;
            this.colors = colors;
            //  console.log(clicks);
            this.view.find('[data-id=fromto]:first').text(fromto);
            uplight.RegA.getInstance().connector.getData('kiosks.json').done(function (res) {
                return _this.onKiosks(res);
            });
        }
        KiosksChart.prototype.craeateTimeline = function () {
            var now = new Date();
            var dates = [];
            dates.push(now.getDate());
            for (var i = 0, n = 30; i < n; i++) {
                now.setDate(now.getDate() - 1);
                dates.push(now.getDate());
            }
            return dates.reverse();
        };
        KiosksChart.prototype.breakeClicksInDays = function (clicks) {
            var ar = clicks;
            for (var i = 0, n = ar.length; i < n; i++) {
                var date = new Date(ar[i] * 1000);
            }
            var from = new Date(clicks[0] * 1000);
            var to = new Date(clicks[clicks.length - 1] * 1000);
            console.log(from);
            console.log(to);
        };

        KiosksChart.prototype.convertClicks = function (ar) {
            var out = [];

            for (var i = 0, n = ar.length; i < n; i++) {
                var date = new Date(ar[i] * 1000);
                var day = date.getDate();
                if (!out[day])
                    out[day] = 0;
                out[day]++;
            }
            return out;
        };

        KiosksChart.prototype.mapClicks = function (ar, clicks) {
            var out = [];
            for (var i = 0, n = ar.length; i < n; i++)
                out.push(clicks[ar[i]] || 0);
            return out;
        };

        KiosksChart.prototype.renderKiosk = function (obj) {
            return '<li title="kiosk id ' + obj.id + '"><span class="glyphicon glyphicon-stop" style="color:' + obj.color + ';"></span> <span> ' + obj.name + '</span></li>';
        };

        KiosksChart.prototype.onData = function (res) {
            // console.log('usage',res);
            var timeline = this.craeateTimeline();
            var ar = [];
            for (var str in res) {
                var item = this.devices[str];
                var clicks = this.convertClicks(res[str]);
                item.clicks = this.mapClicks(timeline, clicks);
                ar.push(item);
            }

            this.drawGraph(timeline.map(String), ar);
        };

        KiosksChart.prototype.drawGraph = function (timeline, ar) {
            var datasets = [];
            for (var i = 0, n = ar.length; i < n; i++) {
                var ds = {};
                ds.label = ar[i].name;
                ds.strokeColor = ar[i].color;
                ds.pointColor = ar[i].color;
                ds.pointHighlightStroke = "rgba(220,220,220,1)";
                ds.pointStrokeColor = "#fff";
                ds.pointHighlightFill = "#666";
                ds.data = ar[i].clicks;
                datasets.push(ds);
            }

            var data = {
                labels: timeline.map(String),
                datasets: datasets
            };

            var canvas = this.view.find('[data-id=canvas]:first');
            var ctx = canvas.get(0).getContext("2d");
            var myLineChart = new Chart(ctx).Line(data, this.getOptions());
        };

        KiosksChart.prototype.onKiosks = function (res) {
            var _this = this;
            var ids = [];

            // var timeline:number[]=  this.craeateTimeline();
            var ks = JSON.parse(res);

            // console.log(ks);
            var ar = ks;
            var list = $('<ul>');
            var out = '';
            var datasets = [];

            var devices = {};
            for (var i = 0, n = ar.length; i < n; i++) {
                var item = ar[i];

                //  var id:string = 'kiosk'+item.id;
                ids.push(item.id);
                devices[item.id] = ar[i];

                // var clicks:number[] = this.clicks[ar[i].id];
                //if(!clicks) clicks=[];
                //clicks = this.convertClicks(clicks);
                //ar[i].clicks = this.mapClicks(timeline,clicks);
                ar[i].color = this.colors[i];
                out += this.renderKiosk(ar[i]);
                // var ds:any={};
                //  ds.label=ar[i].name;
                // ds.strokeColor=ar[i].color;
                // ds.pointColor=ar[i].color;
                // ds.pointHighlightStroke = "rgba(220,220,220,1)";
                // ds.pointStrokeColor="#fff";
                //  ds.pointHighlightFill= "#666";
                // ds.data = ar[i].clicks;
                // datasets.push(ds);
            }
            this.devices = devices;

            uplight.RegA.getInstance().connector.getUsage(ids.join(','), '-30 days', 'now').done(function (res) {
                return _this.onData(res);
            });
            list.html(out);
            this.view.find('[data-id=list]:first').append(list);
            return;

            var timeline;

            var data = {
                labels: timeline.map(String),
                datasets: datasets
            };

            var canvas = this.view.find('[data-id=canvas]:first');
            var ctx = canvas.get(0).getContext("2d");
            var myLineChart = new Chart(ctx).Line(data, this.getOptions());
        };

        KiosksChart.prototype.getOptions = function () {
            return {
                ///Boolean - Whether grid lines are shown across the chart
                scaleShowGridLines: true,
                //String - Colour of the grid lines
                scaleGridLineColor: "rgba(0,0,0,.05)",
                //Number - Width of the grid lines
                scaleGridLineWidth: 1,
                //Boolean - Whether to show horizontal lines (except X axis)
                scaleShowHorizontalLines: true,
                //Boolean - Whether to show vertical lines (except Y axis)
                scaleShowVerticalLines: true,
                //Boolean - Whether the line is curved between points
                bezierCurve: true,
                //Number - Tension of the bezier curve between points
                bezierCurveTension: 0.4,
                //Boolean - Whether to show a dot for each point
                pointDot: true,
                //Number - Radius of each point dot in pixels
                pointDotRadius: 4,
                //Number - Pixel width of point dot stroke
                pointDotStrokeWidth: 1,
                //Number - amount extra to add to the radius to cater for hit detection outside the drawn point
                pointHitDetectionRadius: 5,
                //Boolean - Whether to show a stroke for datasets
                datasetStroke: true,
                //Number - Pixel width of dataset stroke
                datasetStrokeWidth: 2,
                //Boolean - Whether to fill the dataset with a colour
                datasetFill: false
            };
        };
        return KiosksChart;
    })();
    uplight.KiosksChart = KiosksChart;
})(uplight || (uplight = {}));
/**
* Created by VladHome on 11/9/2015.
*/
/// <reference path="../RegA.ts" />
/// <reference path="DeviceBase.ts" />
/// <reference path="../../typing/jquery.d.ts" />
/// <reference path="../../typing/underscore.d.ts" />
var uplight;
(function (uplight) {
    var DevicesData = (function () {
        // private greenLite:JQuery;
        function DevicesData(view, colors) {
            var _this = this;
            this.view = view;
            this.colors = colors;
            //console.log('DevicesData');
            if (uplight.RegA.getInstance().props['timer'])
                this.kioskTimer = uplight.RegA.getInstance().props['timer'].value;
            this.list = view.find('[data-id=list]:first');

            // this.greenLite=view.find('[data-view=greenLite]:first');
            this.loadData();
            setInterval(function () {
                return _this.loadData();
            }, 10000);
        }
        DevicesData.prototype.loadData = function () {
            var _this = this;
            this.list.find('.status').detach();
            uplight.RegA.getInstance().connector.getDevicesData().done(function (res) {
                return _this.onKiosks(res);
            });
        };
        DevicesData.prototype.onKiosks = function (res) {
            this.data = res.result;
            this.s_time = Number(res.success);

            // console.log(this.data);
            // console.log(this.s_time);
            this.render();
            // RegA.getInstance().connector.  getServerTime().done((res)=>{
            //  this.s_time = Number(res);
            //  this.render();
            //  });
        };

        DevicesData.prototype.render = function () {
            var kt = this.kioskTimer;
            console.log(kt);
            var s_time = this.s_time;
            var ar = this.data;
            var out = '';
            var ks = [];
            for (var i = 0, n = ar.length; i < n; i++) {
                var k = new uplight.DeviceModel(ar[i], s_time, kt);
                ks.push(k);
                out += this.createDevice(k);
            }
            this.devices = ks;
            this.list.html(out);
        };

        DevicesData.prototype.createDevice = function (obj) {
            var color = '#0F0';
            var statusStr = 'Working fine';
            var cl = 'fa-circle';
            if (obj.status === 0) {
                color = '#ECCC6B';
                cl = 'fa-exclamation-triangle';
                statusStr = 'Experienced delays';
            }

            var stsrtTime = obj.start ? new Date(obj.start * 1000).toLocaleString() : '';
            var lastTime = obj.now ? new Date(obj.now * 1000).toLocaleString() : '';
            return '<tr>' + '<td>' + obj.name + '</td>' + '<td><a target="_blank" href="' + obj.template + '?kiosk=' + obj.id + '&mode=preview" ><span class="fa fa-external-link"></span></a></td>' + '<td><span title="' + statusStr + '" class="status fa ' + cl + '" style="color:' + color + '">&nbsp</span></td>' + '<td>' + obj.ip + '</td>' + '<td>' + obj.ping + '</td>' + '<td class="text-right">' + stsrtTime + '</td>' + '<td class="text-right">' + lastTime + '</td>' + '</tr>';
        };
        return DevicesData;
    })();
    uplight.DevicesData = DevicesData;
})(uplight || (uplight = {}));
/**
* Created by VladHome on 8/8/2015.
*/
///<reference path="../../typing/chart.d.ts"/>
/// <reference path="../DirsAdmin.ts" />
/// <reference path="DeviceBase.ts" />
/// <reference path="TopSearches.ts" />
/// <reference path="KioskChart.ts" />
/// <reference path="DeviceData.ts" />
var uplight;
(function (uplight) {
    var Statistics = (function () {
        function Statistics(contauner) {
            var _this = this;
            this.colors = ['#9F9977', '#B2592D', '#BDC2C7', '#BC8777', ' #996398', '#839182', '#708EB3', '#BC749A'];
            this.R = uplight.RegA.getInstance();
            contauner.load('htms/admin/Statistics.htm', function () {
                return _this.init();
            });
        }
        Statistics.prototype.init = function () {
            // var today = new Date()
            //  var priorDate = new Date(today.getTime() - 30*24*60*60*1000);
            var _this = this;
            this.R.connector.getStatistics().done(function (res) {
                return _this.onData(res);
            });

            var today = new Date();
            var priorDate = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);
            this.fromTo = 'from ' + today.toDateString().substr(4) + ' to ' + priorDate.toDateString().substr(4);
            var kiosksChart = new uplight.KiosksChart($('#KiosksChart'), this.colors, this.fromTo);
            var devices = new uplight.DevicesData($('#DevicesData'), this.colors);
        };

        Statistics.prototype.onData = function (res) {
            var cats = res.categories;
            var dests = res.destinations;

            //  console.log(res);
            var categ = new uplight.CategoriesChart($('#CategoriesChart'), cats, this.colors);
            var destinTopDestinations = new uplight.TopDestinations($('#TopDestinations'), dests);
            var searches = new uplight.TopSearches($('#TopSearches'), res.search, res.keywords);
        };
        return Statistics;
    })();
    uplight.Statistics = Statistics;
})(uplight || (uplight = {}));
/// <reference path="../../typing/jquery.d.ts" />
/// <reference path="../../typing/underscore.d.ts" />
/// <reference path="../RegA.ts" />
var uplight;
(function (uplight) {
    var LabelEditor = (function () {
        function LabelEditor() {
            var _this = this;
            this.R = uplight.RegA.getInstance();
            this.view = $('#LabelEditor');
            this.select = this.view.find('[data-id=select]:first').change(function () {
                return _this.onSelectChange();
            });
            this.view.find('[data-id=btnClose]').click(function () {
                _this.hide();
                _this.current = null;
                //  console.log('click');
            });
            this.img = this.view.find('[data-id=img]:first');
            this.text = this.view.find('[data-id=text]:first');
            this.btnSave = this.view.find('[data-id=btnSave]').on(CLICK, function () {
                return _this.onSaveClick();
            });

            this.tiValue = this.view.find('[data-id=tiValue]:first');
            this.tiDescr = this.view.find('[data-id=tiDescr]:first');
            this.tiIndex = this.view.find('[data-id=tiIndex]:first');
            this.imgValue = this.view.find('[data-id=imgValue]:first');

            this.btnDelete = this.view.find('[data-id=btnDelete]:first').click(function () {
                return _this.onDeleteClick();
            });

            this.btnUpload = this.view.find('[data-id=btnUpload]').change(function (evt) {
                return _this.onFileSelected(evt);
            });
        }
        /*setAvailable(ar){
        
        }*/
        LabelEditor.prototype.onSaveClick = function () {
            //  console.log('save');
            if (!this.current)
                return;
            var item = this.current;
            if (item.type == 'img') {
                item.value = this.imgValue.attr('src');
            } else {
                item.value = this.tiValue.val();
            }
            item.description = this.tiDescr.val();
            item.index = this.tiIndex.val();
            this.onSave(item);
        };

        LabelEditor.prototype.onFileSelected = function (evt) {
            var _this = this;
            var input = evt.target;
            var files = input.files;
            console.log(files);
            if (files.length) {
                var file = files[0];
                var form = new FormData();
                form.append('file', file);
                this.R.connector.uploadImage(form, 'assets', '').done(function (res) {
                    console.log(res);
                    if (res.success)
                        _this.imgValue.attr('src', res.result);
                });
            }
        };

        LabelEditor.prototype.setData = function (item) {
            this.current = item;
            return this;
        };
        LabelEditor.prototype.renderImage = function () {
            this.imgValue.attr('src', this.current.value);
            this.text.hide();
            this.img.show();
        };
        LabelEditor.prototype.renderText = function () {
            this.tiValue.val(this.current.value);
            this.img.hide();
            this.text.show();
        };
        LabelEditor.prototype.render = function () {
            var item = this.current;
            if (item.type == 'img')
                this.renderImage();
            else if (item.type == 'text')
                this.renderText();

            this.tiIndex.val(item.index);
            this.select.val(item.type);

            this.tiDescr.val(item.description);

            return this;
        };
        LabelEditor.prototype.hide = function () {
            this.view.hide();
        };
        LabelEditor.prototype.show = function () {
            this.view.show();
        };
        LabelEditor.prototype.onSelectChange = function () {
            this.current.type = this.select.val();
            this.render();
        };
        LabelEditor.prototype.onDeleteClick = function () {
            if (!this.current)
                return;
            var yes = confirm('You wont to delete ' + this.current.description + '?');
            if (yes) {
                this.onDelete(this.current);
                this.current = null;
                this.hide();
            }
        };
        return LabelEditor;
    })();
    uplight.LabelEditor = LabelEditor;

    var VOLabel = (function () {
        function VOLabel() {
        }
        return VOLabel;
    })();
    uplight.VOLabel = VOLabel;
    var LabelsManager = (function () {
        function LabelsManager(container) {
            var _this = this;
            container.load('htms/admin/LabelsManager.htm', function () {
                _this.init();
            });
            this.R = uplight.RegA.getInstance();
        }
        LabelsManager.prototype.onAddClick = function () {
            this.selectedIndex = -1;
            var id = this.max + 1;
            var item = { index: 'index' + id, description: '', id: id, type: 'text', value: '' };
            this.editor.setData(item).render().show();
        };

        //available:string[]=['header','slogan','footer','list-header','list-footer','background','logo'];
        LabelsManager.prototype.init = function () {
            var _this = this;
            this.view = $('#LabelsManager');
            this.btnAdd = this.view.find('[data-id=btnAdd]').click(function () {
                return _this.onAddClick();
            });
            var table = $('<table>').addClass('table').appendTo(this.view.find('[data-id=list]:first'));
            table.append('<tr><th>Description</th><th>Value</th><th>Edit</th></tr>');
            this.list = $('<tbody>').on(CLICK, 'tr .fa-edit', function (evt) {
                return _this.onEditClick($(evt.currentTarget));
            }).appendTo(table);
            this.editor = new LabelEditor();
            this.editor.onSave = function (data) {
                return _this.saveItem(data);
            };
            this.editor.onDelete = function (data) {
                return _this.deleteItem(data);
            };

            if (this.R.isSuper) {
            } else
                this.view.find('[data-role=isSuper]').hide();
            this.refreshData();
        };

        LabelsManager.prototype.saveItem = function (data) {
            if (this.selectedIndex !== -1)
                this.data[this.selectedIndex] = data;
            else {
                var id = -1;
                var ar = this.data;
                for (var i = 0, n = ar.length; i < n; i++) {
                    var item = ar[i];
                    if (item.index == data.index) {
                        id = i;
                        break;
                    }
                }
                if (id !== -1)
                    this.data[i] = data;
                else
                    this.data.push(data);
            }

            this.saveLabels();
        };

        LabelsManager.prototype.deleteItem = function (item) {
            this.data.splice(this.selectedIndex, 1);
            this.saveLabels();
        };

        LabelsManager.prototype.refreshData = function () {
            var _this = this;
            //console.log(this.R.settings);
            this.R.connector.getData(this.R.settings.labels).done(function (res) {
                //   console.log(res);
                _this.data = JSON.parse(res);
                _this.renderLabels();
            });
        };

        LabelsManager.prototype.saveLabels = function () {
            var _this = this;
            this.R.connector.saveData(JSON.stringify(this.data), this.R.settings.labels).done(function (res) {
                _this.refreshData();
                if (res.success) {
                    _this.R.msg('File saved', _this.editor.btnSave);
                }
            });
        };

        LabelsManager.prototype.onSaveClick = function () {
            this.saveLabels();
        };

        LabelsManager.prototype.renderItem = function (item) {
            return '<tr  data-i="' + item.seq + '" class="' + item.type + '" ><td title="' + item.index + '">' + item.description + '</td><td class="value">' + ((item.type == 'img') ? '<img src="' + item.value + '"/>' : item.value) + '</td><td><span class=" btn fa fa-edit"></span></td></tr>';
        };
        LabelsManager.prototype.renderLabels = function () {
            var ar = this.data;

            // var avail= this.available;
            this.max = 0;
            var out = '';
            for (var i = 0, n = ar.length; i < n; i++) {
                var item = ar[i];
                item.seq = i;
                out += this.renderItem(item);
            }
            this.list.html(out);
            this.selectedIndex = -1;
            // this.editor.setAvailable(avail)
        };

        LabelsManager.prototype.onEditClick = function (el) {
            this.selectedIndex = -1;
            var row = el.parent().parent();
            var i = Number(row.data('i'));
            if (isNaN(i))
                return;
            var item = this.data[i];
            if (!item)
                return;
            this.selectedIndex = i;
            this.editor.setData(item).render().show();
        };
        return LabelsManager;
    })();
    uplight.LabelsManager = LabelsManager;
})(uplight || (uplight = {}));
/**
* Created by VladHome on 7/20/2015.
*/
///<reference path="../RegA"/>
var uplight;
(function (uplight) {
    var TimeEditor = (function () {
        function TimeEditor(view) {
            this.view = view;
            this.init();
        }
        TimeEditor.prototype.setData = function (item) {
            this.current = item;
            return this;
        };

        TimeEditor.prototype.hide = function () {
            this.view.hide();
        };

        TimeEditor.prototype.show = function () {
            this.view.show();
        };

        TimeEditor.prototype.render = function () {
            this.lblInfo.text(this.current.label);
            this.selTime.val(this.current.value);
            return this;
        };

        TimeEditor.prototype.init = function () {
            var _this = this;
            this.lblInfo = this.view.find('[data-id=lblInfo]:first');
            this.btnSave = this.view.find('[data-id=btnSave]').click(function () {
                _this.btnSave.prop('disabled', true);
                setTimeout(function () {
                    _this.btnSave.prop('disabled', false);
                }, 3000);
                if (_this.onSave)
                    _this.onSave(_this.current);
            });

            this.view.find('[data-id=btnClose]').click(function () {
                _this.hide();
                _this.current = null;
            });

            this.selTime = this.view.find('[data-id=selTime]');
            var out = '';
            var ampm = 'AM';
            var m = -1;
            for (var i = 0; i < 24; i++) {
                var h = i;
                if (h == 0) {
                    h = 12;
                }
                if (i > 11)
                    ampm = 'PM';
                if (h > 12) {
                    h = h - 12;
                }

                // out+='<option>'+((h<10)?'&nbsp;&nbsp;':'')+h+':00 '+ampm+'</option>';
                // out+='<option>'+((h<10)?'&nbsp;&nbsp;':'')+h+':30 '+ampm+'</option>';
                out += '<option>' + h + ':00 ' + ampm + '</option>';
                out += '<option>' + h + ':30 ' + ampm + '</option>';
            }

            this.selTime.html(out).on(CHANGE, function () {
                _this.current.value = _this.selTime.val();
            });
        };
        return TimeEditor;
    })();
    uplight.TimeEditor = TimeEditor;

    var ValueEditor = (function () {
        function ValueEditor(view) {
            var _this = this;
            this.view = view;
            this.view.find('[data-id=btnClose]').click(function () {
                _this.hide();
                _this.current = null;
            });

            this.btnSave = this.view.find('[data-id=btnSave]').click(function () {
                _this.btnSave.prop('disabled', true);
                setTimeout(function () {
                    _this.btnSave.prop('disabled', false);
                }, 3000);
                _this.current.value = _this.tiValue.val();
                if (_this.onSave)
                    _this.onSave(_this.current);
            });
            this.tiValue = this.view.find('[data-id=tiValue]');
            this.lblInfo = this.view.find('[data-id=lblInfo]');
        }
        ValueEditor.prototype.show = function () {
            this.view.show();
            console.log(this.view);
        };

        ValueEditor.prototype.render = function () {
            var item = this.current;
            if (!item)
                return this;
            this.tiValue.val(item.value);
            this.lblInfo.text(item.label);

            return this;
        };
        ValueEditor.prototype.hide = function () {
            this.view.hide();
        };

        ValueEditor.prototype.setData = function (item) {
            this.current = item;
            return this;
        };
        return ValueEditor;
    })();
    uplight.ValueEditor = ValueEditor;

    var SettingsEdit = (function () {
        // data:VOItem[];
        function SettingsEdit(container) {
            var _this = this;
            this.container = container;
            // console.log('SettingsEdit');
            container.load('htms/admin/SettingsEdit.htm', function () {
                setTimeout(function () {
                    _this.init();
                }, 50);
            });
            this.R = uplight.RegA.getInstance();
        }
        SettingsEdit.prototype.init = function () {
            var _this = this;
            this.view = $('#SettingsEdit');
            var table = $('<table>').addClass('table').appendTo(this.view.find('[data-id=list]:first'));

            //this.list = $('<tbody>').on(CLICK, 'tr .fa-edit', (evt) => this.onEditClick(evt)).appendTo(table);
            this.list = $('<tbody>').on(CLICK, '[data-id=btnEdit]', function (evt) {
                return _this.onEditClick(evt);
            }).appendTo(table);
            this.refreshData();
        };

        SettingsEdit.prototype.onEditClick = function (evt) {
            var el = $(evt.currentTarget).parent().parent();
            var i = Number(el.data('i'));
            console.log(i);

            if (isNaN(i))
                return;
            this.selectedIndex = i;
            this.openEditor();
        };

        SettingsEdit.prototype.openEditor = function () {
            var _this = this;
            var item = this.data[this.selectedIndex];
            switch (item.type) {
                case 'time':
                    if (!this.timeEditor)
                        this.timeEditor = new TimeEditor(this.view.find('[data-ctr=TimeEditor]:first'));
                    this.editor = this.timeEditor;
                    break;
                default:
                    if (!this.valueEditor)
                        this.valueEditor = new ValueEditor(this.view.find('[data-ctr=ValueEditor]:first'));
                    this.editor = this.valueEditor;
                    break;
            }

            console.log(this.editor);
            this.editor.setData(item).render().show();
            this.editor.onSave = function (item) {
                _this.data[_this.selectedIndex] = item;
                _this.save();
            };

            //this.lblIndex.text(this.selectedItem.label);
            this.editor.show();
        };

        SettingsEdit.prototype.hideEditor = function () {
            this.editor.hide();
        };

        SettingsEdit.prototype.refreshData = function () {
            var _this = this;
            this.R.connector.getData(this.R.settingsURL).done(function (res) {
                _this.R.settings = JSON.parse(res);

                _this.data = _this.R.settings.props;
                _this.render();
            });
        };

        SettingsEdit.prototype.renderItem = function (item, i) {
            var img = 0;
            return '<tr  data-id="' + item.id + '" data-i="' + i + '" class="' + item.type + '" ><td class="index">' + item.label + '</td><td class="value">' + item.value + '</td><td><span data-id="btnEdit" class=" btn fa fa-edit"></span></td></tr>';
        };

        SettingsEdit.prototype.render = function () {
            var ar = this.data;
            var out = '';
            for (var i = 0, n = ar.length; i < n; i++) {
                out += this.renderItem(ar[i], i);
            }

            // console.log(out);
            this.list.html(out);
        };

        SettingsEdit.prototype.save = function () {
            var _this = this;
            var sett = this.R.settings;
            sett.props = this.data;
            this.R.connector.saveData(JSON.stringify(sett), this.R.settingsURL).done(function (res) {
                if (res.success) {
                    _this.R.msg('Data saved', _this.editor.btnSave);
                }
                _this.refreshData();
            });
        };
        return SettingsEdit;
    })();
    uplight.SettingsEdit = SettingsEdit;
})(uplight || (uplight = {}));
/**
* Created by VladHome on 8/11/2015.
*/
/// <reference path="../RegA.ts" />
var uplight;
(function (uplight) {
    var AttractLoopEdit = (function () {
        function AttractLoopEdit(container) {
            var _this = this;
            this.settingsURL = 'settings.json';
            this.R = uplight.RegA.getInstance();
            container.load('htms/admin/AttractLoopEdit.html', function () {
                return _this.init();
            });
        }
        AttractLoopEdit.prototype.init = function () {
            var _this = this;
            var view = $('#AttractLoopEdit');
            this.view = view;
            this.tools = view.find('[data-id=tools]:first');

            //this.title=view.find('[data-id=title]:first');
            this.alView = view.find('[data-id=alView]:first');
            this.iframeAL = $('#AttractLoopView');
            this.kiosk = $('#KioskView');
            var p1 = this.loadCurrent();
            $.when(p1).done(function (sett) {
                _this.settings = sett;

                // this.currentAl = al;
                _this.renderAl();
            });
            this.chkTC = view.find('[data-id=chkTC]:first');
            this.preview = view.find('[data-id=kioskPreview]:first');
            this.btnPreview = view.find('[data-id=btnPreview]:first');

            this.btnChangeType = view.find('[data-id=btnChangeType]:first');
            this.current = view.find('[data-id=current]:first');

            //this.btnSave = view.find('[data-id=btnSave]:first').click(()=>this.onSaveClick());
            this.editorView = $('#ALEditor');

            this.addListeners();
        };

        AttractLoopEdit.prototype.addListeners = function () {
            var _this = this;
            this.preview.find('[data-id=btnClose]').click(function () {
                return _this.preview.hide();
            });
            this.btnChangeType.click(function () {
                return _this.onChangeTypeClick();
            });
            this.btnPreview.click(function () {
                return _this.showPeview();
            });
        };

        AttractLoopEdit.prototype.onSelectTypeClose = function () {
            this.changeType.hide();
            this.current.show();
        };

        AttractLoopEdit.prototype.onChangeTypeClick = function () {
            var _this = this;
            if (!this.changeType) {
                this.changeType = new ChangeType();
                this.changeType.onClose = function () {
                    return _this.onSelectTypeClose();
                };
                this.changeType.onSave = function (al) {
                    return _this.save(al);
                };
            }

            this.changeType.setCurrent(this.currentAl);
            this.changeType.show();
            this.current.hide();
        };

        AttractLoopEdit.prototype.showPeview = function () {
            this.loadAL();
            this.preview.show();
        };

        AttractLoopEdit.prototype.hidePreview = function () {
            this.preview.hide();
            this.unloadAL();
        };

        AttractLoopEdit.prototype.loadAL = function () {
            this.iframeAL.attr('src', 'AttractLoop.php?settings=' + this.settingsURL);
        };

        AttractLoopEdit.prototype.unloadAL = function () {
            this.iframeAL.attr('src', '');
        };

        AttractLoopEdit.prototype.loadKiosk = function () {
            this.kiosk.attr('src', 'Kiosk1080.php?mode=preview');
        };

        AttractLoopEdit.prototype.uloadKiosk = function () {
            this.kiosk.attr('src', '');
        };

        AttractLoopEdit.prototype.loadCurrent = function () {
            var d1 = $.Deferred();
            var conn = this.R.connector;

            conn.getData(this.settingsURL).done(function (res) {
                //console.log(res);
                d1.resolve(JSON.parse(res));
            });

            return d1.promise();
        };

        AttractLoopEdit.prototype.render = function () {
            console.log('render attract loop');
        };

        AttractLoopEdit.prototype.onCurrentEdit = function () {
            this.tools.hide('fast');
        };
        AttractLoopEdit.prototype.onEditExit = function () {
            this.tools.show('fast');
        };

        AttractLoopEdit.prototype.renderAl = function () {
            var _this = this;
            var al = new uplight.VOAL(this.settings.attract_loop);
            this.currentAl = al;
            this.chkTC.prop(CHECKED, al.TC);
            this.alView.empty();
            if (al.type == 'gallery') {
                this.currentEditor = new uplight.GalleryPreview(al.data_url);
                this.currentEditor.onEdit = function () {
                    return _this.onCurrentEdit();
                };
                this.currentEditor.onEditExit = function () {
                    return _this.onEditExit();
                };
                this.currentEditor2 = null;
                this.alView.append(this.currentEditor.view);
            } else if (al.type == 'gallery2') {
                var urls = al.data_url.split(',');
                this.currentEditor = new uplight.GalleryPreview(urls[0]);
                this.currentEditor.onEdit = function () {
                    return _this.onCurrentEdit();
                };
                this.currentEditor.onEditExit = function () {
                    return _this.onEditExit();
                };
                this.currentEditor2 = new uplight.GalleryPreview(urls[1]);
                this.currentEditor2.onEdit = function () {
                    return _this.onCurrentEdit();
                };
                this.currentEditor2.onEditExit = function () {
                    return _this.onEditExit();
                };
                this.alView.append(this.currentEditor.view);
                this.alView.append(this.currentEditor2.view);
            }
        };

        AttractLoopEdit.prototype.save = function (newAL) {
            var _this = this;
            this.settings.attract_loop = newAL;
            console.log(this.settings);
            this.R.connector.saveData(JSON.stringify(this.settings), 'settings.json').done(function (res) {
                if (res.success) {
                    _this.renderAl();
                    uplight.RegA.getInstance().msg('New Attract loop saved', _this.changeType.btnSave);
                }
            });
        };
        return AttractLoopEdit;
    })();
    uplight.AttractLoopEdit = AttractLoopEdit;

    var ChangeType = (function () {
        function ChangeType() {
            this.R = uplight.RegA.getInstance();
            this.view = $('#ChangeType');
            this.editorView = this.view.find('[data-id=editorView]:first');
            this.btnSave = this.view.find('[data-id=btnSave]:first');
            this.chkTC = this.view.find('[data-id=chkTC]:first');
            this.loadAdmin();
        }
        ChangeType.prototype.show = function () {
            this.view.show();
        };

        ChangeType.prototype.hide = function () {
            this.view.hide();
        };

        ChangeType.prototype.setCurrent = function (vo) {
            this.currentVO = vo;
            if (this.select) {
                this.select.val(vo.id);
                this.selectTypeChage();
            }
        };
        ChangeType.prototype.onSaveClick = function () {
            var _this = this;
            var btn = this.btnSave.addClass(DISABLED);
            setTimeout(function () {
                _this.btnSave.removeClass(DISABLED);
            }, 1000);
            this.currentVO = this.selectedVOAL;
            this.currentVO.TC = this.chkTC.prop(CHECKED);
            if (this.onSave)
                this.onSave(this.currentVO);
        };

        ChangeType.prototype.loadAdmin = function () {
            var _this = this;
            this.R.connector.getData('admin.json').done(function (res) {
                var admin = JSON.parse(res);
                _this.createSelectType(admin.attract_loops);
                _this.addListeners();
                _this.select.val(_this.currentVO.id);
            });
        };
        ChangeType.prototype.createSelectType = function (als) {
            this.data = als;
            var $el = this.view.find('[data-id=selectType]:first');

            var out = '';
            var ar = als;
            for (var i = 0, n = ar.length; i < n; i++) {
                out += '<option value="' + ar[i].id + '">' + ar[i].name + '</option>';
            }

            this.select = this.view.find('select:first').html(out);
        };

        ChangeType.prototype.addListeners = function () {
            var _this = this;
            this.select.change(function () {
                return _this.selectTypeChage();
            });
            this.view.find('[data-id=btnClose]').click(function () {
                if (_this.onClose)
                    _this.onClose();
            });
            this.btnSave.click(function () {
                return _this.onSaveClick();
            });
        };

        ChangeType.prototype.getAlById = function (id) {
            var ar = this.data;
            for (var i = 0, n = ar.length; i < n; i++) {
                if (ar[i].id == id)
                    return ar[i];
            }
            return null;
        };

        ChangeType.prototype.onCurrentEdit = function () {
        };

        ChangeType.prototype.onEditExit = function () {
        };

        ChangeType.prototype.selectTypeChage = function () {
            var _this = this;
            var al = this.getAlById(this.select.val());
            this.selectedVOAL = al;
            this.editorView.empty();
            if (al.type == 'gallery') {
                this.currentEditor = new uplight.GalleryPreview(al.data_url);
                this.currentEditor.onEdit = function () {
                    return _this.onCurrentEdit();
                };
                this.currentEditor.onEditExit = function () {
                    return _this.onEditExit();
                };
                this.currentEditor2 = null;
                this.editorView.append(this.currentEditor.view);
            } else if (al.type == 'gallery2') {
                var urls = al.data_url.split(',');
                this.currentEditor = new uplight.GalleryPreview(urls[0]);
                this.currentEditor.onEdit = function () {
                    return _this.onCurrentEdit();
                };
                this.currentEditor.onEditExit = function () {
                    return _this.onEditExit();
                };
                this.currentEditor2 = new uplight.GalleryPreview(urls[1]);
                this.currentEditor2.onEdit = function () {
                    return _this.onCurrentEdit();
                };
                this.currentEditor2.onEditExit = function () {
                    return _this.onEditExit();
                };
                this.editorView.append(this.currentEditor.view);
                this.editorView.append(this.currentEditor2.view);
            }
        };
        return ChangeType;
    })();
})(uplight || (uplight = {}));
/// <reference path="regA.ts" />
/// <reference path="net.ts" />
/// <reference path="models.ts" />
/// <reference path="../typing/jquery.d.ts" />
/// <reference path="../typing/underscore.d.ts" />
/// <reference path="com/GalleryAdmin.ts" />
/// <reference path="com/Utils.ts" />
///<reference path="info/InfoPagesEditor.ts" />
///<reference path="info/FrontPageEditor.ts" />
/// <reference path="views/Menu.ts" />
/// <reference path="views/Navigation.ts" />
///<reference path="destinations/DestinationsController.ts" />
///<reference path="categories/CategoriesManager.ts" />
///<reference path="categories/CategoryListing.ts" />
///<reference path="etc/ImportExport.ts" />
///<reference path="etc/Statistics.ts" />
///<reference path="screen/LabelsManager.ts" />
///<reference path="screen/SettingsEdit.ts" />
///<reference path="screen/AttractLoopEdit.ts" />
var uplight;
(function (uplight) {
    var Admin = (function () {
        function Admin() {
            var _this = this;
            /*            Preview                */
            this.previewUrl = 'Kiosk1080.php?id=0';
            this.mobileUrl = 'KioskMobile.php';
            //  $.ajaxSetup({ cache: false });
            this.R = uplight.RegA.getInstance();
            this.R.dispatcher = $({});
            this.R.connector = new uplight.Connector();
            this.R.connector.getData('settings.json').done(function (resp) {
                _this.R.settings = JSON.parse(resp);
                _this.R.props = _.indexBy(_this.R.settings.props, 'id');
                _this.init();
                //this.R.vo.events.on(this.R.vo.READY,()=>this.test());
            });

            var btnLogout = $('#btnLogout').click(function () {
                if (btnLogout.hasClass('disabled'))
                    return;
                _this.logout();
                btnLogout.addClass('disabled');
                setTimeout(function () {
                    btnLogout.removeClass('disabled');
                }, 3000);
            });
            this.R.msg = function (text, cont) {
                return _this.myMsg(text, cont);
            };
            // this.R.events.on(RegA.SHOW_PREVIEW,(evt,data)=>this.showPreview(data));
            // this.R.events.on(RegA.HIDE_PREVIEW,function(){$('#preview').hide();});
            // this.R.events.on(RegA.VIEW_LISTING,()=>{
            // $('#content').empty();
            //if(!this.details) this.details = new DetailsEditor($('#content'));
            //});
            //  var close =$('<a>').addClass('fa fa-times btn-close').attr('href','#preview-close').appendTo($('#preview'));//.on(CLICK,function(){$('#preview').hide();})
        }
        Admin.prototype.createPop = function () {
            this.newindow = window.open('Preview.php', 'Kiosk Preview', 'width=560,height=980,toolbar=0,menubar=0,location=0,status=0,left=200,top=200');
            if (window.focus) {
                this.newindow.focus();
            }
        };

        Admin.prototype.closePopup = function () {
            this.newindow.close();
        };

        Admin.prototype.onHashChange = function () {
            var hash = window.location.hash.substr(0, 10);
            console.log(hash);

            //  if(hash!=='#PreviewKi') this.hidePreview();
            this.hideKiosk();
            this.hideModile();
            switch (hash) {
                case '#PreviewKi':
                    this.content.hide();
                    this.showKiosk();
                    break;
                case '#PreviewMo':
                    this.content.hide();
                    this.showMobile();
                    break;
                case '#Attract-L':
                    // this.showPreview();
                    // this.content.hide();
                    this.attractLoop = new uplight.AttractLoopEdit(this.content);
                    this.content.show();

                    break;

                case '#Statistic':
                    // this.showPreview();
                    // this.content.hide();
                    this.statistics = new uplight.Statistics(this.content);
                    this.content.show();

                    break;
                case '#Info-Page':
                    // this.showPreview();
                    // this.content.hide();
                    this.infoPages = new uplight.InfoPagesManager(this.content);
                    this.content.show();

                    break;
                case '#Front-Pag':
                    if (!this.frontPageEditor)
                        this.frontPageEditor = new uplight.FrontPageEditor(this.content);
                    else {
                        this.content.children().detach();
                        this.frontPageEditor.appendTo(this.content);
                    }

                    this.content.show();

                    break;
                case '#Listing-V':
                    this.listing = new uplight.DestinationsController(this.content);
                    this.content.show();
                    break;
                case '#Categorie':
                case '#Edit-Cate':
                    this.categories = new uplight.CategoriesManager(this.content);
                    this.content.show();
                    break;
                case '#Category-':
                    this.categoryListing = new uplight.CategoryListing(this.content);
                    this.content.show();
                    break;
                case '#Import-Ex':
                    this.importExport = new uplight.ImportExport(this.content);
                    break;
                case '#Settings-':
                    this.settingsEdit = new uplight.SettingsEdit(this.content);
                    this.content.show();
                    break;
                case '#Heading-S':
                case '#Backgroun':
                case '#Logo-Imag':
                    this.labels = new uplight.LabelsManager(this.content);
                    this.content.show();
                    break;
                case '#PreviewKi':
                default:
                    break;
            }
        };

        Admin.prototype.init = function () {
            var _this = this;
            this.navigatiom = new uplight.Navigation($('#AdminNav'));
            this.R.confirm = new uplight.Confirm($('#Confirm'));
            this.R.model = new uplight.DestinantionsModel();
            this.R.model.dispatcher.on(this.R.model.CHANGE, function () {
                _this.R.model.dispatcher.off(_this.R.model.CHANGE);
                _this.onHashChange();
            });
            $(window).on('hashchange', function (evt) {
                return _this.onHashChange();
            });

            //  this.menu = new AdminMenu($('#Navigation'));
            this.preview = $('#Preview');
            this.isPreview = true;

            this.content = $('#content');
            this.message = $('<div>').attr('id', 'Message');
            this.messageText = $('<div>').appendTo(this.message);
            this.btnFullView = this.preview.find('[data-id=btnFullView]').click(function () {
                window.open(_this.previewUrl, "_blank");
            });

            $('#btnRestartKiosks').click(function () {
                _this.R.confirm.show('Restart Kiosks', 'You want to restart kiosks?', function () {
                    _this.R.connector.restartKiosks().done(function (res) {
                        console.log(res);
                        if (res.success == 'success') {
                            _this.R.msg('Restarting kiosks', $('#btnRestartKiosks'));
                        } else
                            _this.R.msg('Server Error', $('#btnRestartKiosks'));
                    }).fail(function () {
                        alert('Communication error');
                    });
                });
            });

            if (window.location.hash == '')
                window.location.hash = '#Statistic';
        };

        Admin.prototype.logout = function () {
            this.R.connector.logout().done(function (res) {
                window.location.reload();
                console.log(res);
            });
        };

        Admin.prototype.myMsg = function (text, DO) {
            var msg = $('<div>').addClass('umsg').css(DO.offset()).text(text).appendTo('body');
            msg.hide();
            msg.show('fast');
            setTimeout(function () {
                msg.hide('fast', function () {
                    msg.remove();
                });
            }, 3000);
        };

        Admin.prototype.showKiosk = function () {
            $('#AdminPreviewKiosk').removeClass(HIDDEN);
            $('#AdminPreviewKiosk iframe:first').attr('src', this.previewUrl);
            this.isPreview = true;
        };
        Admin.prototype.hideKiosk = function () {
            if (this.isPreview) {
                $('#AdminPreviewKiosk').addClass(HIDDEN);
                $('#AdminPreviewKiosk iframe:first').attr('src', '');
                this.isPreview = false;
            }
        };

        Admin.prototype.showMobile = function (url) {
            this.isMobile = true;
            $('#AdminPreviewMobile').removeClass(HIDDEN);
            $('#AdminPreviewMobile iframe').attr('src', this.mobileUrl);
        };
        Admin.prototype.hideModile = function () {
            if (this.isMobile) {
                $('#AdminPreviewMobile').addClass(HIDDEN);
                $('#AdminPreviewMobile iframe').attr('src', '');
                this.isMobile = false;
            }
        };
        return Admin;
    })();
    uplight.Admin = Admin;
})(uplight || (uplight = {}));
