/// <reference path="../kiosk/registry.ts" />
/// <reference path="../typing/jquery.d.ts" />
module uplight {

    export class DetailsPage {
        private title: JQuery;
        private content:JQuery
        private name:JQuery;
        private unit:JQuery;
        private table:JQuery;
        private logo:JQuery;
        private gallery:JQuery;
        private info:JQuery;

        reset(): void {

        }

        showDestination(id:number):void{
          var dest:uplight.VODestination =   this.model.getDestById(id);
            console.log(dest);
            if(!dest.html) dest.html=this.renderDetails(dest)

            this.content.empty().append(dest.html);
            this.show();


        }

        isHidden:boolean;
        show():void{
            if(this.isHidden){
                this.isHidden = false;
                this.view.show('fast');
            }
        }

        hide():void{
            if(!this.isHidden){
                this.isHidden = true;
                this.view.hide('fast');
            }
        }

        constructor(private view:JQuery,private connector:uplight.Connector,private model:uplight.Model) {

            this.content = view.find('[data-id=content]:first');
            this.hide();
           // this.details = $(id + ' [data-id=details]');
           // this.advanced = $(id + ' [data-id=advanced]');


        }



        private renderTable():string{
            var out:string ='';

            return out;
        }

        private renderDetails(dest: uplight.VODestination): JQuery {


            var out: JQuery = $('<div>').html('<p class="xlarge"><span class="left">' + dest.name + '</span><span class="right">' + dest.unit + '</span></p>');
           // if (dest.email || dest.phone || dest.website) {
              //  out += '<table><tbody>';
               // if (dest.phone) out += '<tr><td>Phone:  </td><td>' + dest.phone + '</td></tr>';
               // if (dest.email) out += '<tr><td>Email:  </td><td>' + dest.email + '</td></tr>';
               // if (dest.website) out += '<tr><td>Website:  </td><td>' + dest.website + '</td></tr>';
               // out += '</tbody></table>';

          //  }
            return out ;
        }

    }

   
}