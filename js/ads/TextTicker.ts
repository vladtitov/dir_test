/// <reference path="../typing/jquery.d.ts" />

module ads{
    export class TextTicker{

        stop(): void {
            console.log('Ticker stop');
            console.log(this.timer);
            clearTimeout(this.timer);
            this.timer=null
           // console.log(this.timer);
            // this.view = null;
            //this._data = null;
            this.current = 0;
            this.top = 100;
        }

        view: JQuery;
        delay: number=10;
        private width: number = 1920;
        private maxY: number = 900;
        private height: number = 110;
       // private container: JQuery;
        private _data: string[];
        private current: number = 0;
        private timer: number;
        private top: number=100;



       // private timer2: number;
        private delay2: number=100;
        private isMove: boolean;

        constructor() {
            this.view = $('<div id="Ticker" style="position:absolute;" ></div>');
            this.view.width(this.width);
            this.view.height(this.height);
            this.view.css('overflow', 'hidden');
           // this.container = $('<div></div>').appendTo(this.view);          // this.container.
                     
        }
       
        private onTimer2(): void{
            this.isMove = true;
        }
        startTimer2() {
           // this.timer2 = setInterval(() => this.onTimer2(), this.delay2 * 1000);

        }
        setData(data: string[]): TextTicker{          
            this._data = data; 
            return this;           
        }
        getData(): string[] {
            return this._data;
        }
        private moveDown(): void{

        }
        playNext(): void{
            console.log('playNext ' + this.current+' of '+ this._data.length);
            if (this.isMove) {
                this.isMove = false;
                this.moveDown();                
            }
            if (this.current >= this._data.length) this.current = 0;
            var msg: string = this._data[this.current++];
            this.view.append('<H2>' + msg + '</H2>');
            if (this.view.children().length > 1) this.removeFirst(this.view);
            clearTimeout(this.timer);
            this.timer = setTimeout(() => this.playNext(), this.delay * 1000);
        }

        private removeFirst(cont: JQuery) {
           // var vp: JQuery = cont;
            this.top += 95;
            if (this.top > 800) this.top = 100;

            cont.animate({ scrollTop: 95, top: this.top }, 500, 'linear', function () {
                cont.scrollTop(0);
                cont.children().first().remove();
            })

        }





    }


   
}

