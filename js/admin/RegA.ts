///<reference path="DirsAdmin.ts" />

declare class nicEditor {
    setPanel(id: string);
    addInstance(id: string);
    setContent(htm: string);
    getContent(): string;
    instanceById(str:string): nicEditor;
    constructor(options?: {});
}


/*
var LISTVIEW: string = 'ListView';
var DETAILSVIEV: string = 'DetailsView';
var MENUVIEW: string = 'MenuView';
var VPCONTENT: string = 'VpContent';
var SHOW_LISTVIEW: string = 'Show_ListView';
var SHOW_DETAILSVIEW: string = 'Show_DetailsView';
var SHOW_PAGE: string = 'Show_Page';
var SHOW_KEYBOARD: string = 'Show_Keyboard';
var HIDE_KEYBOARD: string = 'Hide_Keyboard';
var TYPING: string = 'typing';

var HASH_CHANGE:string='hash_change';

var CONTENTEDITABLE:string='contenteditable';

var IMG: string = 'img';
var SRC: string = 'src';
var ALERT: string = 'myAlert';

var ALERT_YES: string = 'alert_yes';
var ALERT_NO: string = 'alert_no';




var REMOVE: string = 'remove';
var SHOW: string = 'show';
var HIDE: string = 'hide';
var CLOSE:string='close';
var CREATE:string='create';

//var trace = function (data) { console.log(data); }

var onAlertYes: Function;
var myAlert: JQuery;
var myAlertTitle: JQuery;
var myAlertMsg: JQuery;
*/

var CHANGE: string = 'change';
var CHECKED: string = 'checked';
var DISABLED: string = 'disabled';
var SELECTED: string = 'selected';
var MOUSE_OVER:string='mouseover';
var MOUSE_OUT:string='mouseout';
var CLICK: string = 'click';
var HIDDEN:string='hidden';

module uplight{
    export interface UModule{
        destroy():void
        getName():string;
        appendTo(cont:JQuery):UModule
        detach():void

    }
    export class RegA {
        static SHOW_PREVIEW:string='SHOW_PREVIEW';
        static HIDE_PREVIEW:string='HIDE_PREVIEW';
        static RESTART_KIOSKS:string='RESTART_KIOSKS';
        static VIEW_LISTING:string='VIEW_LISTING';
        static HASH_CHANGED:string='HASH_CHANGED';
        static SHOW_MENU:string='SHOW_MENU';
        static ITEM_SELECTED:string='ITEM_SELECTED';

        ATTRACTLOOP_EDIT:string='ATTRACTLOOP_EDIT';


        CATEGORY_SELECTED:string='CATEGORY_SELECTED';
        CATEGORY_NOTINLIS_CLOSE='CATEGORY_NOTINLIS_CLOSE';
        CATEGORY_ADD_SELECTED:string ='CATEGORY_ADD_SELECTED';
        CATEGORY_REMOVE_SELECTED:string='CATEGORY_REMOVE_SELECTED';
        CATEGORY_REST:string='CATEGORY_REST';

        router = {
            'menu preview kiosk':RegA.SHOW_PREVIEW,
            'menu restart kiosks':RegA.RESTART_KIOSKS,
            'preview close':RegA.HIDE_PREVIEW,
            'view listing':RegA.VIEW_LISTING,
            'show-menu':RegA.SHOW_MENU
        }

        history:string[];
        current:UModule;
        confirm:Confirm;
        isBusy:boolean;
        wait():void{
            this.isBusy = true;
            document.body.style.cursor='wait';
        }
        resetBusy(){
            console.log('resetBusy');
            if(this.isBusy){
                this.isBusy = false;
                document.body.style.cursor='default';
            }

        }


        register(obj: any): void {
            this[obj.id]=obj
        }

        getObject(id: string): any {
            return this[id];
        }

        msg(message:string,container:JQuery){

       }
        message(msg:string):void{

        }

        getProps(index:string):any{
            return this.props[index];
        }

        setSettings(sett:any):void{
            this.settings=sett;
            this.props = _.indexBy(sett.props,'id');
        }
        getSettings(index:string):any{
            return this.settings[index];
        }

        saveSettings(index:string,obj:any):JQueryPromise<VOResult>{
            this.settings[index]=obj;
            return this.connector.saveData(JSON.stringify(this.settings),'settings_kiosks');
        }

        isSuper:boolean = false;
        model: DestinantionsModel;
        connector: Connector;
        dispatcher:JQuery
        settings: any;
        props:any;
        admin:any;
        device: {} = { device: 'admin', ln: 'en' };
        private static _instance: RegA = new RegA();
        public static getInstance(): RegA {
            return RegA._instance;
        }
    }


    export class VOTrack{
        constructor(obj:any){for(var str in obj ) this[str] = obj[str];}
        stamp:number;
        now:number;
        ping:number;
        timer:number;
        start:number;
        a:string;
        id:string;
        s_time:number;
        ip:string;
    }

    export class VODevice{
        constructor(obj:any){for(var str in obj ) this[str] = obj[str];}
        id:number;
        name:string;
        status:string;
        template:string;
        typeid:number;
        type:string;
        tymer:number;
        maxdelay:number;
    }

    export class VOPage {
        label: string='';
        enable: number;
        sort: number;
        id: number;
        content:string;
        old_id:number;
    }

    export class VOCategory {
        constructor(obj:any){ for(var str in obj) this[str]=obj[str];}
        id: number;
        sort: number;
        label: string;
        icon: string;
        enable: number;
        type:number;
        dests:number[];
        color:string;
    }
    export  class VOResult{
        result:any;
        success:string;
        error:string;
        message:string;
    }
    export class VOItem {
        constructor(obj:any){ for(var str in obj) this[str]=obj[str];}
        id: string;
        value: string;
        label: string;
        type:string;
    }

    export class VOAttractLoop {
        constructor(obj:any){ for(var str in obj) this[str]=obj[str];}
        id: number;
        name: string;
        data_url:string;
        delay:number;
        size:string;
        type:string;
        url:string;
        comb:number[];
    }

    export class VOStat{
        type:string;
        val:string;
    }
    export class VOGallery{
        id:number;
        urls:string;
        typeid:number;
        constructor(obj:any){ for(var str in obj) this[str]=obj[str];}
    }

    export class DataGallery{
        gallery:string[];
        props:ALProps;
        template:VOAttractLoop;

    }

    export interface Preview{
        type:string;
        i:number;
        getData():any
        setData(data:any) :void
        render():void;
        appendTo(container:JQuery):void;
        saveData(data:any):JQueryPromise<VOResult>;
    }

    export  interface ALEditor{
        onSave:Function;
        onClose:Function;
        btnSave:JQuery
        setData(data:any):void
        getData():any;
        render():void;
        appendTo(container:JQuery):JQuery;
        destroy():void;
    }
    export class ALProps{
        id:number;
        templateid:number;
        url:string;
        delay:number;
    }
    export class AttractLoop{
        id:number;
        TC:boolean;
        type:string;
        props:ALProps[];
        constructor(obj:any){ for(var str in obj) this[str]=obj[str];}
    }

}
