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


declare var u_admin:any;

module uplight {
    export class Admin {
        private R: RegA;
        private listing:DestinationsController;
        private categories:CategoriesManager;
        private categoryListing:CategoryListing;
        private importExport:ImportExport;
       // private restartKiosks:DevicesStats;
        private labels:LabelsManager;
        private settingsKiosks:SettingsKiosks;
        private statistics:Statistics;
        private attractLoop:AttractLoopEdit;
        private infoPages:InfoPagesManager;
        private frontPageEditor:FrontPageEditor;
        private navigatiom:Navigation;


        private menu:AdminMenu;
        private newindow:Window;
        private preview:JQuery;
        private content:JQuery;

       createPop() {
        this.newindow = window.open('Preview.php','Kiosk Preview','width=560,height=980,toolbar=0,menubar=0,location=0,status=0,left=200,top=200');
        if (window.focus) {this.newindow.focus()}
        }

        closePopup(){
            this.newindow.close();
        }


        private onHashChange(){
            var hash:string= window.location.hash;
            if(!hash) return;
            var ar:string[] = hash.split('/');
            console.log(hash);
         //  if(hash!=='#PreviewKi') this.hidePreview();
            this.hideKiosk();
            this.hideModile();
            var ctr:string = ar[0].substr(0,10);
                switch (ctr){
                    case '#KiosksLis':
                        if(this.R.current)this.R.current.destroy();
                        this.content.empty();
                        this.R.current = new KiosksManager(this.content);
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

                        if(this.R.current)this.R.current.destroy();
                        // this.content.hide();
                        this.attractLoop = new AttractLoopEdit(this.content);
                        this.content.show();
                        // this.restartKiosks.restart();

                        break;

                    case '#Statistic':
                        // this.showPreview();
                        if(this.R.current)this.R.current.destroy();
                       // this.content.hide();
                        this.statistics = new Statistics(this.content);
                        this.content.show();
                        // this.restartKiosks.restart();

                        break;
                    case '#Info-Page':
                        // this.showPreview();
                        if(this.R.current)this.R.current.destroy();
                        // this.content.hide();
                        this.infoPages = new InfoPagesManager(this.content);
                        this.content.show();
                        // this.restartKiosks.restart();

                        break;
                    case '#Front-Pag':
                        if(this.R.current)this.R.current.destroy();
                       this.frontPageEditor = new FrontPageEditor(this.content);

                           this.frontPageEditor.appendTo(this.content);


                        this.content.show();
                        // this.restartKiosks.restart();

                        break;
                    case '#Listing-V':
                        if(this.R.current)this.R.current.destroy();
                        this.listing = new DestinationsController(this.content);
                        this.content.show();
                        break;
                    case '#Categorie':
                    case '#Edit-Cate':
                        if(this.R.current)this.R.current.destroy();
                        this.categories = new CategoriesManager(this.content);
                        this.content.show();
                        break
                    case '#Category-':
                        if(this.R.current)this.R.current.destroy();
                        this.categoryListing = new CategoryListing(this.content);
                        this.content.show();
                        break;
                    case '#Import-Ex':
                        if(this.R.current)this.R.current.destroy();
                        this.importExport = new ImportExport(this.content);
                        break;
                    case '#Settings-':
                        if(this.R.current)this.R.current.destroy();
                        this.settingsKiosks = new SettingsKiosks(this.content);
                        this.content.show();
                        break;
                    case '#Heading-S':
                    case '#Backgroun':
                    case '#Logo-Imag':
                        if(this.R.current)this.R.current.destroy();
                        this.labels = new LabelsManager(this.content);
                        this.content.show();
                        break;
                    case '#GoogleMap':
                        if(this.R.current)this.R.current.destroy();
                        this.R.current = new GmapCtr(this.content);
                        this.content.show();
                        break;
                    case '#AdminsMan':
                        this.content.trigger('DESTROY');
                        this.content.empty();
                        if(this.R.current)this.R.current.destroy();
                        var admins = new AdminsManage(this.content);
                        this.content.show();

                        break;
                    default :

                        break

                }
        }

        isPreview:boolean;
        btnFullView:JQuery;
        message:JQuery;
        messageText:JQuery;


        private init(): void {
            this.navigatiom = new Navigation($('#AdminNav'));
            this.R.confirm = new Confirm($('#Confirm'));
            this.R.model = new DestinantionsModel();
            this.R.model.dispatcher.on(this.R.model.CHANGE,()=>{
                this.R.model.dispatcher.off(this.R.model.CHANGE);
                this.onHashChange();
            });
            $(window).on('hashchange', (evt) => this.onHashChange());
          //  this.menu = new AdminMenu($('#Navigation'));

            this.preview=$('#Preview');
            this.isPreview=true;

            this.content=$('#content');
            this.message =$('<div>').attr('id','Message');
            this.messageText = $('<div>').appendTo(this.message);
            this.btnFullView = this.preview.find('[data-id=btnFullView]').click(()=>{window.open(this. previewUrl, "_blank");})

            $('#btnRestartKiosks').click(()=>{
               this.R.confirm.show('Restart Kiosks','You want to restart kiosks?',()=>{
                  this.R.connector.restartKiosks().done((res:VOResult)=>{
                      console.log(res);
                      if(res.success=='success'){
                          this.R.msg('Restarting kiosks',$('#btnRestartKiosks'));
                      }else this.R.msg('Server Error',$('#btnRestartKiosks'));

                  }).fail(()=>{ alert('Communication error')});
               })
            })

            if(window.location.hash=='') window.location.hash='#Statistic';

            this.initThemes();
        }

        private logout():void{
            $.get('rem/login.php?a=logout').done((r)=>{
                var res:VOResult = JSON.parse(r);
                if(res.success=='logout')window.location.href = res.result;
               else  window.location.reload();
                console.log(res);
                });
        }
        constructor() {
            //  $.ajaxSetup({ cache: false });
            this.R = RegA.getInstance();
            this.R.admin = u_admin;
            this.R.dispatcher=$({});
            this.R.connector = new Connector();



          this.R.connector.getData('settings.json').done((resp) => {

              this.R.setSettings(JSON.parse(resp));
               // this.R.props =
                this.init();
                //this.R.vo.events.on(this.R.vo.READY,()=>this.test());
            });

            var btnLogout =  $('#btnLogout').click(()=>{
                if( btnLogout.hasClass('disabled')) return;
                this.logout();
                btnLogout.addClass('disabled');
                setTimeout(()=>{
                    btnLogout.removeClass('disabled');
                },3000);

            });
            this.R.msg=(text,cont)=>this.myMsg(text,cont);



         // this.R.events.on(RegA.SHOW_PREVIEW,(evt,data)=>this.showPreview(data));
         // this.R.events.on(RegA.HIDE_PREVIEW,function(){$('#preview').hide();});
         // this.R.events.on(RegA.VIEW_LISTING,()=>{
             // $('#content').empty();
                //if(!this.details) this.details = new DetailsEditor($('#content'));


          //});



          //  var close =$('<a>').addClass('fa fa-times btn-close').attr('href','#preview-close').appendTo($('#preview'));//.on(CLICK,function(){$('#preview').hide();})


        }


        myMsg(text:string,DO:JQuery){

           var msg =  $('<div>').addClass('umsg').css(DO.offset()).text(text).appendTo('body');
            msg.hide();
            msg.show('fast');
                   setTimeout(function(){
                        msg.hide('fast',function(){
                            msg.remove();
                        })
                        },3000);
        }


        /*            Preview
                   *
                    * */


        saveTheme():void{
            var css:string =  $('#ThemeSelector').val();
            this.R.saveSettings('theme',css);
        }

        private isEditColor:boolean;
        initThemes():void{

            $('#AdminPreviewKiosk [data-id=btnEditColor]:first').click(()=>{
                if(this.isEditColor){
                    this.isEditColor = false;
                    $('#AdminPreviewKiosk [data-id=editColorTools]:first').hide();
                }else{
                    this.isEditColor = true;
                    $('#ThemeSelector').val(-1);
                    $('#AdminPreviewKiosk [data-id=editColorTools]:first').removeClass('hide').show();
                }
            });

            var themes:any[] = u_admin.themes;
            var ar = themes;
            var out='';
            for(var i=0,n=ar.length;i<n;i++){
                out+='<option value="'+ar[i].css+'">'+ ar[i].label+'</option>';
            }
            $('#ThemeSelector').html(out).change(()=>{
                this.loadTheme($('#ThemeSelector').val());
            })

            $('#AdminPreviewKiosk [data-id=btnSave]:first').click(()=>{
                    this.R.saveSettings('theme',this.theme).done((res:VOResult)=>{
                        if(res.success){
                            this.R.msg('Thema saved',$('#AdminPreviewKiosk [data-id=btnSave]:first'));
                        }
                    });
            });
        }

        private loadTheme(css:string):void{
            this.theme = css;
            $('#AdminPreviewKiosk iframe:first').attr('src',this.previewUrl+'&theme='+this.theme);
        }

        private theme:string='';
        private previewUrl1080:string ='Kiosk1080.php?';
        private previewUrl:string;
        private previewUrl1920:string ='Kiosk1920.php?';
        private mobileUrl:string ='KioskMobile.php?preview=true';

        private showKiosk(width:string):void{
            if(width == '1920'){
                this.previewUrl = this.previewUrl1920;
                $('#Preview').addClass('k1920');
            }else{
                $('#Preview').removeClass('k1920');
                this.previewUrl = this.previewUrl1080;
            }
            $('#AdminPreviewKiosk').removeClass(HIDDEN);
            $('#AdminPreviewKiosk iframe:first').attr('src',this.previewUrl);
            this.isPreview=true;
        }

        private hideKiosk():void{
            if(this.isPreview){
                $('#AdminPreviewKiosk').addClass(HIDDEN);
                $('#AdminPreviewKiosk iframe:first').attr('src','');
                this.isPreview=false;
            }
        }

        /*         Mobile  preview     */

        isMobile:boolean;
        private showMobile(url?:string):void{
            this.isMobile = true;
            $('#AdminPreviewMobile').removeClass(HIDDEN);
            $('#AdminPreviewMobile iframe').attr('src',this.mobileUrl);
        }
        private hideModile():void{
            if( this.isMobile){
                $('#AdminPreviewMobile').addClass(HIDDEN);
                $('#AdminPreviewMobile iframe').attr('src','');
                this.isMobile = false;
            }
        }


    }

}
