/**
 * Created by VladHome on 8/11/2015.
 */
    /// <reference path="../RegA.ts" />

module uplight{

    export class AttractLoopEdit implements UModule{
        private ID:string = 'uplight.AttractLoopEdit';

        R:RegA
        $view:JQuery;
        tools:JQuery;
        private settings:any
        private library:any[];
       // private data:any;
        private iframeAL:JQuery;
        private kiosk:JQuery;
        private $previewAL:JQuery;
        private alView:JQuery;

       // private settingsURL:string='settings.json';

        private chkTC:JQuery;
        private btnEdit:JQuery;
        private  btnChangeType:JQuery;
        private btnPreview:JQuery;

        private $btnSave:JQuery;
        private select:JQuery;
        private $preview:JQuery;
        private changeType:ChangeType;
        private selectedItem:any;
        private dataid:string='attract_loop';

        private current:AttractLoop;
        private $title:JQuery;

        private $editor;
        private editor:ALEditor;
        private preview:Preview;
        constructor(container:JQuery){
            this.R=RegA.getInstance();
            this.R.current = this;
            var ar = this.R.admin.attract_loops;

            var out:VOAttractLoop[]=[];
            for(var i=0,n=ar.length;i<n;i++)out.push(new VOAttractLoop(ar[i]));

            this.library =out ;
            container.load('htms/admin/AttractLoopEdit.html',()=>this.init());
            this.R.dispatcher.on(this.R.ATTRACTLOOP_EDIT,(evt,prev:Preview)=>this.onEdit(prev));

        }

        private init():void{
            var view:JQuery = $('#AttractLoopEdit');
            this.$view = view;
            this.tools= view.find('[data-id=tools]:first');
            //this.title=view.find('[data-id=title]:first');
            this.alView = view.find('[data-id=alView]:first');
            this.iframeAL = $('#AttractLoopView');
            this.kiosk=$('#KioskView');
           // var p1 = this.loadCurrent();
            //$.when(p1).done((sett:any)=>{
             //   this.settings=sett
               // this.currentAl = al;
               // this.renderAl()
           // });
            this.$btnSave= view.find('[data-id=btnSave]:first').click(()=>{
                if(this.R.isBusy)return;

                this.$btnSave.addClass(HIDDEN);
                this.current.TC=this.chkTC.prop(CHECKED);
                this.R.wait();
                this.save().done((res:VOResult)=>{
                   this.R.resetBusy();
                    if(res.success) this.R.msg('Property saved',this.$btnSave.parent());
                });
            })
            this.chkTC = view.find('[data-id=chkTC]:first').change(()=>{
                this.$btnSave.removeClass(HIDDEN);
            });
            this.$previewAL= view.find('[data-id=kioskPreview]:first');
            this.btnPreview = view.find('[data-id=btnPreview]:first');


            this.btnChangeType = view.find('[data-id=btnChangeType]:first');
            this.$preview =  view.find('[data-id=current]:first');
            //this.btnSave = view.find('[data-id=btnSave]:first').click(()=>this.onSaveClick());
           // this.editorView = $('#ALEditor');
            this.$title =this.$view.find('[data-id=title]:first');
            this.addListeners();
            this.loadData();

        }

        private onEdit(prev:Preview):void{
            switch(prev.type){
                case 'gallery':
                    this.preview = prev;
                    this.editor = new GalleryEditor();
                    this.editor.onClose = ()=>{
                        this.$editor.remove();
                        this.$editor=null;
                        this.editor=null;
                        this.$preview.show();
                    }
                    this.editor.onSave = ()=>{
                        if(this.R.isBusy) return;
                        var data:any = this.editor.getData();
                        var props  = data.props;
                        var i:number = this.preview.i;

                        var btnSave:JQuery = this.editor.btnSave;
                        this.R.wait();
                        this.save().done((res)=>{
                          this.R.resetBusy();
                            this.loadData();
                            if(res.success) RegA.getInstance().msg('Gallery saved',btnSave);

                        })
                        this.current.props[i]=props;
                        this.R.wait();
                        this.preview.saveData(data).done(()=>{
                           this.R.resetBusy();
                        });
                        this.preview.render();
                    }
                    this.editor.setData(this.preview.getData());
                    this.editor.render();
                    this.$editor  = this.editor.appendTo(this.$view);
                    this.$preview.hide();
                    break;
            }
        }

        addListeners():void{
            this.$previewAL.find('[data-id=btnClose]').click(()=>this.$previewAL.hide());
            this.btnChangeType.click(()=>this.onChangeTypeClick());
            //this.btnPreview.click(()=>this.showPeview())
        }
        appendTo(cont:JQuery):UModule{
            this.$view.appendTo(cont);
            return this;
        }

        detach():void{
            this.$view.detach();
        }
        destroy():void{

        }
        getName():string{
            return this.ID;
        }
        private onSelectTypeClose():void{
            this.changeType.hide();
            this.$preview.show();
        }


         private onChangeTypeClick():void{
             if(!this.changeType){
                 this.changeType = new ChangeType(this.library);
                 this.changeType.onClose = ()=>this.onSelectTypeClose();
                 this.changeType.onSave = ()=>this.onChangeTypeSave();

             }

             var al:VOAttractLoop = this.getTemplateById(this.current.id)
             this.changeType.setCurrent(al);

             this.changeType.show();
             this.$preview.hide();
         }
        private createALProps(vo:VOAttractLoop):ALProps{
            var prop:ALProps = new ALProps()
            prop.url = vo.url;
            prop.templateid = vo.id;
            prop.delay = vo.delay;
            return prop;
        }
        private createProperties(vo:VOAttractLoop):ALProps[]{
            var out:ALProps[]=[];
            if(vo.comb){
                var ar = vo.comb;
                for(var i=0,n=ar.length;i<n;i++){
                    var al:VOAttractLoop = this.getTemplateById(ar[i]);
                    out.push(this.createALProps(al));
                }

            }else out.push(this.createALProps(vo));


            return out;
        }
        private onChangeTypeSave():void{
            if(this.R.isBusy)return;

            var al:VOAttractLoop = this.changeType.selectedItem;
            if(al.id == this.current.id){
                this.R.msg('You have same type', this.changeType.btnSave);
                return;
            }

            this.current = new AttractLoop({id:al.id});
            this.current.props = this.createProperties(al);
            this.current.TC = this.changeType.chkTC.prop(CHECKED);
            this.R.wait();
            this.save().done((res)=>{
                this.loadData();
                if(res.success) RegA.getInstance().msg('New Attract loop saved',this.changeType.btnSave);
            });
            //console.log('onChangeTypeSave');
        }

      //  private showPeview():void{
         //   this.loadAL();
          //  this.$previewAL.show();
       // }

        private hidePreview():void{
            this.$previewAL.hide();
            this.unloadAL();
        }

        private propsToUrl(obj:any):string{
            var out:string='';
            for(var str in obj)out+='&'+str+'='+obj[str];
            if(out.length)return out.substr(1);
            return out;
        }
        private loadAL():void{
           // this.iframeAL.attr('src','AttractLoop.php?settings='+this.settingsURL);
        }

        private unloadAL():void{
            this.iframeAL.attr('src','');
        }

        private loadKiosk():void{
            this.kiosk.attr('src','Kiosk1080.php?mode=preview');
        }

        private uloadKiosk():void{
            this.kiosk.attr('src','');
        }


        private loadData():void{
            this.R.wait();
               this.R.connector.getData(this.dataid).done((res:string)=>{
                   this.R.resetBusy();
                   this.current = new AttractLoop(JSON.parse(res));
                   this.render();
            });

        }

        private save():JQueryPromise<VOResult>{
           return this.R.connector.saveData( JSON.stringify(this.current),this.dataid);

        }



        private onCurrentEdit():void{
            this.tools.hide('fast');
        }
        private onEditExit():void{
          this.tools.show('fast');
        }

        private getTemplateById(id:number):VOAttractLoop{
            var ar = this.library;
            for(var i=0,n=ar.length;i<n;i++){
               if(ar[i].id==id) return ar[i] ;
            }
            return null;
        }
        private render():void{
           var al:AttractLoop = this.current;
            this.chkTC.prop(CHECKED,this.current.TC);
            var vo:VOAttractLoop = this.getTemplateById(al.id);
            this.$title.text(vo.name);
           // var als:VOAttractLoop[]=[];

            this.alView.empty();
            var ar = al.props;
            for(var i=0,n=ar.length;i<n;i++){
                vo = this.getTemplateById(ar[i].templateid);
                if(!vo){
                    console.log('Cant find template with id '+ar[i].templateid);
                    continue;
                }
                //vo.delay = ar[i].delay;
                if(vo.type==='gallery'){
                    var preview:Preview = new GalleryPreview(ar[i],vo,i);
                    preview.appendTo(this.alView);
                }
            }
        }



}


    class ChangeType{
        chkTC:JQuery;
        btnSave:JQuery;
        view:JQuery
       // data:VOAttractLoop[];
        select:JQuery;
        onClose:Function;
        onSave:Function;
       selectedItem:VOAttractLoop;


        show():void{
            this.view.show();

        }

        hide():void{
            this.view.hide();
        }

        setCurrent(vo:VOAttractLoop):void{
            this.selectedItem = vo;
            this.select.val(vo.id);
        }

        private onSaveClick():void{
           var btn =  this.btnSave.addClass(DISABLED);
           setTimeout(()=>{this.btnSave.removeClass(DISABLED)},1000);
           if(this.onSave)this.onSave(this.selectedItem);
        }
        R:RegA;
        constructor(private library:VOAttractLoop[]){
            this.R = RegA.getInstance();
            this.view= $('#ChangeType');
           // this.editorView = this.view.find('[data-id=editorView]:first');
            this.btnSave = this.view.find('[data-id=btnSave]:first');
            this.chkTC = this.view.find('[data-id=chkTC]:first');
            this.select=this.view.find('select:first');
            this.createSelectType(library);
            this.addListeners();
        }



        private createSelectType(als:VOAttractLoop[]):void{
            var out='';
            var ar = als;

            for(var i=0,n=ar.length;i<n;i++){
                out+='<option value="'+ar[i].id+'">'+ar[i].name+'</option>';
            }
           this.select.html(out);
        }

        addListeners():void{
            this.select.change(()=>this.selectTypeChage());
            this.view.find('[data-id=btnClose]').click(()=>{
                if(this.onClose)this.onClose();
            })
            this.btnSave.click(()=>this.onSaveClick())
        }


        private getAlById(id:number):any{
            var ar = this.library;
            for(var i=0,n=ar.length;i<n;i++){
                if(ar[i].id==id) return ar[i];
            }
            return null;
        }

        private selectTypeChage():void {
            var al:VOAttractLoop= this.getAlById(this.select.val());
           console.log(al);

            this.selectedItem= al;
        }


    }




}