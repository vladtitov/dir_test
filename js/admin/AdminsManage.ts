/**
 * Created by VladHome on 12/30/2015.
 */
    ///<reference path='../typing/jquery.d.ts' />
    ///<reference path='../typing/underscore.d.ts' />
    ///<reference path='../Lists.ts' />
module uplight{
    export class AdminsManage {
        $view:JQuery;
        constructor(container:JQuery){
            container.load('htms/TableEditor.htm',()=>this.init());
            container.on('DESTROY',()=>this.destroy());
        }

        init(){
            var opt={
                service:'admin,users'
            }
            var table = new TableEditor($('[data-ctr=TableEditor]:first'),opt);
            table.renderItem = function(item:any,i:number){
                return '<tr data-i="'+i+'"><td>'+item.name+'</td><td>'+item.email+'</td><td>'+item.username+'</td></tr>';
            }




        }
        destroy():void{

        }
    }
}