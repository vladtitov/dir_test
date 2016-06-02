/// <reference path="../admin/RegA.ts" />
/// <reference path="ONOFFScreen.ts" />
module admin {   

    export class ScreenAppearance {
       // private onClose: Function;
       // private settings: any;
        private backgroundManager: BackgroundManager;
        private screensaver: ScreenSaverManager;
        private headerEdit: HeaderEditor;
        private colorTheme: ColorTheme;
        private editor: JQuery;       
       
        private btnBG: JQuery;
        private btnBanner: JQuery;
        private btnSS: JQuery;

        private btnColor: JQuery;

        private btnON_OFF: JQuery;
        private onoff: ONOFFScreen;

        private controls: JQuery;
        private divPanel: JQuery;
    

        constructor() {
            console.log('ScreenAppearance');
            this.editor = $('#screenEditor');
            this.divPanel = $('#divPanel');
            //this.editor.children('div:first-child');// $('<div style="position:relative;"></div>').appendTo(this.editor.children().eq(0));
            this.controls = $('#controls');
           // this.btnClose = this.editor.find('[data-id=btnClose]:first').on(CLICK, () => this.onCloseClick());

            this.btnBG = this.editor.find('[data-id=btnEditBG]:first').on(CLICK, () => {
                if(!this.backgroundManager) this.backgroundManager = new BackgroundManager();
                this.backgroundManager.onClose =()=>{
                    this.divPanel.children().remove();
                    this.backgroundManager.view.hide('fast');
                    this.showControls();
                }
                this.hideControls();
                this.divPanel.append(this.backgroundManager.getPanel());
                this.backgroundManager.view.show('fast');
            });

            this.screensaver = new ScreenSaverManager();
            this.screensaver.onClose = ()=>{
                this.divPanel.empty();
                this.showControls();
            }
            this.btnSS = this.editor.find('[data-id=btnEditSS]:first').on(CLICK, () => {
                this.hideControls();
                this.divPanel.append(this.screensaver.getPanel());
            });

            this.headerEdit = new HeaderEditor();
            this.headerEdit.onClose = ()=>{
                this.divPanel.empty();
                this.showControls();
            }
            this.btnBanner = this.editor.find('[data-id=btnBanner]:first').on(CLICK, () => {
                this.hideControls();
                this.divPanel.append(this.headerEdit.getPanel());
            });

            this.colorTheme = new ColorTheme();

            this.colorTheme.onClose = ()=>{
                this.divPanel.empty();
                this.showControls();
            };

            this.btnColor = this.editor.find('[data-id=btnColor]:first').on(CLICK, () => {
                this.hideControls();
                this.divPanel.append(this.colorTheme.getPanel());
            });



            this.btnON_OFF = this.editor.find('[data-id=btnON_OFF]:first').on(CLICK, () => {
               if(!this.onoff) this.onoff = new ONOFFScreen();

                this.onoff.onClose=()=>{
                    this.divPanel.empty();
                    this.showControls();

                }
                this.hideControls();
                this.divPanel.append(this.onoff.getPanel());
            });
        }

       // private saveFunction: Function;
       
        private showControls(): void {
            this.controls.show('fast');
        }
        private hideControls(): void {
            this.controls.hide('fast');
        }
       
    }

}

var screenAppearance: admin.ScreenAppearance = new admin.ScreenAppearance();