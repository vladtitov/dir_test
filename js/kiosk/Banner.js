/// <reference path="Registry.ts" />
var uplight;
(function (uplight) {
    var Banner = (function () {
        function Banner() {
            this.R = uplight.Registry.getInstance();
            this.view = $('#Banner');
            // this.loadImage(sett.header.logo);
            this.addWeather();
            this.addClock();
            // $('Header').text(sett.header);
        }
        Banner.prototype.loadImage = function (url) {
            this.imgBanner = $('<img src="' + url + '" />').prependTo(this.view);
            this.imgBanner.on('load', function () {
                if ($(this).width() < 1000)
                    $(this).css('margin-left', '70px').css('margin-top', '30px');
                else
                    $(this).css('margin', '0');
            });
        };
        Banner.prototype.addClock = function () {
            //  var clock: Clock = new Clock();
            // this.view.append(clock.view);
        };
        Banner.prototype.addWeather = function () {
            var weather = new Weather();
            this.view.append(weather.view);
        };
        return Banner;
    })();
    uplight.Banner = Banner;
    var Clock = (function () {
        function Clock(el) {
            this.view = $(el);
            this.time = $('<span></span>').appendTo(this.view);
            this.ampm = $('<span></span>').appendTo(this.view);
            this.view.append('<br/>');
            this.date = $('<span></span>').appendTo(this.view);
            this.start();
            this.showTime();
        }
        Clock.prototype.showTime = function () {
            var date = new Date();
            var txt = date.toString();
            var ar = txt.split(' ');
            var h = date.getHours();
            var am = h >= 12 ? 'PM' : 'AM';
            if (h > 12)
                h = h - 12;
            else if (h == 0)
                h = 12;
            var m = date.getMinutes();
            this.time.text(h + ':' + ((m < 10) ? '0' : '') + m);
            this.ampm.text(am);
            this.date.text(ar[0] + ' ' + ar[1] + ' ' + ar[2] + ' ' + ar[3]);
        };
        Clock.prototype.start = function () {
            var _this = this;
            setInterval(function () { return _this.showTime(); }, 10000);
        };
        return Clock;
    })();
    uplight.Clock = Clock;
    var Weather = (function () {
        function Weather() {
            var _this = this;
            this.R = uplight.Registry.getInstance();
            this.url = this.R.getSettings('weather_url');
            this.view = $('<div id="Weather"></div>');
            this.image = $('<img align="left" />').appendTo(this.view);
            this.text = $('<span></span>').appendTo(this.view);
            this.url = '/weather/Weather.php?city=Toronto';
            setInterval(function () { return _this.refresh(); }, 1000000);
            this.refresh();
        }
        Weather.prototype.onResult = function (resp) {
            // console.log(resp);
            this.text.text(resp.temp + '°C');
            this.image.attr('src', resp.img);
            this.view.show();
        };
        Weather.prototype.onError = function () {
            this.view.hide();
        };
        Weather.prototype.refresh = function () {
            var _this = this;
            var that = this;
            $.ajax({
                url: this.url,
                dataType: "json",
                success: function (res) { return _this.onResult(res); },
                error: function (data) { return _this.onError(); }
            });
        };
        return Weather;
    })();
    uplight.Weather = Weather;
})(uplight || (uplight = {}));
//# sourceMappingURL=banner.js.map