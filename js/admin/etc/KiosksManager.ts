/**
 * Created by VladHome on 11/23/2015.
 */

    /// <reference path="../RegA.ts" />
    /// <reference path="../../typing/jquery.d.ts" />
    /// <reference path="../../typing/underscore.d.ts" />

module uplight{

    export class VOTemplate{
        id:number;
        url:string;
        descr:string;
        type:string;
    }
    export class VOKiosks{
        timer:number;
        maxdelay:number;
        templates:VOTemplate[];
        constructor(obj:any){  for (var str in obj) this[str] = obj[str];  }
    }

    export class KiosksManager implements UModule{

        constructor(container:JQuery){
            this.$view= $('<div>').appendTo(container).load('htms/admin/KiosksManager.htm',()=>this.init());
            this.kiosks = new VOKiosks(RegA.getInstance().admin.kiosks);
        }
       // private admin:any;
        private $view:JQuery;
        private ID:string='uplight.KiosksManager';
        private btnAdd:JQuery;
        private btnEdit:JQuery;
        private btnDelete:JQuery;
        private btnSave:JQuery;
        private btnClose:JQuery;
        private data:VODevice[];
        private $list:JQuery;
        private $select:JQuery;
        private $editor:JQuery;
      //  private $descr:JQuery;
        private $name:JQuery;
        private $index:JQuery;
        private $title:JQuery
        private kiosks:VOKiosks;
        detach():void{
            this.$view.detach();
        }
        appendTo(cont:JQuery):UModule{
            this.$view.appendTo(cont);
            return this;
        }
        getName():string{
            return this.ID;
        }
        destroy(){

        }

        private init():void{
            this.btnAdd = this.$view.find('[data-id=btnAdd]:first').click(()=> this.onAddClicked());
            this.btnEdit = this.$view.find('[data-id=btnEdit]:first').click(()=> this.onEditClicked());
            this.btnDelete = this.$view.find('[data-id=btnDelete]').click(() => this.onDelClicked());
            this.btnSave = this.$view.find('[data-id=btnSave]').click(() => this.onSaveClicked());
            this.btnClose = this.$view.find('[data-id=btnClose]').click(() => this.onCloseClicked());
            this.$list = this.$view.find('[data-id=list]:first').on(CLICK,'li',(evt) => this.onListClicked(evt));
            this.$select =  this.$view.find('[data-id=selectKisosk]:first').change(() => this.onSelectChanged());
          //  this.$descr =  this.$view.find('[data-id=descr]:first')
            this.$editor = this.$view.find('[data-id=editor]:first');
            this.$index = this.$view.find('[data-id=kioskindex]:first');
            this.$name = this.$view.find('[data-id=kioskname]:first');
            this.$title = this.$view.find('[data-id=title]:first');

            this.renderSelectKiosk();
            this.loadData();
        }

        private selectedItem:VODevice;
        private onCloseClicked():void{
            this.hideEditor();
        }


        private getKioskTypeById(id:number):any{
            var ar = this.kiosks.templates;
            for(var i=0,n=ar.length;i<n;i++){
               if(ar[i].id==id) return ar[i];
            }
            return null;
        }
        private renderSelectKiosk():void{
            var ar:VOTemplate[] = this.kiosks.templates;
            var out:string='';
            for(var i=0,n=ar.length;i<n;i++){
                if(ar[i].type==='kiosk')out+='<option value="'+ar[i].id+'">'+ar[i].descr+'</option>';
            }
            this.$select.html(out);
        }

       private  isEditor:boolean
        private hideEditor():void{
            if(this.isEditor){
                this.isEditor= false;
                this.$editor.fadeOut();
            }
        }
        private onSelectChanged():void{
            console.log(this.$select.val());
        }


        private showEditor():void{
            this.isEditor= true;
            if(!this.selectedItem)return;

            if(this.selectedItem.id!==0){
               this.$select.val(this.selectedItem.typeid);
                this.$index.text(this.selectedItem.type+this.selectedItem.id);
                this.$name.text(this.selectedItem.name);
                this.$title.text('Edit kiosk');
            }else{
                this.deselect();
                this.max++;
                this.$index.text(this.selectedItem.type+this.max);
                this.$name.text('');
                this.$title.text('Create kiosk');
            }

            this.$editor.fadeIn();
            this.$name.focus();
        }
        private $selected:JQuery;

        private deselect():void{
            if(this.$selected)this.$selected.removeClass(SELECTED);
            this.$selected = null;
        }
        private onListClicked(evt:JQueryEventObject):void{
            var $el = $(evt.currentTarget);
            var i:number =  Number($el.data('i'));
            if(isNaN(i)) return;
           this.deselect();
            this.$selected =  $el;
            this.$selected.addClass(SELECTED);
            var k:VODevice =  this.data[i];
            this.selectedItem = k;
        }

        private onAddClicked():void{
            this.selectedItem =  new VODevice({id:0,type:'kiosk'});
            this.selectedItem.tymer = this.kiosks.timer;
            this.selectedItem.maxdelay = this.kiosks.maxdelay;
            this.showEditor();
        }
        private isEdit:boolean;
        private onEditClicked():void{
            if(!this.selectedItem)return;
            this.showEditor();

        }

        private onDelete():void{

            RegA.getInstance().confirm.hide();
            var ar = this.data
            for(var i=0,n=ar.length;i<n;i++){
                if(ar[i].id == this.selectedItem.id) this.data.splice(i,1);
            }
            this.selectedItem = null;
            this.save();

        }
        private onDelClicked():void{
            if(!this.selectedItem) return;
                RegA.getInstance().confirm.show('Delete Device','You want to delete device: '+this.selectedItem.name+'?',()=>this.onDelete(),null);
        }

        private onSave(res:VOResult):void{
            this.loadData();
            if(res.success) RegA.getInstance().msg('Device Saved',this.btnSave);
            else {
                RegA.getInstance().connector.error('KioskManager '+res.error+' '+res.result);
                alert('Error was send to administarator');
            }
        }

        private save():void{
            RegA.getInstance().connector.saveData(JSON.stringify(this.data),'devices.json').done((data)=>this.onSave(data));
        }

        private onSaveClicked():void{
            this.selectedItem.name=this.$name.text();
            this.selectedItem.typeid = Number(this.$select.val());
            var k:any = this.getKioskTypeById(this.selectedItem.typeid);
            this.selectedItem.template=k.url+'?id='+this.$index.text();

            if(this.selectedItem.id===0){
                this.selectedItem.id=this.max;
                this.data.push(this.selectedItem);
            }

           this.save();

        }

        private onData(data):void{
         //  console.log(data);
            this.max=0;
           var ar = JSON.parse(data);
            var out:VODevice[]=[];
           for(var i=0,n=ar.length;i<n;i++){
               var k:VODevice = new VODevice( ar[i]);
               var num:number = Number(k.id);
               if(this.max<num) this.max=num;
               out.push(k);
           }
            console.log(out);

            this.data =out;
            this.renderList();
        }


        private max:number;

        private loadData():void{
            RegA.getInstance().connector.getData('devices.json').done((data)=>this.onData(data))
        }

        private renderList():void{
            var ar= this.data;
            var out='<ul>';
            for(var i=0,n=ar.length;i<n;i++){
                var item = ar[i];
                if(item.type !=='kiosk') continue;
                var k:any= this.getKioskTypeById(item.typeid);
                out+='<li data-i="'+i+'" class="list-group-item"></span> <span> '+item.name+'</span><span class="descr">'+k.descr+'</span><a target="_blank" href="'+item.template+'" class="pull-right"><span class="fa fa-external-link"></span></a></li>';
            }
            out+='</ul>';
            this.$list.html(out);

        }

    }
}