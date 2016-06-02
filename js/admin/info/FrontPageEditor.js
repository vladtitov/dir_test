/**
 * Created by VladHome on 10/3/2015.
 */
///<reference path="../DirsAdmin.ts" />
var uplight;
(function (uplight) {
    var FrontPageEditor = (function () {
        function FrontPageEditor(container) {
            var _this = this;
            this.NAME = 'uplight.FrontFageeditor';
            this.R = uplight.RegA.getInstance();
            container.load('htms/admin/FrontPageEditor.htm', function () { return _this.init(); });
        }
        FrontPageEditor.prototype.destroy = function () {
        };
        FrontPageEditor.prototype.getName = function () {
            return this.NAME;
        };
        FrontPageEditor.prototype.detach = function () {
            this.view.detach();
        };
        FrontPageEditor.prototype.appendTo = function (container) {
            container.append(this.view);
            return this;
        };
        FrontPageEditor.prototype.init = function () {
            var _this = this;
            this.view = $('#FrontPageEditor');
            this.btnAdd = this.view.find('[data-id=btnAdd]:first').click(function () { return _this.onAddClicked(); });
            this.btnEdit = this.view.find('[data-id=btnEdit]:first').click(function () { return _this.onEditClicked(); });
            this.btnDelete = this.view.find('[data-id=btnDelete]').click(function () { return _this.onDelClicked(); });
            this.btnSave = this.view.find('[data-id=btnSave]').click(function () { return _this.onSaveClicked(); });
            this.editor = this.view.find('[data-id=editor]:first');
            if (uplight.RegA.getInstance().settings.front_page) {
                this.btnAdd.addClass(HIDDEN);
                this.btnDelete.addClass(HIDDEN);
            }
            else {
                this.btnDelete.addClass(HIDDEN);
                this.btnEdit.addClass(HIDDEN);
                this.btnSave.addClass(HIDDEN);
            }
            this.reloadPage();
            this.loadLabels();
        };
        FrontPageEditor.prototype.loadLabels = function () {
            this.R.connector.getData('labels').done(function (res) {
                console.log(res);
                var ar = JSON.parse(res);
                for (var i = 0, n = ar.length; i < n; i++) {
                    if (ar[i].index == 'bg_mobile')
                        $('#PageBody').css('background-image', 'url(' + ar[i].value + ')');
                }
            });
        };
        FrontPageEditor.prototype.onAddClicked = function () {
        };
        FrontPageEditor.prototype.hideEdit = function () {
            this.isEdit = false;
            $('#NicPanelPage').hide();
            this.editor.attr('contenteditable', false);
        };
        FrontPageEditor.prototype.onEditClicked = function () {
            //   console.log('onEditClicked');
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
            //  console.log(res);
            if (res.success)
                uplight.RegA.getInstance().msg('Page Saved', this.btnSave);
            else {
                uplight.RegA.getInstance().connector.error('FronPageEditor ' + res.error + ' ' + res.result);
                alert('Error was send to administarator');
            }
        };
        FrontPageEditor.prototype.onSaveClicked = function () {
            var _this = this;
            this.hideEdit();
            var url = uplight.RegA.getInstance().settings.front_page;
            //   var tmp =    this.list.children().detach();
            uplight.RegA.getInstance().connector.savePage(url, this.editor.html()).done(function (res) { return _this.onSave(res); });
            // this.list.append(tmp);
        };
        FrontPageEditor.prototype.onPages = function (data) {
            // console.log(data);
            this.pages = JSON.parse(data);
            // this.renderList();
        };
        /*  private loadMenu():void{
              var url:string =RegA.getInstance().settings.pages;
              if(url)  RegA.getInstance().connector.getData(url).done((data)=>this.onPages(data));
              else this.renderList();
          }*/
        FrontPageEditor.prototype.reloadPage = function () {
            var _this = this;
            uplight.RegA.getInstance().connector.getPage(uplight.RegA.getInstance().settings.front_page).done(function (data) { return _this.onContent(data); });
        };
        FrontPageEditor.prototype.onContent = function (data) {
            this.editor.html(data);
            this.menu = this.editor.find('[data-id=menu]:first');
            //this.list= this.menu.find('[data-id=list]:first');
            // this.loadMenu();
        };
        return FrontPageEditor;
    }());
    uplight.FrontPageEditor = FrontPageEditor;
})(uplight || (uplight = {}));
//# sourceMappingURL=FrontPageEditor.js.map