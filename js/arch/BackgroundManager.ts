/// <reference path="../admin/RegA.ts" />
module uplight{
    export class BackgroundManager {       
        view: JQuery;
        onClose:Function;

        getPanel(): JQuery {
            this.btnSave.addClass(DISABLED);
            this.btnSave.on(CLICK,()=>this.onSaveClicked());
            this.btnClose.on(CLICK,()=>this.onCloseClicked());
            return this.panel;//.on(CLICK, 'a', (evt) => this.onPanelClicked(evt));
        }


        private alertSave(): void { 
            this.getsettings().main.background = this.strBg;

            this.hiliteCurrent();        
            RegA.getInstance().connector.saveSetting('main',this.getsettings().main, (data) => this.onSaveBackground(data));
        }
         private onCloseClicked():void{
             console.log('close bg panel ');
             this.bgImage.prop(SRC, this.getsettings().main.background);

            if(this.onClose) this.onClose();
         }
        private onSaveClicked(): void {
            if (this.btnSave.hasClass(DISABLED)) return;           
             showAlert('You want to save current image as new background?', () => this.alertSave(), 'Alert');
        }

    
        private onImageSelect(evt: JQueryEventObject): void {
            if (!$(evt.target).is('img')) return;           
            if (this.selectedImage) this.selectedImage.parent().removeClass(SELECTED);
            this.selectedImage = $(evt.target);
            this.btnDel.removeClass(DISABLED);
            
            var src: string = this.selectedImage.attr(SRC);
            this.selectedImage.parent().addClass(SELECTED);

            if (src != this.getsettings().main.background) {
                this.btnDel.removeClass(DISABLED);
                this.btnSave.removeClass(DISABLED);
            }
            else {
                this.btnDel.addClass(DISABLED);
                this.btnSave.addClass(DISABLED);
            }
            this.strBg = src;
            this.bgImage.prop(SRC, src);           
            //this.imgPreview.attr(SRC,src );  
            //this.imgBg.attr('src', $(evt.target).attr(SRC));                   
        }
    
        private files: FileList;
        private selectedImage: JQuery;    
        //private currentBackgorund: string;
        private list: JQuery;      
        private btnAdd: JQuery;
        private btnDel: JQuery;
        private toolsBg: JQuery;
        private strBg:string;

        private btnFile: JQuery;
        
        private isUpload: boolean= false;
        private formFile: JQuery;
        private progress: JQuery;
        private bgImage: JQuery;
        private btnSave: JQuery;
        private panel: JQuery;
       private btnClose:JQuery;
        private getsettings(): any {
            return RegA.getInstance().settings;
        }

        R:RegA
        constructor(container:JQuery) {
            container.load('js/admin/labels/labelsManager.htm',()=>{this.init()});
            this.R = RegA.getInstance();

        }
            init(){
            this.bgImage = $('#bgImage');
            this.view = $('#backgroundLibrary').hide();           
            this.list = $('#imageLibraryHolder');          
            this.btnDel = this.view.find('[data-id=btnDel]').on(CLICK, () => this.onDelClick());;            
            this.btnAdd = this.view.find('[data-id=btnAdd]').on(CLICK, () => this.onAddClick());;


            this.panel = $('<div></div>');
            this.btnSave = $('<a href="javascript:void(0)" class="uplight"  title = "Save new Background" > <img src ="css/icons/save.png"  / > Save </a >').appendTo(this.panel);
            this.btnClose =  $('<a href="javascript:void(0)" class="uplight"  data-id="btnClose" title="Close"> <img src="css/icons/close.png"  /></a>').appendTo(this.panel);
                                 
            this.list.on(CLICK, 'img', (evt) => this.onImageSelect(evt));                 
            this.refreshLibrary();                      
            this.resetScreen(); 
        }

        private onFileChange(): void {
            var btn:any = this.btnFile[0];
           // console.log(btn.files);
            var files: FileList = btn.files;
            if (!files || !files.length) return;                      
            RegA.getInstance().connector.uploadBackgroundLibrary(this.formFile[0], (evt) => this.completeHandler(evt), (evt) => this.errorHandler(evt), (evt) => this.progressHandlingFunction(evt));
             
        }
        private onAddClick(): void {
            this.resetScreen();
           
            if (!this.formFile) {
                this.formFile = $('<form></form>');
                this.btnFile = $('<input name="file" type="file" />').on('change', () => this.onFileChange()).appendTo(this.formFile);;
                this.formFile.appendTo(this.view.find('[data-id=menu1]'));
            }
            else {
                this.formFile.remove();
                this.formFile = null;
            }
           
           // this.btnFile.prop(DISABLED, false);
          //  this.imgPreview.prop(SRC, '');
        }

        private resetScreen(): void {
            this.btnDel.addClass(DISABLED); 
            this.strBg = this.getsettings().main.background
            this.bgImage.attr(SRC, this.strBg);         
        }


        //////////////////////////////Delete////////////////////////////
        private onDelClick(): void {
            if (this.btnDel.hasClass(DISABLED)) return;
            if (this.selectedImage) {
                showAlert('You want to delete selected image from library? ', () => this.deleteSelected(), 'Alert');
            }
        }
        private onImageDeleted(data): void {
           // this.imgPreview.attr(SRC, '');            
            this.refreshLibrary();
        }
        private deleteSelected(): void {
            var url: string = $(this.selectedImage).attr('src');
            RegA.getInstance().connector.deleteImage(url, (data) => this.onImageDeleted(data));
        }

        ///////////////////////////////////////
       // private showCurrent(): void {
           // if (this.btnShowCurrent.hasClass(DISABLED)) return;  
          //  if (this.selectedImage) this.selectedImage.parent().removeClass(SELECTED);          
           // this.imgPreview.attr(SRC, this.currentBackgorund);
          //  this.resetButtons();
       // }
        private refreshLibrary(): void {
            this.R.connector.getBackgroundLibrary((data) => this.onAllBackgrounds(data));
        }
        private progressHandlingFunction(evt): void {           
            if (evt.lengthComputable) {
               // this.progress.attr({ value: evt.loaded, max: evt.total });
            }
        }


       
        private completeHandler(evt): void {
            this.formFile.remove();
            this.formFile = null;
           // setTimeout( () =>this.resetButtons() , 500);
            this.list.prepend('<img src="' + evt + '" />');
           // this.imgPreview.attr(SRC, evt);     
            this.list.scrollTop(0);
            //this.btnSave.removeClass(DISABLED);            
        }
        private errorHandler(evt): void {
            alert('EEERRRROORRRR uploading file ');
            this.resetScreen();             
        }
       // private unhiliteCurrent(): void {
           // var str: string = '[src="' + this.currentBackgorund + '"]';
          //  this.list.children('li>img').removeClass('current');
       // }
        private hiliteCurrent(): void {
            this.list.find('*').removeClass('current');
            var str: string = '[src="' + this.getsettings().main.background + '"]';
            this.list.find(str).addClass('current');
        }
       
        private onAllBackgrounds(data: string): void {           
            var ar: string[] = data.split(',');
            var out: string = '';
            for (var i = 0, n = ar.length; i < n;i++) {
                out += '<li class="uplight"><img title="Click on image to select" src="'+ar[i]+'"/></li>';
            }           
            this.list.html(out);
            this.hiliteCurrent();
        }
       
       // private onBackground(data: string): void {
           
        //}

      
        private onSaveBackground(resp): void {
            var msg: string = 'Background Saved';  
            if (isNaN(Number(resp))) msg = resp;
            myMsg(msg, this.btnSave);           
        }
      
       // private getCurrentBackground(): void {
          //  R.connector.getBackground((data) => this.onBackground(data));  
       // }
       
    }
}



