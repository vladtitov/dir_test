/// <reference path="../RegA.ts" />

declare var  xlsx:any

module uplight {
    export class ImportExport {

        view: JQuery;
        private _data: VODestination[];
        private table: JQuery;
        private tbody:JQuery;
        private tableView:JQuery
     //   private model: DestinantionsModel;

        private total:JQuery;
        private btnDel: JQuery;
        private rdAdd: JQuery;
        private rdOver: JQuery;
        private btnSelect: JQuery;
        private btnUpload: JQuery;
        private btnDownload:JQuery;
        private categories:VOCategory[];
        private headers: string[]=['UID','Name','Unit','Info','Categories','Keywords','Table','Meta','Thumbnail','Images'];




        R:RegA;
        constructor(container:JQuery) {
            this.R=RegA.getInstance();
            container.load('htms/admin/ImportExport.htm',()=>{this.init()});
        }

        private init(): void {

            this.view = $('#ImportExport');
            this.tableView = $('#table-container');
            this.table = $('<table>' ).addClass('table table-bordered').appendTo(this.tableView);
            this.tbody = $('<tbody>' ).appendTo(this.table);
            this.total = this.view.find('[data-id=total]');


            this.tbody.on(CLICK, 'tr', (evt) => this.onItemClick(evt));

            this.btnDel = this.view.find('[data-id=btnDel]').on(CLICK,()=>this.onDelClicked());
           // this.viewAddOver = this.viewWiz.find('[data-id=addover]').eq(0);
            this.rdAdd = this.view.find('[data-id=rdAdd]:first');
            this.rdOver = this.view.find('[data-id=rdOver]:first');
            this.btnUpload = this.view.find('[data-id=btnUpload]').on(CLICK,()=>this.onUploadClicked());

           this.btnDownload = this.view.find('[data-id=btnDownload]').on(CLICK,()=>this.onDownloadClick());


           // this.btnDownload.attr('href',this.R.connector.service+'?a=importexport.export_CSV');



            this.btnSelect = this.view.find('[data-id=btnImport]').change((evt)=> {
                this.onFileSelected(evt.target.files);
                });

            this.table.append(this.renderHead());
            this.getData();
            this.R.model.dispatcher.on(this.R.model.CHANGE,()=>this.getData());
        }



        private convertToArray(ar:VODestination[]):string[][]{
            var out:string[][]=[];

            for(var i=0,n=ar.length;i<n;i++){
                var item:VODestination = ar[i];
               var cats=this.R.model.getCategoriesNames(item.cats).join(',');
                out.push([item.uid,item.name,item.unit,item.info,cats,item.kws,item.more,item.meta,item.tmb,item.imgs]);
            }
            return out;
        }
        private onDownloadClick():void{
            var ar = this._data;
            var out:string[][] = this.convertToArray(this._data);
            out.unshift(this.headers);
            $.post(this.R.connector.service+'?a=importexport.saveAsCSV',JSON.stringify(out)).done((res)=>{
                var idown = $('<iframe>', { id:'idown', src:this.R.connector.service+'?a=importexport.get_CSV' }).hide().appendTo('body');

            });
        }

       // private catInd:any;
        private onCategories(res):void{
            this.categories=res;

           // this.catInd = _.indexBy(res,'label');

        }
        getData(): void {
            this._data = this.R.model.getData();
            //    console.log(ar);
            this.renderData();
            this.isNewData = false;
            this.btnUpload.prop('disabled',true);
           // this.R.connector.getCategories().done((res)=>this.onCategories(res));
           // this.R.connector.exportDestination().done((res) => this.onDataComplete(res));
        }


        private onError(res:any): void {

            console.log('ERROR ',res);

        }
        private renderHead():string{
            return '<thead><th>'+this.headers.join('</th><th>')+'</th></thead><tbody>';
        }

        private renderItem(item:VODestination,i:number,cats:string):string{
            return '<tr data-i="' + i + '"><td>' + item.uid + '</td><td>' + item.name + '</td><td>' + item.unit + '</td><td>' + item.info + '</td><td>' + cats
                + '</td><td>' + item.kws + '</td><td>' + item.more + '</td><td>' + item.meta + '</td><td>'+item.tmb+'</td><td>'+item.imgs+'</td></tr>';

        }

       /* private onDataComplete(ar:any[]): void {
                this._data = ar;
            //    console.log(ar);
                this.renderData();
                this.isNewData = false;
                this.btnUpload.prop('disabled',true);
        }*/

        private renderData():void{
            var out: string =''
            var ar=this._data;

            for (var i = 0, n = ar.length; i < n; i++){
                var cats='';
                if(ar[i].cats) cats=  this.R.model.getCategoriesNames(ar[i].cats).join(',');
                out += this.renderItem(ar[i],i,cats);

            }

            this.tbody.html(out);
            this.total.text(n);
        }


        private checkHeaders(ar:string[]):boolean{
            if(ar.length<9) return false;

            return true;
        }

        private getCategoryIdbyLabel(label:string):number{
            var ar = this.R.model.getCategories();
            for(var i=0,n=ar.length;i<n;i++){
                if(ar[i].label==label) return ar[i].id;
            }
            return 0;
        }
       // private newCategories:string[];

      //  private addNewCategory(str:string):void{
         //   if(this.newCategories.indexOf(str)===-1)this.newCategories.push(str);
        //}
       /* private convertCategories(str:string):void{
            if(str.length<3) return;
            var ar = str.split(',');
            for(var i=0,n=ar.length;i<n;i++){
                if(this.getCategoryIdbyLabel(ar[i])){}
                else this.addNewCategory(ar[i]);
            }
        }
*/
        private isNewData:boolean;

        private onCSVComplete(res): void {
            var ar = res;
            console.log('onCSVComplete ',res);
            var out=[];
            this.checkHeaders(ar.shift());

            console.log(ar);
            for(var i=0,n=ar.length;i<n;i++){
                var item = ar[i];
                if(item.length>9){
                    item[4] = this.convertCategories(item[4]);
                    out.push(new VODestination({uid:item[0],name:item[1],unit:item[2],info:item[3],cats:item[4],kws:item[5],more:item[6],meta:item[7],tmb:item[8],imgs:item[9]}));
                }
            }

            this._data=out;
            console.log('onCSVComplete out ',out);
            this.renderData();
            this.isNewData = true;
            this.btnUpload.prop('disabled',false);

           // if(this.newCategories.length) alert('New categories will be added: '+"\n"+this.newCategories.join("\n"));

        }

        private onFileSelected(files: FileList): void {
            //  var file: File = files[0];
           // console.log(files);
            if (files.length === 1) {
                var form: FormData = new FormData();
                form.append('file',files[0]);
               this.R.connector.uploadCSV(form, (res) => this.onCSVComplete(res), this.onError, this.onProgress);
            }
          // console.log(file);
        }
        /*

        private createCategories(ar:string[],start:number):VOCategory[]{
            var out:VOCategory[]=[];

            for(var i=0,n=ar.length;i<n;i++){
                var cat = new VOCategory({id:0});
                cat.label=ar[i];
                cat.icon='';
                cat.enable=1;
                cat.type=0;
                cat.sort=i+start;
                out.push(cat);
            }

            return out;
        }


        private  collectCategories():VOCategory[]{
            var cats:string[]=[];
            var ar = this._data;
            for(var i=0,n=ar.length;i<n;i++){
                if(ar[i].cats.length<4) continue;
               // var ar2 = ar[i].categories;
               // for(var i2=0,n2=ar2.length;i2<n2;i2++){
                  //  if(cats.indexOf(ar2[i2])===-1)cats.push(ar2[i2]);
               // }
            }
            return this.createCategories(cats,1);

        }
*/
        private convertCategories(cats:any):any{
            if(!cats) return [];
            var out:number[]=[];
            var ar = cats.split(',');
            for(var i=0,n=ar.length;i<n;i++){
                out.push(this.getCategoryIdbyLabel(ar[i]));
            }
            return out;
        }

        private onNewCategories(res:VOCategory[]):void{
            this.categories=res;
            this.sendData();
        }

        private sendData():void{
            var ar:any[] = this._data;
            var is_overwrite:boolean = this.rdOver.prop(CHECKED);
            console.log('sendData total '+ar.length +' is_overwrite '+is_overwrite);

            for(var i=0,n=ar.length;i<n;i++){
                 ar[i].cats= ar[i].cats.join(',');
            }

            this.R.connector.insertdDestinations(JSON.stringify(ar),is_overwrite).done((res)=>{
                console.log(res);
                this.R.model.refreshData();
            });
        }

     /*   private uploadNewCategories():void{
            var is_overwrite:boolean = this.rdOver.prop(CHECKED);
            console.log('is_overwrite '+is_overwrite);
            var ar:VOCategory[]
            if(is_overwrite) ar= this.collectCategories();
            else ar = this.createCategories(this.newCategories,this.categories.length);
            console.log(ar);

            this.R.connector.insertCategories(ar,is_overwrite).done((r)=>{
                console.log('insertCategories   ',r);
                this.R.connector.getCategories().done((res)=>this.onNewCategories(res));
            });
        }*/

        private onUploadClicked(): void {
            console.log('uploding');
            this.btnUpload.prop('disabled',true)
            this.R.msg('Uploading...',this.btnUpload);
           // setTimeout(()=>{this.btnUpload.prop('disabled',false)},3000);
           // if(this.newCategories.length) this.uploadNewCategories();
           // else
                this.sendData();

        }
        /*
        private onUploadComplete(res): void {

            console.log(res);
            if (res.result) {
                this.R.msg('Complete', this.btnUpload);
                this._data = null;
                //this.resetButtons();
                this.getData(); 
                this.R.model.refreshData();
            }
        }


        private renderData(data:VODestination[]): void {
            var out: string = '<thead><th>id</th><th>Name</th><th>Unit</th><th>Personal info</th><th>Categories</th></thead><tbody>';
            for (var i = 0, n = data.length; i < n; i++) out += this.renderItem(data[i]);
            out += '</tbody>';
            this.table.html(out);
        }
        

        private renderItem(item: VODestination): string {

            return '<tr data-id="' + item.destid + '"><td>' + item.destid + '</td><td>' + item.name + '</td><td>' + item.unit + '</td><td>' + item.personal + '</td><td>' + item.cats + '</td></tr>';
        } 
         
        private onExportClick(evt): void {

            var el: HTMLElement = document.getElementById('tblDest');

          document.execCommand('SaveAs', true, 'directrories.html');
           

            var file = {
                worksheets: [[]], // worksheets has one empty worksheet (array)
                creator: 'Electronic Directory', created: new Date(),
                lastModifiedBy: 'Interactive Directory', modified: new Date(),
                activeWorksheet: 0
            }
            var w:any = file.worksheets[0]; // cache current worksheet
            w.name = "DirectoriesData";
            $('#tblDest').find('tr').each(function () {
                var r = w.push([]) - 1; // index of current row
                $(this).find('td').each(function () { w[r].push(this.innerText); });
            });


           // trace(file.worksheets);

          trace(xlsx(file).base64);
*/
     //   }

       // private onImportClick(evt): void {

           // this.R.connector.uploadTempFile('uploadFile', (res) => this.onUploadComplete(res), null,this.onProgress);
            //$('#ImportExport progress').show();
       // }

     
        private onProgress(evt: ProgressEvent): void {
            console.log(evt);
            if (evt.lengthComputable){
               // $('#ImportExport progress').attr({ value: evt.loaded, max: evt.total });
            }
        }
        private onDelClicked(): void {
            if (this.btnDel.hasClass(DISABLED)) return;
            // console.log(this.table.find('.selected').each);
           if(confirm('You want to delete selected records?')){
               var data = this._data;
               $(this.table.find('.selected').get().reverse()).each(function (ind: number, el: HTMLTableRowElement) {
                   if (el.rowIndex) {
                       data.splice(el.rowIndex - 1, 1);
                       $(el).remove();
                   }
               });
           }

        }


        private onItemClick(evt): void {  
            if (this.btnDel.hasClass(DISABLED)) return;               
            var el: HTMLTableRowElement = evt.currentTarget;           
            el.classList.toggle('selected');
        }
        /*
        private tableRenderer(data: VODestination[]): string {
            var out: string = '<thead><th>Name</th><th>Unit</th><th>Description</th></thead><tbody>';
            for (var i = 0, n = data.length; i < n; i++)out += '<tr data-id="'+data[i].destid+'"><td>' + data[i].name + '</td><td>' + data[i].unit+ '</td><td>'+data[i].cats+ '</td></tr>'

            return out+'</tbody>';
        }
       */
    }

}