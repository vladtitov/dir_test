/**
 * Created by VladHome on 6/20/2015.
 */
    ///<reference path="../RegA.ts" />
module uplight{
    export class CategoriesList{
        view:JQuery
        list:JQuery
        listView:JQuery;
        private selected:JQuery
        selectedItem:VOCategory;
        private data:VOCategory[];
        R:RegA;


        constructor(view:JQuery){
            this.view = view;

            var table:JQuery=view.find('.table:first');

            var head:JQuery=$('<thead>');
            head.html('<tr class="header"><th class="id">ID</th><th class="icon">Icon</th><th class="name">Name</th><th class="seq">Sequence</th><th class="seq">Enabled</th><th class="recs">Records</th></tr>');
            table.append(head)

            this.list = $('<tbody>');
            table.append( this.list)
            this.listView = $('#CategoriesList-container');
            this.R = RegA.getInstance();
            this.R.model.dispatcher.on(this.R.model.CHANGE,()=>{this.onModelChanged()});
            if(this.R.model.getCategories()) this.renderList();
            this.list.on(CLICK,'tr',(evt)=>this.onClick($(evt.currentTarget)))
            this.R.model.dispatcher.on(this.R.model.CATEGORIES_CAHANGE,(evt,cata)=>this.onCategoriesChanged())

        }

        private onCategoriesChanged():void{
            this.renderList();
            if(this.selectedItem)this.selectElementById(this.selectedItem.id);
        }

        private onClick(el:JQuery){
            var i:number = Number( el.data('i'));
            if(isNaN(i)) return
            var cat = this.data[i];
            if(cat){
               // console.log(cat);
                this.selectedItem = cat;
                this.selectElement(el);
                this.R.dispatcher.triggerHandler(this.R.CATEGORY_SELECTED,cat);
            }

        }

        private selectElementById(id:number):void{
            var el = this.list.find('[data-id='+id+']');
            if(el) this.selectElement(el);

        }

        private selectElement(el:JQuery):void{
            if(this.selected) this.selected.removeClass(SELECTED);
            el.addClass(SELECTED);
            this.selected = el;
        }

        private onModelChanged():void{

            this.renderList();
        }

        renderList():void{
            this.R.model.mapCategories();
            var ar = this.R.model.getCategories();
            var out='';
            for(var i=0,n=ar.length;i<n;i++){
               out+=this.renderItem( ar[i],i);
            }
            this.list.html(out)
            this.data= ar;
        }


        private renderItem(item: VOCategory,i:number): string {
            var total=0;
            var enbl:string ='fa fa-check';
            if(!item.enable)enbl = 'fa fa-minus';
            if(item.dests)total =item.dests.length;
            //if (this.isChange) return '<li class="uplight" data-id="' + item.catid + '"    ><div class="catname ' + (item.enable == 1 ? '' : ' disabled') + '" contentEditable="true">' + item.label + '</div></li>';
            return '<tr  class="item ' + (item.enable == 1 ? '' : ' disabled') +'" data-i="'+i+'" data-id="' + item.id + '" >' +
                '<td class="id">'+item.id+'</td>' +
                '<td class="icon"><span class="'+item.icon+'"></td>' +
                '<td >' + item.label +'</td>' +
                '<td >'+item.sort+ '</td>' +
                '<td ><span class="'+enbl+ '"></span></td>' +
                '<td >'+total+'</td>' +
                '</tr>';
            // return '<li class="uplight" data-id="' + item.catid + '"    ><div class="catname ' + (item.enable == 1 ? '' : ' disabled') + '" >' + item.label + '</div></li>';
        }
    }
}
