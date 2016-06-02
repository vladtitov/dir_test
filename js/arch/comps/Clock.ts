module comps{
    export class Clock {
        private view: HTMLDivElement;
        private date: HTMLSpanElement;
        private time: HTMLSpanElement;
        private ampm: HTMLSpanElement;
        constructor(public id: string= null) {
            if (!id)id='Clock';    
            this.view = <HTMLDivElement> document.getElementById(id);
            if (this.view) {
                this.time = <HTMLSpanElement> document.getElementById(id + '-time');
                this.date = <HTMLSpanElement> document.getElementById(id+'-date');
                this.ampm = <HTMLSpanElement> document.getElementById(id + '-ampm');
                this.start();
                this.showTime();
            }

        }

        private showTime(): void{
            var date: Date = new Date();
            var txt: string = date.toString();
            var ar: string[] = txt.split(' ');
            var h: number = date.getHours();
            console.log(h);
            var am: string = h >= 12 ? 'PM' : 'AM';
            if (h > 12) h = h - 12;
            var m: number = date.getMinutes();
            this.time.innerHTML = h + ':' +((m<10)?'0':'')+m ;
            this.ampm.innerHTML = am;
           this.date.innerHTML = ar[0] + ' ' + ar[1] + ' ' + ar[2] + ' ' + ar[3];
        }
        private start(): void {
           
            setInterval(()=>this.showTime(), 10000);
        }
    }
}
var trace = trace || function (data) { console.log(data); };
var clock: comps.Clock = new comps.Clock();