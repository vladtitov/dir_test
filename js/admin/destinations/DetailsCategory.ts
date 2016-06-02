/**
 * Created by VladHome on 6/18/2015.
 */
/// <reference path="../RegA.ts" />
module uplight{
    export class DetailsCategory{
        view:JQuery
        haveChanges:boolean;
        private categories:JQuery
        private categoriesAll:JQuery;
        private model:VOCategory[];
        R:RegA
        private current:VODestination;


        render():void{
            var cats =this.current.catsStr?this.current.catsStr.toString():'';
            this.categories.val(cats);
        }

        reset():void{
            this.hideEditCategories();
            this.categories.val('');
            this.current.cats=null;
        }
        constructor(view:JQuery){
            this.view = view;
            this.R = RegA.getInstance();
            this.categories = view.find('[data-id=categories]:first').on('click', ()=>this.showHideCategories());
            this.categoriesAll = $('#details-categories-list').on('click', 'input', (evt)=>this.onCategoryClick($(evt.currentTarget))).hide();
        }



        setCurrent(dest:VODestination):void{
            this.current=dest;
            this.hideEditCategories();
        }


        private catsVisible:boolean;



        private hideEditCategories():void {
            if (this.catsVisible) {
                this.categoriesAll.hide('fast');
                this.catsVisible = false;
            }
        }

        private showEditCategories():void {
            if (this.catsVisible) return
            this.categoriesAll.show('fast');
            this.catsVisible = true;
        }

        private showHideCategories():void {
            console.log(this.catsVisible)
            if (this.catsVisible) this.hideEditCategories();
            else {
                this.editCategories();
                this.showEditCategories();
            }
        }



        private addCategory(cat:VOCategory):void {
            var id:number = cat.id
            var ar:number[] = this.current.cats;
            console.log(ar);
            if (ar.indexOf(id) === -1) {
                ar.push(id);
                this.current.catsStr = this.R.model.getCategoriesNames(ar);
                this.render();
            }
        }

        private removeCategory(cat:VOCategory):void {
            var id:number = cat.id
            var ar:number[] = this.current.cats;
            var ind = ar.indexOf(id);
            if (ind !== -1) {
                ar.splice(ind, 1);
                this.current.catsStr = this.R.model.getCategoriesNames(ar);
               this.render();
            }
        }


        private onCategoryClick(el:JQuery) {
            var cat:VOCategory = this.R.model.getCategoryById(el.val());
            if (el.prop('checked')) this.addCategory(cat);
            else this.removeCategory(cat);
        }

        private editCategories():void {
         //   console.log('editCategories '+this.current.cats ,this.current);
            if (!this.current.cats || this.current.cats.length ===0){
                this.current.cats =[];
                this.renderAllCats();
                return;
            }

            var ar1:VOCategory[] = []
            var ar2:VOCategory[] = []
            var cats:VOCategory[] = this.R.model.getCategories();
            var catsAr:number[] = this.current.cats;

            for (var i = 0, n = cats.length; i < n; i++) {
                if (catsAr.indexOf(cats[i].id) == -1) ar2.push(cats[i]);
                else ar1.push(cats[i]);
            }
            var out:string = this.renderCats(ar1, true);
            out += this.renderCats(ar2, false);
            this.categoriesAll.html(out);
        }

        private renderAllCats():void{
           // console.log('renderAllCats   ', this.R.model.getCategories());
            this.categoriesAll.html(this.renderCats(this.R.model.getCategories(),false));
        }
        private renderCats(cats:VOCategory[], selected:boolean):string {
            var out:string = '';
            // out += '<li ' +( selected?'class="selected" >':'>')+ cats[i].label + '<input class="unit" type="checkbox" value="' + cats[i].catid + '" ' + (selected?'checked="true"':'')+'/></li>';
            for (var i = 0, n = cats.length; i < n; i++) {
                out += '<div><input type="checkbox" value="' + cats[i].id + '" ' + (selected ? 'checked="true"' : '') + '/><label>' + cats[i].label + '</label></div>';
            }
            return out;
        }

    }
}