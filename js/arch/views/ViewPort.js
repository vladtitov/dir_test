/// <reference path="../Registry.ts" />
var uplight;
(function (uplight) {
    var ViewPort = (function () {
        function ViewPort(view) {
            var _this = this;
            this.view = view;
            this.view.css('overflow-x', 'hidden');
            this.view.css('overflow-y', 'scroll');
            this.width = this.view.width();
            this.view.width(this.width + 20);
            this.height = this.view.height();
            this.slider = $('<div class="listHolder"></div>').appendTo(this.view);
            this.slider.css('float', 'left');
            this.slider.width(this.width * 2 + 20);
            this.slider.height(this.height);
            this.R = kiosk.Registry.getInstance();
            this.R.mainView = this;
            this.btnBack = $('#contentBack').on(CLICK, function () {
                return _this.onContentBack();
            }).addClass(DISABLED);
        }
        ViewPort.prototype.reset = function () {
            this.view.scrollTop(0);
        };

        ViewPort.prototype.pushViewAhead = function (el) {
            this.lastPosition = -Math.round(this.slider.position().top) + 50;
            if (this.slider.children().length > 1) {
                this.current.siblings().remove();
                console.log(' more  then one child in slider');
            }

            //this.prev = this.current;
            //if (this.prev)
            this.btnBack.removeClass(DISABLED);
            this.current = el;
            el.css('margin-top', this.lastPosition);
            this.slider.append(el);
            var view = this.view;
            this.view.animate({ scrollLeft: this.width }, 500, function () {
                el.siblings().hide();
                view.scrollLeft(0);
                view.scrollTop(0);
                el.css('margin-top', 0);
            });
        };
        ViewPort.prototype.rollBack = function () {
            //if (!this.prev) return;
            var el = this.current.prevAll().show();

            this.view.scrollLeft(this.width);
            this.view.scrollTop(this.lastPosition);
            this.current.css('margin-top', this.lastPosition);
            this.current = this.prev;
            this.btnBack.addClass(DISABLED);
            this.prev = null;
            this.view.animate({ scrollLeft: 0 }, 500, function () {
                el.siblings().remove();
            });
            /// this.current.on(CLICK, 'li', (evt) => this.R.onSearchResultClick2(evt));
        };

        ViewPort.prototype.showView = function (el) {
            var _this = this;
            if (this.prev == el) {
                this.showViewBack(el);
                return;
            }

            el.show();
            this.prev = this.current;
            if (this.prev)
                this.btnBack.removeClass(DISABLED);
            this.current = el;
            el.off(CLICK);
            el.on(CLICK, 'li', function (evt) {
                return _this.onListClick(evt);
            });
            this.view.scrollTop(0);
            this.slider.append(el);

            if (this.slider.children().length > 1) {
                // console.log('animate   scrollLeft:' + this.width);
                this.view.animate({ scrollLeft: this.width }, 500, function () {
                    el.siblings().remove();
                    _this.view.scrollLeft(0);
                });
            }
        };

        ViewPort.prototype.showViewBack = function (el) {
            var _this = this;
            if (this.slider.children().length > 1) {
                console.log('CHIDREN more then 1');
                this.current.siblings().remove();
            }
            el.on(CLICK, 'li', function (evt) {
                return _this.onListClick(evt);
            });
            this.btnBack.addClass(DISABLED);
            this.current = el;
            this.prev = null;
            this.view.scrollTop(0);
            el.show();
            this.slider.prepend(el);
            this.view.scrollLeft(this.width);
            this.view.animate({ scrollLeft: 0 }, 500, function () {
                el.siblings().remove();
            });
        };

        ViewPort.prototype.onContentBack = function () {
            if (this.btnBack.hasClass(DISABLED))
                return;
            if (this.slider.children().length == 1) {
                this.showViewBack(this.prev);
            } else
                this.rollBack();
        };
        return ViewPort;
    })();
    uplight.ViewPort = ViewPort;
})(uplight || (uplight = {}));
//# sourceMappingURL=viewport.js.map
