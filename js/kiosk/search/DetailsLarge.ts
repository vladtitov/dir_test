/**
 * Created by VladHome on 7/23/2015.
 */

    /// <reference path="../Registry.ts" />

module uplight{
   export class  DetailsLarge{
       vo:VODestination
       imgs:string[];
       $name:JQuery;
       $unit:JQuery;
       $more:JQuery;
       $info:JQuery;
       $tumb:JQuery;
       $gallery:JQuery;
       $img:JQuery;
       $page:JQuery;

      static DETAILS_LARGE_HIDE:string = 'HIDE_DETAILS_LARGE';
      static DETAILS_LARGE_CLOSE_CLICK:string = 'DETAILS_LARGE_CLOSE_CLICK';
      static DETAILS_LARGE_SHOW:string = 'SHOW_DETAILS_LARGE';
       isVis:boolean

       onClose:Function

       show():void{
           if(!this.isVis){
               this.view.removeClass(HIDE).show();
               this.isVis = true;
           }

       }

       hide():void{
           if(this.isVis){
               this.view.addClass(HIDE).hide();
               this.isVis=false;
           }
       }

       private view:JQuery

       constructor(el:HTMLElement){
          // console.log(view);
           var view=$(el);
           this.view = view;
           this.$name= view.find('[data-id=name]:first');
           this.$unit= view.find('[data-id=unit]:first');
           this.$more= view.find('[data-id=more]:first');
           this.$info= view.find('[data-id=info]:first');
           this.$tumb= view.find('[data-id=tumb]:first');
           this.$gallery= view.find('[data-id=gallery]:first');
           this.$gallery.on(CLICK,'a',(evt)=>this.onGalClick(evt));
           this.$img= view.find('[data-id=image]:first');
           this.$page= view.find('[data-id=page]:first');


           this.isVis = !view.hasClass(HIDE);
           view.find('[data-id=btnClose]').click(()=>{
               var r:Registry = Registry.getInstance();
               r.events.triggerHandler(DetailsLarge.DETAILS_LARGE_CLOSE_CLICK);
           })


           this.addListeners();
       }

       addListeners():void{
           var r:Registry = Registry.getInstance();
           r.events.on(DetailsLarge.DETAILS_LARGE_SHOW,(evt,id)=>this.showDetails(id));
           r.events.on(DetailsLarge.DETAILS_LARGE_HIDE,(evt)=>this.hide());
           r.events.on(r.TIMEOUT,(evt)=>this.hide());
       }

       private showDetails(id:number):void{
           var dest:VODestination =  Registry.getInstance().model.getDestById(id);
           this.setDestination(dest).render().show();
       }

       setDestination(vo:VODestination):DetailsLarge {
           this.vo = vo
           return this
       }


       render():DetailsLarge{
           var vo:VODestination= this.vo;

               this.$name.text(vo.name);
               this.$unit.text(vo.unit || '');

           this.$more.html(this.createTable(vo.more || ''));
           if(vo.tmb)this.$tumb.html('<img src="'+vo.tmb+'">');
           else this.$tumb.html('');
           if(vo.imgs && vo.imgs.length){
               var imgs:string[]=vo.imgs.split(',');
               this.$gallery.html(this.createGallery(imgs));
               this.$img.attr('src',imgs[0]);
           }else {
               this.$gallery.html('');
               this.$img.attr('src','');
           }

            return this;

       }

      createTable(more:string):string{
         if(more.length===0) return '';
           var ar = more.split("\n");
           var out:string='<div class="more" ><table class="table">';

           for(var i=0,n=ar.length;i<n;i++){
               var item = ar[i].split('\t');
               out+='<tr><td>'+(item[0]||'&nbsp;')+'</td><td>'+(item[1]||'&nbsp;')+'</td></tr>';
           }

           out+='</table></div>';
           return out;
       }

        private  createGallery(imgs:string[]):string{
            var ar = imgs;
            var out='';
            for(var i=0,n=ar.length;i<n;i++)   out+='<a><img src="'+ar[i]+'" /></a>';
            out+='';
            return out;
       }

       private onGalClick(evt:JQueryEventObject):void{
           console.log($(evt.currentTarget));
            this.$img.attr('src',$(evt.currentTarget).children('img').first().attr('src'));
       }


    }
}