/// <reference path="regA.ts" />
/// <reference path="net.ts" />
/// <reference path="models.ts" />
/// <reference path="../typing/jquery.d.ts" />
/// <reference path="../typing/underscore.d.ts" />
/// <reference path="com/GalleryPreview.ts" />
/// <reference path="com/GalleryEditor.ts" />
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
///<reference path="etc/KiosksManager.ts" />
///<reference path="screen/LabelsManager.ts" />
///<reference path="screen/SettingsKiosks.ts" />
///<reference path="screen/AttractLoopEdit.ts" />
///<reference path="../gmap/GmapCtr.ts" />
///<reference path="AdminsManage.ts" />
var uplight;
(function (uplight) {
    var Admin = (function () {
        function Admin() {
            var _this = this;
            this.theme = '';
            this.previewUrl1080 = 'Kiosk1080.php?';
            this.previewUrl1920 = 'Kiosk1920.php?';
            this.mobileUrl = 'KioskMobile.php?preview=true';
            //  $.ajaxSetup({ cache: false });
            this.R = uplight.RegA.getInstance();
            this.R.admin = u_admin;
            this.R.dispatcher = $({});
            this.R.connector = new uplight.Connector();
            this.R.connector.getData('settings.json').done(function (resp) {
                _this.R.setSettings(JSON.parse(resp));
                // this.R.props =
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
            this.R.msg = function (text, cont) { return _this.myMsg(text, cont); };
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
            var hash = window.location.hash;
            if (!hash)
                return;
            var ar = hash.split('/');
            console.log(hash);
            //  if(hash!=='#PreviewKi') this.hidePreview();
            this.hideKiosk();
            this.hideModile();
            var ctr = ar[0].substr(0, 10);
            switch (ctr) {
                case '#KiosksLis':
                    if (this.R.current)
                        this.R.current.destroy();
                    this.content.empty();
                    this.R.current = new uplight.KiosksManager(this.content);
                    break;
                case '#Preview':
                    this.content.hide();
                    this.showKiosk(ar[1]);
                    break;
                case '#PreviewMo':
                    this.content.hide();
                    this.showMobile();
                    break;
                case '#Attract-L':
                    // this.showPreview();
                    if (this.R.current)
                        this.R.current.destroy();
                    // this.content.hide();
                    this.attractLoop = new uplight.AttractLoopEdit(this.content);
                    this.content.show();
                    // this.restartKiosks.restart();
                    break;
                case '#Statistic':
                    // this.showPreview();
                    if (this.R.current)
                        this.R.current.destroy();
                    // this.content.hide();
                    this.statistics = new uplight.Statistics(this.content);
                    this.content.show();
                    // this.restartKiosks.restart();
                    break;
                case '#Info-Page':
                    // this.showPreview();
                    if (this.R.current)
                        this.R.current.destroy();
                    // this.content.hide();
                    this.infoPages = new uplight.InfoPagesManager(this.content);
                    this.content.show();
                    // this.restartKiosks.restart();
                    break;
                case '#Front-Pag':
                    if (this.R.current)
                        this.R.current.destroy();
                    this.frontPageEditor = new uplight.FrontPageEditor(this.content);
                    this.frontPageEditor.appendTo(this.content);
                    this.content.show();
                    // this.restartKiosks.restart();
                    break;
                case '#Listing-V':
                    if (this.R.current)
                        this.R.current.destroy();
                    this.listing = new uplight.DestinationsController(this.content);
                    this.content.show();
                    break;
                case '#Categorie':
                case '#Edit-Cate':
                    if (this.R.current)
                        this.R.current.destroy();
                    this.categories = new uplight.CategoriesManager(this.content);
                    this.content.show();
                    break;
                case '#Category-':
                    if (this.R.current)
                        this.R.current.destroy();
                    this.categoryListing = new uplight.CategoryListing(this.content);
                    this.content.show();
                    break;
                case '#Import-Ex':
                    if (this.R.current)
                        this.R.current.destroy();
                    this.importExport = new uplight.ImportExport(this.content);
                    break;
                case '#Settings-':
                    if (this.R.current)
                        this.R.current.destroy();
                    this.settingsKiosks = new uplight.SettingsKiosks(this.content);
                    this.content.show();
                    break;
                case '#Heading-S':
                case '#Backgroun':
                case '#Logo-Imag':
                    if (this.R.current)
                        this.R.current.destroy();
                    this.labels = new uplight.LabelsManager(this.content);
                    this.content.show();
                    break;
                case '#GoogleMap':
                    if (this.R.current)
                        this.R.current.destroy();
                    this.R.current = new uplight.GmapCtr(this.content);
                    this.content.show();
                    break;
                case '#AdminsMan':
                    this.content.trigger('DESTROY');
                    this.content.empty();
                    if (this.R.current)
                        this.R.current.destroy();
                    var admins = new uplight.AdminsManage(this.content);
                    this.content.show();
                    break;
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
            $(window).on('hashchange', function (evt) { return _this.onHashChange(); });
            //  this.menu = new AdminMenu($('#Navigation'));
            this.preview = $('#Preview');
            this.isPreview = true;
            this.content = $('#content');
            this.message = $('<div>').attr('id', 'Message');
            this.messageText = $('<div>').appendTo(this.message);
            this.btnFullView = this.preview.find('[data-id=btnFullView]').click(function () { window.open(_this.previewUrl, "_blank"); });
            $('#btnRestartKiosks').click(function () {
                _this.R.confirm.show('Restart Kiosks', 'You want to restart kiosks?', function () {
                    _this.R.connector.restartKiosks().done(function (res) {
                        console.log(res);
                        if (res.success == 'success') {
                            _this.R.msg('Restarting kiosks', $('#btnRestartKiosks'));
                        }
                        else
                            _this.R.msg('Server Error', $('#btnRestartKiosks'));
                    }).fail(function () { alert('Communication error'); });
                });
            });
            if (window.location.hash == '')
                window.location.hash = '#Statistic';
            this.initThemes();
        };
        Admin.prototype.logout = function () {
            $.get('rem/login.php?a=logout').done(function (r) {
                var res = JSON.parse(r);
                if (res.success == 'logout')
                    window.location.href = res.result;
                else
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
        /*            Preview
                   *
                    * */
        Admin.prototype.saveTheme = function () {
            var css = $('#ThemeSelector').val();
            this.R.saveSettings('theme', css);
        };
        Admin.prototype.initThemes = function () {
            var _this = this;
            $('#AdminPreviewKiosk [data-id=btnEditColor]:first').click(function () {
                if (_this.isEditColor) {
                    _this.isEditColor = false;
                    $('#AdminPreviewKiosk [data-id=editColorTools]:first').hide();
                }
                else {
                    _this.isEditColor = true;
                    $('#ThemeSelector').val(-1);
                    $('#AdminPreviewKiosk [data-id=editColorTools]:first').removeClass('hide').show();
                }
            });
            var themes = u_admin.themes;
            var ar = themes;
            var out = '';
            for (var i = 0, n = ar.length; i < n; i++) {
                out += '<option value="' + ar[i].css + '">' + ar[i].label + '</option>';
            }
            $('#ThemeSelector').html(out).change(function () {
                _this.loadTheme($('#ThemeSelector').val());
            });
            $('#AdminPreviewKiosk [data-id=btnSave]:first').click(function () {
                _this.R.saveSettings('theme', _this.theme).done(function (res) {
                    if (res.success) {
                        _this.R.msg('Thema saved', $('#AdminPreviewKiosk [data-id=btnSave]:first'));
                    }
                });
            });
        };
        Admin.prototype.loadTheme = function (css) {
            this.theme = css;
            $('#AdminPreviewKiosk iframe:first').attr('src', this.previewUrl + '&theme=' + this.theme);
        };
        Admin.prototype.showKiosk = function (width) {
            if (width == '1920') {
                this.previewUrl = this.previewUrl1920;
                $('#Preview').addClass('k1920');
            }
            else {
                $('#Preview').removeClass('k1920');
                this.previewUrl = this.previewUrl1080;
            }
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
    }());
    uplight.Admin = Admin;
})(uplight || (uplight = {}));
//# sourceMappingURL=DirsAdmin.js.map