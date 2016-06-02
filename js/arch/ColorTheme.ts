/// <reference path="../admin/RegA.ts" />
module uplight {
    export class ColorTheme {      
        onClose:Function
          //  if (!this.btnSave.hasClass(DISABLED)) this.loadTheme(this.getsettings().main.color);
       // }
              

        private onColorSaved(resp): void {
            var msg: string = 'Color saved on server';
            if (isNaN(Number(resp))) msg = resp;
            myMsg(msg, this.btnSave);
        }
       
        getPanel(): JQuery {
            if(!this.panel)this.createPanel();
            this.panel.on(CLICK, 'a', (evt) => this.onColorClicked(evt));
            return this.panel;
        }

        private getsettings() {
            return RegA.getInstance().settings;
        }
        
        private color: string;
        private panel: JQuery
     
        private _dataMenu: VOCategory[];
        private _dataDest: VODestination[];

        private R: RegA;

        private themeUrl: JQuery;
        private btnSave: JQuery;
        private btnClose:JQuery;
        private menuItems:VOCategory[]
        private destItems:VODestination[]

        constructor() {

            console.log('ColorTheme');

            this.R = RegA.getInstance();

           // R.connector.getAllPages((resp) => this.onAllPages(resp));
            this.themeUrl = $('#Theme');
            this.reset();
           // this.themeUrl.attr('href', 'css/' + R.settings.main.color + '.css');

            this.drawDests();
            this.drawMenu();
        }

        private createPanel():void{

            this.panel = $('<div></div>');
            this.btnSave = $('<a href="javascript:void(0)" class="uplight"  title="Save changes on server"> <img src="css/icons/save.png"  />Save</a> ').on(CLICK,()=>this.onSaveClicked()).appendTo(this.panel);
            var str: string ='' ;
            for (var i = 0; i < 8; i++) str += '&nbsp;<a data-id="theme'+i+'" href="javascript:void(0)"  class="u-brand' + i + '">&nbsp;A&nbsp;</a>&nbsp;';
            this.panel.append(str);
            this.btnClose =  $('<a href="javascript:void(0)" class="uplight"  data-id="btnClose" title="Close"> <img src="css/icons/close.png"  /></a>').appendTo(this.panel);
        }
        private onSaveClicked(): void {
            if (this.btnSave.hasClass(DISABLED)) return;
            this.btnSave.addClass(DISABLED);
            var sett: any = this.getsettings().main;
            sett.color = this.color;
           this.R.connector.saveSetting('main',sett, (resp) => this.onColorSaved(resp));
        }
        
       private reset():void{
           this.themeUrl.attr('href', 'css/' + this.R.settings.main.color + '.css');
       }

       // private drawHeader(color: string): void {
           // var target: JQuery = $('#Header');
           // target.removeClass();
            //target.addClass(color);
        //}

        private drawMenu(): void {
            var ar:string[]= ['Menu item 1','Menu item 2','Menu item 3','Menu item 4','Menu item 5'];
            var out: string = '';
            for (var i = 0, n = ar.length; i < n; i++) {
                out += '<li class="u-brand">' + ar[i] + '</li>';
            }
            $('#listManu').html(out);
        }


        private drawDests(): void {
            var ar: string[] = ['Company  1','Company  2','Company  3','Company  4','Company  5','Company  6','Company  7','Company  8'];
            var out: string = '';
            for (var i = 0, n = ar.length; i < n; i++) {
                out += '<li class="u-brand"><span class="left">' + ar[i] + '</span><span class="right">'+(100+1)+'</span></li>';
            }
            $('#listDestinations').html(out);
        }
        private loadTheme(theme): void {
            this.themeUrl.attr('href', 'css/' + theme + '.css');   
        }
        private onColorClicked(evt: JQueryEventObject): void {           
            var theme: string = $(evt.currentTarget).data().id;
            if(theme=='btnClose'){
                if(this.onClose) this.onClose();
                this.reset();
                return;
            }
            if (!theme) return;
            this.loadTheme(theme);
            this.color = theme;
            this.btnSave.removeClass(DISABLED);
           // if (this.onChange) this.onChange(theme);
           // }          
        }
       /*
        private onAllPages(res): void {

            var ar = R.modelCats.getAllCategories();

            if (res) ar = ar.concat(res.result);
            console.log('Menu arr ',ar);

            this._dataMenu = ar;
            this._dataDest = R.vo.getData();

            this.drawDests();
            this.drawMenu();
           
          
        }
*/
    }



}