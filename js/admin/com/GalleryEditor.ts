/**
 * Created by VladHome on 8/16/2015.
 */
    /// <reference path="../RegA.ts" />

module uplight{

 export  class GalleryEditor implements ALEditor{
     constructor(){
         this.R=RegA.getInstance();
         this.init();

     }
     init():void{
         this.view=$('#Template [data-ctr=GalleryEditor]:first').clone();
         this.btnAdd = this.view.find('[data-id=btnAdd]:first');
         this.btnEdit = this.view.find('[data-id=btnEdit]:first');
         this.btnDelete = this.view.find('[data-id=btnDelete]:first');
         this.viewUploadAdd = this.view.find('[data-id=viewUploadAdd]:first');
         this.btnUplaodAdd = this.view.find('[data-id=btnUploadAdd]:first');
         this.viewUploadEdit = this.view.find('[data-id=viewUploadEdit]:first');
         this.btnUploadEdit = this.view.find('[data-id=btnUploadEdit]:first');
         this.btnClose = this.view.find('[data-id=btnClose]');


         //this.preview = this.view.find('[data-id=preview]:first');

         this.tiDelay = this.view.find('[data-id=delay]');
         this.$size = this.view.find('[data-id=size]');
         this.$title = this.view.find('[data-id=title]');
         this.btnSave = this.view.find('[data-id=btnSave]');
         this.name=this.view.find('[data-id=name]:first');
         //this.preview.width(dem[0]).height(dem[1]);

         this.list=$('<ul>').addClass('list');
         this.listView = this.view.find('.nano:first').append(this.list);
     }
     addListeners():void{
         this.btnAdd.click(()=>this.onAddClick());
         this.btnEdit.click(()=>this.onEditClick());
         this.btnDelete.click(()=>this.onDeleteClick());
         this.btnUplaodAdd.change((evt)=>this.onFileSelected(evt))
         this.btnUploadEdit.change((evt)=>this.onFileSelected(evt))
         this.list.on(CLICK,'li',(evt)=>this.selectImage(evt));
         this.btnClose.click(()=>this.onCloseClick());
         this.btnSave.click(()=>this.onSaveClick());
     }
     destroy():void{
         this.R=null;

     }

         private $title:JQuery;
         private data:DataGallery;
         private $size:JQuery;
         private template:VOAttractLoop;
         private R:RegA;
         onClose:Function;
         onSave:Function;
         private listView:JQuery
         private isEditor:boolean;
         private gallery:string[];



        viewUploadAdd:JQuery;
        viewUploadEdit:JQuery;

         private list:JQuery;
     //private preview:JQuery;
        btnAdd:JQuery;
        btnEdit:JQuery
        btnDelete:JQuery;
        btnUplaodAdd:JQuery;
        btnUploadEdit:JQuery;
        btnSave:JQuery;
        btnClose:JQuery;
        view:JQuery;
        name:JQuery;
        tiDelay:JQuery;


     appendTo(container:JQuery):JQuery{
         this.view.appendTo(container);
         this.addListeners();
         return this.view;
     }

     setData(data:DataGallery):void{
         this.data = data;
         this.gallery = data.gallery.slice();
     }

     getData():DataGallery{
         var num:number = Number(this.tiDelay.val());
         if(isNaN(num)  || num<5) num= this.data.template.delay;
         this.data.props.delay = num;
         this.data.gallery = this.gallery;
         return this.data;
     }

     hide():void{

     }


     onSaveClick():void{
         if(this.R.isBusy) return;
         if(this.btnSave.hasClass(DISABLED)) return;
         if(this.onSave)this.onSave(this.getData());
     }




        resetMode():void{
            if(this.mode==1)  this.viewUploadAdd.addClass(HIDDEN);
            if(this.mode==2)  this.viewUploadEdit.addClass(HIDDEN);
            this.mode=0;

        }
        render():void{
            this.selected=null;

            this.$size.text(this.data.template.size);
            this.tiDelay.val(this.data.props.delay);
            this.$title.text(this.data.template.name);
            var out='';
            var ar = this.gallery;
            for(var i=0,n=ar.length;i<n;i++){
                out+= this.renderItem(ar[i],i);
            }

            this.list.html(out);
            this.checkSize();
        }

        renderItem(item,i:number):string{
            return '<li data-i="'+i+'"><img src="'+item+'" /></li>';
        }

     private checkSize():void{
         var size:string =  this.data.template.size;
         var ar:string[] =size.split('x');
         var W:number = Number(ar[0]);
         var H:number = Number(ar[1]);
         var O:number=0;
         if(W/H>1.2)O=1;
         else if(W/H<0.8)O = 2;
         this.list.children().children('img').each((ind,img:HTMLImageElement)=>{
             var w:number = img.naturalWidth;
             var h:number = img.naturalHeight;
             var isWarn:boolean=false;
             if(Math.abs(W-w)>W/10) isWarn= true;
             else if(Math.abs(H-h)>h/10) isWarn = true;
            if(isWarn){
                $(img).addClass('atten');
                $(img).attr('title','Demention is not correct '+w+'x'+ h+' where '+size +' reqired');
            }

         })
     }


        private onUploadResult(res:VOResult):void{
            this.R.resetBusy();
            if(res.success) {
                if (this.selected) {
                    var i:number = Number(this.selected.data('i'));
                    if(isNaN(i)){
                        this.R.connector.error('GalleryEditor.onUploadResult i is not a number ')
                        console.log('ERROR i is not a number');
                        return;
                    }
                    this.gallery[i] = res.result;
                } else  this.gallery.push(res.result);

                this.render();
            }else {
                this.R.connector.error('Error uplad file GalleryEditor '+JSON.stringify(res))
                alert('error upload file')
            }

        }




        private onFileSelected(evt:JQueryEventObject):void{
           var input:any = evt.target
            var files:FileList = input.files;
            if(files.length){
                var form:FormData = new FormData();
                var file:File = files[0];
                form.append('file',file);
                if(files[0].size<2000000){
                   this.R.wait();
                    this.R.connector.uploadImage(form,'al',('al_size_'+this.data.template.size)).done((res:VOResult)=>this.onUploadResult(res));
                }
                else alert('File should be less then 2 Megabite');
            }
            this.resetMode();

        }
        private mode:number
        private onAddClick():void{
            if(this.R.isBusy) return;
            if(this.viewUploadAdd.hasClass(HIDDEN)){
                this.resetMode();
                this.mode=1;
                this.viewUploadAdd.removeClass(HIDDEN);
                this.resetSelected();
            }else this.resetMode();

        }

        private onEditClick():void{
            if(this.R.isBusy) return;
            if(this.viewUploadEdit.hasClass(HIDDEN)){
                this.resetMode();
                if(!this.selected) return;
                this.mode=2;
                this.viewUploadEdit.removeClass(HIDDEN);
            }
            else this.resetMode();

        }


        private onDeleteClick():void{
            if(this.R.isBusy) return;
            this.resetMode();
            if(!this.selected) return;
            var i:number = Number(this.selected.data('i'));
            if(isNaN(i)) return;
            if(confirm('You want to remove selected image from list?')){
                this.gallery.splice(i,1);
                this.selected=null;
                this.render();
            }

        }


        private selected:JQuery
        private resetSelected():void{
            if(this.selected) this.selected.removeClass(SELECTED);
            this.selected=null;
        }

        private selectImage(evt:JQueryEventObject):void{
            this.resetMode();
            this.resetSelected();
            var $el = $(evt.currentTarget);
            var i:number = Number($el.data('i'));
            if(isNaN(i)) return;
            $el.addClass(SELECTED);
            this.selected=$el;
        }


     private onCloseClick():void{
         if(this.onClose)this.onClose();
     }



    }




}