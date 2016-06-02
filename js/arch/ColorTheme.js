/// <reference path="../admin/RegA.ts" />
var uplight;
(function (uplight) {
    var ColorTheme = (function () {
        function ColorTheme() {
            console.log('ColorTheme');
            this.R = uplight.RegA.getInstance();
            // R.connector.getAllPages((resp) => this.onAllPages(resp));
            this.themeUrl = $('#Theme');
            this.reset();
            // this.themeUrl.attr('href', 'css/' + R.settings.main.color + '.css');
            this.drawDests();
            this.drawMenu();
        }
        //  if (!this.btnSave.hasClass(DISABLED)) this.loadTheme(this.getsettings().main.color);
        // }
        ColorTheme.prototype.onColorSaved = function (resp) {
            var msg = 'Color saved on server';
            if (isNaN(Number(resp)))
                msg = resp;
            myMsg(msg, this.btnSave);
        };
        ColorTheme.prototype.getPanel = function () {
            var _this = this;
            if (!this.panel)
                this.createPanel();
            this.panel.on(CLICK, 'a', function (evt) { return _this.onColorClicked(evt); });
            return this.panel;
        };
        ColorTheme.prototype.getsettings = function () {
            return uplight.RegA.getInstance().settings;
        };
        ColorTheme.prototype.createPanel = function () {
            var _this = this;
            this.panel = $('<div></div>');
            this.btnSave = $('<a href="javascript:void(0)" class="uplight"  title="Save changes on server"> <img src="css/icons/save.png"  />Save</a> ').on(CLICK, function () { return _this.onSaveClicked(); }).appendTo(this.panel);
            var str = '';
            for (var i = 0; i < 8; i++)
                str += '&nbsp;<a data-id="theme' + i + '" href="javascript:void(0)"  class="u-brand' + i + '">&nbsp;A&nbsp;</a>&nbsp;';
            this.panel.append(str);
            this.btnClose = $('<a href="javascript:void(0)" class="uplight"  data-id="btnClose" title="Close"> <img src="css/icons/close.png"  /></a>').appendTo(this.panel);
        };
        ColorTheme.prototype.onSaveClicked = function () {
            var _this = this;
            if (this.btnSave.hasClass(DISABLED))
                return;
            this.btnSave.addClass(DISABLED);
            var sett = this.getsettings().main;
            sett.color = this.color;
            this.R.connector.saveSetting('main', sett, function (resp) { return _this.onColorSaved(resp); });
        };
        ColorTheme.prototype.reset = function () {
            this.themeUrl.attr('href', 'css/' + this.R.settings.main.color + '.css');
        };
        // private drawHeader(color: string): void {
        // var target: JQuery = $('#Header');
        // target.removeClass();
        //target.addClass(color);
        //}
        ColorTheme.prototype.drawMenu = function () {
            var ar = ['Menu item 1', 'Menu item 2', 'Menu item 3', 'Menu item 4', 'Menu item 5'];
            var out = '';
            for (var i = 0, n = ar.length; i < n; i++) {
                out += '<li class="u-brand">' + ar[i] + '</li>';
            }
            $('#listManu').html(out);
        };
        ColorTheme.prototype.drawDests = function () {
            var ar = ['Company  1', 'Company  2', 'Company  3', 'Company  4', 'Company  5', 'Company  6', 'Company  7', 'Company  8'];
            var out = '';
            for (var i = 0, n = ar.length; i < n; i++) {
                out += '<li class="u-brand"><span class="left">' + ar[i] + '</span><span class="right">' + (100 + 1) + '</span></li>';
            }
            $('#listDestinations').html(out);
        };
        ColorTheme.prototype.loadTheme = function (theme) {
            this.themeUrl.attr('href', 'css/' + theme + '.css');
        };
        ColorTheme.prototype.onColorClicked = function (evt) {
            var theme = $(evt.currentTarget).data().id;
            if (theme == 'btnClose') {
                if (this.onClose)
                    this.onClose();
                this.reset();
                return;
            }
            if (!theme)
                return;
            this.loadTheme(theme);
            this.color = theme;
            this.btnSave.removeClass(DISABLED);
            // if (this.onChange) this.onChange(theme);
            // }          
        };
        return ColorTheme;
    })();
    uplight.ColorTheme = ColorTheme;
})(uplight || (uplight = {}));
//# sourceMappingURL=ColorTheme.js.map