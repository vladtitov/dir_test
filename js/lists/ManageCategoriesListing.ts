/// <reference path="../admin/rega.ts" />


module uplight {
    export class ManageCategoriesListing {
        lstDests: JQuery;


        setCategory(cat:VOCategory): void {
            this.cat = cat;            
            var data: VODestination[]

            //if (cat.type == 1 || cat.type == 2) {               
             //   $('#arrows button').prop('disabled', true)
              //  $('#CatDestsList input[type="button"]').prop('disabled', true)
           // } else {               
             //   $('#arrows button').prop('disabled', false)
              //   $('#CatDestsList input[type="button"]').prop('disabled', false)
           // }
            data = this.R.model.getAllByCat(cat.catid);
           
            this.renderData(data);
            $('#txtInCategory').text('In Category:' + cat.label);
            $('#inCatTotal').text('Total:' + data.length);
           // this.destsList.setCat(cat.catid);
        }
                

        addListing(list: JQuery): void {
            this.lstDests.append(list);
        }
        reset(): void {
            $('#txtInCategory').text('');
            this.lstDests.html('');
        }
       

        R:RegA
        constructor() {
            this.R=RegA.getInstance();
            this.init();
        }
        
        private renderData(data: VODestination[]): void {
            var out: string = '';
            for (var i = 0, n = data.length; i < n; i++) out += '<li class="uplight" data-id="' + data[i].destid + '" >' + data[i].name + '<span>' + data[i].unit + '</span></li>';
            this.lstDests.html(out)
        }
       

        private _data:VODestination;
        private cat: VOCategory;
       
       // private destsList: DestinationsListCat;
        private _haveChanges: boolean;
        private categories:EditCategories;
        private showAll: JQuery;
        private btnRemove: JQuery;
        private btnSaveListing: JQuery;


        private init(): void {
            this.btnSaveListing = $('#btnSaveListing');
            this.btnSaveListing.on(CLICK, () => this.saveListing())

            this.showAll = $('#showAll');
            this.showAll.on(CLICK, () => this.showAllCLICK());

            this.btnRemove = $('#btnRemove');
            this.btnRemove.on(CLICK, () => this.removeFromListing());

            this.lstDests = $('#CatDests');  /// <HTMLDivElement> document.getElementById(id);
            this.lstDests.on(CLICK, 'li', (evt) => this.onSelected(evt));
            //$('#CatDestsList input[type="button"]').on(CLICK, (evt) => this.onSaveClicked(evt));
            $('#arrowadd').on(CLICK, () => this.addToListing());           
                     
           // this.destsList = new lists.DestinationsListCat();    
            
            
           // this.categories = new lists.CategoriesList();
           // this.categories.skipDisabled = true;

           // this.categories.onChange = (cat: admin.VOCategory) => this.onCatChange(cat); 
            $('#arrows').hide();
            $('#Destinations').hide();          
        }

        private showAllCLICK(): void {
            if (this.showAll.prop('checked')) {
                $('#Destinations').show('fast');
                $('#arrows').show('fast');
            } else {
                $('#arrows').hide('fast');
                $('#Destinations').hide('fast');
            }
        }
        private saveListing(): void { 
            this.btnSaveListing.prop('disabled', true);          
            this.R.model.saveCatDest((res) => this.onSaveCatDest(res));
        }
        private onSaveCatDest(res): void {
            this.haveChanges(false);
           // this.R.vo.deleteChanges();
        }

        private haveChanges(b: boolean) {
            if (b) {
                this.btnSaveListing.prop('disabled', false);
               // this.btnSaveListing.animate({
                //    fontSize: '1.5em'
              //  }, 2000);
                       
            } else {
                this.btnSaveListing.prop('disabled', true);
            }
            this._haveChanges = b;
        }

        private removeFromListing(): void {
            if (!this.haveChanges) {
               
                this.haveChanges(true);
            }
            var lst: JQuery = this.lstDests.children('.selected').removeClass('selected');
            var cat: number = this.cat.catid;
            $(lst).each(function (id, el) {
                var num: number = Number($(el).data('id'));               
                if (!isNaN(num)) this.R.model.removeCategory(num, cat);
            });
            lst.remove();
            this.btnRemove.prop('disabled', true);
            //this.destsList.filterByCat(cat);
        }
        private addToListing(): void {
            if (!this.haveChanges) {
                this.btnSaveListing.prop('disabled', false);
                this.haveChanges(true);
            }
            /////////////////////////////////////////////

          /*             
            var lst = this.destsList.getSelected();
            var cat: number = this.cat.catid;
            $(lst).each(function (id, el) {
                var num: number = $(el).data('id');               
                if (!isNaN(num))  R.vo.addCategory(num, cat);
            });
                 
            this.addListing(lst);
            */
            //this.updateCat();
        }
        /*
        private updateCat(): void {
            var out: string = '';
            var total: number;
            this.lstDests.children().each(function (ind, val) { total = ind; out += val.getAttribute('data-id') + ','; });

            this.cat.dests = out;
            R.vo.eraseCat(this.cat);
        }
        */
        private onCatChange(cat:VOCategory): void {
            this.showAll.prop('disabled', false);
            this.btnRemove.prop('disabled', true);
            if (cat.enable != 1) this.reset();
            else this.setCategory(cat);
          
        }
        private multy: boolean;
        private selectedItem: JQuery;
        private onSelected(evt: JQueryEventObject): void {
            if (evt.ctrlKey) {
                this.multy = true;
                $(evt.currentTarget).toggleClass('selected');
            }
            else if (evt.shiftKey) { }
            else {
                if (this.multy) this.lstDests.children().removeClass('selected');
                this.multy = false;
                if (this.selectedItem) this.selectedItem.removeClass('selected');
                this.selectedItem = $(evt.currentTarget).addClass('selected');
            }
            this.btnRemove.prop('disabled', false);
            //if (this.onChange) this.onChange(this._data[$(evt.currentTarget).data('id')]);

        }
        private onSaveClicked(evt: JQueryEventObject): void {                        
            this.R.connector.updateCategory((resp) => this.onSave(resp), this.cat);
        }
        private onSave(resp): void {

        }

       
    }
}

//var manageCategoriesListing: lists.ManageCategoriesListing = new lists.ManageCategoriesListing();