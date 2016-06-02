/// <reference path="arch/Details.ts" />
/// <reference path="mainview.ts" />
/// <reference path="banner.ts" />
/// <reference path="als/ScreenSaver.ts" />
/// <reference path="infopage.ts" />
/// <reference path="Connector.ts" />
/// <reference path="search/KeyboardSimple.ts" />
/// <reference path="search/SearchResult.ts" />
/// <reference path="search/SearchModel.ts" />
/// <reference path="als/TouchClip.ts" />
/// <reference path="als/AttractLoop.ts" />
/// <reference path="als/GalleryDisplay.ts" />
/// <reference path="search/models.ts" />
/// <reference path="../typing/greensock.d.ts" />
/// <reference path="../typing/jquery.d.ts" />


/// <reference path="arch/KeyboardView.ts" />
/// <reference path="search/SearchResult.ts" />
/// <reference path="Registry.ts" />
/// <reference path="search/models.ts" />
/// <reference path="search/Categories.ts" />
/// <reference path="Connector.ts" />
/// <reference path="search/Keywords.ts" />
/// <reference path="MainMenu.ts" />
/// <reference path="utils/Relay.ts" />
/// <reference path="utils/Timeout.ts" />
/// <reference path="views.ts" />

declare var u_settings:any;

module uplight {
   export class Kiosk {
       private R: Registry;
       private timeout:number;
       private timeoutVal:number;

      // private isAL:boolean=true;


       private onMouseDown(evt:MouseEvent):void{
         // if(this.attractLoop.hide()) window.location.href='#kiosk';

           console.log('mouse down');

            clearTimeout( this.timeout);
           this.timeout = setTimeout(()=>{
               console.log(this.R.TIMEOUT+this.timeoutVal);
               this.showSearchResult();
             this.showMenu();
              this.R.events.triggerHandler(this.R.TIMEOUT);
           }, this.timeoutVal)
           if(this.isBlocked){
               evt.preventDefault();
               evt.stopPropagation();
               evt.stopImmediatePropagation();
           }else{
               setTimeout(()=>this.unblock(),500);
               this.isBlocked = true;
           }
       }

       showSearch():void{
           $('#toolsview').animate({scrollTop:'365'});
           this.showSearchResult();
       }
       showMenu():void{
           //console.log('showMenu');
           this.R.events.triggerHandler(this.R.RESET_INPUT);
           $('#toolsview').animate({scrollTop:'0'});
       }


       showSearchResult():void{
           //console.log('showSearck');
           $('#mainport').animate({scrollLeft:0});
       }
       showPages():void{
           $('#mainport').animate({scrollLeft:725});
       }
      // onMenuClick(item:any):void{
           // this.showPages();
      // }
       errors:string='';
       error(str:string):void{
           this.errors+=str+"\n";
       }
       warns:string='';
       warn(str:string):void{
           this.warns+=str+"\n";
       }

       constructor() {

           document.addEventListener('mousedown',(evt)=>this.onMouseDown(evt),true);
           var r:Registry = Registry.getInstance();
           r.events = $('<div>');
           r.setSettings(u_settings);
           r.connector = new Connector();
           // console.log(u_settings);          // r.connector.who='kiosk';
           r.model = new Model(r.connector,(w)=>this.warn(w));

           var obj = r.getSettings('timeout');
           console.log(obj);
           var timeout:number
           if(obj) timeout=Number(obj.value);
           if(isNaN(timeout) || timeout<10)timeout= 60;

           this.timeoutVal = timeout*1000;

           this.setControllers();
           this.R=r;

           r.events.on(r.KIOSK_SHOW_SEARCH,()=>this.showSearch());


           r.events.on(r.KIOSK_SHOW_MENU,null,(evt)=>this.showMenu());
           r.events.on(r.PAGES_0,null,(evt)=>{
               this.showSearch();
               this.showMenu = function(){};

           });


           this.R.events.on(this.R.KEYBOARD_SHOW,()=>this.showSearchResult());

           this.R.events.on(this.R.PAGE_SELECED,(evt,pageid)=>{
             this.R.events.triggerHandler(this.R.KEYBOARD_HIDE);
              this.showPages();
           })

           this.R.events.on(r.CATEGORY_SELECTED,(evt,cat)=>{
               this.showSearchResult();
           })

           r.events.on(DetailsLarge.DETAILS_LARGE_CLOSE_CLICK,(evt)=>{
               r.events.triggerHandler(DetailsLarge.DETAILS_LARGE_HIDE);
           });

           r.events.on( this.R.SEARCH_RESULT_SELECT,(evt,id)=>{
               var dest:VODestination = this.R.model.getDestById(id);
               if(dest.imgs)r.events.triggerHandler(DetailsLarge.DETAILS_LARGE_SHOW,id)// this.details.setDestination(dest).render().show();
               else r.events.triggerHandler( this.R.SEARCH_RESULT_SHOW_DESTINATION,id)//this.searchResult.showDestination(dest);
               console.log(dest);
           });
            var tmr:any  = r.getProp('timer');
           if(tmr)  var relay:Relay = new Relay(tmr.value);


           //window.addEventListener("hashchange",()=>this.onHachChange(), false);
          setTimeout(()=>this.onHachChange(),1000);

       }
       setControllers():void{
           var stringToFunction = function(str) {
               var arr = str.split(".");
               var fn = (window || this);
               for (var i = 0, len = arr.length; i < len; i++) fn = fn[arr[i]];
               if (typeof fn !== "function")   fn=null;
               return  fn;
           };

           var r:Registry = Registry.getInstance();

           $('[data-ctr]').each(function(ind,el){
               var str=String($(el).data('ctr'));
               var MyClass = stringToFunction(str);
               if(MyClass) {
                   r.register(str,MyClass);
                   var cl= new MyClass(el);
               } else console.warn(' class '+str+' not loaded');

               //console.log(el);
           })
       }


       private prevHash;
       private isBlocked: boolean;

       private unblock(): void {
           this.isBlocked = false;
       }

       private onHachChange(): void {
           var h:string = document.location.hash;
           var hash: string[] = h.split('/');
           switch (hash[0]) {
               case '#page':
                   var pageid:number = Number(hash[1])
                   this.R.events.triggerHandler(InfoPagesModel.PAGE_SELECED,pageid);
                 //  this.keyboardView.hideKeyboard();
                  // var cat: VOItem = this.menu.getCategoryById(Number(hash[1]));
                  // this.maiView.showView(this.searchResult.getListByCategory(cat));
                   break;
               case '#dest':

                 //  this.dest.showDest(Number(hash[1]));
                 //  this.keyboardView.hideKeyboard();
                 //  this.maiView.showView(this.details.getDetailsById(Number(hash[1])));
                   break;
               case'#ScreenSaver':
                   window.location.reload();
                   /*
                   this.details.resetMode();
                   this.searchResult.resetMode();
                   this.keyboard.resetMode();
                   this.cateegories.resetMode();
                   this.keywords.resetMode();
                   */

                   break

           }
       }

    }


}

$(document).ready(()=>{
   var k = new uplight.Kiosk();
});