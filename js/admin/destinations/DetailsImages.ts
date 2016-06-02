/**
 * Created by VladHome on 7/2/2015.
 */
    /// <reference path="../RegA.ts" />

module uplight{
    export class DetailsImages{
        private btnAdd:JQuery;
        private btnEdit:JQuery;
        private btnDel:JQuery;
        private uploadAdd:JQuery
        private uploadEdit:JQuery
       // private uploadView:JQuery


        private title:JQuery;

        //private list1:JQuery;
        private list:JQuery;
        private preview:JQuery;

        private data:string[];
        private dataDelete:string[];
        selectedItem:string;
        selected:JQuery;

        private mode:string
        onSave:Function;
        onCancel:Function;
        onClose:Function;

        view:JQuery

        hide():void{
            this.view.hide();
            this.preview.empty();
            this.list.empty();
        }

        show():void{
            this.view.show();
        }


      //  resetData():void{
           // this.data=(this.current.imgs && this.current.imgs.length)?this.current.imgs.split(','):null;
      // }
        private current:VODestination;

        setData(vo:VODestination):void{
            this.current = vo;
            this.data =  vo.imgs.length?vo.imgs.split(','):[];
          //  this.resetData();
            this.resetButtons();

        }

        getData():string[]{
            return this.data
        }
        getDeleted():string[]{
            return this.dataDelete;
        }

        R:RegA
        constructor(view:JQuery){
            this.R=RegA.getInstance();

            this.list=view.find('[data-id=list]:first');
            this.list.on(CLICK,'a',(evt)=>this.onItemClick(evt));
            this.view = view;

           view.find('[data-id=btnCancel]:first').click(()=>{ if(this.onCancel)this.onCancel()});
            view.find('[data-id=btnClose]:first').click(()=>{
                console.log('close');
                if(this.onClose)this.onClose()}
            );
            view.find('[data-id=btnSave]:first').click(()=>{
                this.current.imgs = this.data?this.data.toString():'';
                if(this.onSave)this.onSave();
            });
;
            this.uploadAdd=  view.find('[data-id=uploadAdd]:first').change((evt)=>this.onFileSelected(evt));
            this.uploadEdit = view.find('[data-id=uploadEdit]:first').change((evt)=>this.onFileSelected(evt));

            this.btnAdd =  view.find('[data-id=btnAdd]:first').on(CLICK,()=>this.onAddClick());
            this.btnEdit =  view.find('[data-id=btnEdit]:first').on(CLICK,()=>this.onEditClick());
            this.btnDel =  view.find('[data-id=btnDel]:first').on(CLICK,()=>this.onDeleteClick());

            this.preview = view.find('[data-id=preview]:first');
            this.title=view.find('[data-id=title]:first');

        }


        private onItemClick(evt:JQueryEventObject){
            this.resetButtons();
           var el =  $(evt.currentTarget)
                var i = Number(el.data('i'));
            if(isNaN(i))return
            this.selectedItem = this.data[i];
            if(!this.selectedItem){
                this.data.splice(i,1);
                this.render();
                return;
            }
            if(this.selected)this.selected.removeClass(SELECTED);
            el.addClass(SELECTED);
            this.selected=el;
            this.preview.empty();
            this.preview.html(el.clone());
            this.mode='';
        }

        private renderItem(str:string,i:number):string{
            var img ='<img class="item"   src="'+str+'"/>';
            return '<a data-i="'+i+'" >'+img+'</li>';
        }

       render():void{
           this.title.html(this.current.name+' &nbsp;&nbsp;unit:'+this.current.unit);
           var ar = this.data
           if(!ar){
               this.list.html('');
               return;
           } ;
           var out='';
           for(var i=0,n=ar.length;i<n;i++){
               out+= this.renderItem(ar[i],i);
           }
           this.list.html(out);
       }

        resetButtons(){
            this.uploadEdit.addClass(HIDDEN);
            this.uploadAdd.addClass(HIDDEN);
        }

        private onAddClick():void{
            this.resetButtons();
            if(this.mode=='add'){
                this.mode='';
                return;
            }
            this.uploadAdd.removeClass(HIDDEN);
            this.mode='add';
            this.preview.empty();
            if(this.selected)this.selected.removeClass(SELECTED);
            this.selected=null;
            this.selectedItem=null;
        }

        private onEditClick():void{
            this.resetButtons();
            if(this.mode=='update'){
                this.mode='';
                return;
            }
            if(!this.selectedItem){
                this.mode='';
                return;
            }
            this.uploadEdit.removeClass(HIDDEN);
            this.mode='update';
        }

        private onUploadResult(res:VOResult):void{
            console.log(res);
            if(res.success){
                if( this.mode==='add'){
                    if(!this.data) this.data=[];
                    this.data.push(res.result);
                    var item= this.renderItem(res.result,this.data.length-1);
                    this.preview.empty();
                    this.preview.html(item);
                    this.list.append(item);
                    this.mode='';
                }else if( this.mode==='update'){
                    var i:number = Number(this.selected.data('i'));
                    this.data[i]=res.result;
                    this.selectedItem=this.data[i];

                    this.render();
                    var item= this.renderItem(this.selectedItem,i);
                    this.preview.empty();
                    this.preview.html(item);
                    this.mode='';
                }

            }
        }

        private onFileSelected(evt:JQueryEventObject):void{
            this.resetButtons();
            var input:any = evt.target;
            var files:FileList = input.files;
            if(files.length){
                var form:FormData = new FormData();
                form.append('file',files[0])
                this.R.connector.uploadImage(form,'details','gal_'+this.current.uid).done((res:VOResult)=>this.onUploadResult(res));
             //   this.R.connector.uploadDestinationImage(form,this.current.uid).done((res:VOResult)=>this.onUploadResult(res))

            }

        }
        private onDeleteClick():void{
            this.resetButtons();
            this.mode='';
            if(!this.selectedItem) return;
            var isDel = confirm('You want to delete selected Image from records?');
            if(isDel){
                var ind= this.data.indexOf(this.selectedItem);
                if(!this.dataDelete)this.dataDelete=[];
                this.dataDelete.push(this.data.splice(ind,1)[0]);
                this.render();
                this.preview.empty();
            }
        }


        private onFileChoosen(input:any):void{
            var files=input.files;
            if(files.length){
                var form:FormData = new FormData();
                form.append('file',files[0]);

            }
        }
    }
}