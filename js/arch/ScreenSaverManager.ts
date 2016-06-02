/// <reference path="../admin/RegA.ts" />
module uplight {

    declare class Screensaver {
        rss: number;
        type: string;
        delay: number;
        label: string;
        url: string;
    }
    export class ScreenSaverManager {

        // onChanges: Function;
        // onSaved: Function;
        onClose:Function


        view: JQuery;
        panel: JQuery;
        getPanel(): JQuery {
            this.resetView();          
            this.panel.on(CLICK, (evt) => this.onPanelClick(evt)); 
            this.btnSave.addClass(DISABLED);
            this.floatPanel.empty();
            this.screenVp.append(this.view);               
            return this.panel;
        }



        private onPanelClick(evt: JQueryEventObject): void {
           console.log(evt.target);
            switch ($(evt.target).data().id) {
                case 'btnSaveMsgs':
                    this.R.connector.saveMessages(JSON.stringify(this.tiText.val().split("\n")), (resp) => this.onSavedMessages(resp));
                    break;
               case 'btnClose':
                   this.view.remove();
                   if(this.onClose) this.onClose();
                  // this.floatPanel.children().remove();
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
                    if (evt.offsetY < 10) this.addDelay(5)
                    else this.addDelay(-5);
                   
                    break;
                case 'btnEdit':
                    if (this.type == 'rss') this.onEditRSS();
                    else if(this.type=='msg') this.onEditMsg()
                   
                    
                    break;
                case 'btnSaveRSS':
                   this.rssSelected.label = this.tiNameRSS.val();
                    this.rssSelected.url = this.tiurlRSS.val();
                   this.R.connector.saveRSSs(this.rsss, (resp) => this.onRsssSaved(resp))
                    break;
                case 'selRSS':
                    this.showRSS();
                    break;
                case 'btnAddRSS':
                    this.rssEditor.find('[data-id=btnSaveRSS]').removeClass(DISABLED);
                    if (this.rsss[this.rsss.length - 1].url) this.rsss.push({ label: null, url: null });
                    this.rssSelected = this.rsss[this.rsss.length - 1];
                    this.tiNameRSS.val('');
                    this.tiNameRSS.focus();
                    this.tiurlRSS.val('');
                   // myMsg2("Don't forget save your changes", this.rssEditor.find('[data-id=btnSaveRSS]:first'));

                    break;
                case 'btnDelRSS':
                    this.rssEditor.find('[data-id=btnSaveRSS]').removeClass(DISABLED);
                    var num: number = this.selectRSS.prop("selectedIndex");
                    this.selectRSS.children().eq(num).remove();
                    this.rsss.splice(num, 1);
                     this.tiNameRSS.val('');          
                    this.tiurlRSS.val('');   
                   // myMsg2("Don't forget save your changes", this.rssEditor.find('[data-id=btnSaveRSS]:first'));
                    break;

                case 'btnSave':
                    if (this.btnSave.hasClass(DISABLED)) return;
                    this.btnSave.addClass(DISABLED);
                    this.saveScreensaver();

                break
            }
        }

               
        private showRSS(): void {
            this.btnSave.removeClass(DISABLED);
            this.rss = this.selectRSS.prop("selectedIndex");  
            this.rssSelected = this.rsss[this.rss]        
            this.tiNameRSS.val(this.rssSelected.label);
            this.tiurlRSS.val(this.rssSelected.url);
            this.lblRSS.text(this.rssSelected.label);

        }
       

       // private isRSSEdit: boolean;
       

      //  private getMessages(): void {
          //  R.connector.getMessages((resp) => this.onMessages(resp));
        //}
       // private getRSSS(): void {
        //    R.connector.getRSSs((resp) => this.onRSSs(resp));
      //  }
        private onMessages(resp: string): void {
            var ar: string[] = JSON.parse(resp);
            this.tiText.text(ar.join("\n"));
        }
        private onEditMsg(): void {
            this.R.connector.getMessages((resp) => this.onMessages(resp));
            this.floatPanel.append(this.msgsEditor);
            this.msgsEditor.find('[data-id=btnCloseMsg]').on(CLICK,()=>{
                this.floatPanel.empty();
            });
        }

        private onEditRSS(): void {            
            this.R.connector.getRSSs((resp) => this.onRSSs(resp));
            this.rssEditor.find('[data-id=btnSaveRSS]').addClass(DISABLED);
            this.floatPanel.append(this.rssEditor);
            this.rssEditor.find('[data-id=btnCloseRss]').on(CLICK,()=>{
                this.floatPanel.empty();
            });
          //  this.view.attr(SRC, ' ');
            //////////////////////////////////////////////////////////////////////////////////////////////////////////////////
            
        }
        private onRSSs(resp:Item[]): void {
            this.rsss = resp;          
            var out: string = '';
            for (var i = 0, n = resp.length; i < n; i++) {
                out += '<option>' + resp[i].label + '</option>';
            }

            this.selectRSS.html(out);            
            this.selectRSS.prop("selectedIndex", this.rss); 
            this.showRSS();          
                      
        }
        private addDelay(num: number): void {
            this.delay += num;
            if (this.delay < 5) this.delay = 5;
            this.tiDelay.text(this.delay);           
        }

        
      
        private onSavedMessages(resp): void {
           // myMsg2('Messages Saved on server', this.msgsEditor.find('[data-id=btnSaveMsgs]:last'));
        }
        private onRsssSaved(resp): void {
          //  myMsg2('RSS data Saved', this.rssEditor.find('[data-id=btnSaveRSS]:first'));
        }
        private onSavedData(resp): void {
            var msg: string = 'Screensaver saved on server';
            if (isNaN(Number(resp))) msg = resp;
            myMsg(msg, this.btnSave);
            this.resetView();
        }
       

        private rssSelected: Item;
        private touchclip: JQuery;

        //  private messages: string[];
       // private ticker: ads.Ticker;
        private tiText: JQuery;

       // private btnEditText: JQuery;
       // private btnPreviw: JQuery;
       
        private uiDelay: JQuery;

        private rssurl: string ='SS_1920x1080.1.htm';
        private msgurl: string ='TextTicker2.htm';

      
        private haveChanges: boolean = false;

        private _data: any;
      //  private isMessaging: boolean;
        private rss: number;
        private url: string;
        private delay: number=0;
        private currentMode: string;
        private type: string;


        private rsss: Item[];
        private selectRSS: JQuery;
        private tiNameRSS: JQuery;
        private tiurlRSS: JQuery;
        private btnEditRSS: JQuery;

        private rssValues: JQuery;

        private rssEditor: JQuery;

        private btnEdit: JQuery;
        private btnSave: JQuery;
       // private btnClose:JQuery;

        private radRSS: JQuery;
        private radMes: JQuery;
        private tiDelay: JQuery;
      

        private lblRSS: JQuery;
        private lblEdit: JQuery;
        private floatPanel: JQuery;

        private screenVp: JQuery;

        private msgsEditor: JQuery;

        private getsettings(): any {
            return RegA.getInstance().settings;
        }
       // private set screensaver(ss: Screensaver) {
          //  RegA.getInstance().settings.screensaver = ss;
           // RegA.getInstance().connector.saveSetting('screensaver',ss, (resp) => this.onSavedData(resp));
        //}

        R:RegA
        constructor() {
            this.R=RegA.getInstance();
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
            this.btnSave = this.panel.find('[data-id=btnSave]');//.on(CLICK,()=>this.onSaveClick()).addClass(DISABLED);
           // this.btnClose = this.panel.find('[data-id=btnClose]');

            this.msgsEditor = $('#msgsEditor');          
            this.tiText = this.msgsEditor.find('textarea:first');
           
            this.rssEditor = $('#rssEditor')         
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

        // private onSaveClick(): void {
        //   if (this.btnSave.hasClass(DISABLED)) return;
        //  this.btnSave.addClass(DISABLED);


        // }

        private saveScreensaver(): void {
            var ss: any = this.getsettings().screensaver;
            ss.type = this.type;
            ss.delay = this.delay;
            ss.rss = this.rss;
            ss.url = this.url;
            ss.label = this.tiDelay.text();

            RegA.getInstance().connector.saveSetting('screensaver', ss, (resp) => this.onSavedData(resp));
            this.getsettings().screensaver = ss;
        }

        private resetView(): void {
            var ss: any = this.getsettings().screensaver;
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
        }

        private loadScreensaver(): void {
            this.view.attr(SRC, this.url);
        }
        private setType(): void {
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
        }
      
       
    }
    declare class Item {
        label: string;
        url: string;
    }
}