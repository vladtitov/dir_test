/// <reference path="Registry.ts" />
var uplight;
(function (uplight) {
    var MainView = (function () {
        function MainView(id, width, height) {
            this.width = width;
            this.height = height;
            this.count = 0;
            this.view = $(id);
            //view.html('');                        
            this.slider = $('<div class="myslider"></div>').width(this.width).css('overflow', 'hidden').appendTo(this.view);
            this.container = $('<div class="container"></div>').width(this.width * 2 + 20).appendTo(this.slider);
            this.btnBack = $(id + ' .redbutton').hide().appendTo(this.view);
            this.history = $('#History');
        }
        MainView.prototype.showView = function (el) {
            var _this = this;
            console.log('inTransition ', this.inTransition);
            if (this.inTransition)
                return;
            if (!this.homeView)
                this.homeView = el;
            el.show();
            this.current = el;
            this.container.append(el);
            if (this.container.children().length == 1)
                return;
            this.inTransition = true;
            this.slider.animate({ scrollLeft: this.width }, 500, function () {
                _this.addToHistory(el.siblings());
                _this.slider.scrollLeft(0);
                _this.inTransition = false;
            });
        };
        MainView.prototype.showViewBack = function (el) {
            var _this = this;
            console.log('inTransition  back ', this.inTransition);
            if (this.inTransition)
                return;
            if (this.container.children().length > 1) {
                console.log('CHIDREN more then 1');
                this.current.siblings().remove();
            }
            el.show();
            this.current = el;
            this.container.prepend(el);
            if (this.container.children().length == 1)
                return;
            this.slider.scrollLeft(this.width);
            this.inTransition = true;
            this.slider.animate({ scrollLeft: 0 }, this.width, function () {
                el.siblings().remove();
                _this.inTransition = false;
                if (_this.count == 0)
                    _this.showViewBack(_this.homeView);
            });
        };
        MainView.prototype.showHistory = function () {
            this.showViewBack(this.getFromHistory());
            this.btnBack.attr('href', '#back=' + this.count++);
            if (this.history.children().length == 0)
                this.reset();
        };
        MainView.prototype.reset = function () {
            this.history.html('');
            this.count = 0;
            this.btnBack.hide('fast');
            this.showViewBack(this.homeView);
        };
        MainView.prototype.addToHistory = function (el) {
            this.count++;
            this.history.append(el);
            this.btnBack.show();
            if (this.history.children().length > 20)
                this.history.children().first().remove();
        };
        MainView.prototype.getFromHistory = function () {
            return this.history.children().last();
        };
        return MainView;
    })();
    uplight.MainView = MainView;
})(uplight || (uplight = {}));
//# sourceMappingURL=mainview.js.map