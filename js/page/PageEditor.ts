/// <reference path="PagesList.ts" />
/// <reference path="../admin/RegA.ts" />


module page{
    export class PageEditor {
        view: JQuery;
       // savePageInfo(): void {


          //  R.connector.savePageInfo(nicEditors.findEditor('Editor1').getContent(), this.list.selectedItem.id, (res) => this.onSave(res));
       //}

        reset(): void {
           this.btnEdit.addClass(DISABLED);
            this.btnSave.addClass(DISABLED);
            this.btnCopy.addClass(DISABLED);
            this.btnPaste.addClass(DISABLED);
            this.chkEnabled.attr(DISABLED,true);
            if (this.isEdit) nicEditors.findEditor(this.contId.substr(1)).setContent('');
            else this.txtContent.html('');
            this.header.text('');
            this.myNicPanel.hide();
            this.txtContent.attr('contenteditable', false);

        }


        private list: PagesList;
        private editor: nicEditor;
       // private pageName: JQuery;
       // private enabled: JQuery;
        private currentPage: VOPage;

        private btnSave: JQuery;
        private btnEdit: JQuery;
        private chkEnabled:JQuery;


        private txtContent: JQuery;
        private myNicPanel: JQuery;
        private isEdit: boolean= false;

        //  private tiName: JQuery;

        // private chkEnable: JQuery;

        private header: JQuery;
        private tiNewPage:JQuery
        private R:RegA;

        private pageId:JQuery;

        private contId:string;

        private fileInput:HTMLElement
        private selectedImage:JQuery

        private btnCopy:JQuery;
        private btnPaste:JQuery;

        constructor(){
            this.R = RegA.getInstance();
            var id:string='#PageEditor';
            this.view = $(id);
            this.btnSave = $(id+' [data-id=btnSave]').on(CLICK, () => this.onSaveClicked());
            this.btnEdit = $(id+' [data-id=btnEdit]').on(CLICK, () => this.onEditClicked());
            this.chkEnabled=$(id+' [data-id=chkEnabled]');
            this.pageId=$('<span></span>').css('font-size','xx-small').prependTo(this.btnSave.parent());
            this.fileInput= document.getElementById('replaceImage');
            this.fileInput.onchange = (evt)=>this.onFileSelected(evt);


            this.btnCopy= $(id+' [data-id=btnCopy]').on(CLICK, () => this.onCopyClicked());
            this.btnPaste= $(id+' [data-id=btnPaste]').on(CLICK, () => this.onPasteClicked());


               // $('#replaceImage').change((evt)=>this.onFileSelected(evt));
           // this.btnClone =$(id+' [data-id=btnClone]').on(CLICK,()=>this.onCloneClick());
           // this.txtTitle = this.view.find('[data-id=title]');
            this.contId='#PageContent';

           this.txtContent = $(this.contId).on(CLICK,'img',(evt)=>this.onImageClicked(evt));
            this.editor = new nicEditor({ fullPanel: true });
            this.editor.setPanel('myNicPanel');

            this.editor.addInstance(this.contId.substr(1));
            this.header = $(id+' h2:first');
           // this.chkEnable = $('#chkEnable').on(CLICK,()=>this.onCheckEnableClick());
           // this.tiName = this.view.find('[data-id=tiName]').on(CHANGE, () => this.onTiChange());

            this.myNicPanel = $('#myNicPanel');
            this.list = new PagesList();

            setTimeout(()=>this.list.loadData(), 100);
            this.list.onChange = (page) => this.onListChange(page);
            this.reset();
            $('#Theme').attr('href', 'css/' + R.settings.main.color + '.css');


        }
        private buffer:string;
        private onPasteClicked():void{
            if(this.btnPaste.hasClass(DISABLED)) return
            if(this.buffer && this.txtContent.attr('contenteditable')=='true') this.txtContent.html(this.buffer);
        }
        private onCopyClicked():void{
            if(this.btnCopy.hasClass(DISABLED)) return
            this.buffer =  this.txtContent.html();
            this.btnPaste.removeClass(DISABLED);
        }

        private onFileSelected(evt):void{
         // console.log(evt.target.files);
            var files:FileList = evt.target.files

         //   console.log('files ',files);
         var file:File = files[0];
          //  console.log('file ',file);
            if (!file || !file.type.match(/image.*/)) {
                this.selectedImage=null;
                console.log('no selected image');
                return;
            }
            var fd = new FormData(<HTMLFormElement>evt.target.parentElement);
          //  console.log(fd);
            var xhr = new XMLHttpRequest();
            xhr.open("POST",'rem/services/uploadImage.php?id=p'+this.currentPage.id);
            xhr.onload = (evt:any) => {
                if (this.selectedImage) this.selectedImage.attr('src', evt.target.responseText);
            }
            xhr.send(fd);
        }



        private onImageClicked(evt:JQueryEventObject):void{

            if(!this.isEdit) return;

            var el:JQuery=$(evt.currentTarget);
            if(!el.is('img')) return;
            this.selectedImage=el;
            $('#replaceImage').trigger(CLICK);
        }

        private onSaveClicked(): void {
            this.currentPage.old_id=0;
            if (this.btnSave.hasClass(DISABLED)) return;
            this.btnSave.addClass(DISABLED);
            this.currentPage.label=this.header.text();
            this.currentPage.enable=this.chkEnabled.prop(CHECKED)?1:2;
            this.currentPage.content=this.txtContent.html();
            R.connector.updatePage(this.currentPage,(resp)=>this.onPageUpdated(resp));

        }

        private onPageUpdated(resp):void{

            this.list.updateSelected(this.currentPage);
            R.connector.savePageInfo(this.currentPage, (res) => this.onSave(res));
        }
        private onSave(resp): void {
            myMsg('Content Saved', this.btnSave);           
           // setTimeout(() => { this.list.selectLast();}, 500);
            this.isEdit = false;
            this.switchMode();
            

        }
        /*
        private onUpdatePage(resp): void {
          //  var r: any = JSON.parse(resp);
            if (this.currentPage.id == 0) this.currentPage.id = Number(resp.result);
           // console.log(this.currentPage.id);
            R.connector.savePageInfo(this.txtContent.html(), this.currentPage.id, (res) => this.onSave(res));
        }
*/
        private onEditClicked(): void {
            if (this.btnEdit.hasClass(DISABLED)) return;
            this.isEdit = !this.isEdit;
            this.switchMode();
        }
        private switchMode(): void {
            if (this.isEdit) {               
                this.btnSave.removeClass(DISABLED);
               this.chkEnabled.attr(DISABLED,false);
                this.header.attr('contenteditable', true);
                this.myNicPanel.show();
                this.txtContent.attr('contenteditable', true);
               // this.txtContent.addClass('editable');
                this.txtContent.addClass('edit-class');
                //this.tiName.prop(DISABLED, false);
               // this.chkEnable.prop(DISABLED, false);

            } else {
                this.myNicPanel.hide();
                this.txtContent.attr('contenteditable', false);
                this.header.attr('contenteditable', false);
              //  this.txtContent.removeClass('editable');
                this.txtContent.removeClass('edit-class');
               // this.editor.removeInstance('Editor1');               
                this.btnSave.addClass(DISABLED);
               this.chkEnabled.attr(DISABLED,true);
               // this.tiName.prop(DISABLED, true);
               // this.chkEnable.prop(DISABLED,true);
            }
        }
        
       
        private onDelete(): void {
           // this.pageName.val('');
           // this.onSaveConfirmed();
        }

        private onPageInfo(resp): void {
            if (this.isEdit) nicEditors.findEditor(this.contId.substr(1)).setContent(resp);
            else this.txtContent.html(resp);
        }

        private onListChange(vo: VOPage): void {
            this.currentPage = vo;
            if (!this.currentPage || this.currentPage.id==0) {
                this.reset();
                return;
            }


          //  console.log(this.currentPage);
            var enbl:number=Number(this.currentPage.enable);
            this.btnCopy.removeClass(DISABLED);
            if(enbl){
                this.btnEdit.removeClass(DISABLED);
               this.chkEnabled.prop(CHECKED,(enbl==1));
            } else {
                this.btnEdit.addClass(DISABLED);
                this.chkEnabled.prop(CHECKED,false);

            }

            if (this.isEdit) {
                this.isEdit = false;
                this.switchMode();
            }
            this.header.text(this.currentPage.label);
            this.pageId.text(this.currentPage.id);
            R.connector.getPageInfo((evt) => this.onPageInfo(evt), vo.id);
            if(vo.old_id){
                this.isEdit=true;
                this.switchMode();
                this.header.focus();
            }
        }
      

    }
}

var nicEditors: any;
var pageEditor: page.PageEditor = new page.PageEditor();