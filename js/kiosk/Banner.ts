/// <reference path="Registry.ts" />
module uplight {
    export class Banner {
        view: JQuery;
        loadImage(url: string): void {
            this.imgBanner = $('<img src="' + url + '" />').prependTo(this.view);
            this.imgBanner.on('load', function () {

                if ($(this).width() < 1000) $(this).css('margin-left', '70px').css('margin-top', '30px');
                else $(this).css('margin', '0');


            });
        }
        addClock(): void {
          //  var clock: Clock = new Clock();
           // this.view.append(clock.view);
        }

        addWeather(): void {
            var weather: Weather = new Weather();
            this.view.append(weather.view);
        }
        private R:Registry;
        private imgBanner: JQuery;
        constructor() {           
            this.R = Registry.getInstance();

            this.view = $('#Banner');
           // this.loadImage(sett.header.logo);
            this.addWeather();
            this.addClock();
           // $('Header').text(sett.header);
        }
    }



    export class Clock {
        view:JQuery
        private date:JQuery
        private time:JQuery;
        private ampm:JQuery
        constructor(el:HTMLElement) {
            this.view = $(el);
            this.time = $('<span></span>').appendTo(this.view);
            this.ampm = $('<span></span>').appendTo(this.view); 
            this.view.append('<br/>');
            this.date = $('<span></span>').appendTo(this.view);
                       
            this.start();
            this.showTime();           

        }

        private showTime(): void {
            var date: Date = new Date();
            var txt: string = date.toString();
            var ar: string[] = txt.split(' ');
            var h: number = date.getHours();
            var am: string = h >= 12 ? 'PM' : 'AM';
            if (h > 12) h = h - 12;
            else if (h == 0) h = 12;
            var m: number = date.getMinutes();
            this.time.text( h + ':' + ((m < 10) ? '0' : '') + m);
            this.ampm.text(am);
            this.date.text(ar[0] + ' ' + ar[1] + ' ' + ar[2] + ' ' + ar[3]);
        }
        private start(): void {
            setInterval(() => this.showTime(), 10000);
        }
    }



    export class Weather {
       view:JQuery;
        private url: string
        private image: JQuery;
        private text: JQuery;
        private R:Registry;
        constructor() {
            this.R = Registry.getInstance();
            this.url = this.R.getSettings('weather_url');
            this.view = $('<div id="Weather"></div>');
            this.image = $('<img align="left" />').appendTo(this.view);
            this.text = $('<span></span>').appendTo(this.view);
            this.url = '/weather/Weather.php?city=Toronto';
            setInterval(() => this.refresh(), 1000000);
            this.refresh();
        }


        private onResult(resp): void {
           // console.log(resp);
                this.text.text(resp.temp + '°C');
                this.image.attr('src', resp.img);
                this.view.show();           
        }

        private onError(): void {
            this.view.hide();
        }
        private refresh(): void {
            var that: Weather = this;
            $.ajax({
                url: this.url,
                dataType: "json",
                success: (res)=>this.onResult(res),
                error: (data) => this.onError()
            });
        }
    }
}