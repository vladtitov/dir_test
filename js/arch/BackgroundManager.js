/// <reference path="../admin/RegA.ts" />
var uplight;
(function (uplight) {
    var BackgroundManager = (function () {
        function BackgroundManager(container) {
            var _this = this;
            this.isUpload = false;
            container.load('js/admin/labels/labelsManager.htm', function () {
                _this.init();
            });
            this.R = uplight.RegA.getInstance();
        }
        BackgroundManager.prototype.getPanel = function () {
            var _this = this;
            this.btnSave.addClass(DISABLED);
            this.btnSave.on(CLICK, function () { return _this.onSaveClicked(); });
            this.btnClose.on(CLICK, function () { return _this.onCloseClicked(); });
            return this.panel; //.on(CLICK, 'a', (evt) => this.onPanelClicked(evt));
        };
        BackgroundManager.prototype.alertSave = function () {
            var _this = this;
            this.getsettings().main.background = this.strBg;
            this.hiliteCurrent();
            uplight.RegA.getInstance().connector.saveSetting('main', this.getsettings().main, function (data) { return _this.onSaveBackground(data); });
        };
        BackgroundManager.prototype.onCloseClicked = function () {
            console.log('close bg panel ');
            this.bgImage.prop(SRC, this.getsettings().main.background);
            if (this.onClose)
                this.onClose();
        };
        BackgroundManager.prototype.onSaveClicked = function () {
            var _this = this;
            if (this.btnSave.hasClass(DISABLED))
                return;
            showAlert('You want to save current image as new background?', function () { return _this.alertSave(); }, 'Alert');
        };
        BackgroundManager.prototype.onImageSelect = function (evt) {
            if (!$(evt.target).is('img'))
                return;
            if (this.selectedImage)
                this.selectedImage.parent().removeClass(SELECTED);
            this.selectedImage = $(evt.target);
            this.btnDel.removeClass(DISABLED);
            var src = this.selectedImage.attr(SRC);
            this.selectedImage.parent().addClass(SELECTED);
            if (src != this.getsettings().main.background) {
                this.btnDel.removeClass(DISABLED);
                this.btnSave.removeClass(DISABLED);
            }
            else {
                this.btnDel.addClass(DISABLED);
                this.btnSave.addClass(DISABLED);
            }
            this.strBg = src;
            this.bgImage.prop(SRC, src);
            //this.imgPreview.attr(SRC,src );  
            //this.imgBg.attr('src', $(evt.target).attr(SRC));                   
        };
        BackgroundManager.prototype.getsettings = function () {
            return uplight.RegA.getInstance().settings;
        };
        BackgroundManager.prototype.init = function () {
            var _this = this;
            this.bgImage = $('#bgImage');
            this.view = $('#backgroundLibrary').hide();
            this.list = $('#imageLibraryHolder');
            this.btnDel = this.view.find('[data-id=btnDel]').on(CLICK, function () { return _this.onDelClick(); });
            ;
            this.btnAdd = this.view.find('[data-id=btnAdd]').on(CLICK, function () { return _this.onAddClick(); });
            ;
            this.panel = $('<div></div>');
            this.btnSave = $('<a href="javascript:void(0)" class="uplight"  title = "Save new Background" > <img src ="css/icons/save.png"  / > Save </a >').appendTo(this.panel);
            this.btnClose = $('<a href="javascript:void(0)" class="uplight"  data-id="btnClose" title="Close"> <img src="css/icons/close.png"  /></a>').appendTo(this.panel);
            this.list.on(CLICK, 'img', function (evt) { return _this.onImageSelect(evt); });
            this.refreshLibrary();
            this.resetScreen();
        };
        BackgroundManager.prototype.onFileChange = function () {
            var _this = this;
            var btn = this.btnFile[0];
            // console.log(btn.files);
            var files = btn.files;
            if (!files || !files.length)
                return;
            uplight.RegA.getInstance().connector.uploadBackgroundLibrary(this.formFile[0], function (evt) { return _this.completeHandler(evt); }, function (evt) { return _this.errorHandler(evt); }, function (evt) { return _this.progressHandlingFunction(evt); });
        };
        BackgroundManager.prototype.onAddClick = function () {
            var _this = this;
            this.resetScreen();
            if (!this.formFile) {
                this.formFile = $('<form></form>');
                this.btnFile = $('<input name="file" type="file" />').on('change', function () { return _this.onFileChange(); }).appendTo(this.formFile);
                ;
                this.formFile.appendTo(this.view.find('[data-id=menu1]'));
            }
            else {
                this.formFile.remove();
                this.formFile = null;
            }
            // this.btnFile.prop(DISABLED, false);
            //  this.imgPreview.prop(SRC, '');
        };
        BackgroundManager.prototype.resetScreen = function () {
            this.btnDel.addClass(DISABLED);
            this.strBg = this.getsettings().main.background;
            this.bgImage.attr(SRC, this.strBg);
        };
        //////////////////////////////Delete////////////////////////////
        BackgroundManager.prototype.onDelClick = function () {
            var _this = this;
            if (this.btnDel.hasClass(DISABLED))
                return;
            if (this.selectedImage) {
                showAlert('You want to delete selected image from library? ', function () { return _this.deleteSelected(); }, 'Alert');
            }
        };
        BackgroundManager.prototype.onImageDeleted = function (data) {
            // this.imgPreview.attr(SRC, '');            
            this.refreshLibrary();
        };
        BackgroundManager.prototype.deleteSelected = function () {
            var _this = this;
            var url = $(this.selectedImage).attr('src');
            uplight.RegA.getInstance().connector.deleteImage(url, function (data) { return _this.onImageDeleted(data); });
        };
        ///////////////////////////////////////
        // private showCurrent(): void {
        // if (this.btnShowCurrent.hasClass(DISABLED)) return;  
        //  if (this.selectedImage) this.selectedImage.parent().removeClass(SELECTED);          
        // this.imgPreview.attr(SRC, this.currentBackgorund);
        //  this.resetButtons();
        // }
        BackgroundManager.prototype.refreshLibrary = function () {
            var _this = this;
            this.R.connector.getBackgroundLibrary(function (data) { return _this.onAllBackgrounds(data); });
        };
        BackgroundManager.prototype.progressHandlingFunction = function (evt) {
            if (evt.lengthComputable) {
            }
        };
        BackgroundManager.prototype.completeHandler = function (evt) {
            this.formFile.remove();
            this.formFile = null;
            // setTimeout( () =>this.resetButtons() , 500);
            this.list.prepend('<img src="' + evt + '" />');
            // this.imgPreview.attr(SRC, evt);     
            this.list.scrollTop(0);
            //this.btnSave.removeClass(DISABLED);            
        };
        BackgroundManager.prototype.errorHandler = function (evt) {
            alert('EEERRRROORRRR uploading file ');
            this.resetScreen();
        };
        // private unhiliteCurrent(): void {
        // var str: string = '[src="' + this.currentBackgorund + '"]';
        //  this.list.children('li>img').removeClass('current');
        // }
        BackgroundManager.prototype.hiliteCurrent = function () {
            this.list.find('*').removeClass('current');
            var str = '[src="' + this.getsettings().main.background + '"]';
            this.list.find(str).addClass('current');
        };
        BackgroundManager.prototype.onAllBackgrounds = function (data) {
            var ar = data.split(',');
            var out = '';
            for (var i = 0, n = ar.length; i < n; i++) {
                out += '<li class="uplight"><img title="Click on image to select" src="' + ar[i] + '"/></li>';
            }
            this.list.html(out);
            this.hiliteCurrent();
        };
        // private onBackground(data: string): void {
        //}
        BackgroundManager.prototype.onSaveBackground = function (resp) {
            var msg = 'Background Saved';
            if (isNaN(Number(resp)))
                msg = resp;
            myMsg(msg, this.btnSave);
        };
        return BackgroundManager;
    })();
    uplight.BackgroundManager = BackgroundManager;
})(uplight || (uplight = {}));
//# sourceMappingURL=BackgroundManager.js.map