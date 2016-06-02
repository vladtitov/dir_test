/// <reference path="../admin/RegA.ts" />
var uplight;
(function (uplight) {
    var ScreenSaverManager = (function () {
        function ScreenSaverManager() {
            this.rssurl = 'SS_1920x1080.1.htm';
            this.msgurl = 'TextTicker2.htm';
            this.haveChanges = false;
            this.delay = 0;
            this.R = uplight.RegA.getInstance();
            console.log('Screensaver');
            this.view = $('#ScreenSaver');
            // this.touchclip = $('<div id="TouchClip"></div>').html('<h1>Touch to Begin</h1>').appendTo(this.view);
            // this.messages = $('<ul id="ALMessages"></ul>').appendTo(this.view);
            this.floatPanel = $('#floatpanel');
            this.panel = $('#screensaverPanel');
            this.radMes = this.panel.children('[data-id=btnMessage]:first');
            this.radRSS = this.panel.children('[data-id=btnRSS]:first');
            this.tiDelay = this.panel.find('[data-id=delay]:first');
            this.lblRSS = this.panel.find('[data-id=lblRSS]:first');
            this.lblEdit = this.panel.find('[data-id=btnEdit]:last');
            this.btnSave = this.panel.find('[data-id=btnSave]'); //.on(CLICK,()=>this.onSaveClick()).addClass(DISABLED);
            // this.btnClose = this.panel.find('[data-id=btnClose]');
            this.msgsEditor = $('#msgsEditor');
            this.tiText = this.msgsEditor.find('textarea:first');
            this.rssEditor = $('#rssEditor');
            this.selectRSS = this.rssEditor.find('select:first');
            this.btnEditRSS = this.rssEditor.children('[data-id=btnEdit]');
            this.rssValues = $('#rssValues');
            this.tiNameRSS = this.rssValues.find('[data-id=tiName]:first');
            this.tiurlRSS = this.rssValues.find('[data-id=tiURL]:first');
            // this.resetView();
            this.panel.remove();
            this.msgsEditor.remove();
            this.rssEditor.remove();
            this.view.remove();
            this.screenVp = $('#screenvp');
        }
        ScreenSaverManager.prototype.getPanel = function () {
            var _this = this;
            this.resetView();
            this.panel.on(CLICK, function (evt) { return _this.onPanelClick(evt); });
            this.btnSave.addClass(DISABLED);
            this.floatPanel.empty();
            this.screenVp.append(this.view);
            return this.panel;
        };
        ScreenSaverManager.prototype.onPanelClick = function (evt) {
            var _this = this;
            console.log(evt.target);
            switch ($(evt.target).data().id) {
                case 'btnSaveMsgs':
                    this.R.connector.saveMessages(JSON.stringify(this.tiText.val().split("\n")), function (resp) { return _this.onSavedMessages(resp); });
                    break;
                case 'btnClose':
                    this.view.remove();
                    if (this.onClose)
                        this.onClose();
                    break;
                case 'btnMessage':
                    // if (this.type!='msg') this.onHaveChanges();
                    this.btnSave.removeClass(DISABLED);
                    this.type = 'msg';
                    this.url = this.msgurl;
                    this.lblEdit.text('Edit Messages');
                    this.lblRSS.text('');
                    this.floatPanel.children().remove();
                    this.loadScreensaver();
                    break;
                case 'btnRSS':
                    this.btnSave.removeClass(DISABLED);
                    // if (this.type != 'rss') this.onHaveChanges();
                    this.url = this.rssurl;
                    this.type = 'rss';
                    this.lblEdit.text('Edit RSS');
                    this.lblRSS.text(this.getsettings().screensaver.label);
                    this.floatPanel.children().remove();
                    this.loadScreensaver();
                    break;
                case 'btnUpdown':
                    this.btnSave.removeClass(DISABLED);
                    if (evt.offsetY < 10)
                        this.addDelay(5);
                    else
                        this.addDelay(-5);
                    break;
                case 'btnEdit':
                    if (this.type == 'rss')
                        this.onEditRSS();
                    else if (this.type == 'msg')
                        this.onEditMsg();
                    break;
                case 'btnSaveRSS':
                    this.rssSelected.label = this.tiNameRSS.val();
                    this.rssSelected.url = this.tiurlRSS.val();
                    this.R.connector.saveRSSs(this.rsss, function (resp) { return _this.onRsssSaved(resp); });
                    break;
                case 'selRSS':
                    this.showRSS();
                    break;
                case 'btnAddRSS':
                    this.rssEditor.find('[data-id=btnSaveRSS]').removeClass(DISABLED);
                    if (this.rsss[this.rsss.length - 1].url)
                        this.rsss.push({ label: null, url: null });
                    this.rssSelected = this.rsss[this.rsss.length - 1];
                    this.tiNameRSS.val('');
                    this.tiNameRSS.focus();
                    this.tiurlRSS.val('');
                    break;
                case 'btnDelRSS':
                    this.rssEditor.find('[data-id=btnSaveRSS]').removeClass(DISABLED);
                    var num = this.selectRSS.prop("selectedIndex");
                    this.selectRSS.children().eq(num).remove();
                    this.rsss.splice(num, 1);
                    this.tiNameRSS.val('');
                    this.tiurlRSS.val('');
                    break;
                case 'btnSave':
                    if (this.btnSave.hasClass(DISABLED))
                        return;
                    this.btnSave.addClass(DISABLED);
                    this.saveScreensaver();
                    break;
            }
        };
        ScreenSaverManager.prototype.showRSS = function () {
            this.btnSave.removeClass(DISABLED);
            this.rss = this.selectRSS.prop("selectedIndex");
            this.rssSelected = this.rsss[this.rss];
            this.tiNameRSS.val(this.rssSelected.label);
            this.tiurlRSS.val(this.rssSelected.url);
            this.lblRSS.text(this.rssSelected.label);
        };
        // private isRSSEdit: boolean;
        //  private getMessages(): void {
        //  R.connector.getMessages((resp) => this.onMessages(resp));
        //}
        // private getRSSS(): void {
        //    R.connector.getRSSs((resp) => this.onRSSs(resp));
        //  }
        ScreenSaverManager.prototype.onMessages = function (resp) {
            var ar = JSON.parse(resp);
            this.tiText.text(ar.join("\n"));
        };
        ScreenSaverManager.prototype.onEditMsg = function () {
            var _this = this;
            this.R.connector.getMessages(function (resp) { return _this.onMessages(resp); });
            this.floatPanel.append(this.msgsEditor);
            this.msgsEditor.find('[data-id=btnCloseMsg]').on(CLICK, function () {
                _this.floatPanel.empty();
            });
        };
        ScreenSaverManager.prototype.onEditRSS = function () {
            var _this = this;
            this.R.connector.getRSSs(function (resp) { return _this.onRSSs(resp); });
            this.rssEditor.find('[data-id=btnSaveRSS]').addClass(DISABLED);
            this.floatPanel.append(this.rssEditor);
            this.rssEditor.find('[data-id=btnCloseRss]').on(CLICK, function () {
                _this.floatPanel.empty();
            });
            //  this.view.attr(SRC, ' ');
            //////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        };
        ScreenSaverManager.prototype.onRSSs = function (resp) {
            this.rsss = resp;
            var out = '';
            for (var i = 0, n = resp.length; i < n; i++) {
                out += '<option>' + resp[i].label + '</option>';
            }
            this.selectRSS.html(out);
            this.selectRSS.prop("selectedIndex", this.rss);
            this.showRSS();
        };
        ScreenSaverManager.prototype.addDelay = function (num) {
            this.delay += num;
            if (this.delay < 5)
                this.delay = 5;
            this.tiDelay.text(this.delay);
        };
        ScreenSaverManager.prototype.onSavedMessages = function (resp) {
            // myMsg2('Messages Saved on server', this.msgsEditor.find('[data-id=btnSaveMsgs]:last'));
        };
        ScreenSaverManager.prototype.onRsssSaved = function (resp) {
            //  myMsg2('RSS data Saved', this.rssEditor.find('[data-id=btnSaveRSS]:first'));
        };
        ScreenSaverManager.prototype.onSavedData = function (resp) {
            var msg = 'Screensaver saved on server';
            if (isNaN(Number(resp)))
                msg = resp;
            uplight.myMsg(msg, this.btnSave);
            this.resetView();
        };
        ScreenSaverManager.prototype.getsettings = function () {
            return uplight.RegA.getInstance().settings;
        };
        // private onSaveClick(): void {
        //   if (this.btnSave.hasClass(DISABLED)) return;
        //  this.btnSave.addClass(DISABLED);
        // }
        ScreenSaverManager.prototype.saveScreensaver = function () {
            var _this = this;
            var ss = this.getsettings().screensaver;
            ss.type = this.type;
            ss.delay = this.delay;
            ss.rss = this.rss;
            ss.url = this.url;
            ss.label = this.tiDelay.text();
            uplight.RegA.getInstance().connector.saveSetting('screensaver', ss, function (resp) { return _this.onSavedData(resp); });
            this.getsettings().screensaver = ss;
        };
        ScreenSaverManager.prototype.resetView = function () {
            var ss = this.getsettings().screensaver;
            this.type = ss.type;
            this.delay = ss.delay;
            this.tiDelay.text(this.delay);
            this.rss = ss.rss;
            this.setType();
            this.url = ss.url;
            this.loadScreensaver();
            // console.log(res);
            // this.rssurl = res.tmpls.rssurl;
            // this.msgurl = res.tmpls.msgurl;
            //switch (this.settings.screensaver.type) {
            //   case 'msg':
            //    break;
            // case 'rss':
            //  break;
            // }
        };
        ScreenSaverManager.prototype.loadScreensaver = function () {
            this.view.attr(SRC, this.url);
        };
        ScreenSaverManager.prototype.setType = function () {
            switch (this.type) {
                case 'msg':
                    this.radMes.prop(CHECKED, true);
                    this.url = this.msgurl;
                    this.lblEdit.text('Edit Messages');
                    break;
                case 'rss':
                    this.radRSS.prop(CHECKED, true);
                    this.url = this.rssurl;
                    this.lblEdit.text('Edit RSS');
                    break;
            }
        };
        return ScreenSaverManager;
    })();
    uplight.ScreenSaverManager = ScreenSaverManager;
})(uplight || (uplight = {}));
//# sourceMappingURL=ScreenSaverManager.js.map