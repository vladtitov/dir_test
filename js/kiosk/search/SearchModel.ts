/**
 * Created by VladHome on 7/18/2015.
 */
    /// <reference path="../Registry.ts" />
    /// <reference path="DetailsLarge.ts" />

module uplight{

    export class VORow{
        col1:string;
        col2:string;
        constructor(row:string){
        var ar:string[] = row.split('\t');
            this.col1 = ar[0]||'&nbsp;';
            this.col2=ar[1]||'&nbsp;';
        }
    }
    export class ButtonView{
        private $view:JQuery;
        private viewStr:string;
        private $kw;
        private details:JQuery;

        private $btnMore:JQuery;
        private $txtMore:JQuery;
        private $main:JQuery;
       // private $cats:JQuery;

       // setCats(str:string):void{
         //   this.$cats.text(str);
        //}
        show():void{
            this.$view.show();
        }

        hide():void{
            this.$view.hide();
        }

        appendTo(container:JQuery):void{
           this.$view.appendTo(container);
        }
        reset():void{
            this.details.hide();
        }

        constructor(private model:DestModel){
            this.$view = $('<li>').addClass('item btn-main').data('id',model.id).append(this.createMain());
        }


        createMain():JQuery{
                this.$main = $('<div>').addClass('main');
                this.$main.append(this.createFirstRow());
          //  this.$cats=$('<div>').addClass('cats').appendTo(this.$main);
                var icon ='<span class="icon '+this.model.vo.icon+'"></span>';
                var name='<span class="name">'+this.model.vo.name+'</span>';
                var unit='<span class="unit">'+this.model.vo.unit+'</span>';
                this.$main.append('<div class="urow">'+icon+name+unit+'</div>');
                this.$main.append(this.createLastRow());
            return this.$main;
        }
        createFirstRow():JQuery{
            this.$kw = $('<span></span>').addClass('kws');

            return $('<div>').addClass('urow').append(this.$kw).append('<span class="unittype">unit</span>');
        }
        createLastRow():JQuery{
            return $('<div>').addClass('urow').append(this.createBtnMore()).append('<spam>'+this.model.vo.info+'</spen>');
        }
        createBtnMore():JQuery{
            if(this.model.haveMore){
                this.$txtMore = $('<span>').text(' More...');
                this.$btnMore= $('<a>').addClass('btn').append('<span class="fa fa-plus"></span>').append(this.$txtMore);
            }else this.$btnMore= $('<a>').addClass('btn');

            return this.$btnMore;
        }
        showDetails():void{
            if(!this.details){
                this.details = this.createDetails(this.model.vo)
                this.$view.append(this.details);
            }
            this.details.show('fast');
            this.$txtMore.text(' Less...');
        }

        hideDetails():void{
                this.details.hide('fast');
                this.$txtMore.text(' More...');
        }
////////////////////
        showKW(str:string){
            this.$kw.text(str);
        }

        resetKW():void{
                this.$kw.text('');
        }

        private tableToObject(str:string):VORow[]{
            var out:VORow[] = [];
            var ar = str.split("\n");
            for(var i=0,n=ar.length;i<n;i++)  out.push(new VORow(ar[i]));
            return out;
        }

        createDetails(vo:VODestination):JQuery{
            var ar = this.tableToObject(vo.more);//.split("\n");
            var out:string='<div class="more" ><table class="table">';
            for(var i=0,n=ar.length;i<n;i++)  out+='<tr><td>'+ar[i].col1+'</td><td>'+ar[i].col2+'</td></tr>';
            out+='</table></div>';
            if(vo.tmb)out+='<div class="tmb"><img src="'+vo.tmb+'" /></div>';
            return $('<div>').addClass('details').html(out);
        }

    }


    export class DestModel{
        view:ButtonView;
        private cats:number[];
        byCat:boolean=true;
        name:string;
        unit:string;
        kws:string;
        iskw:boolean;
       // kw:JQuery;
        cache={};
        id:number;
        ind:number;
        haveMore:boolean;
        btnMore:JQuery;
        table:string;
        thumb:HTMLImageElement;
        static  dispatcher:JQuery=$({});
        static DETAILS_LARGE:string='DETAILS_LARGE';


        constructor(public vo:VODestination){
            this.id=vo.id;
           if(vo.more || vo.tmb || vo.imgs || vo.pgs)this.haveMore = true;
            this.view = new ButtonView(this);

            //this.view.setCats(vo.cats.toString())
            this.name=' '+vo.name.toLowerCase();
            this.unit=' '+vo.unit.toLowerCase();
            this.kws=','+vo.kws;

        }

        addDetails(el:JQuery){
            if(el.children('.details').length===0) {
                el.append(this.view.createDetails(this.vo));
                el.children('.details').show('fast');
            }
        }

        appendTo(container:JQuery,reset:boolean):void{
            if(reset) this.reset();
            this.view.appendTo(container);
        }


        private isHiiden:boolean;

        show():void{
            if(this.isHiiden){
                this.isHiiden=false;
                this.view.show();
            }
        }

        hide():void{
            if(!this.isHiiden){
                this.isHiiden=true;
                this.view.hide();
            }
        }

       reset():DestModel{
           if(this.isDetails){
               this.isDetails = false;
               this.view.reset();
           }
           this.clearKeyword();
           return this;
       }

        private isDetails;

        togleDetails():boolean{
            if(this.haveMore){
                if(this.isDetails)this.hideDetails();
                else this.showDetails();
                return this.isDetails;
            }
            return false;
        }
        showDetails():void{
            console.log('showDetails ');
            if(!this.isDetails){
                this.view.showDetails();
                this.isDetails = true;
            }
        }

        hideDetails():void{
            if(this.isDetails) {
                console.log('hideDetails ');
                this.isDetails = false;
                this.view.hideDetails();
            }
        }

        private tryName(pat:string):number{
            var out:number=0;
            var ind= this.name.indexOf(pat);
            if(ind===0) out= 1;
            else  if(ind!==-1) out= 2;
            return out;
        }

        private tryUnit(pat:string):number{
            var out:number=0;
            var ind= this.unit.indexOf(pat);
            if(ind==0) out= 1;
            else  if(ind!==-1) out= 2;
            return out;
        }

        private tryKw(pat:string):string{
            var out:string;
            var kws = this.kws;
            if(this.kws.indexOf(pat)!==-1) {
                var ind = kws.indexOf(pat);
                var end = kws.indexOf(',', ind+1);
                if(end===-1) out = kws.substr(ind+1);
                else  out = this.kws.substring(ind + 1, end);
                // console.log(this.kws +'   '+ind +'   '+end);
            }
            return out;
        }

        filterStr(pat:string):number{
            if(this.iskw) this.clearKeyword();
            var out:number=0;
            if(isNaN(Number(pat))){
                out = this.tryName(' '+pat);
                if(out===0)out= this.tryUnit(' '+pat);
            }else{
                out = this.tryUnit(' '+pat);
                if(out===0)out=this.tryName(' '+pat);
            }

            if(out===0){
                var kw=this.tryKw(','+pat);
                if(kw){
                    this.showKeyword(kw);
                    out=3;
                }
            }

            this.ind=out;
            return out;
        }

        showKeyword(str:string):void{
          // console.log(this.vo.name+'  showKeyword  '   + str);
            this.view.showKW(str)
            this.iskw = true;
        }

        clearKeyword():void{
            if(this.iskw){
                this.view.resetKW();
                this.iskw = false;
            }
        }

        hasCategory(num:number):boolean{
            return this.vo.cats.indexOf(num)!==-1;
        }

        setCats(cats:number[]):DestModel{
            this.cats=ar;
            var ar:number[] = this.vo.cats;
            if(!ar){
                this.byCat = false;
                return this;
            }
            var dif =  ar.filter(function(n) {
                return cats.indexOf(n) != -1;
            });

            if(dif.length===0) this.byCat=false;
            else this.byCat = true;
            return this;

        }


       render():void{
          if(this.byCat) this.show();
           else this.hide();
      }




    }
}