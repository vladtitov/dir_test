/// <reference path="../../typing/jquery.d.ts" />
var uplight;
(function (uplight) {
    var BreadCrumbs = (function () {
        function BreadCrumbs(view) {
            var _this = this;
            this.view = view;
            console.log(view);
            this.list = $('<ul>').appendTo(view);
            this.list.on(CLICK, 'li', function (evt) { return _this.onListClick(evt); });
        }
        BreadCrumbs.prototype.addCrumb = function (url, text) {
            if (this.selected)
                this.selected.removeClass('active');
            // this.selected =$('<li>').addClass('active').data('id',url).append($('<a>').attr('href',this.home+'/'+url).text(text)).appendTo(this.list);
            this.selected = $('<li>').addClass('active').data('id', url).text(text).appendTo(this.list);
        };
        BreadCrumbs.prototype.clear = function () {
            this.selected = null;
            this.list.html('');
        };
        BreadCrumbs.prototype.removeLast = function () {
            this.list.children().last().detach();
            this.selected = this.list.children().last().addClass('active');
        };
        BreadCrumbs.prototype.onListClick = function (evt) {
            var el = $(evt.currentTarget);
            if (this.onCiick)
                this.onCiick(el.data('id'));
        };
        return BreadCrumbs;
    }());
    uplight.BreadCrumbs = BreadCrumbs;
    var Confirm = (function () {
        function Confirm(view) {
            var _this = this;
            this.view = view;
            this.title = view.find('[data-id=title]:first');
            this.text = view.find('[data-id=text]:first');
            this.btnClose = view.find('[data-id=btnClose]:first').click(function () {
                _this.hide();
            });
            this.btnYes = view.find('[data-id=btnYes]:first').click(function () {
                _this.hide();
                if (_this.onYes)
                    _this.onYes();
            });
            this.btnNo = view.find('[data-id=btnNo]:first').click(function () {
                _this.hide();
                if (_this.onNo)
                    _this.onNo();
            });
        }
        Confirm.prototype.hide = function () {
            this.view.fadeOut();
        };
        Confirm.prototype.show = function (title, text, onYes, onNo) {
            this.title.text(title);
            this.text.html(text);
            this.onYes = onYes;
            this.onNo = onNo;
            this.view.fadeIn();
            this.view.show();
        };
        return Confirm;
    }());
    uplight.Confirm = Confirm;
})(uplight || (uplight = {}));
//# sourceMappingURL=Utils.js.map