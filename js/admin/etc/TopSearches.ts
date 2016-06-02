/**
 * Created by VladHome on 11/9/2015.
 */
    /// <reference path="../../typing/jquery.d.ts" />
/// <reference path="../../typing/underscore.d.ts" />
    /// <reference path="../RegA.ts" />
module uplight{
    export class VoRate{
        value:any;
        rate:number;
        constructor(ar:any[]){
            this.value=ar[0];
            this.rate = ar[1];
        }
    }
   export class TopSearches{
        constructor(private view:JQuery,search:any[][],keywords:any[][]){

            var kws:VoRate[]= this.parseData(keywords);
            var kbs:VoRate[]= this.parseData(search);

            // console.log(kws);
            // console.log(kbs);



            // kws = _.sortBy(kws,'rate').reverse();
            //  kbs= _.sortBy(kbs,'rate').reverse();
            this.showKewords(kws);
            this.showKeyboard(kbs);

        }

        private parseData(ar:any[][]):VoRate[]{
            var out:VoRate[]=[];
            for(var i=0,n=ar.length;i<n;i++) out.push(new VoRate(ar[i]));
            return out;
        }
        private  showKewords(ar:VoRate[]):void{
            var out='<table class="table"><thead><tr><td>Keyword</td><td>Times</td></tr></thead><tbody>';
            for(var i=0,n=ar.length;i<n;i++){
                out+='<tr><td> '+ar[i].value+' </td><td> '+ar[i].rate+' </td></tr>';
            }
            out+='</tbody></table>';
            this.view.find('[data-id=list1]:first').html(out)

        }
        private  showKeyboard(ar:VoRate[]):void{
            var out='<table class="table"><thead><tr><td>Search</td><td>Times</td></tr></thead><tbody>';
            for(var i=0,n=ar.length;i<n;i++){
                out+='<tr><td> '+ar[i].value+' </td><td> '+ar[i].rate+' </td></tr>';
            }
            out+='</tbody></table>';
            this.view.find('[data-id=list2]:first').html(out)
        }
    }


   export class TopDestinations{
        constructor(private view:JQuery,private data:any){
            this.render(data)
            // RegA.getInstance().connector.getDestinations().done((res:any)=>this.onDestinations(res))
        }



        private render(ar:any[]):void{
            // console.log(ar);
            var dests:any =    RegA.getInstance().model.getDestinationsIndexed();
//console.log(dests);
            var out='<thead><tr><td>Clicks</td><td>Name</td><td>Unit</td></tr></thead><tbody>';
            for(var i=0,n=ar.length;i<n;i++){
                var dest  = dests[ar[i][0]];
                if(dest)  out+=this.renderItem(dest,ar[i][1]);
                else console.log('error no destination with id: '+ar[i][0]);
            }

            out+='</tbody>';

            var list=$('<table>').addClass('table').html(out).appendTo(this.view.find('[data-id=list]:first'));



        }

        private renderItem(item:VODestination,clicks):string{
            return '<tr><td>'+clicks+'</td><td>'+item.name+'</td><td >'+item.unit+'</td></tr>';
        }
    }


}