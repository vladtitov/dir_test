/// <reference path="../admin/models.ts" />
/// <reference path="../admin/rega.ts" />

module admin{

    export class CategoriesList {
        list: JQuery;  
        onChange: Function; 
        selectedItem: admin.VOCategory;
             
        refresh(): void {
            this._data = R.modelCats.getData();
            var out: string = ''
            for (var i = 0, n = this._data.length; i < n; i++)out += '<li class="uplight' + (this._data[i].enable == 1 ? '' : ' disabled') + '" data-i="' + i + '"  data-id="' + this._data[i].catid + '"    >' + this._data[i].label + '</>';
            this.list.html(out);
            this.selectedItem = null;
        } 

        constructor() {           
            this.init();
        }


        init(): void {
            this.list = $('#lstCats'); 
                   
            $(this.list).on(CLICK, 'li', (evt) => this.onCategoryClick(evt));
           // if (!R.modelCats) {
              //  R.modelCats = new admin.ModelCategories();               
               // R.modelCats.refresh();
           // } else this.refresh(); 

           // R.modelCats.onChange = () => this.onModelChanged();           
        }
        private onModelChanged(): void {            
            this.refresh();
        } 
        private onCategoryClick(evt: JQueryEventObject): void {
            var i: number = Number($(evt.target).data('i'));
          
            if (isNaN(i)) return;           
            
             if (this.selected) this.selected.removeClass(SELECTED);
                // this.list.children().removeClass('selected');
             this.selected = $(evt.target);
            this.selected.addClass(SELECTED);
            console.log(this._data);           
           // this.selectedItem = this._data[i];
           //if(this.onChange)this.onChange();          
           
        }


        public selected: JQuery;
       
        private _data: admin.VOCategory[];
       
    }
   
}

