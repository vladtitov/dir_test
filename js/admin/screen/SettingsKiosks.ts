/**
 * Created by VladHome on 7/20/2015.
 */
    ///<reference path="../RegA"/>
module uplight{
    export class TimeEditor implements Editor{

        btnSave:JQuery
        selTime:JQuery
        lblInfo:JQuery;
        onSelected:Function;
        onSave:Function
        current:any;

        constructor(private view:JQuery){
            this.init();
        }

        setData(item:any):Editor{
            this.current = item;
            return this;
        }

        hide():void{
            this.view.hide();
        }

        show():void{
            this.view.show()
        }

        render():Editor{
            this.lblInfo.text(this.current.label);
            this.selTime.val(this.current.value);
            return this;
        }

        init(){
            this.lblInfo = this.view.find('[data-id=lblInfo]:first');
            this.btnSave = this.view.find('[data-id=btnSave]').click(()=>{
                this.btnSave.prop('disabled',true);
                setTimeout(()=>{this.btnSave.prop('disabled',false)},3000);
                if(this.onSave) this.onSave(this.current);
            })

            this.view.find('[data-id=btnClose]').click(()=>{
                this.hide()
                this.current= null;
            })

            this.selTime = this.view.find('[data-id=selTime]');
            var out=''
            var ampm='AM';
            var m=-1;
            for(var i=0;i<24;i++){
                var h=i;
                if(h==0){
                    h=12;
                }
                if(i>11) ampm='PM';
                if(h>12){
                    h=h-12;

                }
                // out+='<option>'+((h<10)?'&nbsp;&nbsp;':'')+h+':00 '+ampm+'</option>';
                // out+='<option>'+((h<10)?'&nbsp;&nbsp;':'')+h+':30 '+ampm+'</option>';
                out+='<option>'+h+':00 '+ampm+'</option>';
                out+='<option>'+h+':30 '+ampm+'</option>';
            }

            this.selTime.html(out).on(CHANGE,()=>{
                this.current.value= this.selTime.val();
            })

        }

    }

 export  interface Editor{
        onSave:Function;
        btnSave:JQuery
        setData(item:any):Editor
        render():Editor;
        show():void
        hide():void;
    }


    export class ValueEditor implements Editor{
        current:any;
        tiValue:JQuery;
        lblInfo:JQuery;
        btnSave:JQuery
        onSave:Function;
        show():void{
            this.view.show();
            console.log(this.view);
        }

        render():Editor {
            var item:VOItem = this.current
            if(!item) return this;
            this.tiValue.val(item.value);
            this.lblInfo.text(item.label);

            return this;
        }
        hide():void{
            this.view.hide();

        }

        setData(item:any):Editor{
            this.current = item;
            return this;
        }

        constructor(private view:JQuery){


            this.view.find('[data-id=btnClose]').click(()=>{

                this.hide()
                this.current= null;
            })

            this.btnSave = this.view.find('[data-id=btnSave]').click(() => {
                this.btnSave.prop('disabled',true);
                setTimeout(()=>{this.btnSave.prop('disabled',false)},3000);
                this.current.value= this.tiValue.val();
                if(this.onSave)this.onSave(this.current);
            });
            this.tiValue = this.view.find('[data-id=tiValue]');
            this.lblInfo = this.view.find('[data-id=lblInfo]')

        }
    }

    export class SettingsKiosks{
        view:JQuery
        R:RegA;
        list:JQuery;
        editor:Editor;
        data:any;
        props:any[];
        timeEditor:TimeEditor;
        valueEditor:ValueEditor;
        selectedIndex:number;
        dataid:string='settings_kiosks';

       // data:VOItem[];


        constructor(private container:JQuery){
           // console.log('SettingsEdit');
                container.load('htms/admin/SettingsEdit.htm',()=>{setTimeout(()=>{this.init()},50)});
                this.R = RegA.getInstance();
        }

        init(){
            this.view = $('#SettingsEdit');
            var table=$('<table>').addClass('table').appendTo(this.view.find('[data-id=list]:first'));
            //this.list = $('<tbody>').on(CLICK, 'tr .fa-edit', (evt) => this.onEditClick(evt)).appendTo(table);
            this.list = $('<tbody>').on(CLICK, '[data-id=btnEdit]', (evt) => this.onEditClick(evt)).appendTo(table);
            this.refreshData();
        }

        private onEditClick(evt:JQueryEventObject):void{
                var el:JQuery=$(evt.currentTarget).parent().parent();
            var i:number = Number(el.data('i'));
            if(isNaN(i)) return;
            this.selectedIndex = i;
            this.openEditor();
        }

        private openEditor():void{
            var item= this.props[this.selectedIndex];
            switch(item.type){
                case 'time':
                    if(!this.timeEditor) this.timeEditor = new TimeEditor(this.view.find('[data-ctr=TimeEditor]:first'));
                  this.editor =  this.timeEditor;
                    break;
                default :
                    if(!this.valueEditor) this.valueEditor = new ValueEditor(this.view.find('[data-ctr=ValueEditor]:first'));
                    this.editor = this.valueEditor;
                    break;
            }

            console.log(this.editor);
            this.editor.setData(item).render().show();
            this.editor.onSave = (item)=>{
                this.props[this.selectedIndex] = item;
                this.save();
            }

            //this.lblIndex.text(this.selectedItem.label);


            this.editor.show();
        }

        private hideEditor():void{
            this.editor.hide();
        }

        private refreshData():void{
            this.R.connector.getData(this.dataid).done((res:string)=>{
                this.data = JSON.parse(res);
                this.props = this.data.props;
                this.render();
            })
        }

        private renderItem(item:VOItem,i):string{
            var img=0;
            return '<tr  data-id="'+item.id+'" data-i="'+i+'" class="'+item.type+'" ><td class="index">'+item.label+'</td><td class="value">'+item.value+'</td><td><span data-id="btnEdit" class=" btn fa fa-edit"></span></td></tr>';
        }

        private render():void{
           var ar = this.props;
            var out='';
            for(var i=0,n=ar.length;i<n;i++){
                out+= this.renderItem(ar[i],i);
            }
           // console.log(out);
            this.list.html(out);

        }

        private save():void{
            this.data.props=this.props;
            this.R.connector.saveData( JSON.stringify(this.data),this.dataid).done((res)=>{
                //console.log(res);
                if(res.success){
                    this.R.msg('Data saved',this.editor.btnSave);
                }
             this.refreshData();
           })

        }
    }
}
