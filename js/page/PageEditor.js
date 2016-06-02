/// <reference path="PagesList.ts" />
/// <reference path="../admin/RegA.ts" />
var page;
(function (_page) {
    var PageEditor = (function () {
        function PageEditor() {
            var _this = this;
            this.isEdit = false;
            this.R = RegA.getInstance();
            var id = '#PageEditor';
            this.view = $(id);
            this.btnSave = $(id + ' [data-id=btnSave]').on(CLICK, function () { return _this.onSaveClicked(); });
            this.btnEdit = $(id + ' [data-id=btnEdit]').on(CLICK, function () { return _this.onEditClicked(); });
            this.chkEnabled = $(id + ' [data-id=chkEnabled]');
            this.pageId = $('<span></span>').css('font-size', 'xx-small').prependTo(this.btnSave.parent());
            this.fileInput = document.getElementById('replaceImage');
            this.fileInput.onchange = function (evt) { return _this.onFileSelected(evt); };
            this.btnCopy = $(id + ' [data-id=btnCopy]').on(CLICK, function () { return _this.onCopyClicked(); });
            this.btnPaste = $(id + ' [data-id=btnPaste]').on(CLICK, function () { return _this.onPasteClicked(); });
            // $('#replaceImage').change((evt)=>this.onFileSelected(evt));
            // this.btnClone =$(id+' [data-id=btnClone]').on(CLICK,()=>this.onCloneClick());
            // this.txtTitle = this.view.find('[data-id=title]');
            this.contId = '#PageContent';
            this.txtContent = $(this.contId).on(CLICK, 'img', function (evt) { return _this.onImageClicked(evt); });
            this.editor = new nicEditor({ fullPanel: true });
            this.editor.setPanel('myNicPanel');
            this.editor.addInstance(this.contId.substr(1));
            this.header = $(id + ' h2:first');
            // this.chkEnable = $('#chkEnable').on(CLICK,()=>this.onCheckEnableClick());
            // this.tiName = this.view.find('[data-id=tiName]').on(CHANGE, () => this.onTiChange());
            this.myNicPanel = $('#myNicPanel');
            this.list = new PagesList();
            setTimeout(function () { return _this.list.loadData(); }, 100);
            this.list.onChange = function (page) { return _this.onListChange(page); };
            this.reset();
            $('#Theme').attr('href', 'css/' + R.settings.main.color + '.css');
        }
        // savePageInfo(): void {
        //  R.connector.savePageInfo(nicEditors.findEditor('Editor1').getContent(), this.list.selectedItem.id, (res) => this.onSave(res));
        //}
        PageEditor.prototype.reset = function () {
            this.btnEdit.addClass(DISABLED);
            this.btnSave.addClass(DISABLED);
            this.btnCopy.addClass(DISABLED);
            this.btnPaste.addClass(DISABLED);
            this.chkEnabled.attr(DISABLED, true);
            if (this.isEdit)
                nicEditors.findEditor(this.contId.substr(1)).setContent('');
            else
                this.txtContent.html('');
            this.header.text('');
            this.myNicPanel.hide();
            this.txtContent.attr('contenteditable', false);
        };
        PageEditor.prototype.onPasteClicked = function () {
            if (this.btnPaste.hasClass(DISABLED))
                return;
            if (this.buffer && this.txtContent.attr('contenteditable') == 'true')
                this.txtContent.html(this.buffer);
        };
        PageEditor.prototype.onCopyClicked = function () {
            if (this.btnCopy.hasClass(DISABLED))
                return;
            this.buffer = this.txtContent.html();
            this.btnPaste.removeClass(DISABLED);
        };
        PageEditor.prototype.onFileSelected = function (evt) {
            var _this = this;
            // console.log(evt.target.files);
            var files = evt.target.files;
            //   console.log('files ',files);
            var file = files[0];
            //  console.log('file ',file);
            if (!file || !file.type.match(/image.*/)) {
                this.selectedImage = null;
                console.log('no selected image');
                return;
            }
            var fd = new FormData(evt.target.parentElement);
            //  console.log(fd);
            var xhr = new XMLHttpRequest();
            xhr.open("POST", 'rem/services/uploadImage.php?id=p' + this.currentPage.id);
            xhr.onload = function (evt) {
                if (_this.selectedImage)
                    _this.selectedImage.attr('src', evt.target.responseText);
            };
            xhr.send(fd);
        };
        PageEditor.prototype.onImageClicked = function (evt) {
            if (!this.isEdit)
                return;
            var el = $(evt.currentTarget);
            if (!el.is('img'))
                return;
            this.selectedImage = el;
            $('#replaceImage').trigger(CLICK);
        };
        PageEditor.prototype.onSaveClicked = function () {
            var _this = this;
            this.currentPage.old_id = 0;
            if (this.btnSave.hasClass(DISABLED))
                return;
            this.btnSave.addClass(DISABLED);
            this.currentPage.label = this.header.text();
            this.currentPage.enable = this.chkEnabled.prop(CHECKED) ? 1 : 2;
            this.currentPage.content = this.txtContent.html();
            R.connector.updatePage(this.currentPage, function (resp) { return _this.onPageUpdated(resp); });
        };
        PageEditor.prototype.onPageUpdated = function (resp) {
            var _this = this;
            this.list.updateSelected(this.currentPage);
            R.connector.savePageInfo(this.currentPage, function (res) { return _this.onSave(res); });
        };
        PageEditor.prototype.onSave = function (resp) {
            myMsg('Content Saved', this.btnSave);
            // setTimeout(() => { this.list.selectLast();}, 500);
            this.isEdit = false;
            this.switchMode();
        };
        /*
        private onUpdatePage(resp): void {
          //  var r: any = JSON.parse(resp);
            if (this.currentPage.id == 0) this.currentPage.id = Number(resp.result);
           // console.log(this.currentPage.id);
            R.connector.savePageInfo(this.txtContent.html(), this.currentPage.id, (res) => this.onSave(res));
        }
*/
        PageEditor.prototype.onEditClicked = function () {
            if (this.btnEdit.hasClass(DISABLED))
                return;
            this.isEdit = !this.isEdit;
            this.switchMode();
        };
        PageEditor.prototype.switchMode = function () {
            if (this.isEdit) {
                this.btnSave.removeClass(DISABLED);
                this.chkEnabled.attr(DISABLED, false);
                this.header.attr('contenteditable', true);
                this.myNicPanel.show();
                this.txtContent.attr('contenteditable', true);
                // this.txtContent.addClass('editable');
                this.txtContent.addClass('edit-class');
            }
            else {
                this.myNicPanel.hide();
                this.txtContent.attr('contenteditable', false);
                this.header.attr('contenteditable', false);
                //  this.txtContent.removeClass('editable');
                this.txtContent.removeClass('edit-class');
                // this.editor.removeInstance('Editor1');               
                this.btnSave.addClass(DISABLED);
                this.chkEnabled.attr(DISABLED, true);
            }
        };
        PageEditor.prototype.onDelete = function () {
            // this.pageName.val('');
            // this.onSaveConfirmed();
        };
        PageEditor.prototype.onPageInfo = function (resp) {
            if (this.isEdit)
                nicEditors.findEditor(this.contId.substr(1)).setContent(resp);
            else
                this.txtContent.html(resp);
        };
        PageEditor.prototype.onListChange = function (vo) {
            var _this = this;
            this.currentPage = vo;
            if (!this.currentPage || this.currentPage.id == 0) {
                this.reset();
                return;
            }
            //  console.log(this.currentPage);
            var enbl = Number(this.currentPage.enable);
            this.btnCopy.removeClass(DISABLED);
            if (enbl) {
                this.btnEdit.removeClass(DISABLED);
                this.chkEnabled.prop(CHECKED, (enbl == 1));
            }
            else {
                this.btnEdit.addClass(DISABLED);
                this.chkEnabled.prop(CHECKED, false);
            }
            if (this.isEdit) {
                this.isEdit = false;
                this.switchMode();
            }
            this.header.text(this.currentPage.label);
            this.pageId.text(this.currentPage.id);
            R.connector.getPageInfo(function (evt) { return _this.onPageInfo(evt); }, vo.id);
            if (vo.old_id) {
                this.isEdit = true;
                this.switchMode();
                this.header.focus();
            }
        };
        return PageEditor;
    })();
    _page.PageEditor = PageEditor;
})(page || (page = {}));
var nicEditors;
var pageEditor = new page.PageEditor();
//# sourceMappingURL=PageEditor.js.map