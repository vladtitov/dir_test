/// <reference path="../admin/RegA.ts" />
/// <reference path="ONOFFScreen.ts" />
var admin;
(function (admin) {
    var ScreenAppearance = (function () {
        function ScreenAppearance() {
            var _this = this;
            console.log('ScreenAppearance');
            this.editor = $('#screenEditor');
            this.divPanel = $('#divPanel');
            //this.editor.children('div:first-child');// $('<div style="position:relative;"></div>').appendTo(this.editor.children().eq(0));
            this.controls = $('#controls');
            // this.btnClose = this.editor.find('[data-id=btnClose]:first').on(CLICK, () => this.onCloseClick());
            this.btnBG = this.editor.find('[data-id=btnEditBG]:first').on(CLICK, function () {
                if (!_this.backgroundManager)
                    _this.backgroundManager = new BackgroundManager();
                _this.backgroundManager.onClose = function () {
                    _this.divPanel.children().remove();
                    _this.backgroundManager.view.hide('fast');
                    _this.showControls();
                };
                _this.hideControls();
                _this.divPanel.append(_this.backgroundManager.getPanel());
                _this.backgroundManager.view.show('fast');
            });
            this.screensaver = new ScreenSaverManager();
            this.screensaver.onClose = function () {
                _this.divPanel.empty();
                _this.showControls();
            };
            this.btnSS = this.editor.find('[data-id=btnEditSS]:first').on(CLICK, function () {
                _this.hideControls();
                _this.divPanel.append(_this.screensaver.getPanel());
            });
            this.headerEdit = new HeaderEditor();
            this.headerEdit.onClose = function () {
                _this.divPanel.empty();
                _this.showControls();
            };
            this.btnBanner = this.editor.find('[data-id=btnBanner]:first').on(CLICK, function () {
                _this.hideControls();
                _this.divPanel.append(_this.headerEdit.getPanel());
            });
            this.colorTheme = new ColorTheme();
            this.colorTheme.onClose = function () {
                _this.divPanel.empty();
                _this.showControls();
            };
            this.btnColor = this.editor.find('[data-id=btnColor]:first').on(CLICK, function () {
                _this.hideControls();
                _this.divPanel.append(_this.colorTheme.getPanel());
            });
            this.btnON_OFF = this.editor.find('[data-id=btnON_OFF]:first').on(CLICK, function () {
                if (!_this.onoff)
                    _this.onoff = new admin.ONOFFScreen();
                _this.onoff.onClose = function () {
                    _this.divPanel.empty();
                    _this.showControls();
                };
                _this.hideControls();
                _this.divPanel.append(_this.onoff.getPanel());
            });
        }
        // private saveFunction: Function;
        ScreenAppearance.prototype.showControls = function () {
            this.controls.show('fast');
        };
        ScreenAppearance.prototype.hideControls = function () {
            this.controls.hide('fast');
        };
        return ScreenAppearance;
    })();
    admin.ScreenAppearance = ScreenAppearance;
})(admin || (admin = {}));
var screenAppearance = new admin.ScreenAppearance();
//# sourceMappingURL=ScreenAppearance.js.map