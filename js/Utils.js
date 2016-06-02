/**
 * Created by VladHome on 12/15/2015.
 */
///<reference path='typing/jquery.d.ts' />
///<reference path='typing/underscore.d.ts' />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var uplight;
(function (uplight) {
    var Utils = (function () {
        function Utils() {
        }
        Utils.message = function (text, vis, time) {
            if (!time)
                time = 3;
            var msg = $('<div>').addClass('message').css(vis.offset()).text(text).appendTo('body');
            msg.hide();
            msg.show('fast');
            setTimeout(function () {
                msg.hide('fast', function () {
                    msg.remove();
                });
            }, time * 1000);
        };
        return Utils;
    }());
    uplight.Utils = Utils;
    /*  export class VOResult{
          success:string;
          error:string;
          result:string;
          message:string;
      }
  */
    var UItem = (function () {
        function UItem() {
        }
        return UItem;
    }());
    uplight.UItem = UItem;
    var Connect = (function () {
        function Connect(service, id) {
            this.service = 'rem/index.php';
            this.logger = 'rem/logger.php';
            var ar = service.split(',');
            if (ar.length == 2) {
                this.service = 'rem/' + ar[0] + '.php';
                this.action = ar[1];
            }
            else
                this.action = ar[0];
            if (id)
                this.id = id;
            // console.log('Connect service:'+service+' action: '+action);
        }
        Connect.prototype.post = function (obj, url) {
            if (typeof obj == 'object')
                obj = JSON.stringify(obj);
            return $.post(this.service + this.makeUrl(url), obj);
        };
        Connect.prototype.makeUrl = function (url) {
            if (!url)
                url = '?a=' + this.action;
            else if (this.action)
                url = '?a=' + this.action + '.' + url;
            else
                url = '?a=' + url;
            if (this.id)
                url += '&id=' + this.id;
            return url;
        };
        Connect.prototype.get = function (url) {
            return $.get(this.service + this.makeUrl(url));
        };
        Connect.prototype.log = function (obj, url) {
            if (typeof obj == 'object')
                obj = JSON.stringify(obj);
            if (!url)
                url = '?a=LOG';
            return $.post(this.logger + this.makeUrl(url), obj);
        };
        Connect.prototype.logError = function (obj) {
            var url = '?a=ERROR';
            return this.log(obj, url);
        };
        Connect.prototype.emailError = function (obj) {
            var url = '?a=EMAIL';
            return this.log(obj, url);
        };
        return Connect;
    }());
    uplight.Connect = Connect;
    var Registry = (function () {
        function Registry() {
        }
        return Registry;
    }());
    uplight.Registry = Registry;
    var DisplayObject = (function () {
        function DisplayObject($view, name) {
            this.$view = $view;
            this.name = name;
        }
        DisplayObject.prototype.onShow = function () { };
        DisplayObject.prototype.onHide = function () { };
        DisplayObject.prototype.onAdded = function () { };
        DisplayObject.prototype.onRemoved = function () { };
        DisplayObject.prototype.destroy = function () {
            this.$view.remove();
        };
        DisplayObject.prototype.show = function () {
            this.isVisuble = true;
            this.onShow();
            this.$view.show();
            return this;
        };
        DisplayObject.prototype.hide = function () {
            if (this.isVisuble) {
                this.isVisuble = false;
                this.$view.hide();
                this.onHide();
            }
            return this;
        };
        DisplayObject.prototype.appendTo = function (parent) {
            parent.append(this.$view);
            this.onAdded();
            return this;
        };
        DisplayObject.prototype.remove = function () {
            this.$view.detach();
            this.onRemoved();
            return this;
        };
        return DisplayObject;
    }());
    uplight.DisplayObject = DisplayObject;
    var WindowView = (function (_super) {
        __extends(WindowView, _super);
        function WindowView($view, opt, name) {
            var _this = this;
            _super.call(this, $view, name);
            this.$view.find('[data-id=btnClose]').click(function () { return _this.onClose(); });
        }
        WindowView.prototype.onClose = function () {
            this.hide();
        };
        return WindowView;
    }(DisplayObject));
    uplight.WindowView = WindowView;
    var ModuleView = (function (_super) {
        __extends(ModuleView, _super);
        function ModuleView($view, opt, name) {
            _super.call(this, $view, name);
        }
        return ModuleView;
    }(WindowView));
    uplight.ModuleView = ModuleView;
})(uplight || (uplight = {}));
//# sourceMappingURL=Utils.js.map