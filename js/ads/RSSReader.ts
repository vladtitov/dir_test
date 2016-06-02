/// <reference path="../../../scripts/typings/greensock/greensock.d.ts" />
/// <reference path="../typing/jquery.d.ts" />
module uplight.ads {
    export interface IAd {
        setData(data: any): void
        start(): void;
        stop(): void
        destroy(): void
       
    }
    export class RSSReader implements IAd {
        setData(data: any): void {
            this._data = data; 
            this.refresh();          
        }
        private refresh(): void {
            $.ajax({
                url: this._data,
                success: (resp) => this.onData(resp)
            });
        }
        start(): void {
            this.playNext();
        }
        stop(): void {
            clearTimeout(this.timer);
            clearTimeout(this.timer2);
        }
        destroy(): void { }

        delay: number = 25;
        view: JQuery;
        private _data: string;
        private content: JQuery;
        private timer2: number;
      
        private rss:NodeList
        constructor() {
            this.view = $('#view').css('top',Math.random()*700).css('left', Math.random()*700);          
            this.content = $('#content').html('<div></div>').appendTo(this.view);
           
            var data: string = 'rem/kiosk.php?a=get_rss';
            this.setData(data);           
        }

        private onData(resp: string): void {           

            var rss: HTMLDocument = $.parseXML(resp);
            this.view.children('h2').eq(0).text(rss.getElementsByTagName('title')[0].textContent);
            // console.log(rss.getElementsByTagName('item'));
            this.rss = rss.getElementsByTagName('description');           
           // var el: Node = this.rss[0];
           
            this.current = Math.round(Math.random() * this.rss.length);  
            clearTimeout(this.timer2);
            this.timer2 = setTimeout(() => this.refresh(), 3600 * 1000);       
            this.playNext();


        }
        private STEP: number = 10;
        private dX: number = this.STEP;
        private dY: number = this.STEP;
        private slideContent(): void {
            var c: JQuery = this.content;
            var v: JQuery = this.view;
            var p = this.view.position();
            if (p.left > 1000) this.dX = -this.STEP;
            else if (p.left < 0) this.dX = this.STEP;
            if (p.top > 700) this.dY = -this.STEP;
            else if (p.top < 0) this.dY = this.STEP;
            //console.log(p);
           // console.log(p.top + this.dY);
           // this.view.css('top', p.top + this.dY).css('left', (p.left + this.dX));         
            TweenMax.to(this.view, 0.5, { top: p.top + this.dY, left: p.left + this.dX});


            TweenMax.to(this.content, 0.5, {
                x: -710, onComplete: function () {
                    TweenMax.set(c, { x: 0 });
                    var g = c.children().first().remove();
                    g = null;
                }
            });

           /*
            c.animate({
              'margin-left':- 720
            }, 1000, function () {
                c.css('margin-left', '0px');
                c.children().first().html('').remove();

            });
*/
        }
        private current: number = 0;
        private timer: number;
        private playNext(): void {
            if (this.current >= this.rss.length) this.current = 0;
            var item: Node = this.rss[this.current++];           
            if (item.parentNode.nodeName != 'item') item = this.rss[this.current++]; 
            var str: string = '<div>' + item.textContent + '</div>';
            this.content.append(str);  
            if (this.content.children().length > 1) this.slideContent(); 
            clearTimeout(this.timer); 
           this.timer =  setTimeout(() => this.playNext(), this.delay*1000);
        }
    }
}

var rssreader = new uplight.ads.RSSReader();