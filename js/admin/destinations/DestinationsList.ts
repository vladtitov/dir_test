/// <reference path="../rega.ts" />
/// <reference path="DestinationsController.ts" />
module uplight {
    export class DestinationsList {
        
       // isMultyselect: boolean = true;


        setSelectedItem(vo:VODestination):void{
            this.selectedItem=vo;

        }
        getSelectedItem():VODestination{
            return this.selectedItem
        }

        show():void{
            this.view.show();
            if(this.selectedEl){
                var num:number = this.selectedEl.offset().top;
                if(num>700 || num<200) this.scrollToElemnt(this.selectedEl);
            }
        }

        hide():void{
            this.view.hide();
        }

        reset(){
            this.selectedItem=null;
            this.listContainer.scrollTop(0);
            this.selectedEl=null;
        }


        R:RegA;


        selectedItem:VODestination;
        private selectedLI: JQuery;
        private tiFilter: JQuery;
        private content:JQuery
        private currentCat: number


        private destinations:VODestination[];
        dispatcher:JQuery=$({});
        SELECTED:string='SELECTED';
        private listContainer:JQuery
        view: JQuery;
        list: JQuery;
      //  details:DetailsEditor;
        onChange: Function;
        private thead:JQuery
        private table:JQuery
        private total: JQuery
        private selectCats: JQuery;

        private init(): void {
            this.listContainer=this.view.find('.nano:first')
            this.thead =$('<thead>').html('<tr class="item-header">' +
                '<th class="item-id">id</th>' +
                '<th class="item-name">Name</th>' +
                '<th class="item-unit">Unit</th>' +
                '<th class="item-categories">Categories</th>' +
                '<th class="">Short Info</th>' +
                '<th title="Thumbnail" class="">Thumb</th>' +
                '<th class="">Info Table</th>' +
                '<th title="Amount of Images" class="">Images</th>' +
                '<th title="Keywords amount" class="">KWs</th>' +
                '<th title="Unique Identifier" class="item-uid">UID</th>' +
                '</tr>');
            this.table = $('<table>').addClass('table table-striped').append(this.thead).appendTo(this.listContainer);
            this.list=$('<tbody>').appendTo(this.table);
            // this.listContainer =$('<div>').addClass('list-container').append(this.list).appendTo(this.table);
            //  this.listView =


            this.list.on(CLICK, 'tr', (evt) => this.onSelected(evt));

            this.tiFilter = $('#txtFilter');
            this.tiFilter.bind('input', () => this.onFilterChange());
            this.selectCats = this.view.find('[data-id=select]').on(CHANGE, (evt) => this.onSelectChange(evt));

            this.total = this.view.find('[data-id=total]')
            this.currentCat = 0;

            this.R.model.dispatcher.on(this.R.model.CHANGE,()=>this.onModelChange());
            this.destinations = this.R.model.getData();
            if(this.destinations) {
                this.renderDestinations();
                this.renderCategories();
            }


        }
        constructor(view:JQuery) {
            this.view = view;
            this.R =RegA.getInstance();
            this.init();
        }

        private onFilterChange(): void {
            this.filterList(this.tiFilter.val());
        }

        private  filterList(pattern: string): void {
            this.destinations = this.R.model.getDestinantionsByPattern(pattern);
            this.reset();
            this.renderDestinations();

        }
        private onModelChange(): void {
            this.tiFilter.val('');
            this.renderCategories();
            this.destinations = this.R.model.getData();
            this.renderDestinations();

        }



        private selectedEl:JQuery;
        private onSelected(evt: JQueryEventObject): void {
            var el:JQuery = $(evt.currentTarget);
            var i:number =   this.selectElement(el);
           var dest:VODestination  = this.destinations[i];
            console.log(dest);
            this.selectedItem  = dest;
            this.dispatcher.triggerHandler(this.SELECTED,dest);
        }



        private renderItem(item: VODestination,i:number): string {
            return '<tr class="item" data-i="'+i+'" data-id="' + item.id + '" >' +
                    '<td class="id">'+item.id+'</td>'+
                    '<td class="name">'+ item.name+'</td>'+
                    '<td class="unit">'+ item.unit + '</td>' +
                    '<td class="cats">'+(item.catsStr?item.catsStr.join(', '):'&nbsp')+'</td>'+
                    '<td class="small"><div>'+ item.info + '</div></td>' +
                '<td class="tmb">'+ (item.tmb?'<img src="'+item.tmb+'" />':'') + '</td>' +
                    '<td class="more"><div>'+ item.more + '</div></td>' +
                    '<td class="imgs">'+ (item.imgs?(item.imgs.split(',').length+''):'&nbsp') + '</td>' +
                    '<td class="kws">'+ (item.kws?(item.kws.split(',').length+''):'&nbsp') + '</td>' +
                    '<td title="'+item.uid+'" class="uid">'+(item.uid ||'&nbsp')+'</td>'+
                    '</tr>';
        }




       private renderDestinations():void {
           this.selectedEl=null;
               var ar = this.destinations
         //  console.log(ar);
               var out: string = '';
               for (var i = 0, n = ar.length; i < n; i++){
                   out += this.renderItem(ar[i],i);
               }

           this.list.html(out);
           this.total.text(n);
            if(this.selectedItem) this.selectItemById(this.selectedItem.id);
       }

        private selectElement(el:JQuery):number{
            console.log('selecting '+el.offset().top);
            var i:number = Number(el.data('i'));
            if (isNaN(i)) return 0;
            if(this.selectedEl)this.selectedEl.removeClass('selected');
            el.addClass('selected');
            this.selectedEl = el;
            return i;
        }
        private selectItemById(id:number):JQuery{
            var el = this.list.children('[data-id='+id+']:first');
            if(el)this.selectElement(el);
            return el;
        }

        private scrollToElemnt(el:JQuery):void{
            console.log('scrolling ');
                this.listContainer.scrollTop(0);
                var num:number = +el.offset().top;
                this.listContainer.scrollTop(num-300);
        }

/*
        renderHeader(){
            var tr = this.list.children()[0]

            var thead = this.thead.find('th');
            $(tr).children('td').each(function(ind,el){

                $(thead[ind]).width($(el).width());
                // console.log($(el).width());
            });
            this.table.prepend(this.thead);
        }
        */

       // private listContainer:JQuery;




        private renderCategories():void{
            var ar:VOCategory[] = this.R.model.getCategories();
           // console.log(ar);
            var str: string = '<option value="0">All</option>';
            str += '<option value="-1">unassigned</option>';
            for (var i = 0, n = ar.length; i < n; i++) str += this.renderCats(ar[i]);
            this.selectCats.html(str);


        }

        private renderCats(vo: VOCategory): string {
            return '<option value="'+vo.id+'">' + vo.label + '</option>';
        }
       
        private onSelectChange(evt: JQueryEventObject): void {
            var cat: number = Number($(evt.target).prop('value'));
            if(!isNaN(cat))   this.filterByCategory(cat);

        }
        private filterByCategory(cat: number): void {
            this.currentCat = cat;
            if(this.currentCat == 0)this.destinations = this.R.model.getData();
            else if(this.currentCat ==-1) this.destinations = this.R.model.getUnassigned();
            else   this.destinations = this.R.model.getDestinationsInCategory(this.currentCat)
            this.tiFilter.val('');

            this.reset();
            this.renderDestinations();

        }
       // private catFilter: string = '-1';
       
       

    }
}