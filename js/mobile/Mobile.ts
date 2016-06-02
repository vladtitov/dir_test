/// <reference path="infopage.ts" />
/// <reference path="../kiosk/search/models.ts" />

/// <reference path="filterpage.ts" />
/// <reference path="mainview.ts" />
/// <reference path="FrontPage.ts" />
/// <reference path="Utils.ts" />
/// <reference path="GoogleMap.ts" />
/// <reference path="menu.ts" />
/// <reference path="../view/Views.ts" />
/// <reference path="../kiosk/registry.ts" />
/// <reference path="../kiosk/utils/Relay.ts" />
/// <reference path="../kiosk/search/DetailsLarge.ts" />


var CLICK: string = 'mousedown';
var TAP: string = 'tap';
var TAPHOLD: string = 'taphold';
var SWIPE: string = 'swipe';
var SWIPELEFT: string = 'swipeleft';
var SWIPERIGTH: string = 'swiperight';
var HIDE:string='hide';
var SHOW:string='show';
var OPEN:string='open';
var DETAILS:string='details'

declare var u_settings: any;
declare var u_pages:any[];

module uplight {

    export class Mobile {

        errors:string='';
        error(str:string):void{
            this.errors+=str+"\n";
        }
        warns:string='';
        warn(str:string):void{
            this.warns+=str+"\n";
        }

        private infoPages: InfoPageMobile[];
       // private detailsLarge: DetailsLarge;
        private filterPage: FilterPage;
        private frontPage:FrontPage;
        private gmap:GoogleMap;

        private R: uplight.Registry;
        private menu: Menu;

        private transition:Transition;

       // private mainView: MainView;



        constructor() {
            this.R = uplight.Registry.getInstance();
            this.R.setSettings(u_settings);
           var conn:uplight.Connector = new uplight.Connector();

            var rel:Relay = new Relay(5,2);

            this.R.connector = conn;
           // this.R.connector.getSettings((data) => this.onSettings(data));      
            this.R.model = new Model(conn,(w)=>this.warn(w));
           // console.log('Mobile controller');
                                
            this.menu = new Menu($('[data-ctr=Menu]:first'),conn,this.R.model);
            this.menu.onMenuON =()=>{
                this.menu.hideSearch();
            };
            this.menu.onSearchFocus=()=>{
                window.location.href='#SearchDirectories';
            };
            this.menu.onSearchON=()=>{
                this.menu.hideMenu();
            };

            this.menu.onSearchType=(str:string)=>{
                this.filterPage.showPattern(str);
            };
            this.menu.onSearchClose=(str:string)=>{
                this.filterPage.showDefault();
            };


          //  this.searchResult = new SearchResult('#Results');


            this.content=$('#Content');
            if(this.R.getSettings('preview')) this.content.addClass('preview');

            this.transition = new Transition(this.content);
            this.frontPage = new FrontPage($('#FrontPage'));
            this.currentView =this.frontPage.getView();


            $(window).on('hashchange', (evt) => this.onHachChange());
            this.filterPage = new FilterPage($('[data-ctr=FilterPage]'));
            setTimeout(()=>this.onHachChange(),1000);
           // this.content = $('#Content');

        }



/*
        private onListSelect(vo:VODestination):void{
           // console.log(vo);
            if(vo.imgs) window.location.hash='#destination/'+vo.id;
            else{
                //var table='';
               // if(vo.more && vo.more.length)table=this.detailsLarge.createTable(vo.more);
               // this.filterPage.addDetails(vo,table);
            }
        }
*/


        private content:JQuery
        private showView2(newV:JQuery):void{
            var w:number = this.content.width();
            this.content.width(w);
            this.content.css('overflow','hidden');
            var old:JQuery = this.content.children();
            old.width(w).css('float','left');
            newV.width(w).css('float','left');
            var slider:JQuery=$('<div>').width(w*2+30).append(old).append(newV).appendTo(this.content);
            this.content.animate({scrollLeft:w},()=>{
                old.detach();
                newV.appendTo(this.content);
                newV.css('width','auto');
                slider.detach();

            })
        }

        private onHachChange(): void { 
            var ar: string[] = document.location.hash.split('/');
            var hash:string = document.location.hash;
            console.log(ar[0]);
          Utils.hideImage();

            switch (ar[0]) {
                case '#gmap':
                    if(!this.gmap) this.gmap = new GoogleMap(this.content);
                    this.showView(this.gmap.getView());
                    this.menu.hideAll();
                    this.R.connector.Stat('pg','gmap');
                    break;
                case '#destination':
                    var vo:VODestination =  this.R.model.getDestById(Number(ar[1]));
                    if(!vo) break;
                    this.R.connector.Stat('sr',vo.id+'');
                    break;
                case '#category':
                   var v:JQuery =  this.filterPage.showCategory(Number(ar[1]));
                    this.showView(v);
                    this.menu.hideAll();
                    this.R.connector.Stat('ct',ar[1]);
                    break;
                case '#page':
                    var num:number = Number(ar[1]);
                    if(isNaN(num)) break
                   this.showPage(num);
                    this.menu.hideAll();
                    this.R.connector.Stat('pg',num+'');
                    break;
                case '#SearchDirectories':
                    this.filterPage.showDefault();
                    this.showView(this.filterPage.getView());
                    this.menu.hideMenu();
                    this.menu.showSearch();
                    break;
                case '#Menu':
                    this.menu.showMenu();
                    break;
                case '#MenuClose':
                    this.menu.hideMenu();
                    break;
                case '#logo':
                    this.showView(this.frontPage.getView());
                    break;
                default:
                    this.menu.showMenu();

                   this.showView(this.frontPage.getView());
                    break;
            }

        }

        private cache:any={};
        private showPage(id:number):void{
            var ar = u_pages;
            for(var i=0,n=ar.length;i<n;i++)  if( ar[i].id==id)  this.transition.showView(ar[i].url);
        }

        private currentView:JQuery
        private showView(view:JQuery):void{
            if(this.currentView ==view) return;
            this.currentView = view;
            this.transition.showView(view);

        }
       
    }
}



$(document).ready(function () {
    var app: uplight.Mobile= new uplight.Mobile();

     });


