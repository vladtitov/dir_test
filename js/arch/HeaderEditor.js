/// <reference path="../admin/RegA.ts" />
var uplight;
(function (uplight) {
    var HeaderEditor = (function () {
        function HeaderEditor() {
            this.R = uplight.RegA.getInstance();
            //   this.R = RegA.getInstance();                      
            this.view = $('#HeaderBanner');
            this.title = this.view.find('[data-id=title]').text(this.getsettings().header.title);
            if (this.getsettings().header.logo && this.getsettings().header.logo.length > 2)
                this.insertLogo();
            this.refresh();
        }
        HeaderEditor.prototype.save = function () {
            var _this = this;
            var header = this.getsettings().header;
            // header.clock = 'Toronto';
            header.logo = this.logo.attr('src');
            header.title = this.title.text();
            //  header.weather = 'Toronto';                
            this.title.attr('contenteditable', false);
            uplight.RegA.getInstance().connector.saveSetting('header', header, function () { return _this._onSaved(); });
        };
        HeaderEditor.prototype.refresh = function () {
            var header = this.getsettings().header;
            if (header.logo)
                this.logo.attr('src', header.logo);
            this.title.text(header.title);
        };
        HeaderEditor.prototype.getPanel = function () {
            var _this = this;
            if (!this.panel)
                this.createPanel();
            this.btnFile.val('');
            this.btnFile.on(CHANGE, function () { return _this.onLogoFile(); });
            this.btnEditHeader.removeClass(DISABLED);
            this.btnEditHeader.on(CLICK, function () { return _this.onEditHeaderClick(); });
            this.btnClose.on(CLICK, function () {
                _this.refresh();
                if (_this.onClose)
                    _this.onClose();
            });
            this.btnSave.on(CLICK, function () {
                if (_this.btnSave.hasClass(DISABLED))
                    return;
                _this.btnSave.addClass(DISABLED);
                _this.save();
            }).addClass(DISABLED);
            return this.panel;
        };
        HeaderEditor.prototype.createPanel = function () {
            this.panel = $('<div></div>');
            this.btnSave = $('<a href="javascript:void(0)" class="uplight"  title = "Save new Background" > <img src ="css/icons/save.png"  / > Save </a >').appendTo(this.panel);
            this.btnEditHeader = $('<a href="javascript:void(0)" class="uplight"  title="Edit Header"> <img src="css/icons/edit.png"  />Header text</a>').appendTo(this.panel);
            this.formFile = $('<form style="display:inline;">Upload new Logo: </form>').appendTo(this.panel);
            this.btnFile = $('<input name="file" type="file" />').appendTo(this.formFile);
            this.btnClose = $('<a href="javascript:void(0)" class="uplight"  data-id="btnClose" title="Close"> <img src="css/icons/close.png"  /></a>').appendTo(this.panel);
        };
        // private mode: string;
        HeaderEditor.prototype.getsettings = function () {
            return uplight.RegA.getInstance().settings;
        };
        HeaderEditor.prototype.onEditHeaderClick = function () {
            var _this = this;
            if (this.btnEditHeader.hasClass(DISABLED))
                return;
            this.btnSave.removeClass(DISABLED);
            this.btnEditHeader.addClass(DISABLED);
            setTimeout(function () {
                _this.btnEditHeader.removeClass(DISABLED);
            }, 2000);
            if (this.title.attr('contenteditable')) {
                this.title.attr('contenteditable', false);
                this.title.text(this.getsettings().header.title);
            }
            else {
                this.title.text('Edit text here');
                setTimeout(function () {
                    _this.title.attr('contenteditable', true);
                    _this.title.text(_this.getsettings().header.title);
                    _this.title.focus();
                }, 2000);
            }
        };
        HeaderEditor.prototype._onSaved = function () {
            if (this.onSaved)
                this.onSaved('Header saved on server');
        };
        HeaderEditor.prototype.insertLogo = function () {
            this.logo = $('<img />').css('margin-left', '70px').css('margin-top', '30px').appendTo(this.view);
            ;
        };
        HeaderEditor.prototype.onLogoFile = function () {
            var _this = this;
            var btn = this.btnFile[0];
            // console.log(btn.files);
            var files = btn.files;
            if (!files || !files.length)
                return;
            this.btnSave.removeClass(DISABLED);
            this.R.connector.uploadLogo(this.formFile[0], function (resp) { return _this.onUploadLogo(resp); }, this.onError, this.onProgress);
        };
        HeaderEditor.prototype.onError = function (res) {
        };
        HeaderEditor.prototype.onProgress = function (res) {
        };
        HeaderEditor.prototype.onUploadLogo = function (resp) {
            this.logo.prop(SRC, resp);
        };
        return HeaderEditor;
    })();
    uplight.HeaderEditor = HeaderEditor;
})(uplight || (uplight = {}));
//# sourceMappingURL=HeaderEditor.js.map