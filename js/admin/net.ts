/// <reference path="models.ts" />
/// <reference path="rega.ts" />
/// <reference path="../typing/jquery.d.ts" />
/// <reference path="../page/PagesList.ts" />
module uplight {
    export class Connector {
        service = 'rem/admin.php';
        private serviceK = 'rem/kiosk.php';
       
        public device:any
        public onData: Function;



        logout(){
           return  $.post('rem/login.php', {credetials:'logout'});
        }

        error(msg:string){
            msg=(new Date()).toString()+'||'+msg;
            $.post(this.service + '?log_error',msg);
        }

        //////////////////////////Categories/////////////////////////////////////
        getCategories(): JQueryPromise<any> {
            return $.get(this.service, {a:'cats.get_all'}, 'application/json');
        }
        deleteCategory(id:number):JQueryPromise<VOResult> {
            return $.get(this.service, { a: 'cats.delete' ,id:id}, 'application/json');
        }
        //addCategory(callBack: Function, label:string): void {
          //  $.get(this.service, { a: 'data.add_category', label: label }, 'application/json').done(callBack);
       // }   

        saveCategorySortOrder(data:any): JQueryPromise<VOResult>{
          return  $.post(this.service + '?a=cats.sortorder', { sort: data }, 'application/json');
        }

        saveCategory(cat:VOCategory): JQueryPromise<VOCategory[]> {
            var data: any = cat;           
           return  $.post(this.service +'?a=cats.save', data, 'application/json');
        }
        saveCatDests(catid:number,destsIds:number[]){
            return  $.post(this.service +'?a=cats.save_cat_dests&id='+catid,JSON.stringify(destsIds), 'application/json');
        }
        getIcons(): JQueryPromise<any[]> {
            return  $.get(this.service +'?a=cats.get_icons', 'application/json');
        }
        ////////////////////////////////////////////////////////////////////////////////////////////////




      //////////////////////////////////////Pages/////////////////////////////////////////

        savePageInfo(page:VOPage, callBack): void {
            $.post(this.service + '?a=pages.save_info&pageid=' + page.id,page.content).done(callBack);
        }
        getPageInfo(callBack: Function, pageid: number): void {

            $.get(this.service, { a: 'pages.get_info', pageid: pageid }).done(callBack);
        }
        getAllPages(callBack:Function) {
          $.get(this.service + '?a=pages.get_all').done(callBack);
        }
        savePagesSequence(seq:number[],callBack: Function) {
            $.post(this.service + '?a=pages.save_order', {seq:seq}).done(callBack);

        }
        deletePage(pageid: number, callBack: Function): void {
            $.post(this.service + '?a=pages.delete', { pageid: pageid }).done(callBack);
        }
        createPage(page:VOPage,callBack): void {
          $.post(this.service + '?a=pages.add',page).done(callBack);
       }
       
        updatePage(page: any, callBack: Function): void {

            $.post(this.service + '?a=pages.update', page).done(callBack);
        }

        ///////////////////////////////////

        ////////////////////ImportExport////////////////////

        getStatistics():JQueryPromise<any[]>{
            var q:any={};
            q.a='get_statistics';
            return $.get(this.service ,q);
        }
        getUsage(devices:string,from:string,to:string):JQueryPromise<any[]>{
            var q:any={};
            q.a='get_usage';
            q.from=from;
            q.to=to;
            q.devices=devices;
            console.log(devices);
            return $.get(this.service ,q);
        }
        exportDestination() :JQueryPromise<any[]> {
            return $.get(this.service + '?a=importexport.get_all');
        }

        insertdDestinations(data:string,overwrite:boolean):JQueryPromise<VOResult>{
            var and:string=overwrite?'&overwrite=true':'';

            return $.post(this.service + '?a=importexport.insert_destinations'+and,data);
        }

        insertCategories(data:VOCategory[],overwrite:boolean):JQueryPromise<VOResult>{
            var and:string=overwrite?'&overwrite=true':'';
            return $.post(this.service + '?a=importexport.insert_categories'+and,JSON.stringify(data));
        }


        saveInFile(ar:any[],filename:string) :JQueryPromise<any[]> {
           return $.post(this.service + '?a=importexport.save_file&filename='+filename,JSON.stringify(ar));
        }

        uploadCSV(form:FormData, completeHandler: Function, errorHandler: Function, onProgress: Function): void {

            $.ajax({
                url: this.service + '?a=importexport.parse_csv',  //Server script to process data
                type: 'POST',
                xhr: function () {  // Custom XMLHttpRequest
                    var myXhr = $.ajaxSettings.xhr();
                    if (myXhr.upload) { // Check if upload property exists
                        myXhr.upload.addEventListener('progress', onProgress, false);
                    }
                    return myXhr;
                },
                // Form data
                data: form,
                //Options to tell jQuery not to process data or worry about content-type.
                cache: false,
                contentType: false,
                processData: false
            }).done(completeHandler).fail(errorHandler);

        }

        //////////////////////////////Destinations///////////////////
       
        
       // saveCatDests(callBack: Function, data: {}): void {
        //    $.post(this.service + '?a=dests.saveCatDests', data).done(callBack);
       // }
               
      //  addDests(callBack: Function, data: {}): void {
        //    $.post(this.service + '?a=dests.add', JSON.stringify(data)).done(callBack);
       // }

       // overWriteDests(callBack: Function, data: {}): void {
         //   $.post(this.service + '?a=dests.overwrite', JSON.stringify(data)).done(callBack);
       // }

        dropTable(table:string): JQueryPromise<VOResult>{
            return $.get(this.service + '?a=dests.drop_table&table='+table);
        }

        uploadDestinationImage(form: FormData, uid:string): JQueryPromise<VOResult> {
           return  $.ajax({
                url: this.service+'?a=dests.dest_image&id='+uid,  //Server script to process data
                type: 'POST',
                dataType: 'json',
                data: form,
                cache: false,
                contentType: false,
                processData: false
            });
        }
        deleteDestination(id:number) :JQueryPromise<any> {
            return $.get(this.service + '?a=dests.delete&destid='+id);
        }
        saveDestination(data:string):JQueryPromise<VOResult> {
                    // console.log(vo);

            return $.post(this.service + '?a=destination.save',data);
        }
        savePage(url: string,data:string):JQueryPromise<VOResult> {
            return $.post(this.service + '?a=save_page&url=' + url,data);
        }
        getPage(url: string) :JQueryPromise<any> {
            return $.get(this.service + '?a=get_page&url='+url);
        }
        getAdvanced(callBack: Function, destid: number): void {
            $.get(this.service + '?a=dests.get_advanced&destid=' + destid).done(callBack);
        }              
       
        getDestinations(): JQueryPromise<VODestination[]> {
           return $.get(this.service+'?a=dests.get_dests');//.done(callBack);;
        }

        
        ///////////////////////////////////////////////////////SCREEN/////////////////////////////////////////////
        uploadImage(form: FormData, topic:string,type:string): JQueryPromise<VOResult> {
            return  $.ajax({
                url: this.service+'?a=upload_image&folder='+topic+'&prefix='+type,  //Server script to process data
                type: 'POST',
                dataType: 'json',
                data: form,
                cache: false,
                contentType: false,
                processData: false
            });
        }

        getServerTime():JQueryPromise<string>{
            return $.get(this.service + '?a=screen.get_server_time');
        }
        getDevices():JQueryPromise<VOResult>{
        return $.get(this.service + '?a=get_devices');
    }
        getDevicesData():JQueryPromise<VOResult>{
            return $.get(this.service + '?a=get_devices_data');
        }
        restartKiosks():JQueryPromise<VOResult>{
            return $.get(this.service + '?a=restart_kiosks');
        }


        getData(filename:string) :JQueryPromise<string> {

            return $.get(this.service + '?a=get_data&file_name='+filename);
        }
        saveData(data:string, filename:string):JQueryPromise<VOResult>{
            console.log('save data '+filename);
           return $.post(this.service + '?a=save_data&file_name='+filename,data);
        }



        getLabels():any {
            return $.get(this.service + '?a=screen.get_labels','application/json');
        }

        getImages():any {
            return $.get(this.service + '?a=screen.get_images','application/json');
        }

        saveLabels(data:any):JQueryPromise<VOResult>{
          return  $.post(this.service + '?a=screen.save_labels', JSON.stringify(data));

        }


    }
}

