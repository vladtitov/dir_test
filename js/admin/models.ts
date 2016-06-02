/// <reference path="RegA.ts" />
module uplight{

    export class VODestination {
        constructor(obj:any){
            for(var str in obj) this[str]=obj[str];
        }
        uid:string;
        unit: string;
        id: number;

        info:string;
        imgs:string;
        name: string;
        cats: number[];
       // catsS:string;
        catsStr:string[];
        pgs: string;
        more: string;
        tmb:string;
        meta:string;
        kws:string;
    }

    export class DestinantionsModel{

        dispatcher=$({})
        CHANGE:string='CAHBE';
        CATEGORIES_CAHANGE:string ='CATEGORIES_CAHANGE';
        onChange: Function;

        private hints: {};
        private _data: VODestination[];

        private _dirty: VODestination[];
       
        private cache: {};
        ///public hintsLength: number = 4;
       // private _keywords: string[];
       // private hintsCache: any;
       private catChanges: {};

        private cacheDests: {};

        deleteDestination(dest:VODestination,callBack: Function): void {
            this.R.connector.deleteDestination(dest.id).done((res)=>{
                this.refreshData();
                callBack(res)
            });
        }

        static encodeUID(name:string):string{
            return name.replace(/[^a-zA-Z0-9-_]/g, '');
        }
       // saveDestination(vo: VODestination): void {


          //  var p1= this.R.connector.saveDestination(vo).done((res)=>{
             //   this.refreshData();

           // });
       /*
            var p2
            if(pages){
                if(!vo.uid) vo.uid = 'a_'+vo.id;
               p2 = this.R.connector.savePage('pages/p'+vo.uid+'.htm',pages);
                $.when(p1,p2).then(function(v1,v2){
                   // console.log('both');
                    //console.log(v1,v2);
                    var res = v1[0];

                    callBack(res)

                })
            }else p1.then(function(res){
                callBack(res);
            })

*/


     //   }

        saveCategoryListing(catid,ids,callBack): void {
           this.R.connector.saveCatDests(catid,ids).done((res)=>{
               callBack(res);
               this.refreshData();
           });
        }

       deleteCatChanges(): void {
            this.catChanges = {};
        }

        R:RegA
        constructor(){
            this.R = RegA.getInstance();
            this.refreshData();
        }

        /*
                getAllByType(type: string): VODestination[]{
                   // trace(' getAllByType : ' + type);
                    if (!this.searches['type_' + type]) this.searches['type_' + type]=this._getAllByType(type);
                    return this.searches['type_' + type];
                }
                */
        private _getDestById(destid: number): VODestination {
            var data: VODestination[] = this._data;
            for (var i = 0, n = data.length; i < n; i++) if (data[i].id == destid)   return data[i];
           
            return null;
              
        }
      


        getDestById(destid: number): VODestination {
            if (!this.cacheDests[destid]) this.cacheDests[destid] = this._getDestById(destid);
            return this.cacheDests[destid];
        }
       // getDestInfo(callBack: Function, destid: number): void {
          //  R.connector.getDestInfo(callBack, destid); 
       // }


        ///////////////////
        //getDestinationsByUnitAndCat(unit: string, catid: number): VODestination[]{
           // console.log('unit ' + unit + ' catid: ' + catid);
           // var id: string = 'c' + catid+'u' + unit;
           // if (!this.cacheSearches[id]) this.cacheSearches[id] = this._getDestinationsByUnit(unit, this.getAllByCat(catid));
           //  return this.cacheSearches[id]
       // }
        private _getDestinationsByUnit(unit: string, data: VODestination[]): VODestination[]{
            if (unit == '') return data;
            var out: VODestination[] = [];
            for (var i = 0, n = data.length; i < n; i++)    if (data[i].unit.indexOf(unit) != -1) out.push(data[i]);
           // console.log(' _getDestinationsByUnit: ' + unit+' total: ' + out.length);
            return out;
        }
        ////////////////////

       // getDestinantionsByPatternAndCat(pattern: string, catid: number): VODestination[]{
         //   var id: string = 'c' + catid+ pattern;
            //if (!this.cacheSearches[id]) this.cacheSearches[id] = this._getDestinantionsByPattern(pattern, this.getAllByCat(catid));
            //return this.cacheSearches[id];
        //}

        getDestinantionsByNumber(num:number):VODestination[]{
            var pat1:string = num.toString();
            var ar:VODestination[] = this.getData();
            var out:any[]=[];
                for(var i=0,n=ar.length;i<n;i++){
                    var item = ar[i];
                    if(item.name.indexOf(pat1)!==-1 || item.unit.indexOf(pat1)!==-1 || item.id.toString().indexOf(pat1)!==-1) out.push(item);
                }
            return out;
        }
        getDestinantionsByPattern(pattern: any): VODestination[] {
            if(pattern.length==0) return this.getData();
            pattern = pattern.toLowerCase();
            var out: VODestination[];

            if(isNaN(pattern)){

                var pat2 =' '+pattern;
                var out1:VODestination[]=[];
                var out2:any=[];
                var out3:any=[];
                var ar:VODestination[] = this.getData();
                for (var i = 0, n = ar.length; i < n; i++) {
                    var name: string = ar[i].name.toLowerCase();

                    if(name.indexOf(pattern)===0) out1.push(ar[i]);
                    else if(name.indexOf(pat2)!=-1) out2.push(ar[i]);
                    else {
                        var unit:string =ar[i].unit.toLowerCase();
                        if(unit.indexOf(pattern)===0 || unit.indexOf(pat2)!==-1)out1.push(ar[i]);
                        else {
                            var all:string = ' '+ar[i].info+' '+ar[i].uid;//+' '+ar[i].meta;
                            if(all.indexOf(pat2)!==-1) out3.push(ar[i]);
                        }
                    }


                }
                out = out1.concat(out2,out3);
            } else out = this.getDestinantionsByNumber(Number(pattern));

            return out;
        }
        /////////////////////////////////////////////
        getData(): VODestination[] {
            return this._data;
        }
        getDestinationsIndexed():any{
            return this.destInex;
        }
        getUnassigned(): VODestination[] {
            var out: VODestination[] = [];
            var ar:VODestination[] = this.getData();
            for (var i = 0, n = ar.length; i < n; i++)if (ar[i].cats.length===0) out.push(ar[i]);
            return out;  
        }

        getDestinationsInCategory(id: number): VODestination[]{

            var ar:VODestination[] = this.getData();
            var yes: VODestination[] = [];
            var not:VODestination[] = [];
            for (var i = 0, n = ar.length; i < n; i++){
                if (ar[i].cats.indexOf(id) === -1) not.push(ar[i]);
                else  yes.push(ar[i]);

            }
            this.notInCategory = not;
            this.inCategory = yes;
            return yes;
        }

        private inCategory:VODestination[];
        private notInCategory:VODestination[];

        getDestinationsNotInCategory():VODestination[]{
           return this.notInCategory;
        }

        removeDestinatinsFromCategory(catid:number,destids:number[]):void{
           // VODestination[]
        }

        ////////////////////////////////////////////////////////////////////
        /*
        getHints(pattern: string): string[]{
            pattern = ' ' + pattern.toLowerCase();
            if (!this.hintsCache[pattern]) this.hintsCache[pattern] = this._getHints(pattern);           
            return this.hintsCache[pattern];           
        }

        getAllByPattern(pattern:string): VODestination[]{            
            if (!this.searches[pattern]) this.searches[pattern] = this._getLocationByPattern(pattern); ;
            return this.searches[pattern]
        }
       
        getByList(list:string): VODestination[]{
            var out: VODestination[] = [];
            var data: VODestination[] = this._data;
            for (var i = 0, n = data.length; i < n; i++)  if (list.indexOf(data[i].destid)>-1) out.push(data[i]);
            return out;

        }
        */
        private catsIndexed:any;
        private destsIndexed:any;
        getCategoryById(id:number):VOCategory{
            return this.catsIndexed[id];
        }
        getCategoriesIndexed():any{
            return this.catsIndexed;
        }


        getCategoriesNames(ar:number[]):string[]{
           var out:string[] =[]
            for(var i=ar.length-1;i>=0;i--){
                var vo:VOCategory = this.getCategoryById(ar[i]) ;
                if(vo)out.push(vo.label);
                else ar.splice(i,1);
            }
            return out.reverse();
        }

        refreshData(): void {
            console.log('DestinantionsModel refresh');

            this.cache ={};


           var p1:JQueryPromise<VOCategory[]> = this.R.connector. getCategories();

            var p2 :JQueryPromise<VODestination[]> = this.R.connector.getDestinations();
            var self=this;

            $.when(p1,p2).then(function(v:any){
                var v1=arguments[0];
                var v2=arguments[1];
            // console.log(v1[0],v2[0]);
                var res =v1[0];
               self.setCategories(res);
                var dests =v2[0];
                self.setDestinations(dests);


                self.dispatcher.triggerHandler(self.CATEGORIES_CAHANGE,res);
                self.dispatcher.triggerHandler(self.CHANGE);

         })


        }


        private setDestinations(res:any[]):void{
                var out:VODestination[] =[];
            var destInd:any={};
            for(var i=0,n=res.length;i<n;i++){
                var cats:number[] = res[i].cats.split(',').map(Number);
                res[i].catsStr=this.getCategoriesNames(cats);
                res[i].cats=cats;

                if(!res[i].uid)res[i].uid = DestinantionsModel.encodeUID(res[i].name.toLowerCase());
                var dest:VODestination = new VODestination(res[i]);
                destInd[dest.id]=dest;
                out.push(dest);
            }
            this.setData(out,destInd);
        }


/////////////////////////////CATEGORIES//////////////////////////////////
        saveCategory(vo:VOCategory):JQueryPromise<VOCategory[]>{
            var d = $.Deferred();

            this.R.connector.saveCategory(vo).done((res)=>{
                var result=new VOResult();

                if(this.setCategories(res)) result.success='success';
                else {
                    result.error='notarray';
                    result.result=res.toString();
                }
                d.resolve(result);
               // that.mapCategories();
              //  callBack({success:true});

             this.dispatcher.triggerHandler(this.CATEGORIES_CAHANGE,res);
         });

           return d.promise();

        }

        private categories:VOCategory[]

        private addDestinationToCategories(dest:VODestination,cats):void{
            var ar = dest.cats;
            if(ar){
                for(var i=0,n=ar.length;i<n;i++){
                    var cat:VOCategory = cats[ar[i]]
                  if(cat){
                      if(!cat.dests) cat.dests=[]
                      cat.dests.push(dest.id);
                  }
                }
            }
        }

        private isCategoriesMapped():boolean{
            var ar = this.getCategories();
            for(var i=0,n=ar.length;i<n;i++) if(ar[i].dests) return true;
            return false;
        }

        mapCategories():void{
            if(this.isCategoriesMapped()) return;
            var cats=this.catsIndexed;
            var ar = this.getData();
            for(var i=0,n=ar.length;i<n;i++)this.addDestinationToCategories(ar[i],cats);

        }

        private setCategories(ar:any[]):boolean{
            if(!Array.isArray(ar)) return false;
            var cats:VOCategory[]=[];
            var catInd =[];
            for(var i=0,n=ar.length;i<n;i++){
                var cat = new VOCategory(ar[i]);
                cats.push(cat);
                catInd[cat.id]= cat;
            }
            this.categories=cats;
            this.catsIndexed = catInd;

            return true;
        }
        getCategories():VOCategory[]{
            return this.categories
        }
       deleteCategory(cat:VOCategory,callBack:Function):void{
                    this.R.connector.deleteCategory(cat.id).done((res)=>{
                        this.refreshData();
                        callBack(res);
                    });

        }






        private destInex:any;
        private setData(data: VODestination[],destInd:any): void {
            this._data = data;
            this.destInex = destInd
        }
        private eraseCache():void{
            this.cacheDests = {};
            this.catChanges = {};
        }

        addDestination(data: VODestination): void {
            this.eraseCache();
            this._data.push(data);
           // if (this.onChange) this.onChange();
        }

       /// saveChanges(callBack): void {

          //  R.connector.saveDests(callBack, this._dirty);  
      //  }
        /*
        private filerByPattern(pattern: string, data: VODestination[]): VODestination[] {
            var out: VODestination[] = [];
            for (var i = 0, n = data.length; i < n; i++) {
                var name: string = ' ' + data[i].name.toLowerCase() + ' ' + data[i].unit;
                if (name.indexOf(pattern) > -1) out.push(data[i]);               
            }
            return out;
        }

       
        private _getLocationByPattern(pattern: string): VODestination[]{
            pattern = ' ' + pattern.toLowerCase();
            var data: string[]= this._keywords;            
            var out: VODestination[] = [];
            //trace(' _getLocationByPattern ' + pattern);
            for (var i = 0, n = data.length; i < n; i++) {
                if (data[i].indexOf(pattern) > -1) out.push(this._data[i]);
            }
            return out;
        }

        private createSearch(data: VODestination[]): void {
            var out: string[]=[]
            for (var i = 0, n = data.length; i < n; i++) {
                out.push(' '+this._data[i].name);
            }
            this._keywords = out;
        }
       
        private pushKeywords(ar: string[], obj: {}):void {
            for (var i = 0, n = ar.length; i < n; i++)
                obj[ar[i]] = true;
        }

        private _getHints(pattern: string): string[]{
            var ar: string[] = [];
            for (var str in this.hints) {
                if (str.toLowerCase().indexOf(pattern) > -1) ar.push(str.substr(1));
                if (ar.length >= this.hintsLength) break;
            }

            return ar;

        }
*/
    }





    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


}
