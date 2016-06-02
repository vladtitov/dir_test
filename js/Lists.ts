/**
 * Created by VladHome on 12/30/2015.
 */
    ///<reference path='typing/jquery.d.ts' />
    ///<reference path='typing/underscore.d.ts' />
    ///<reference path='Utils.ts' />
    ///<reference path='Forms.ts' />



module uplight{
    var CLICK=CLICK || 'click';
    var SELECTED = SELECTED || 'selected';
    export class TableEditor extends DisplayObject{
        constructor($view:JQuery,options:{service:string},name?:string){
            super($view,name)
            for(var str in options) this[str] = options[str];
            this.init();
            this.onInit();
        }

        init():void{
            var $view = this.$view;
            this.conn = new Connect(this.service,this.name);
            this.$btnAdd = $view.find('[data-id=btnAdd]').click(()=>this.onAddClick());
            this.$btnEdit = $view.find(this.btn_edit_id).click(()=>this.onEditClick());
            this.$btnDelete = $view.find('[data-id=btnDelete]').click(()=>this.onDeleteClick());
            this.$btnClose = $view.find('[data-id=btnClose]').click(()=>this.onCloseClick());
            this.$list = $view.find(this.list_id).on(CLICK,'tr',(evt)=>this.onListClick(evt));
            this.$header = $view.find(this.header_id);
            this.$num_records = $view.find(this.num_records_id);
           // this.$deleteView = $view.find(this.delete_view_id);
           // this.$deleteView.find('[data-id=btnSave]').click(()=>this.onDeleteConfirmed())
            //this.$deleteView.find(this.btn_close_id).click(()=>this.hideDelete());
            if(this.auto_start) this.loadData();
        }
        onInit():void{

        }
        insertEditor: ModalForm;
        updateEditor: ModalForm;
        deleteEditor: ModalForm;
        conn:Connect;
        $btnAdd:JQuery;
        $btnEdit:JQuery;
        btn_edit_id:string='[data-id=btnEdit]';
        $btnDelete:JQuery;
        $btnSave:JQuery;
        $btnClose:JQuery;
        $list:JQuery;
        $header:JQuery;
        data:any[];
        selectedItem:any;
        selectedIndex:number;
        $selected:JQuery;
        onSelect:Function;
        btn_close_id:string='[data-id=btnClose]';
        service:string='service';
        getall:string='get_all';
        getone:string='get_one';
        delete:string='delete';
        update:string='update';
        insert:string='insert';
        header_id:string='[data-id=thead]';
        list_id:string='[data-id=tbody]';
        num_records_id:string='[data-id=num_records]';
        $num_records:JQuery;
        edit_view_id='[data-id=edit-view]';
        $deleteView:JQuery;
        delete_view_id='[data-id=DeleteItem]';
        insertTitle:string;
        updateTitle:string;
        deleteTitle:string;
        auto_start:boolean = true;

        onData(s:any):void {
            // console.log(s);
            if(typeof s =='string'){
                try {
                    var res:any[] = s;
                }catch (e){
                    console.log(e);
                    return;
                }
            }else res= s

            this.data = res;
            this.render();
        }


        renderHeader(header:string){
            this.$header.html(header);
        }

        renderItem(item:any, i:number){
            return '<tr data-i="'+i+'"><td><small>'+item.id+'</small></td><td>'+item.name+'</td><td>'+item.description+'</td></tr>';
        }

        onRendered():void{

        }
        render():void{
            var ar = this.data;
            var out:string='';
            for(var i=0,n=ar.length;i<n;i++) out+= this.renderItem(ar[i],i);
            this.$list.html(out);
            this.$num_records.text(n);
            this.onRendered();
        }

        onListClick(evt:JQueryEventObject):void{
            var $el:JQuery = $(evt.currentTarget);
            var i:number = Number($el.data('i'));
            console.log(i);
            if(isNaN(i))return;
            this.deselect();
            this.$selected = $el.addClass(SELECTED);
            this.selectedItem = this.data[i];
            this.selectedIndex = $el.index();
            if(this.onSelect)this.onSelect(this.selectedItem);
        }
        destroy():void{
            this.onSelect = null;
            this.data= null;
        }
        deselect():void{
            if(this.$selected){
                this.$selected.removeClass(SELECTED);
                this.selectedItem=null;
            }
        }

        onAdd():void{
            if(!this.insertEditor) {
                this.insertEditor = new ModalForm(this.$view.find('[data-id=AddItem]:first'),this.service+'.insert','AddItem');
                this.insertEditor.init();
                this.insertEditor.onComplete = ()=>{
                    this.insertEditor.hide();
                    this.loadData();
                }
            }

            if(this.insertTitle) this.insertEditor.setTitle(this.insertTitle);
            else this.insertEditor.setTitle('New record');
            this.insertEditor.clear();
            this.insertEditor.show();

        }
        private onAddClick():void{
            this.deselect();
            this.selectedItem =null;
            this.selectedIndex =-1;
            this.onAdd();
        }
        onEdit(item:any):void{
            if(!this.updateEditor) {
                this.updateEditor = new ModalForm(this.$view.find('[data-id=AddItem]:first'),this.service+'.update','EditItem');
                this.updateEditor.init();
                this.updateEditor.onComplete = ()=>{
                    this.updateEditor.hide();
                    this.loadData();
                }
            }
            if(this.updateTitle) this.updateEditor.setTitle(this.updateTitle);
            else this.updateEditor.setTitle('Update record');
            this.updateEditor.setData(this.selectedItem);
            this.updateEditor.show();
        }
        showEdit():void{
            if(!this.selectedItem) return;
            this.onEdit(this.selectedItem);
            //this.editItem.setItem(this.selectedItem);
            // this.editItem.$view.show();
        }
        onEditClick():void{
            this.showEdit();
        }
        onEditCloseClick():void{
            if(this.selectedIndex==-1)this.selectedItem=null;
            this.hideEditView();
        }
        hideEditView():void{
            //this.editItem.$view.hide();
        }

        hideDelete():void{
            this.$deleteView.hide();
        }
        onDeleteShow():void{

        }
        showDelete():void{
            if(!this.selectedItem) return;
            var name :string = this.selectedItem.name || '';
            this.$deleteView.find('[data-id=message]').html('You want to delete '+name+'?');
            this.$deleteView.show();
        }
        onDeleteClick():void{
            if(!this.deleteEditor){
                this.deleteEditor = new ModalForm(this.$view.find('[data-id=DeleteItem]:first'),this.service+'.delete','DeleteItem');
                this.deleteEditor.init();
                this.deleteEditor.onComplete = ()=>{
                    this.deleteEditor.hide();
                    this.loadData();
                }
            }
            console.log(this.deleteEditor.$view);
            this.deleteEditor.setData(this.selectedItem);
            this.deleteEditor.show();
        }
        onDeleteConfirmed():void{
            console.log('delete confirmed');

            this.$deleteView.hide();
            this.deleteRecord();
            this.deselect();
            this.selectedIndex=-1;
        }
        onSaveResult(s:string):void{
            var res:VOResult = JSON.parse(s);
            if(res.success=='inserted'){
                var id:number= Number(res.result);
                // this.editItem.setItem({index:index});
                Utils.message('New record inserted', this.$btnSave)

            }else if(res.success=='updated'){

            }
        }
        saveRecord(item:any):void{
           // $.post(this.service+'?a='+this.service_id+'.'+this.update,item).done((s)=>this.onSaveResult(s));
        }
        onDeleteResult(s:string):void{
            this.loadData();
        }
        deleteRecord():void{
           // $.get(this.service+'?a='+this.service_id+'.'+this.delete+'&id='+this.selectedItem.id).done((s)=>this.onDeleteResult(s));

        }
        onSaveClick():void{
            // var item:any = this.editItem.getElement();
            // console.log(item);
            //this.saveRecord(item);
        }
        onCloseClick():void{

        }

        loadData():void{
            this.conn.get(this.getall).done((s)=>this.onData(s));

        }


    }

}