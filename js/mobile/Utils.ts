/**
 * Created by VladHome on 9/20/2015.
 */
    /// <reference path="Mobile.ts" />
module uplight{
    export class Utils{
        static isImage:boolean;
        static isImageInit:boolean;
        static hideImage():void{
            if(Utils.isImage){
                $('#ImageView').fadeOut();
                Utils.isImage = false;
            }
        }

        static showImage(src:string):void{

            Utils.isImage = true;
            $('#ImageView').fadeIn();
            $('#ImageView img').attr('src',src);

          if(!Utils.isImageInit) {
              $('#ImageView').click(()=>{    Utils.hideImage();})
              Utils.isImageInit = true;
          }
        }

        static checkValue(val:string):string{
            if(!val || val.length===0)return '&nbsp;';
            var re= /\S+@\S+\.\S+/;
            if(re.test(val)) return '<a href="mailto:'+val+'">'+val+'</a>';
            var phone:string[] = val.match(/\d/g);
            if(phone && phone.length===10) return '<a href="tel:'+val+'">'+val+'</a>';

            return val;
        }
       static createTable(more:string):string{
            if(more.length===0) return '';
            var ar = more.split("\n");
            var out:string='<div class="more" ><table class="table">';

            for(var i=0,n=ar.length;i<n;i++){
                var item = ar[i].split('\t');
                out+='<tr><td>'+(item[0]||'&nbsp;')+'</td><td>'+Utils.checkValue(item[1])+'</td></tr>';
            }

            out+='</table></div>';
            return out;
        }

        static createImages(imgs:string):string{
            var out='';
            var ar = imgs.split(',');
            for(var i=0,n=ar.length;i<n;i++){
                out+= '<a data-id="'+i+'"><img src="'+ar[i]+'" /></a>';
            }
            return out;
        }
        static renderDetails(vo: VODestination):string{
            var out='';
            if(vo.info)out+='<div class="uinfo">'+vo.info+'</div>';
            out+=Utils.createTable(vo.more);
            if(vo.tmb)out+='<div class="tmb"><img src="'+vo.tmb+'"/></div>';
            if(vo.imgs) out+='<div class="imgs"><div>' +Utils.createImages(vo.imgs)+'</div></div>';
            if(out) out= '<div class="details"><br/>'+out+'</div>';
            return out;
        }


        static renderItem(vo: VODestination,catsObj:any): string {
          //  var cats:string=(vo.cats && vo.cats.length)?catsObj[vo.cats[0]]:'fa-fw';

            var more='<span class="fa fa-fw">&nbsp;</span>';
            if(vo.more || vo.info || vo.tmb || vo.imgs)more='<span class="anim fa fa-angle-double-left">&nbsp;</span>';
           // if(vo.imgs) more+=' <span class="fa fa-image"></span>';
            //if(more) more='<span class="btn">'+more+'</span>';

            return '<li class="list-group-item" data-id="'+vo.id+'" ><a>'+more+'<span> '+ vo.name + ' </span><span class="pull-right">' + vo.unit + '</span></a></li>';

        }
        static renderItemMobile(vo: VODestination,catsObj:any): string {
            //  var cats:string=(vo.cats && vo.cats.length)?catsObj[vo.cats[0]]:'fa-fw';

            var more='<span class="fa fa-fw">&nbsp;</span>';
            if(vo.more || vo.info || vo.tmb || vo.imgs)more='<span class="anim fa fa-angle-double-left">&nbsp;</span>';
            // if(vo.imgs) more+=' <span class="fa fa-image"></span>';
            //if(more) more='<span class="btn">'+more+'</span>';

            return '<li class="list-group-item" data-id="'+vo.id+'" ><a>'+more+'<span> '+ vo.name + ' </span><span class="pull-right">' + vo.unit + '</span></a></li>';

        }
        static renderItem2(vo: VODestination,catsObj:any): string {
            var cats:string=(vo.cats && vo.cats.length)?catsObj[vo.cats[0]]:'fa-fw';

            var more='';
            if(vo.more || vo.info || vo.tmb)more+='<span class="fa fa-info"></span>';
            if(vo.imgs) more+=' <span class="fa fa-image"></span>';
            if(more) more='<span class="btn">'+more+'</span>';

            return '<li class="list-group-item" data-id="'+vo.id+'" ><a><span class="fa '+cats+'">&nbsp;</span> <span>'+ vo.name + ' </span> '+more+'<span class="pull-right">' + vo.unit + '</span></a></li>';

        }

    }

}