/**
 * Created by VladHome on 7/23/2015.
 */
/// <reference path="../Registry.ts" />
var uplight;
(function (uplight) {
    var DetailsLarge = (function () {
        function DetailsLarge(el) {
            var _this = this;
            // console.log(view);
            var view = $(el);
            this.view = view;
            this.$name = view.find('[data-id=name]:first');
            this.$unit = view.find('[data-id=unit]:first');
            this.$more = view.find('[data-id=more]:first');
            this.$info = view.find('[data-id=info]:first');
            this.$tumb = view.find('[data-id=tumb]:first');
            this.$gallery = view.find('[data-id=gallery]:first');
            this.$gallery.on(CLICK, 'a', function (evt) { return _this.onGalClick(evt); });
            this.$img = view.find('[data-id=image]:first');
            this.$page = view.find('[data-id=page]:first');
            this.isVis = !view.hasClass(HIDE);
            view.find('[data-id=btnClose]').click(function () {
                var r = uplight.Registry.getInstance();
                r.events.triggerHandler(DetailsLarge.DETAILS_LARGE_CLOSE_CLICK);
            });
            this.addListeners();
        }
        DetailsLarge.prototype.show = function () {
            if (!this.isVis) {
                this.view.removeClass(HIDE).show();
                this.isVis = true;
            }
        };
        DetailsLarge.prototype.hide = function () {
            if (this.isVis) {
                this.view.addClass(HIDE).hide();
                this.isVis = false;
            }
        };
        DetailsLarge.prototype.addListeners = function () {
            var _this = this;
            var r = uplight.Registry.getInstance();
            r.events.on(DetailsLarge.DETAILS_LARGE_SHOW, function (evt, id) { return _this.showDetails(id); });
            r.events.on(DetailsLarge.DETAILS_LARGE_HIDE, function (evt) { return _this.hide(); });
            r.events.on(r.TIMEOUT, function (evt) { return _this.hide(); });
        };
        DetailsLarge.prototype.showDetails = function (id) {
            var dest = uplight.Registry.getInstance().model.getDestById(id);
            this.setDestination(dest).render().show();
        };
        DetailsLarge.prototype.setDestination = function (vo) {
            this.vo = vo;
            return this;
        };
        DetailsLarge.prototype.render = function () {
            var vo = this.vo;
            this.$name.text(vo.name);
            this.$unit.text(vo.unit || '');
            this.$more.html(this.createTable(vo.more || ''));
            if (vo.tmb)
                this.$tumb.html('<img src="' + vo.tmb + '">');
            else
                this.$tumb.html('');
            if (vo.imgs && vo.imgs.length) {
                var imgs = vo.imgs.split(',');
                this.$gallery.html(this.createGallery(imgs));
                this.$img.attr('src', imgs[0]);
            }
            else {
                this.$gallery.html('');
                this.$img.attr('src', '');
            }
            return this;
        };
        DetailsLarge.prototype.createTable = function (more) {
            if (more.length === 0)
                return '';
            var ar = more.split("\n");
            var out = '<div class="more" ><table class="table">';
            for (var i = 0, n = ar.length; i < n; i++) {
                var item = ar[i].split('\t');
                out += '<tr><td>' + (item[0] || '&nbsp;') + '</td><td>' + (item[1] || '&nbsp;') + '</td></tr>';
            }
            out += '</table></div>';
            return out;
        };
        DetailsLarge.prototype.createGallery = function (imgs) {
            var ar = imgs;
            var out = '';
            for (var i = 0, n = ar.length; i < n; i++)
                out += '<a><img src="' + ar[i] + '" /></a>';
            out += '';
            return out;
        };
        DetailsLarge.prototype.onGalClick = function (evt) {
            console.log($(evt.currentTarget));
            this.$img.attr('src', $(evt.currentTarget).children('img').first().attr('src'));
        };
        DetailsLarge.DETAILS_LARGE_HIDE = 'HIDE_DETAILS_LARGE';
        DetailsLarge.DETAILS_LARGE_CLOSE_CLICK = 'DETAILS_LARGE_CLOSE_CLICK';
        DetailsLarge.DETAILS_LARGE_SHOW = 'SHOW_DETAILS_LARGE';
        return DetailsLarge;
    })();
    uplight.DetailsLarge = DetailsLarge;
})(uplight || (uplight = {}));
//# sourceMappingURL=DetailsLarge.js.map