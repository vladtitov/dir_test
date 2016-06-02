/**
 * Created by VladHome on 8/11/2015.
 */
/// <reference path="../RegA.ts" />
var uplight;
(function (uplight) {
    var AttractLoopEdit = (function () {
        function AttractLoopEdit(container) {
            var _this = this;
            this.ID = 'uplight.AttractLoopEdit';
            this.dataid = 'attract_loop';
            this.R = uplight.RegA.getInstance();
            this.R.current = this;
            var ar = this.R.admin.attract_loops;
            var out = [];
            for (var i = 0, n = ar.length; i < n; i++)
                out.push(new uplight.VOAttractLoop(ar[i]));
            this.library = out;
            container.load('htms/admin/AttractLoopEdit.html', function () { return _this.init(); });
            this.R.dispatcher.on(this.R.ATTRACTLOOP_EDIT, function (evt, prev) { return _this.onEdit(prev); });
        }
        AttractLoopEdit.prototype.init = function () {
            var _this = this;
            var view = $('#AttractLoopEdit');
            this.$view = view;
            this.tools = view.find('[data-id=tools]:first');
            //this.title=view.find('[data-id=title]:first');
            this.alView = view.find('[data-id=alView]:first');
            this.iframeAL = $('#AttractLoopView');
            this.kiosk = $('#KioskView');
            // var p1 = this.loadCurrent();
            //$.when(p1).done((sett:any)=>{
            //   this.settings=sett
            // this.currentAl = al;
            // this.renderAl()
            // });
            this.$btnSave = view.find('[data-id=btnSave]:first').click(function () {
                if (_this.R.isBusy)
                    return;
                _this.$btnSave.addClass(HIDDEN);
                _this.current.TC = _this.chkTC.prop(CHECKED);
                _this.R.wait();
                _this.save().done(function (res) {
                    _this.R.resetBusy();
                    if (res.success)
                        _this.R.msg('Property saved', _this.$btnSave.parent());
                });
            });
            this.chkTC = view.find('[data-id=chkTC]:first').change(function () {
                _this.$btnSave.removeClass(HIDDEN);
            });
            this.$previewAL = view.find('[data-id=kioskPreview]:first');
            this.btnPreview = view.find('[data-id=btnPreview]:first');
            this.btnChangeType = view.find('[data-id=btnChangeType]:first');
            this.$preview = view.find('[data-id=current]:first');
            //this.btnSave = view.find('[data-id=btnSave]:first').click(()=>this.onSaveClick());
            // this.editorView = $('#ALEditor');
            this.$title = this.$view.find('[data-id=title]:first');
            this.addListeners();
            this.loadData();
        };
        AttractLoopEdit.prototype.onEdit = function (prev) {
            var _this = this;
            switch (prev.type) {
                case 'gallery':
                    this.preview = prev;
                    this.editor = new uplight.GalleryEditor();
                    this.editor.onClose = function () {
                        _this.$editor.remove();
                        _this.$editor = null;
                        _this.editor = null;
                        _this.$preview.show();
                    };
                    this.editor.onSave = function () {
                        if (_this.R.isBusy)
                            return;
                        var data = _this.editor.getData();
                        var props = data.props;
                        var i = _this.preview.i;
                        var btnSave = _this.editor.btnSave;
                        _this.R.wait();
                        _this.save().done(function (res) {
                            _this.R.resetBusy();
                            _this.loadData();
                            if (res.success)
                                uplight.RegA.getInstance().msg('Gallery saved', btnSave);
                        });
                        _this.current.props[i] = props;
                        _this.R.wait();
                        _this.preview.saveData(data).done(function () {
                            _this.R.resetBusy();
                        });
                        _this.preview.render();
                    };
                    this.editor.setData(this.preview.getData());
                    this.editor.render();
                    this.$editor = this.editor.appendTo(this.$view);
                    this.$preview.hide();
                    break;
            }
        };
        AttractLoopEdit.prototype.addListeners = function () {
            var _this = this;
            this.$previewAL.find('[data-id=btnClose]').click(function () { return _this.$previewAL.hide(); });
            this.btnChangeType.click(function () { return _this.onChangeTypeClick(); });
            //this.btnPreview.click(()=>this.showPeview())
        };
        AttractLoopEdit.prototype.appendTo = function (cont) {
            this.$view.appendTo(cont);
            return this;
        };
        AttractLoopEdit.prototype.detach = function () {
            this.$view.detach();
        };
        AttractLoopEdit.prototype.destroy = function () {
        };
        AttractLoopEdit.prototype.getName = function () {
            return this.ID;
        };
        AttractLoopEdit.prototype.onSelectTypeClose = function () {
            this.changeType.hide();
            this.$preview.show();
        };
        AttractLoopEdit.prototype.onChangeTypeClick = function () {
            var _this = this;
            if (!this.changeType) {
                this.changeType = new ChangeType(this.library);
                this.changeType.onClose = function () { return _this.onSelectTypeClose(); };
                this.changeType.onSave = function () { return _this.onChangeTypeSave(); };
            }
            var al = this.getTemplateById(this.current.id);
            this.changeType.setCurrent(al);
            this.changeType.show();
            this.$preview.hide();
        };
        AttractLoopEdit.prototype.createALProps = function (vo) {
            var prop = new uplight.ALProps();
            prop.url = vo.url;
            prop.templateid = vo.id;
            prop.delay = vo.delay;
            return prop;
        };
        AttractLoopEdit.prototype.createProperties = function (vo) {
            var out = [];
            if (vo.comb) {
                var ar = vo.comb;
                for (var i = 0, n = ar.length; i < n; i++) {
                    var al = this.getTemplateById(ar[i]);
                    out.push(this.createALProps(al));
                }
            }
            else
                out.push(this.createALProps(vo));
            return out;
        };
        AttractLoopEdit.prototype.onChangeTypeSave = function () {
            var _this = this;
            if (this.R.isBusy)
                return;
            var al = this.changeType.selectedItem;
            if (al.id == this.current.id) {
                this.R.msg('You have same type', this.changeType.btnSave);
                return;
            }
            this.current = new uplight.AttractLoop({ id: al.id });
            this.current.props = this.createProperties(al);
            this.current.TC = this.changeType.chkTC.prop(CHECKED);
            this.R.wait();
            this.save().done(function (res) {
                _this.loadData();
                if (res.success)
                    uplight.RegA.getInstance().msg('New Attract loop saved', _this.changeType.btnSave);
            });
            //console.log('onChangeTypeSave');
        };
        //  private showPeview():void{
        //   this.loadAL();
        //  this.$previewAL.show();
        // }
        AttractLoopEdit.prototype.hidePreview = function () {
            this.$previewAL.hide();
            this.unloadAL();
        };
        AttractLoopEdit.prototype.propsToUrl = function (obj) {
            var out = '';
            for (var str in obj)
                out += '&' + str + '=' + obj[str];
            if (out.length)
                return out.substr(1);
            return out;
        };
        AttractLoopEdit.prototype.loadAL = function () {
            // this.iframeAL.attr('src','AttractLoop.php?settings='+this.settingsURL);
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
        AttractLoopEdit.prototype.loadData = function () {
            var _this = this;
            this.R.wait();
            this.R.connector.getData(this.dataid).done(function (res) {
                _this.R.resetBusy();
                _this.current = new uplight.AttractLoop(JSON.parse(res));
                _this.render();
            });
        };
        AttractLoopEdit.prototype.save = function () {
            return this.R.connector.saveData(JSON.stringify(this.current), this.dataid);
        };
        AttractLoopEdit.prototype.onCurrentEdit = function () {
            this.tools.hide('fast');
        };
        AttractLoopEdit.prototype.onEditExit = function () {
            this.tools.show('fast');
        };
        AttractLoopEdit.prototype.getTemplateById = function (id) {
            var ar = this.library;
            for (var i = 0, n = ar.length; i < n; i++) {
                if (ar[i].id == id)
                    return ar[i];
            }
            return null;
        };
        AttractLoopEdit.prototype.render = function () {
            var al = this.current;
            this.chkTC.prop(CHECKED, this.current.TC);
            var vo = this.getTemplateById(al.id);
            this.$title.text(vo.name);
            // var als:VOAttractLoop[]=[];
            this.alView.empty();
            var ar = al.props;
            for (var i = 0, n = ar.length; i < n; i++) {
                vo = this.getTemplateById(ar[i].templateid);
                if (!vo) {
                    console.log('Cant find template with id ' + ar[i].templateid);
                    continue;
                }
                //vo.delay = ar[i].delay;
                if (vo.type === 'gallery') {
                    var preview = new uplight.GalleryPreview(ar[i], vo, i);
                    preview.appendTo(this.alView);
                }
            }
        };
        return AttractLoopEdit;
    }());
    uplight.AttractLoopEdit = AttractLoopEdit;
    var ChangeType = (function () {
        function ChangeType(library) {
            this.library = library;
            this.R = uplight.RegA.getInstance();
            this.view = $('#ChangeType');
            // this.editorView = this.view.find('[data-id=editorView]:first');
            this.btnSave = this.view.find('[data-id=btnSave]:first');
            this.chkTC = this.view.find('[data-id=chkTC]:first');
            this.select = this.view.find('select:first');
            this.createSelectType(library);
            this.addListeners();
        }
        ChangeType.prototype.show = function () {
            this.view.show();
        };
        ChangeType.prototype.hide = function () {
            this.view.hide();
        };
        ChangeType.prototype.setCurrent = function (vo) {
            this.selectedItem = vo;
            this.select.val(vo.id);
        };
        ChangeType.prototype.onSaveClick = function () {
            var _this = this;
            var btn = this.btnSave.addClass(DISABLED);
            setTimeout(function () { _this.btnSave.removeClass(DISABLED); }, 1000);
            if (this.onSave)
                this.onSave(this.selectedItem);
        };
        ChangeType.prototype.createSelectType = function (als) {
            var out = '';
            var ar = als;
            for (var i = 0, n = ar.length; i < n; i++) {
                out += '<option value="' + ar[i].id + '">' + ar[i].name + '</option>';
            }
            this.select.html(out);
        };
        ChangeType.prototype.addListeners = function () {
            var _this = this;
            this.select.change(function () { return _this.selectTypeChage(); });
            this.view.find('[data-id=btnClose]').click(function () {
                if (_this.onClose)
                    _this.onClose();
            });
            this.btnSave.click(function () { return _this.onSaveClick(); });
        };
        ChangeType.prototype.getAlById = function (id) {
            var ar = this.library;
            for (var i = 0, n = ar.length; i < n; i++) {
                if (ar[i].id == id)
                    return ar[i];
            }
            return null;
        };
        ChangeType.prototype.selectTypeChage = function () {
            var al = this.getAlById(this.select.val());
            console.log(al);
            this.selectedItem = al;
        };
        return ChangeType;
    }());
})(uplight || (uplight = {}));
//# sourceMappingURL=AttractLoopEdit.js.map