var comps;
(function (comps) {
    var Clock = (function () {
        function Clock(id) {
            if (typeof id === "undefined") { id = null; }
            this.id = id;
            if (!id)
                id = 'Clock';
            this.view = document.getElementById(id);
            if (this.view) {
                this.time = document.getElementById(id + '-time');
                this.date = document.getElementById(id + '-date');
                this.ampm = document.getElementById(id + '-ampm');
                this.start();
                this.showTime();
            }
        }
        Clock.prototype.showTime = function () {
            var date = new Date();
            var txt = date.toString();
            var ar = txt.split(' ');
            var h = date.getHours();
            console.log(h);
            var am = h >= 12 ? 'PM' : 'AM';
            if (h > 12)
                h = h - 12;
            var m = date.getMinutes();
            this.time.innerHTML = h + ':' + ((m < 10) ? '0' : '') + m;
            this.ampm.innerHTML = am;
            this.date.innerHTML = ar[0] + ' ' + ar[1] + ' ' + ar[2] + ' ' + ar[3];
        };
        Clock.prototype.start = function () {
            var _this = this;
            setInterval(function () {
                return _this.showTime();
            }, 10000);
        };
        return Clock;
    })();
    comps.Clock = Clock;
})(comps || (comps = {}));
var trace = trace || function (data) {
    console.log(data);
};
var clock = new comps.Clock();
