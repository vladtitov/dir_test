/// <reference path="../kiosk/Registry.ts" />
/// <reference path="../typing/jquery.d.ts" />
module kiosk {
    export class SearchResultold {
        // private vo: models.ListViewModel;
       // onSelect: Function;
       // view: JQuery;
        list: JQuery;
       // width: number;     
        onDestination: Function;
        private R: kiosk.Registry;       

       
       getListByCatId(catid:number): JQuery {           
            var id: string = 'c__' + catid;
           if (!this.cache[id]) this.cache[id] = this.renderList(this.R.modelDests.getDestsByCat(catid), this.width-10);                             
           return this.cache[id];
        }
        
        private filterView(pattern: string):JQuery{
            var id: string = '__' + pattern;
            if (!this.cache[id]) {
                var num: number = Number(pattern);
                var ar: VODestination[];
                if (isNaN(num)) ar = this.R.modelDests.getDestsByPattern(pattern);
                else ar = this.R.modelDests.getDestsByUnit(num);
                this.cache[id] = this.renderList(ar,this.width);
            }
           
            return this.cache[id];
        }

        private model: kiosk.DestinantionsModel;
        private cache: {} = {};
        private headr: JQuery;
        reset():void {
            this.currentPattern = '';
        }

        constructor(private viewport: ViewPort, private width: number) { 
            console.log('SearchResult width: '+width);
            this.R = kiosk.Registry.getInstance();
            this.model = this.R.modelDests;          
           

           
           // this.R.onKeyboardTyping = (res) => this.onKeyboardTyping(res);
          
            //viewport.onListClick = (evt) => this.onSearchResultClick(evt);
        }


        private currentPattern: string = '';

        onKeyboardTyping(pattern: string): void {
            var el: JQuery = this.filterView(pattern);
            if (this.currentPattern.length < pattern.length) this.viewport.showView(el);
            else this.viewport.showViewBack(el);

            //v.on(CLICK, 'li', (evt) => this.onSearchResultClick(evt));

        }

        getResultsByPattern(str: string): string {
            var id: string = '_'+ str;
            if (!this.cache[id]) {
                var num: number = Number(str);
                var ar: VODestination[];
                if (isNaN(num)) ar = this.R.modelDests.getDestsByPattern(str);
                else ar = this.R.modelDests.getDestsByUnit(num);
                this.cache[id] = this.renderList2(ar);
            }

            return this.cache[id];
        }



        private all: string;
        getAll(): string {
            if (!this.all) this.all = this.renderList(this.R.modelDests.getData(), this.width-10);
            return this.all;
        }
        private all2: string;
        getAll2(): string {
            if (!this.all2) this.all2 = this.renderList2(this.R.modelDests.getData());
            return this.all2;
        }
        private showAll(): void {
            this.currentPattern = '';            
            this.currentCat = -1;
            this.currentDest = null;            
           // this.viewport.showView(this.getAll());
           // this.all.on(CLICK, 'li', (evt) => this.onSearchResultClick(evt));
        }

        private currentCat: number; 

        showListByCatId(catid: number): void { 
            this.currentCat = catid;
            this.viewport.showView(this.getListByCatId(catid));          

        }      
        private currentDest: VODestination;
             

        getDestinationById(destid: number): JQuery {
            var id:string = 'd__'+destid;
            if (!this.cache[id]) this.cache[id] = this.renderDestination(this.R.modelDests.getDestById(destid), this.width);
            return this.cache[id];           
        }
              
        private onSearchResultClick(evt: JQueryEventObject): void { 
            console.log(evt.currentTarget);          
            var id: number = Number($(evt.currentTarget).data().did);           
            if (isNaN(id)) return;
            if (this.onDestination) this.onDestination(id);
            else this.viewport.pushViewAhead(this.getDestinationById(id));           
           
        }   

       
        private _data: kiosk.VODestination[];  
        private renderList2(data: VODestination[]): string {
            var out: string = '';
            var color: string = this.R.settings.color;
            // var str: string = '';                 
            for (var i = 0, n = data.length; i < n; i++) {
                out += this._renderItem(data[i], color);
            }
            return out ;
        }

        private renderList(data: VODestination[],w):string {
            var out:string= '<ul class="destlist listHolder" style="width:' + w + 'px" >';           
            var color: string = this.R.settings.color; 
           // var str: string = '';                 
            for (var i = 0, n = data.length; i < n; i++) {
               out +=this._renderItem(data[i], color);
            }                    
            return out+'</ul>';
        }

       _renderItem(item: VODestination, color: string): string {
            var src: string = (item.email + item.phone + item.website).length > 5 ? 'css/icons/touch2.png' :'css/icons/notouch.png';           
            if (item.advanced.length > 5) src = 'css/icons/touch1.png';
          //  return '<li data-did="' + item.destid + '" class="ubutton" >' +( (more1 || more2) ? ('<img src="css/icons/' + (more1 ? 'touch1.png' :'touch2.png')+'" />'):'')+'<span class="name">'+item.name+'</span><span class="unit">'+item.unit+'</span></li>';
            return '<li data-did="' + ((src == 'css/icons/notouch.png') ? '':item.destid.toString()) + '" class="ubutton" ><img src="' +src+'"/><span class="name">' + item.name + '</span><span class="unit">' + item.unit + '</span></li>';
        }

       renderDestination(dest: VODestination,w:number): JQuery {
            var page: JQuery = $('<div class="page" style="width:' + w + 'px"></div>');

            var out: string = '<h2><span class="name">' + dest.name + '</span><span class="unit">'+dest.unit+'</span></h2>';
            if (dest.email || dest.phone || dest.website) {
                out+= '<table><tbody>';
               
               if(dest.phone) out += '<tr><td>Phone:  </td><td>' + dest.phone + '</td></tr>';
                if(dest.email)out += '<tr><td>Email:  </td><td>' + dest.email + '</td></tr>';
                if(dest.website)out += '<tr><td>Website:  </td><td>' + dest.website + '</td></tr>';
                out += '</tbody></table>';
              
            }
            page.html(out);
           if (dest.advanced) {
               this.page = page;
               //Registry.getInstance().connector.getAdvanced((res) => this.onAdvanced(res), dest.advanced);
           }
            return page;
       }
        private onAdvanced(resp): void {
            this.page.append(resp);
        }
        private page: JQuery;
    }
}