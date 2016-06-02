/// <reference path="../typing/jquery.d.ts" />
/// <reference path="../typing/easeljs.d.ts" />
module uplight.ads{
    import c = createjs;
    export class SS_1920 {
        view: JQuery;
        private texts: c.Container;
        private rect: c.Shape;
        start() {
            //createjs.Ticker.timingMode = createjs.Ticker.RAF_SYNCHED;;
           // createjs.Ticker.setFPS(30);
            this.stage.removeAllChildren();
            var texts = new c.Container;

            var ar: string[] = this.data;
            for (var i = 0, n = ar.length; i < n; i++) {
                var txt = new c.Text(ar[i], "50px Arial",'#FFFFFF');
                txt.y = i * 90+50;
                txt.x = 50;
                texts.addChild(txt);
            }
            this.rect = this.makeRect();
            texts.mask = this.rect;

            this.stage.addChild(texts);
            c.Ticker.on('tick', (evt) => this.onTick(evt));

            this.stage.update();
        }
        private delta = 1;
        private onTick(evt): void {
           // console.log(evt);

           // console.log(this);
           // evt.remove();
            this.stage.update();
           // c.Ticker.off('tick', (evt) => this.onTick(evt));
            //c.Ticker.setPaused(true)

            this.rect.y += this.delta;
            if (this.rect.y > 1000) this.delta = -1;
            else if (this.rect.y < 0) this.delta = 1;
        }
        private makeRect(): c.Shape {           
            return new c.Shape(new c.Graphics().beginFill("#ff0000").drawRect(0, 0, 1920, 80));
        }
        stop() {

        }

        destroy() {

        }
        setData(data: any) {
            this.data = data;
        }

        private data: any;
        private stage: c.Stage;

        constructor() {
            var canvas: HTMLCanvasElement = document.createElement('canvas')
            canvas.width = window.innerWidth;;
            canvas.height = window.innerHeight;
            $('#screensaver').append(canvas).css('background-color','rgba(0,0,0,0.7)');
            this.view = $(canvas);
           // this.view.width(1920);
           // this.view.height(1080);

            this.stage = new c.Stage(canvas);           

            var ar: string[] = ["I am listening to UPDATE event and dont have this problem any more", "Accelerator directors and staff looking to improve their program", "Entrepreneurs making the decision to apply to or join an accelerator", "Sponsors and donors assessing their financial support of accelerators", "Mentors considering donating their time and expertise", "Government agencies and policy-makers evaluating the role", "Sponsors and donors assessing their financial support of accelerators", "Mentors considering donating their time and expertise", "Government agencies and policy-makers evaluating the role"];
            this.setData(ar);
           setTimeout(()=> this.start(),1000);
        }


    }


    var init = function () {
        return new uplight.ads.SS_1920();

    }
}

//uplight.ads.init();

new uplight.ads.SS_1920();