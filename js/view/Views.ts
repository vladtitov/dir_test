/**
 * Created by VladHome on 10/3/2015.
 */
    /// <reference path="../typing/jquery.d.ts" />
module uplight{
    export class Page{
        view:JQuery

        constructor(url:string){

        }

        getView():JQuery{
            return this.view
        }

    }


    export class Transition{


        setView(view:JQuery):void{
            this.view=view;
        }
        constructor(private view:JQuery){

        }


        private reArrange(cont:JQuery,slot:JQuery):void{
            slot.children().appendTo(cont);
            slot.detach();
        }

        showView(newV:JQuery):JQuery{
            this.showView5(newV);
            return;
            if(jQuery.type(newV)=='string'){
                newV =$('<div>').load(newV,function(){
                    newV.removeClass('in');

                    //ready1= true;
                    //if(ready2)this.reArrange(cont,slot2);
                });
            }
            var old:JQuery = this.view.children();
            console.log(newV);
            newV.removeClass('out');
            newV.addClass('in');
            newV.appendTo(this.view);
            old.addClass('out');

            return old;
        }

      showView5(newV:JQuery):JQuery{
            var cont:JQuery= this.view;
          var w:number = cont.width();
          var old:JQuery = cont.children();
          var slot1=$('<div>').addClass('slot sl1').width(w).css('float','left').append(old);
          var slot2=$('<div>').addClass('slot sl2').width(w).css('float','left');



          var ready1:boolean;
          var ready2:boolean;
         if(jQuery.type(newV)=='string') slot2.load(newV,function(){
            ready1= true;
             if(ready2)this.reArrange(cont,slot2);
         });
         else {
             ready1= true;
             slot2.append(newV);
         }
            //console.log(w);
           // var slider:JQuery=$('<div>').width(w*2+30).append(old).append(newV).appendTo(cont);
          var wind:JQuery = $('<div>').addClass('wind').appendTo(cont).width(w).css('overflow','auto');
          var slider:JQuery=$('<div>').width(w*2+30).append(slot1).append(slot2).appendTo(wind);

            setTimeout(()=>{
                wind.animate({scrollLeft:w},()=>{
                   // slot1.detach();
                    //slot2.appendTo(cont);
                   // slot2.css('width','auto');
                    //slider.detach();
                   // cont.scrollLeft(0);
                    ready2= true;
                    if(ready1){
                        wind.detach();
                        cont.append(slot2.children());

                       // this.reArrange(cont,slot2);
                    }


                });
            },50)


          return slot2;
        }
        newPage(newV:any):JQuery{
         console.log(jQuery.type(newV));
            var cont:JQuery= this.view;
            var old:JQuery = cont.children().first();
            cont.children().detach();

          //  console.log('Old  '+old.attr('id'));
           // console.log('new  '+newV.attr('id'));
            var w:number = cont.width();

            var slot1=$('<div>').addClass('slot').width(w).css('float','left').append(old);
            var slot2=$('<div>').addClass('slot').width(w).css('float','left').append(newV);


            // var w:number = old.first().width();
            /// this.content.width(w);
           // old.width(w).css('float','left');
           // newV.width(w).css('float','left');
            console.log(w);
            // var slider:JQuery=$('<div>').width(w*2+30).append(old).append(newV).appendTo(cont);
            var slider:JQuery=$('<div>').width(w*2+30).append(slot1).append(slot2).appendTo(cont);

            setTimeout(()=>{
                //  cont.scrollLeft(w);
                cont.animate({scrollLeft:w},()=>{
                    // old.detach();
                    slot1.detach();
                    //newV.appendTo(cont);
                    slot2.appendTo(cont);
                    // newV.css('width','auto');
                    slider.detach();
                    cont.scrollLeft(0);
                });
            },100)

            return slot2;
        }

    }

}