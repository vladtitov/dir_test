
/// <reference path="../rega.ts" />
module uplight{
    export class CategoryForm {
        
        view: JQuery;

        private model:DestinantionsModel;

        private btnClose: JQuery;
        private btnSave:JQuery;
        private tiName:JQuery;
        private chkEnable:JQuery;
        private selectSeq:JQuery
        private icon:JQuery
        private iconsLibrary:JQuery;
        private btnEditIcon:JQuery;
        private btnBlankIcon:JQuery;
        private $iconsList:JQuery;

        private iconPreview:JQuery;

        private current:VOCategory;
        onClose:Function;


        R:RegA;
        constructor(view:JQuery) {
              this.R = RegA.getInstance();

            this.model = this.R.model;
            this.view = view;
            this.tiName =  view.find('[data-id=tiName]:first');

            this.chkEnable = view.find('[data-id=chkEnable]:first').on('click',()=>this.onCheckClick());
            this.icon = view.find('[data-id=icon]:first');
            this.iconsLibrary = view.find('[data-id=iconsLibrary]:first');
            this.$iconsList = this.iconsLibrary.find('.list:first');
            this.btnEditIcon =  view.find('[data-id=btnEditIcon]:first');
            this.btnClose = view.find('[data-id=btnClose]');
            this.btnSave = view.find('[data-id=save]:first');
            this.selectSeq = view.find('[data-id=selectSeq]:first');

            this.btnBlankIcon = view.find('[data-id=btnBlankIcon]:first').click(()=>{
                this.icon.attr('class','fa fa-fw');
            })

            this.btnSave.on(CLICK,()=>this.onSaveClicked())

            this.R.dispatcher.on(this.R.CATEGORY_SELECTED,(evt,cat)=>this.onCategorySelected(cat))

            if(this.model.getCategories()) this.renderSequance();
            else this.model.dispatcher.on(this.model.CHANGE,()=> this.renderSequance());



            this.iconsLibrary.parent().hide();
            this.btnEditIcon.on(CLICK,()=>this.onEditIconClick());
            this.icon.parent().on(CLICK,()=>this.onEditIconClick());
            this.R.connector.getData('fa-icons').done((data)=>this.onIconsLoaded(data));
            this.iconPreview=$('<div>').addClass('abs preview').appendTo(this.iconsLibrary.parent());

            this.btnClose.on(CLICK,()=>{
                if(this.onClose)this.onClose();
                this.hide();
            });

            this.hide();
        }

        isVisible
        toggle(){
            if(this.isVisible) this.hide();
            else this.show();
        }
        hide(){
            this.isVisible=false;
            this.view.hide();
            this.hideLibrary();

        }
        show():void{
            this.isVisible=true;
            if(this.current)this.renderItem();
            this.view.show();

        }
        private renderIconsTopic(name):string{
            //var out='<div class="topic"><h3>'+topic[0]+'</h3><div class="list">';;
            //var ar = topic;
            //for(var i=1,n=ar.length;i<n;i++){
              // out+='<div class="fa fa-'+ ar[i]+'" ></div>';
           // }
            //return out+'</div></div>';
            return '<div class="fa fa-'+ name+'" ></div>';
        }
        private onIconsLoaded(data:string):void{
           var out='';
            var ar = JSON.parse(data);
            console.log(data);
            for(var i=0,n=ar.length;i<n;i++){
               out+=this.renderIconsTopic(ar[i]);
            }


            this.$iconsList.html(out);
            this.iconsLibrary.on(CLICK,'.fa',(evt)=>this.onIcionLibraryClick($(evt.currentTarget)))
            this.iconsLibrary.on(MOUSE_OVER,'.fa',(evt)=>this.onIcionLibraryOver($(evt.currentTarget)))
            this.iconPreview.on(MOUSE_OUT,'.fa',(evt)=>this.onIcionLibraryOut($(evt.currentTarget)))
            this.iconPreview.on(CLICK,'.fa',(evt)=>this.onIcionLibraryClick($(evt.currentTarget)))

        }
        onIcionLibraryClick(el:JQuery){
            var cl = el.attr('class');
            console.log(cl);
            this.icon.attr('class',cl);
        }

        onIcionLibraryOver(el:JQuery){
            this.iconPreview.html(el.clone());
            this.iconPreview.css('left',el.position().left).css('top',el.position().top);
            this.iconPreview.fadeIn();
        }
        onIcionLibraryOut(el:JQuery){
            this.iconPreview.hide();
        }

        isLibraryVisible:boolean
        hideLibrary():void{
            if(this.isLibraryVisible) {
                this.isLibraryVisible = false;
                this.iconsLibrary.parent().hide('slow');
            }
        }
        showLibrary():void{
            if(this.isLibraryVisible) return;
            this.isLibraryVisible=true;
            this.iconsLibrary.parent().show('slow');
        }
        private onEditIconClick():void{
            if(this.isLibraryVisible)this.hideLibrary();
            else this.showLibrary();
        }

        private onSaveResult(res):void {
            if(res.success){
                this.R.msg('Record Saved', this.btnSave);
                this.R.model.mapCategories();
            } else this.R.msg('ERROR ', this.btnSave);
            console.log(res);
        }

        private onSaveClicked(){
            var vo:VOCategory = this.getCurrent();
            if(!vo) return
            var btn = this.btnSave
            btn.prop('disabled',true);
            setTimeout(function(){btn.prop('disabled',false);},1500);
            this.R.model.saveCategory(vo).done((res)=>this.onSaveResult(res));

        }
        private onCategorySelected(cat:VOCategory):void{
            this.current = cat;
            if(this.isVisible) this.renderItem();
        }
        setCurrent(vo:VOCategory):void{
            this.current=vo;
            if(vo.id==0){
                this.addSequance();
            }
            this.renderItem();

        }
        private addSequance():void{
            var max = this.R.model.getCategories().length+1;
            this.selectSeq.append('<option value="'+max+'">'+max+'</option>')
        }
        private renderSequance(){
            console.log('renedr');
            var max = this.R.model.getCategories().length;
           var out=''
            for(var i=1,n=max;i<=n;i++){
                out+='<option value="'+i+'">'+i+'</option>';
            }
            this.selectSeq.html(out);
        }



        private renderItem():void{
            var vo:VOCategory = this.current
            if(vo){
                //console.log(vo);
                this.tiName.val(vo.label);
                this.selectSeq.val(vo.sort)
                this.icon.attr('class',(vo.icon||'icon'))
               // this.setSelectSequance(vo.sort);
                this.chkEnable.prop('checked',vo.enable==1);

            }
        }
        getCurrent():VOCategory{
            var vo = this.current;
            vo.label = this.tiName.val();
            vo.enable = this.chkEnable.prop('checked')?1:0;
            vo.sort =  this.selectSeq.val();
            vo.icon = this.icon.attr('class');

            return vo;
        }
        private onCheckClick():void{

        }
        private onTextChanged(): void {
           // console.log(this.tiCat.val());

        }

        private onEnableClicked(): void {


        }
        private reset(): void {         
           // this.btnEdit.addClass(DISABLED);
           // this.refreshList();
           // this.editpanel.hide();
           // this.addremove.show();
        }


       
    }
   
}


