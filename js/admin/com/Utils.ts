/**
 * Created by VladHome on 10/8/2015.
 */
    /// <reference path="../../typing/jquery.d.ts" />
    declare var CLICK:string
module uplight{
    export class BreadCrumbs{
        private list:JQuery;
        onCiick:Function;
        private selected:JQuery

        private hash:string;
        constructor(private view:JQuery){
            console.log(view);
            this.list=$('<ul>').appendTo(view);
           this.list.on(CLICK,'li',(evt)=>this.onListClick(evt));
        }

        addCrumb(url:string,text:string){
           if(this.selected)this.selected.removeClass('active');
           // this.selected =$('<li>').addClass('active').data('id',url).append($('<a>').attr('href',this.home+'/'+url).text(text)).appendTo(this.list);
            this.selected =$('<li>').addClass('active').data('id',url).text(text).appendTo(this.list);

        }
        clear():void{
            this.selected=null
            this.list.html('');
        }
        removeLast():void{
            this.list.children().last().detach();
            this.selected = this.list.children().last().addClass('active');
        }
        private onListClick(evt:JQueryEventObject):void{
            var el:JQuery = $(evt.currentTarget);
            if(this.onCiick)this.onCiick(el.data('id'));
        }
    }
    export class Confirm{

        onYes:Function;
        onNo:Function;
        private title:JQuery;
        private text:JQuery;
        private btnYes:JQuery;
        private btnNo:JQuery;
        private btnClose:JQuery;
        constructor( private view:JQuery){
            this.title = view.find('[data-id=title]:first');
            this.text = view.find('[data-id=text]:first');
            this.btnClose = view.find('[data-id=btnClose]:first').click(()=>{
                this.hide();
            });
            this.btnYes = view.find('[data-id=btnYes]:first').click(()=>{
                this.hide();
                if(this.onYes)this.onYes();
            });
            this.btnNo = view.find('[data-id=btnNo]:first').click(()=>{
                this.hide();
                if(this.onNo)this.onNo();
            });

        }
        hide():void{
            this.view.fadeOut();
        }
        show(title:string,text:string,onYes:Function,onNo?:Function):void{
            this.title.text(title);
            this.text.html(text);
            this.onYes = onYes;
            this.onNo = onNo;
            this.view.fadeIn();
            this.view.show();
        }
    }
}