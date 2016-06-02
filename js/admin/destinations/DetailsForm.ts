/**
 * Created by VladHome on 6/17/2015.
 */
/// <reference path="../RegA.ts" />
/// <reference path="DetailsCategory.ts" />
    /// <reference path="DetailsImages.ts" />

module uplight {
    export class DetailsForm {



        onImageEditor:Function;
        showDetails():void{
            this.showDetailsView();
        }
        private encode(str:string):string{
            return str;//this.div.text(str).html();
        }
        private div:JQuery=$('<div>');
        getDestination():VODestination {
             if(!this.current) return null;


            var vo:VODestination = this.current;
            vo.name = this.encode(this.name.val());

            if (vo.name.length < 2) {
                this.R.msg('Name is required', this.name);
                return null;
            }
            vo.unit = this.encode(this.unit.val() || '');
            vo.info = this.encode(this.info.val() || '');
            vo.imgs= this.imagesEditor.getData().toString();
           // vo.imgsD = this.imagesEditor.getDeleted();
           // vo.cats = this.categories.getCurrent();
            vo.more = this.collectDataFromTable()
            vo.meta = this.encode(this.meta.val() || '');
            vo.kws = this.encode(this.keywords.val() || '');
            vo.uid = this.encode(this.uid.val());

            vo.tmb = this.tmbImg.attr('src');
            var pages = this.pages.html();
            if (pages.length > 20) {
                vo.pgs = 'pages';
                this.pgs = pages;
            }
            else {
                vo.pgs = null;
                this.pgs = null;
            }

           // this.current=vo;
           return vo;
        }

        show():void{
            this.view.show();
        }

        focusName():void{
            this.name.focus();
        }

        hide():void{

            this.view.hide();
            this.imagesEditor.hide();

        }

        reset():void{
            this.name.val('');
            this.unit.val('');
            this.info.val('');
            this.renderTable('');
            this.categories.reset();
            this.uid.val('');
            this.meta.val('');
            this.dbid.text('');
            this.keywords.val('');
            this.pages.html('');
            this.tmbImg.attr('src',null);
            // this.showItemCategories();

        }

        setDestination(vo:VODestination):void {
            this.current = vo;
            this.categories.setCurrent(vo);
            this.imagesEditor.setData(vo);
        }

        setID(id:number):void{
            this.current.id=id;
            this.dbid.text(id);
            if(!this.current.uid.length){
                this.current.uid=''+id
                this.uid.val(this.current.uid);
            }
        }


        form:JQuery
        private name:JQuery;
        private unit:JQuery;
        private info:JQuery
        private details:JQuery;
        private images:JQuery

        private keywords:JQuery
        private meta:JQuery
        private uid:JQuery;
        private dbid:JQuery
        private saveBtn:JQuery;

        private current:VODestination
        private haveChanges:boolean = true;
        R:RegA

        private pages:JQuery;
        private tmbImg:JQuery;
        private tmbInput:JQuery
        private btnAddRow:JQuery;
        private btnDeleteRow:JQuery;
        private selectedRow:JQuery;
        private detailsTable:JQuery;
        private editor:nicEditor;
        private categories:DetailsCategory;
        private imagesEditor:DetailsImages;

        onClose:Function;
        onSave:Function;

        btnSave:JQuery

        view:JQuery

        constructor(form:JQuery) {
            this.view = form;
            this.R = RegA.getInstance();

            this.view.find('[data-id=btnClose]').click(()=>{if(this.onClose)this.onClose()});
           this.btnSave = this.view.find('[data-id=btnSave]').click(()=>{
               var btn = this.btnSave
               btn.prop('disabled',true);
               setTimeout(function(){btn.prop('disabled',false);},1500);
               if(this.onSave)this.onSave();
           });
            this.pages =$('#details-pages');
            this.images = this.view.find('[data-id=images]:first');
            this.name = form.find('[data-id=tiName]:first');
            this.unit = form.find('[data-id=tiUnit]:first');
            this.form = form;
            this.info = form.find('[data-id=info]:first');
            this.details = form.find('[data-id=details]:first');

            this.keywords = form.find('[data-id=keywords]:first');

            this.tmbImg=form.find('[data-id=imgThumbnail]:first');
            this.tmbInput = form.find('[data-id=tmbInput]:first');
            this.tmbInput.on(CHANGE,(evt)=>this.onTmbInputChange(evt));

            this.meta = form.find('[data-id=meta]:first');
            this.uid = form.find('[data-id=uid]:first');
            this.dbid = form.find('[data-id=dbid]:first');
            this.saveBtn = form.find('[data-id=save]:first');

            this.btnAddRow = this.form.find('[data-id=btnAddRow]:first').on(CLICK, ()=>this.onAddRowClicked());
            this.btnDeleteRow = this.form.find('[data-id=btnDeleteRow]:first').on(CLICK, ()=>this.onDeleteRowClicked());
            this.details.on(CLICK, 'tr', (evt)=>this.onRowSelected($(evt.currentTarget)));

            this.categories = new DetailsCategory(form);


            this.imagesEditor = new DetailsImages($('#DetailsImagesEdit'));

            this.imagesEditor.hide();
            this.imagesEditor.onSave = ()=>this.showDetailsView();
            this.imagesEditor.onClose = ()=>this.showDetailsView();
            this.imagesEditor.onCancel = ()=>this.showDetailsView();

            $('#DetailsImages [data-id=btnEdit]:first').on(CLICK,()=>this.onEditImagesClick());
        }

        private onUploadTumb(res:VOResult):void{
            this.tmbImg.attr('src',res.result);
            console.log(res);
        }

        private onTmbInputChange(evt:JQueryEventObject):void{
            var input:any =evt.target;
            var files:FileList = input.files;
            if(files.length){
                var form:FormData = new FormData();
                form.append('file',files[0]);
                this.R.connector.uploadImage(form,'details','tmb_'+this.current.uid).done((res:VOResult)=>this.onUploadTumb(res))

            }
        }

        showDetailsView():void{

            if(this.current.imgs)this.images.html(this.renderImages(this.current.imgs));
            this.view.show();
            this.imagesEditor.hide();
        }

        private onEditImagesClick():void{
            this.view.hide();
            this.imagesEditor.setData(this.current);
            this.imagesEditor.render();
            this.imagesEditor.show();
            if(this.onImageEditor)this.onImageEditor();
        }

//////////TABLE/////////////////////

        private onRowSelected(el:JQuery):void {
            this.selectedRow = el;
        }

        private onAddRowClicked():void {
            this.details.append('<tr><td></td><td>&nbsp;</td></tr>');
        }

        private onDeleteRowClicked():void {
            if (this.selectedRow) {
                //if (this.details.children().length < 2) {
                 //   this.selectedRow.html('<td>&nbsp;</td><td>&nbsp;</td>');
                  //  this.selectedRow = null;
                  //  return
               // }

                var tr = this.selectedRow;
                var out=tr.children('td:nth-child(1)').text()+"  "+tr.children('td:nth-child(2)').text();

                var del:boolean = true;
                if (out.length > 2) {
                    del = confirm('You want to delete row? \n' + out);
                }

                if (del) {
                    this.selectedRow.remove();
                    this.selectedRow = null;
                }

            }
        }

       private  renderCell(label:string,value:string):string {
            return '<tr><td>' + label + '</td><td>' + value + '</td></tr>';
        }

       private  renderTable(details:string):void {

           if(!details)details=" ";
            var ar = details.split("\n");
           console.log(ar.length);
         //  console.log('renderTable   ',ar);
            var out = ''
            for (var i = 0, n = ar.length; i < n; i++) {
                var line= ar[i].split("\t");
                out += this.renderCell(line[0]||'',line[1] || '&nbsp');
            }
            this.details.html(out);
        }

        private collectDataFromTable():string{

            var list:JQuery = this.details.children('tr');
            var out:string[]=[];
            list.each(function (ind, el) {
                var tr = $(el);
                if(tr.text().length>5){
                    var str= tr.children('td:nth-child(1)').text()+"\t"+tr.children('td:nth-child(2)').text();
                    out.push(str.replace('\u00a0',''));
                }

            })

            return out.join('\n');
        }

        ////////////////////////////DESTINATION///////////////////////////////////


       render():boolean {
            if (this.current) {
                var vo:VODestination = this.current;
                this.name.val(vo.name);
                this.unit.val(vo.unit);
                this.info.val(vo.info);
                this.renderTable(vo.more);
                this.categories.render();
                if(vo.imgs.length) this.images.html(this.renderImages(vo.imgs));
                else this.images.html('');
                this.uid.val(vo.uid);
                this.meta.val(vo.meta);
                this.dbid.text(vo.id);
                this.keywords.val(vo.kws);
                this.pages.html('');
                this.tmbImg.attr('src',vo.tmb);
                if(vo.pgs=='pages') this.pages.load('data/pages/'+vo.uid+'.htm');
                // this.showItemCategories();


                return true
            } else return false;
        }

        private renderImages(imgs:string):string{
          var   ar:string[]  = imgs.split(',');
            var out:string=''
            for(var i=0,n=ar.length;i<n;i++){
               out+='<a><img src="'+ar[i]+'" /></a>';
            }
           return out;

        }
        getDestinationId():number{
            if( this.current) return  this.current.id;
            else return 0;
        }
        getDestinationName():string{
            if( this.current) return  this.current.name;
            else return null;
        }
        private pgs:string;

        getPages():string{
            return this.pgs
        }
        /*
        getDestination():VODestination {
            // if(this.haveChanges){
            var vo:VODestination = new VODestination();
            vo.id = this.current.id;
            vo.name = this.name.val();
            if(vo.name.length<2){
                this.R.alert('Name is required', this.name.parent());
                return null;
            }
            vo.unit = this.unit.val() || '';
            vo.info = this.info.val() || '';

            vo.cats = this.current.cats;
            vo.more = this.collectDataFromTable()
            vo.meta = this.meta.val() || '';
            vo.kws = this.keywords.val() || '';
            vo.uid = this.uid.val() || '';
            var pages = this.pages.html();
            if(pages.length>20){
                vo.pgs = 'pages';
                this.pgs =pages;
            }
            else {
                vo.pgs=null;
                this.pgs=null;
            }

            this.current = vo;


            //}

            return this.current;
        }

        */
    }
}