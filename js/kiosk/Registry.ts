/// <reference path="../typing/jquery.d.ts" />
/// <reference path="Connector.ts" />
/// <reference path="search/models.ts" />
/// <reference path="InfoPage.ts" />



declare  var u_settings:any;
var CLICK: string = 'click';
var CLOSE: string = 'close';
var SHOW: string = 'show';
var HIDE: string = 'hide';
var HIDDEN:string = 'hidden';
var SELECTED: string = 'selected';
var DISABLED: string = 'disabled';
var OPEN:string='open';


module uplight {

    export interface Module{
        destroy():void
    }
    export class VOProps{
        id:number;
        label:string;
        value:string;
        type:string;
    }


    export class Registry {

        KIOSK_SHOW_MENU:string='KIOSK_SHOW_MENU';
        KIOSK_SHOW_SEARCH:string='KIOSK_SHOW_SEARCH';

        CATEGORIES_CHANGE:string='CATEGORIES_CHANGE';
        CATEGORY_SELECTED:string='CATEGORY_SELECTED';

        PAGE_SELECED:string ='PAGE_SELECED';
        PAGES_0:string='PAGES_0';

        KEYWORD_PRESSED:string='KEYWORD_PRESSED';
        KEYBOARD_SHOW:string='KEYBOARD_SHOW';
        KEYBOARD_HIDE:string='KEYBOARD_HIDE';


        INPUT_CHANGED:string='INPUT_CHANGED';
        RESET_INPUT:string='RESET_INPUT';

        KEY_PRESSED:string='KEY_PRESSED';

        SEARCH_RESULT_SELECT:string='SEARCH_RESULT_SELECT';
        SEARCH_RESULT_SHOW_DESTINATION:string='SEARCH_RESULT_SHOW_DESTINATION';

        ON_SETTINGS:string='ON_SETTINGS';
        ON_DATA:string='ON_DATA';
        TIMEOUT:string='TIMEOUT';

        SCREENSAVER_START: string = 'SCREENSAVER_START';
        SCREENSAVER_END: string = 'SCREENSAVER_END';
        AL_START:string = 'AL_START';
        AL_STOP:string = 'AL_STOP';
        AL_STOPED:string = 'AL_STOPED';

        RESET_VIEWS:string='RESET_VIEWS';
        HIDE_VIEWS:string='HIDE_VIEWS';
       private settings: any;
       private props:any;//_.Dictionary<VOProps>;
        static status:string;

        current:string;

        isServer: boolean;

        events: JQuery;
        connector:Connector;
        model:Model;
        pages:InfoPagesModel;

        private _registr:any={};
        register(name:string,cl:any):void{
                this._registr[name]=cl;
        }

        getClass(name:string):any{
            return this._registr[name];
        }

        errors:string='';
        error(str:string):void{
            this.errors+=str+"\n";
        }
        warns:string='';
        warn(str:string):void{
            this.warns+=str+"\n";
        }
        public device: {} = { device: 'kiosk1', ln: 'en' };

        private setProps(data:any[]):void{
            this.props = _.indexBy(data,'id');
        }
        getProp(str:string):any{
            return this.props[str];
        }
        setSettings(data:any):void{
            this.settings=data;
            if(data.props)this.setProps(data.props);
            this.events.triggerHandler(this.ON_SETTINGS,data);
        }
        getSettings(index:string):any{
            return this.settings[index];
        }

        constructor(){
            this.events=$('<div>');
            this.settings = u_settings;
        }

        private static _instance: Registry = new Registry();

        public static getInstance(): Registry {
            return Registry._instance;
        }


    }

    export class VOGeo{
        id:number;
        lat:number;
        lng:number;
        zoom:number;
        constructor(obj:any){for(var str in obj )this[str] = obj[str];}
    }




}