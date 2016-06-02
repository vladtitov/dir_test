/**
 * Created by VladHome on 6/22/2015.
 */

 /// <reference path="../RegA.ts" />

module uplight{
      export class  CategoryList{
          list:JQuery;
          R:RegA;

          private data:VOCategory[];
          dispatcher:JQuery;
          CATEGORY_SELECTED:string='CATEGORY_SELECTED';

          constructor(public view:JQuery){
              this.dispatcher=$({});
              this.R=RegA.getInstance();
              //console.log(this.R.vo);
             // view.find('[data-id=header]:first').html('<div class="icon">Icon</div><div class="name">Name</div>');
              this.list=$('<ul>').on(CLICK,'li',(evt)=>this.onItemClick($(evt.currentTarget))).appendTo(this.view.find('[data-id=list]:first'));
             if(this.R.model.getCategories())this.render();
              this.R.model.dispatcher.on(this.R.model.CHANGE,()=>this.render());
              this.R.dispatcher.on(this.R.CATEGORY_NOTINLIS_CLOSE,()=>this.show());

          }

          render():void{
              var ar:VOCategory[] = this.R.model.getCategories()
                var out:string =''
              for(var i=0,n=ar.length;i<n;i++){
                  out+=this.renderItem(ar[i],i);
              }

              this.list.html(out);
              this.data=ar;
          }

          hide(){
              this.view.hide('fast');
          }

          show(){
              this.view.show('fast');

          }

          private renderItem(item:VOCategory,i:number):string{

              return '<li  class="item ' + (item.enable == 1 ? '' : ' disabled') +'" data-i="'+i+'" data-id="' + item.id + '" ><span class="'+item.icon+'"></span> <span class="name">' + item.label +
                  '</span></li>';
          }
          private onItemClick(el:JQuery):void{
              var i:number = Number(el.data('i'));
              if(isNaN(i)) return;
              var item:VOCategory  = this.data[i];

             this.dispatcher.triggerHandler(this.CATEGORY_SELECTED,item);
              this.selectElement(el);
          }

          private selected:JQuery
          private selectElement(el:JQuery):void{
              if(this.selected) this.selected.removeClass(SELECTED);
              this.selected = el;
              el.addClass(SELECTED);
          }





    }
}