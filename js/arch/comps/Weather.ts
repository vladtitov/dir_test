/// <reference path="../../Scripts/typings/jquery/jquery.d.ts" />
module comps {
    export class Weather {
        private view: HTMLElement;
        private url: string
        private image: HTMLImageElement;
        private text: HTMLSpanElement;

        constructor() {
            this.view = document.getElementById('Weather');

            // trace(this.image);
            if (this.view) this.init();
        }
        private init(): void {
            this.image = < HTMLImageElement>this.view.getElementsByTagName('img')[0];
            this.text = <HTMLSpanElement > this.view.getElementsByTagName('span')[0]
            this.url = $(this.view).attr('data-url');
            setInterval(() => this.refresh(), 1000000);
            this.refresh();
        }

        private refresh(): void {

            var that: Weather = this;
            $.ajax({
                url: this.url,
                dataType: "jsonp",
                success: function (res: any) {
                    if (res) {
                        that.text.innerText = res.temp + '°F';
                        that.image.src = res.img;
                        $(that.view).show();
                    }

                },
                error: function (data) {
                    trace('ERROR');
                    trace(data);
                    $(that.view).hide();
                }

            });
        }
    }
    var trace = trace;
}
