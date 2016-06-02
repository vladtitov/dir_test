/// <reference path="../admin/RegA.ts" />
module uplight {

    declare class Header {
        logo: string;
        title: string;
        weather: string;
        clock: string;
    }
    export class HeaderEditor {
        view: JQuery;
        onClose:Function;



        private save(): void {
            var header: Header = this.getsettings().header;
           // header.clock = 'Toronto';
            header.logo = this.logo.attr('src');
            header.title = this.title.text();
          //  header.weather = 'Toronto';                
            this.title.attr('contenteditable', false);  
            RegA.getInstance().connector.saveSetting('header',header, () => this._onSaved())          
        }       

        refresh(): void {
           var header: Header = this.getsettings().header;
           if(header.logo) this.logo.attr('src', header.logo);
            this.title.text(header.title);          
        }


        getPanel(): JQuery {
            if(!this.panel) this.createPanel();          
            this.btnFile.val('');
            this.btnFile.on(CHANGE, () => this.onLogoFile());
            this.btnEditHeader.removeClass(DISABLED);
            this.btnEditHeader.on(CLICK, () => this.onEditHeaderClick());
            this.btnClose.on(CLICK,()=>{
                this.refresh();
                if(this.onClose)this.onClose();
            })
            this.btnSave.on(CLICK,()=>{
                    if(this.btnSave.hasClass(DISABLED)) return;
                this.btnSave.addClass(DISABLED);
                    this.save();
                }).addClass(DISABLED);
            return this.panel;
        }

        private createPanel():void {
            this.panel = $('<div></div>');
            this.btnSave = $('<a href="javascript:void(0)" class="uplight"  title = "Save new Background" > <img src ="css/icons/save.png"  / > Save </a >').appendTo(this.panel);
            this.btnEditHeader = $('<a href="javascript:void(0)" class="uplight"  title="Edit Header"> <img src="css/icons/edit.png"  />Header text</a>').appendTo(this.panel);
            this.formFile = $('<form style="display:inline;">Upload new Logo: </form>').appendTo(this.panel);
            this.btnFile = $('<input name="file" type="file" />').appendTo(this.formFile);
            this.btnClose =  $('<a href="javascript:void(0)" class="uplight"  data-id="btnClose" title="Close"> <img src="css/icons/close.png"  /></a>').appendTo(this.panel);

        }

       // private mode: string;

        private getsettings(): any {
            return RegA.getInstance().settings;
        }

        private onEditHeaderClick(): void {
            if (this.btnEditHeader.hasClass(DISABLED)) return;
            this.btnSave.removeClass(DISABLED);
            this.btnEditHeader.addClass(DISABLED);
            setTimeout(() => { this.btnEditHeader.removeClass(DISABLED); }, 2000);

            if (this.title.attr('contenteditable')) {
                this.title.attr('contenteditable', false);
                this.title.text(this.getsettings().header.title);
            }else{
                this.title.text('Edit text here');
                setTimeout(() => {
                    this.title.attr('contenteditable', true);
                    this.title.text(this.getsettings().header.title);
                    this.title.focus();                  
                }, 2000);              
            }
        }

     
        private formFile: JQuery;
        private btnFile: JQuery;
        private btnEditHeader: JQuery;
        private title: JQuery;
        private logo: JQuery;
        private btnSave:JQuery;
        private btnClose:JQuery;
        private panel: JQuery;

       onSaved: Function;

       private _onSaved(): void {
           if (this.onSaved) this.onSaved('Header saved on server');
        }
       

       // private set header(obj: Header) {
         //   RegA.getInstance().settings.header = obj;
         ///   RegA.getInstance().connector.saveSetting('header',obj,()=>this._onSaved())
      //  }

        R:RegA
        constructor() {
            this.R=RegA.getInstance();
         //   this.R = RegA.getInstance();                      
            this.view = $('#HeaderBanner');                    
            this.title = this.view.find('[data-id=title]').text(this.getsettings().header.title);
            if (this.getsettings().header.logo && this.getsettings().header.logo.length>2)this.insertLogo();
            this.refresh();           
        }
       
        private insertLogo() {
            this.logo = $('<img />').css('margin-left', '70px').css('margin-top', '30px').appendTo(this.view);;
        }
        
        private onLogoFile(): void {
            var btn: any = this.btnFile[0];
            // console.log(btn.files);
            var files: FileList = btn.files;
            if (!files || !files.length) return;
            this.btnSave.removeClass(DISABLED);
            this.R.connector.uploadLogo(this.formFile[0], (resp) => this.onUploadLogo(resp), this.onError, this.onProgress);

        }

        private onError(res): void {

        }
        private onProgress(res): void {

        }
        private onUploadLogo(resp): void {          
            this.logo.prop(SRC,resp);          
        }
    }

}