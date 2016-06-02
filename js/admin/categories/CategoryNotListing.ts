/**
 * Created by VladHome on 6/20/2015.
 */

/// <reference path="../rega.ts" />

module uplight{
   export class CategoryNotListing{
        view:JQuery;
        list:JQuery;
        selected:JQuery;
        current:VOCategory;
        btnAdd:JQuery;
        tiSearch:JQuery;
       btnClose:JQuery;
       btnBack:JQuery


        private isVisible:boolean;
       private data:VODestination[];
       private total:JQuery
       private btnClear:JQuery
        R:RegA

        constructor(view:JQuery){
            this.R=RegA.getInstance();
            this.view=view.hide();
            this.total = view.find('[data-id=total]:first');
            this.list=$('<ul>').appendTo(view.find('[data-id=list]:first'));
            this.list.on(CLICK,'li',(evt)=>this.onListClick($(evt.currentTarget)));
            this.btnAdd = view.find('[data-id=btnAdd]:first').on(CLICK,()=>this.onAddClick());
            this.tiSearch = view.find('[data-id=tiSearch]:first').on('input',()=>this.onSearchInput());
            this.btnClose = view.find('[data-id=btnClose]:first').on(CLICK,()=>this.onCloseClicked());
            this.btnBack = view.find('[data-id=btnBack]:first').on(CLICK,()=>this.onCloseClicked());
           // this.R.events.on(this.R.CATEGORY_SELECTED,(evt,cat)=>this.onCategorySelected(cat));
            this.R.dispatcher.on(this.R.CATEGORY_REMOVE_SELECTED,(evt,elms)=>this.onRemoved(elms));
            this.R.dispatcher.on(this.R.CATEGORY_REST,()=>this.render());
            this.btnClear = view.find('.fa-times-circle:first').on(CLICK,()=>this.onClearClicked());

        }

       private onClearClicked():void{
           this.tiSearch.val('');
           this.sortList();
       }

       private  sortList():number{
           var mylist = this.list;
           var listitems = mylist.children().get();
           listitems.sort(function(a, b) {
               return $(a).text().toUpperCase().localeCompare($(b).text().toUpperCase());
           })
           $.each(listitems, function(idx, itm) { mylist.append(itm); });
           return listitems.length;
       }
       private onRemoved(elms):void{
           this.list.prepend(elms);
           setTimeout(()=>this.refreshList(),2000);

       }
       private refreshList():void{
           this.list.children().removeClass(SELECTED);
           this.total.text( this.sortList());

       }
       private onCloseClicked():void{
           this.hide();
           this.R.dispatcher.triggerHandler(this.R.CATEGORY_NOTINLIS_CLOSE);
       }
       private isNewCat:boolean;
         setCurrent(cat:VOCategory):void{
            this.current=cat
           // this.render();
        }
        private onAddClick():void{
            var elms:JQuery =this.list.children('.selected');
            this.R.dispatcher.triggerHandler(this.R.CATEGORY_ADD_SELECTED,[elms]);
            setTimeout(()=>this.refreshList(),500);
        }

        private onSearchInput():void{
                var pat:string=this.tiSearch.val().toLowerCase();
            if(pat.length){
                var mylist = this.list;
                var listitems = mylist.children().get();

                $.each(listitems, function(idx, itm:HTMLElement) {
                        if(itm.innerText.toLowerCase().indexOf(pat)!==-1) mylist.prepend(itm); }
                );
            }else this.sortList();

        }

        private onListClick(el:JQuery):void{
            if(el.hasClass(SELECTED)) el.removeClass(SELECTED);
            else el.addClass(SELECTED);
        }


        show():void{
            if(this.isVisible) return;
            this.view.show('fast');
            this.isVisible = true;
        }

        hide():void{
            if(this.isVisible){
                this.view.hide('fast');
                this.isVisible=false;
            }

        }


       renderItem(item:VODestination,i:number):string{
               return '<li data-type="new" data-id="'+item.id+'" class="item" ><span class="name">'+item.name+'</span><span class="unit pull-right">'+item.unit+'</span></li>';
       }
      // resetData():CategoryNotListing{
        //   if(!this.current) return;

           //return this;
     // }

        render():void{
            if(!this.current) return;
            var out:string='';
           var ar:VODestination[] = this.R.model.getDestinationsNotInCategory();
            for(var i=0,n=ar.length;i<n;i++){
                out+=this.renderItem(ar[i],i);
            }
            this.list.html(out);
            this.data=ar;
           this.total.text(n)
        }


    }

}