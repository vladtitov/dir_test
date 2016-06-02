/// <reference path="../admin/RegA.ts" />

module admin {
    export class ONOFFScreen {       

            onClose:Function ;

        private onSaved(resp): void {
            var msg: string = 'Schedule saved on server';
            if (isNaN(Number(resp))) msg = resp;
            myMsg(msg, this.btnSave);
        }

        getPanel(): JQuery {
            this.panel.on(CHANGE, 'select', (evt) => this.onSelectChanged(evt));
           this.panel.on(CLICK, 'a', (evt) => this.onMenuClick(evt));

          this.reset()
            return this.panel;
        }


        private setValues():void{
            var sett:any = this.getsettings();
            var start:number = sett.start;

            var stop:number = sett.stop;

        }
        private getsettings() {
            return RegA.getInstance().settings;
        }

       
        private panel: JQuery

        private _dataMenu: VOCategory[];
        private _dataDest: VODestination[];

        private R: RegA;

        private themeUrl: JQuery;
        private btnSave: JQuery;
        private btnClose: JQuery;
        private menuItems: VOCategory[]
        private destItems: VODestination[]

        private select1:JQuery;
        private select2:JQuery;
        private select3:JQuery;
        private select4:JQuery;

        constructor() {
            this.R = RegA.getInstance();
            this.panel = $('<div></div>');
            this.btnSave = $('<a href="javascript:void(0)" class="uplight"  data-id="btnSave" title="Save changes on server"> <img src="css/icons/save.png"  />Save</a> ').appendTo(this.panel);

            this.drawMenu();
            this.panel.append('Screen ON:');
            this.panel.append(this.select1);
            this.panel.append(':');
            this.panel.append(this.select2);
            this.panel.append(' &nbsp;&nbsp;OFF:');
            this.panel.append(this.select3);
            this.panel.append(':');
            this.panel.append(this.select4);

            this.btnClose = $('<a href="javascript:void(0)" class="uplight"  data-id="btnClose" title="Close"> <img src="css/icons/close.png"  /></a>').appendTo(this.panel);

        }

        private onMenuClick(evt:JQueryEventObject):void{
            var str:string = $(evt.currentTarget).data('id');
            switch(str){
                case 'btnSave':

                    this.onSaveClicked();
                    break;
                case 'btnClose':
                    if(this.onClose)this.onClose();
                    break;
            }
        }
        private onSaveClicked(): void {
            if (this.btnSave.hasClass(DISABLED)) return;
            this.btnSave.addClass(DISABLED);
            var stop: number  = this.select1.prop('selectedIndex')*60 +(this.select2.prop('selectedIndex')*10);
            var start: number =  this.select3.prop('selectedIndex')*60 +(this.select4.prop('selectedIndex')*10);
            var blank = { start: start, stop: stop };
            this.getsettings().blank=blank;
           
            R.connector.saveSetting('blank', blank, (resp) => this.onSaved(resp));
        }

        private reset(): void {
            this.btnSave.addClass(DISABLED);
           var sett:any= this.getsettings().blank;
            console.log(sett);
            var start:number= sett.start;
            var stop:number=sett.stop;

            var h:number = Math.floor(stop/60);
            var m:number = (stop-(h*60))/10;
            console.log(h,m);
            this.select1.prop('selectedIndex',h);
            this.select2.prop('selectedIndex',m);
            var h:number = Math.floor(start/60);
            var m:number = (start-(h*60))/10;
            console.log(h,m);
            this.select3.prop('selectedIndex',h);
            this.select4.prop('selectedIndex',m);

        }


        private drawMenu(): void {
            var ar: string[] = ['12 AM', '&nbsp;1 AM', '&nbsp;2 AM', '&nbsp;3 AM', '&nbsp;4 AM', '&nbsp;5 AM', '&nbsp;6 AM', '&nbsp;7 AM', '&nbsp;8 AM', '&nbsp;9 AM', '10 AM', '11 AM',
                                '12 PM', '&nbsp;1 PM', '&nbsp;2 PM', '&nbsp;3 PM', '&nbsp;4 PM', '&nbsp;5 PM', '&nbsp;6 PM', '&nbsp;7 PM', '&nbsp;8 PM', '&nbsp;9 PM', '10 PM', '11 PM'];

            this.select1=$('<select></select>');
            this.select2=$('<select></select>');
            this.select3=$('<select></select>');
            this.select4=$('<select></select>');

            var out: string = ' ';
            for (var i = 0,n=ar.length; i < n; i ++) {
                out += '<option>' + ar[i] + '</option>';
            }
            this.select1.html(out);
            this.select3.html(out);
            out = ' ';
            for (var i = 0; i < 60; i+=10) {
                if(i<10)out += '<option>0' + i + '</option>';
                else out += '<option>' + i + '</option>';
            }

            this.select2.html(out);
            this.select4.html(out);



        }


       
        private loadTheme(theme): void {
           
        }
        private onSelectChanged(evt: JQueryEventObject): void {
            this.btnSave.removeClass(DISABLED);
              
        }
       
    }

  }
   

