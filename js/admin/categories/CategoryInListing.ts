/**
 * Created by VladHome on 6/22/2015.
 */
    /// <reference path="../RegA.ts" />
module uplight{

    export class CategoryInListing{
        list:JQuery

        R:RegA

        private current:VOCategory;
        private title:JQuery
        private total:JQuery
        private btnDel:JQuery;
        private btnReset:JQuery
        constructor(public view:JQuery){
            this.R=RegA.getInstance();

            this.R.dispatcher.on(this.R.CATEGORY_REST,()=>this.render());
            this.list =$('<ul>').appendTo(view.find('[data-id=list]:first'));
            this.list.on(CLICK,'li',(evt)=>this.onListClick($(evt.currentTarget)))
            this.title=view.find('[data-id=title]:first');
            this.R.dispatcher.on(this.R.CATEGORY_ADD_SELECTED,(evt,elms)=>this.onAddSelected(elms))
            this.total = view.find('[data-id=total]:first');
            this.btnDel = view.find('[data-id=btnDel]').on(CLICK, () => this.onDelClicked());
            this.btnReset = view.find('[data-id=btnReset]').on(CLICK, () => {this.R.dispatcher.triggerHandler(this.R.CATEGORY_REST)});

        }

        private onDelClicked():void{
            var elms:JQuery =this.list.children('.selected');
            this.R.dispatcher.triggerHandler(this.R.CATEGORY_REMOVE_SELECTED,[elms]);
            setTimeout(()=>this.refreshList(),500);
        }
        private onAddSelected(elms:JQuery):void{
           // console.log(elms);
            this.list.prepend(elms);
            setTimeout(()=>this.refreshList(),2000);
        }

        private refreshList():void{
            this.list.children().removeClass(SELECTED);
            this.sortList();
            this.total.text(this.sortList());
        }
        private onListClick(el:JQuery):void{
            var id:number= Number(el.data('id'));
            if(isNaN(id)) return;
            el.toggleClass(SELECTED);

        }
        getCatId():number{
            return this.current.id;
        }
        getAllIds():number[]{
            var out:number[]=[];
            this.list.children().each(function(ind,el){
                out.push(Number($(el).data('id')));
            });

            return out;

        }

        setCurrent(vo:VOCategory):void{
            // console.log(vo);
            this.current = vo;
           // this.render();
        }

        render(){
            if(!this.current) return;
            var ar = this.R.model.getDestinationsInCategory(this.current.id);
            ///  console.log(ar);
            var out='';
            for(var i=0,n=ar.length;i<n;i++){
                out+= this.renderItem(ar[i],i);
            }

            this.list.html(out);
            this.title.text(this.current.label);
            this.total.text(n);
        }

        renderItem(item:VODestination,i:number):string{
            return '<li data-i="'+i+'" data-type="old" data-id="'+item.id+'" class="item" ><span class="name">'+item.name+'</span><span class="unit pull-right">'+item.unit+'</span></li>';
        }

        private  sortList():void{
            var mylist = this.list;
            var listitems = mylist.children().get();
            listitems.sort(function(a, b) {
                return $(a).text().toUpperCase().localeCompare($(b).text().toUpperCase());
            })
            $.each(listitems, function(idx, itm) { mylist.append(itm); });
            return listitems.length;
        }

    }
}