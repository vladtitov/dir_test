/**
 * Created by VladHome on 8/16/2015.
 */
    /// <reference path="../RegA.ts" />

module uplight{
   export class GalleryPreview implements Preview{
       data:DataGallery;
       constructor(prop:ALProps,template:VOAttractLoop,public i:number){

           var data:DataGallery = new DataGallery();
           data.props = prop;
           data.template=template;
           this.data = data;

           this.R = RegA.getInstance();
           console.log('Gallery list '+prop.url);
           this.view =  $('#Template [data-ctr=GalleryPreview]:first').clone();
           this.list=$('<ul>').appendTo(this.view.find('.nano')).hide();

           this.btnShowImages = this.view.find('[data-id=btnShowImages]').click(()=>this.onShowImages());
           this.btnEdit = this.view.find('[data-id=btnEdit]:first').click(()=>this.onEditClick());
           this.$name = this.view.find('[data-id=name]');
           this.$delay = this.view.find('[data-id=delay]');
           this.$size = this.view.find('[data-id=size]');
           this.loadData();
       }
       $name:JQuery;
       $delay:JQuery;
       $size:JQuery;
       private R:RegA;
       type:string='gallery';
       view:JQuery;
       list:JQuery;
       btnShowImages:JQuery;
       btnEdit:JQuery;
       private inTransaction:boolean;
      // gallery:string[];


       appendTo(container):void{
           this.view.appendTo(container);
       }
       saveData(data:DataGallery):JQueryPromise<VOResult>{
           this.data = data;
           return this.save();
       }

       getData():DataGallery {
           return this.data;
       }

       setData(data:DataGallery):void {
           this.data= data;
       }

      /* private onEditorClose():void{
           this.view.show();
          // this.editor.view.remove();
           this.loadData();
           if(this.onEditExit)this.onEditExit();
       }*/

       private onEditClick():void{
         this.R.dispatcher.triggerHandler(this.R.ATTRACTLOOP_EDIT,this);
       }




       private save():JQueryPromise<VOResult>{

          return this.R.connector.saveData(JSON.stringify(this.data.gallery),this.data.props.url)
       }
       private loadData():void{
           this.inTransaction = true
           this.R.connector.getData(this.data.props.url).done((res)=>this.onData(res))
       }



       private onData(res:string):void{
           this.inTransaction =false;
           this.data.gallery = JSON.parse(res);
           //console.log(this.data);
           this.render();

       }

       private onShowImages():void{
           if(this.btnShowImages.data('vis')){
               this.list.hide('fast');
               this.btnShowImages.data('vis',false);
               this.btnShowImages.children().last().text('Show Images');
           }else {
               this.btnShowImages.data('vis',true);
               this.list.show('fast');
               this.btnShowImages.children().last().text('Hide Images');
           }
       }


       private renderProp():void{
           this.$name.text(this.data.template.name);
           this.$delay.text(this.data.props.delay);
           this.$size.text(this.data.template.size);
       }

       render():void{
           this.renderProp();
           var ar = this.data.gallery;
           var out:string='';
           for(var i=0,n=ar.length;i<n;i++){
               out+='<li data-i="'+i+'"><img src="'+ar[i]+'" /></li>';
           }
           this.list.html(out);


       }


    }

}