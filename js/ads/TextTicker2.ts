/// <reference path="../../../scripts/typings/greensock/greensock.d.ts" />

/// <reference path="../typing/jquery.d.ts" />

module ads{
    export class TextTicker2{
        destory(): void {
            clearInterval(this.timer2);
            clearTimeout(this.timer);
            this.view = null;
            this._data = null;
            
        }

        view: JQuery;
        delay: number=10;
      
        private maxY: number = 900;
       
       private container: JQuery;
        private _data: string[];
        private current: number = 0;
        private timer: number;
        private top: number=0;

        private timer2: number;
        private delay2: number=100;
        private isMove: boolean;

        constructor(private width:number=1920,private height:number=76) {
            this.view = $('<div id="TextTicker2" style="text-align:center"></div>').appendTo('#screensaver');
            this.view.width(width);
            this.view.height(height);
          this.view.css('position', 'absolute');
            this.view.css('overflow', 'hidden');
            this.container = $('<div style="width:100%"></div>').appendTo(this.view);
           // this.container.css('position', 'absolute');
            $.get('rem/kiosk.php?a=get_messages').done((resp)=>this.onData(resp));
           
            
        }

        
       
        private onTimer2(): void{
            this.isMove = true;
        }
        startTimer2() {
            this.timer2 = setInterval(() => this.onTimer2(), this.delay2 * 1000);

        }
        onData(resp): void{
            var data: string[] = JSON.parse(resp);
            this._data = data;
            var out: string = '';
            //for (var i = 0, n = data.length; i < n; i++) {
            // out += '<h2>' + data[i] + '</h2>';
            // }
           
            this.container.append(this.renderItem(this._data[0]));
            this.top = 300;
            this.moveView();
            this.timer = setTimeout(() => this.playNext(), this.delay * 1000);
        }
        private renderItem(str: String): string {
            return '<h1>' + str + '</h1>'
        }
        private moveDown(): void{

        }
        private delta = 10;
        private count = 0;
        private moveView(): void {
            if (this.top > 900 || this.top < 40) this.delta = -this.delta;            
            this.top += this.delta;
            var t: number = this.top;
            TweenMax.to(this.view, 0.3, { y: t }).delay(1.7);
        }
        private playNext(): void{
           this. moveView();
            if (this.count >= this._data.length) this.count = 0;
           
            this.container.append(this.renderItem(this._data[this.count++]));
            var v: JQuery = this.view;
            var c: JQuery = this.container;
           
            this.view.animate({ scrollTop: this.height}, 2000, function () {
                c.children().first().remove();
                v.scrollTop(0);
               
               
            })

           // this.view.animate({ top: this.top }, 2000, function () {
               
           // })
            
            this.timer = setTimeout(() => this.playNext(), this.delay * 1000);
        }

       

    }


   
}

var stextSlider: ads.TextTicker2 = new ads.TextTicker2();

