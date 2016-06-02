/**
 * Created by VladHome on 12/30/2015.
 */
///<reference path='typing/jquery.d.ts' />
///<reference path='typing/underscore.d.ts' />
///<reference path='Utils.ts' />
///<reference path='admin/net.ts' />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var uplight;
(function (uplight) {
    var SimpleForm = (function (_super) {
        __extends(SimpleForm, _super);
        function SimpleForm($view, service, name) {
            _super.call(this, $view, name);
            this.$view = $view;
            this.message = 'Form error';
            this.conn = new uplight.Connect(service, name);
        }
        SimpleForm.prototype.init = function () {
            var _this = this;
            this.$view.find("form").submit(function (evt) { evt.preventDefault(); });
            var ar = [];
            var dic = {};
            this.$view.find('input').each(function (i, el) {
                dic[el.getAttribute('name')] = el;
                ar.push(el);
            });
            this.inputs = ar;
            this.ind = dic;
            this.$submit = this.$view.find('[type=submit]').click(function () { return _this.onSubmitClick(); });
            this.onInit();
        };
        SimpleForm.prototype.onInit = function () {
        };
        SimpleForm.prototype.setTitle = function (title) {
            this.$view.find('[data-id=title]').text(title);
        };
        SimpleForm.prototype.setData = function (data) {
            for (var str in data)
                if (this.ind[str])
                    this.ind[str].value = data[str];
            this.currentItem = data;
        };
        SimpleForm.prototype.clear = function () {
            var ar = this.inputs;
            for (var i = 0, n = ar.length; i < n; i++) {
                ar[i].value = '';
            }
        };
        SimpleForm.prototype.onSubmitClick = function () {
            var valid = true;
            var ar = this.inputs;
            var data = {};
            for (var i = 0, n = ar.length; i < n; i++) {
                if (!ar[i].checkValidity())
                    valid = false;
                if (ar[i].type == 'checkbox')
                    data[ar[i].name] = ar[i].checked;
                else
                    data[ar[i].name] = ar[i].value;
            }
            if (valid) {
                var btn = this.$submit.prop('disabled', true);
                setTimeout(function () {
                    btn.prop('disabled', false);
                }, 3000);
                this.onSubmit(data);
            }
        };
        SimpleForm.prototype.onComplete = function (res) {
        };
        SimpleForm.prototype.onError = function (res) {
            var msg = res.message || this.message;
            this.showMessage(msg);
            console.log(msg);
        };
        SimpleForm.prototype.onResult = function (res) {
            if (res.success)
                this.onComplete(res);
            else
                this.onError(res);
        };
        SimpleForm.prototype.onRespond = function (s) {
            var res;
            // console.log(s);
            if (typeof s == 'string') {
                try {
                    res = JSON.parse(s);
                }
                catch (e) {
                    this.showMessage('Communication Error logged on server <br/> We will contact you soon');
                    this.conn.logError('EMAIL' + this.name + this.conn.service + '  ' + s);
                    //  console.log(s);
                    return;
                }
            }
            else
                res = s;
            if (res)
                this.onResult(res);
        };
        SimpleForm.prototype.send = function (obj) {
            var _this = this;
            this.conn.post(obj).done(function (s) { return _this.onRespond(s); });
        };
        SimpleForm.prototype.onSubmit = function (data) {
            if (this.currentItem) {
                for (var str in data)
                    this.currentItem[str] = data[str];
                this.send(this.currentItem);
            }
            else
                this.send(data);
        };
        SimpleForm.prototype.showMessage = function (str) {
            var msg = this.$view.find('[data-id=message]').html(str).removeClass('hidden').fadeIn();
            clearTimeout(this.timeout);
            this.timeout = setTimeout(function () { msg.fadeOut(); }, 5000);
        };
        return SimpleForm;
    }(uplight.DisplayObject));
    uplight.SimpleForm = SimpleForm;
    var ModalForm = (function (_super) {
        __extends(ModalForm, _super);
        function ModalForm($view, service, name) {
            var _this = this;
            _super.call(this, $view, service, name);
            var btn = this.$view.find('[data-id=btnClose]').click(function () { return _this.onCloseClick(); });
        }
        ModalForm.prototype.onCloseClick = function () {
            this.hide();
        };
        return ModalForm;
    }(SimpleForm));
    uplight.ModalForm = ModalForm;
    var LoginForm = (function (_super) {
        __extends(LoginForm, _super);
        function LoginForm($view, service, name) {
            _super.call(this, $view, service, name);
            this.$view = $view;
        }
        LoginForm.prototype.onInit = function () {
            var _this = this;
            var chk = this.$view.find('[name=showpassword]').click(function () {
                if (chk.prop('checked'))
                    _this.ind['password'].type = 'text';
                else
                    _this.ind['password'].type = 'password';
            });
        };
        LoginForm.prototype.onComplete = function (res) {
            if (res.success == 'loggedin')
                window.location.href = res.result;
        };
        return LoginForm;
    }(SimpleForm));
    uplight.LoginForm = LoginForm;
})(uplight || (uplight = {}));
//# sourceMappingURL=Forms.js.map