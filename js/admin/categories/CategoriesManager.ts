
/// <reference path="../rega.ts" />

/// <reference path="CategoryForm.ts" />
/// <reference path="CategoriesList.ts" />
module uplight {

    export class CategoriesManager {



        constructor(container:JQuery) {
            this.R=RegA.getInstance();
            if (!this.R.model) this.R.model = new DestinantionsModel();
            container.load('htms/admin/CategoriesManager.htm',()=>{this.init()})
        }

        
        private btnAdd: JQuery;
        private btnEdit:JQuery
        private btnDel: JQuery;


       private categoryForm: CategoryForm;

        private total: JQuery;
        private title: JQuery;

        view: JQuery;
        private list:CategoriesList;


        R:RegA

        private isVisible:boolean
        show():void{
            this.isVisible = true;
            this.view.show('fast');
        }

        hide():void{
            if(this.isVisible){
                this.isVisible = false;
                this.view.hide('fast');
            }
        }
        private init(): void {
            this.view = $('#CategoriesManager');
            this.categoryForm= new CategoryForm($('#CategoryForm'));
            this.categoryForm.onClose=()=>{
                this.show();
            }
            this.list = new CategoriesList($('#CategoriesList'));
            this.R.model.dispatcher.on(this.R.model.CHANGE,()=>{this.onModelChanged()});

            this.btnAdd = $('#CategoriesView [data-id=btnAdd]:first').on(CLICK,()=> this.onAddClicked());
            this.btnEdit = $('#CategoriesView [data-id=btnEdit]:first').on(CLICK,()=> this.onEditClicked());
            this.btnDel = $('#CategoriesView [data-id=btnDel]').on(CLICK, () => this.onDelClicked());
            this.total = this.view.find('[data-id=total]');
            this.title = this.view.find('[data-id=title]');
            this.isVisible=true;
        }



        private onModelChanged(): void {
           // this.editCategories.renderList();

        }





        private onAddClicked(): void {
          var cat = new VOCategory({id:0});
            cat.dests=[];
            cat.sort = this.R.model.getCategories().length+1;
            cat.icon='icon';
            cat.enable = 1;
            this.categoryForm.setCurrent(cat);
            this.categoryForm.show();
            this.hide();
           
        }


        private onEditClicked(): void {
            this.categoryForm.show();
            this.hide();
        }


        private onDeleteSuccess(res):void{
                console.log(res);
        }
        private onDelClicked(): void {
           // console.log('delite');
            var item = this.list.selectedItem;
           // console.log(item);
            if(!item) return;
            this.R.confirm.show('Delete Category','Yoy want to delete category '+item.label+'?',()=>{
                this.R.model.deleteCategory(item,(res)=>this.onDeleteSuccess(res));
            });

        }


       

       
    }
}

