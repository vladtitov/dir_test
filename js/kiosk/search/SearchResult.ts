/// <reference path="../Registry.ts" />
/// <reference path="SearchModel.ts" />
/// <reference path="Categories.ts" />
/// <reference path="KeyboardSimple.ts" />

module uplight {
    export class SearchResult {
       // static SEARCH_RESULT_SELECT:string = 'SEARCH_RESULT_SELECT';
       /// static SEARCH_RESULT_SHOW_DESTINATION:string = 'SEARCH_RESULT_SHOW_DESTINATION';
        private data:DestModel[];
        model:Model
        result:DestModel[];
        cache:{};
        list:JQuery
        currentCats:number[];
        currentPattern:string;
        //details:Details;
        R:Registry
        mainport:JQuery
      //  cover:JQuery

        private view:JQuery
       // viewDetails:JQuery
        detailsContent:JQuery;

        //onSelect:Function;
        header:JQuery;
        private HEADER:string;
        constructor(private el:HTMLElement){
            this.view = $(el);
            this.R=Registry.getInstance();
            this.model= Registry.getInstance().model;
            this.list=$('#list-scroll');
            this.addListeners();
            this.cache={};
            this.mainport = $('#mainport');
            this.header = this.view.find('[data-id=header]');
            this.HEADER = this.header.text();
           // this.viewDetails = $('#DetailsLarge').click((evt)=>this.onCoverClick(evt))
          //  this.detailsContent = this.viewDetails.find('.content:first');

        }

        reset():void{
            this.result = this.data;
            this.render(true);
            this.list.scrollTop(0);
        }
        addListeners():void{
            this.R.events.on(this.R.CATEGORIES_CHANGE,(evt,cats:number[])=>this.onCategoriesChange(cats))
            this.R.events.on(this.R.INPUT_CHANGED,(evt,pattern:string)=>this.onSearchChange(pattern))
            this.R.events.on(this.R.TIMEOUT,()=>this.reset());
            this.model.dispatcher.on(this.model.READY,()=>this.onDataReady());
            this.list.on(CLICK,'li',(evt)=>this.onListClick(evt));
            this.R.events.on(this.R.CATEGORY_SELECTED,(evt,catid)=>this.onCategorySelected(catid));
            this.R.events.on( this.R.SEARCH_RESULT_SHOW_DESTINATION,(evt,id)=>this.showDestination(id));
           // console.log('listeners');
        }

        private onCategorySelected(catid:number){
            var cat:VOCategory = this.model.getCategoryById(catid);
            this.header.html('<span class="'+cat.icon+'"> </span> <span>'+cat.label+'</span>');
            var out:DestModel[] =[];
            var ar = this.data;
            for(var i=0,n=ar.length;i<n;i++){
                if(ar[i].hasCategory(catid)) out.push(ar[i]);
            }
            this.result = out;
            this.render(true);
        }

        private showDestination(id:number):boolean{
            return this.dataInd[id].togleDetails();
        }

        selected:JQuery;
       selectedIndex:number

        private onListClick(evt:JQueryEventObject):void{
            console.log(evt.currentTarget);
            var el:JQuery = $(evt.currentTarget);

            console.log(el.data());
            var id:number = Number(el.data('id'));
            if(isNaN(Number(id)) || !this.dataInd[id]) return;

            if(this.selected)  this.selected.removeClass(SELECTED);
            this.selectedIndex = el.index();
            this.selected = el.addClass(SELECTED);
            this.R.events.triggerHandler( this.R.SEARCH_RESULT_SELECT,id);
            //if(this.onSelect )this.onSelect(id);
           this.R.connector.Stat('sr',id.toString());

        }

        private isDetails:boolean;
        /*
        private hideDetails():void{
            if(this.isDetails){
               // this.viewDetails.hide();
               // this.detailsContent.empty();
                this.isDetails = false;
            }
        }
        private onCoverClick(evt:JQueryEventObject):void{
           // console.log($(evt.target));
            if($(evt.target).data('id')=='btnClose'){
                this.hideDetails();
            }
        }

        private showDetailsLarge(det:JQuery):void{

            //this.viewDetails.show();
          //  this.detailsContent.append(det);
            this.isDetails = true;

        }
*/
        private onSearchChange(pattern:string):void{
            this.currentPattern = pattern.toLowerCase();
          //  console.log(pattern);
            if(pattern.length){
                this.result = this.filterSearch();
                this.render(false);
            }
            else{
                this.result = this.data;
                this.render(true);
            }

            this.header.text(this.HEADER);
        }

        private filterSearch():DestModel[]{
            var out1:DestModel[]=[];
            var out2:DestModel[]=[];
            var out3:DestModel[]=[];
           var ar = this.data;
            var str= this.currentPattern;
           for(var i=0,n=ar.length;i<n;i++){
               ar[i].clearKeyword();
               var ind = ar[i].filterStr(str);
               if(ind===1)out1.push(ar[i]);
               else if(ind===2)out2.push(ar[i]);
               else if(ind===3)out3.push(ar[i]);
           }
            return out1.concat(out2,out3);
        }


        private onCategoriesChange(cats:number[]):void{
            this.currentCats=cats;
           console.log(cats);
            this.filterCats(cats);
        }

        private filterCats(cats:number[]):void{
                var ar:DestModel[] = this.data
                for(var i=0,n=ar.length;i<n;i++) ar[i].setCats(cats).render();

        }

        private render(reset:boolean):void{
            console.log('reset '+reset);
            if(this.selected)  this.selected.removeClass(SELECTED);
            this.selectedIndex=-1
            var ar:DestModel[] = this.result;
            this.list.children().detach();
            var ul:JQuery=$('<ul>');
            for(var i=0,n=ar.length;i<n;i++){

                ar[i].appendTo(ul,reset);
            }
             this.list.append(ul);
        }

        private dataInd:DestModel[];
        private onDataReady():void{
            var ar = this.model.getData();
            var list= this.list, out:DestModel[] =[];
            var ind:DestModel[]=[];
            for(var i=0,n=ar.length;i<n;i++) {
                var dest:DestModel  = new DestModel(ar[i])
                out.push(dest);
                ind[dest.id] = dest;
            }
            this.dataInd=ind;
            this.data=out;
            this.result=out;
            this.render(false);
           // this.list.appendTo(this.view);

           // this.searchController = new SearchController());
        }

    }



}