/**
 * Created by VladHome on 8/16/2015.
 */
/// <reference path="../RegA.ts" />
var uplight;
(function (uplight) {
    var GalleryPreview = (function () {
        function GalleryPreview(prop, template, i) {
            var _this = this;
            this.i = i;
            this.type = 'gallery';
            var data = new uplight.DataGallery();
            data.props = prop;
            data.template = template;
            this.data = data;
            this.R = uplight.RegA.getInstance();
            console.log('Gallery list ' + prop.url);
            this.view = $('#Template [data-ctr=GalleryPreview]:first').clone();
            this.list = $('<ul>').appendTo(this.view.find('.nano')).hide();
            this.btnShowImages = this.view.find('[data-id=btnShowImages]').click(function () { return _this.onShowImages(); });
            this.btnEdit = this.view.find('[data-id=btnEdit]:first').click(function () { return _this.onEditClick(); });
            this.$name = this.view.find('[data-id=name]');
            this.$delay = this.view.find('[data-id=delay]');
            this.$size = this.view.find('[data-id=size]');
            this.loadData();
        }
        // gallery:string[];
        GalleryPreview.prototype.appendTo = function (container) {
            this.view.appendTo(container);
        };
        GalleryPreview.prototype.saveData = function (data) {
            this.data = data;
            return this.save();
        };
        GalleryPreview.prototype.getData = function () {
            return this.data;
        };
        GalleryPreview.prototype.setData = function (data) {
            this.data = data;
        };
        /* private onEditorClose():void{
             this.view.show();
            // this.editor.view.remove();
             this.loadData();
             if(this.onEditExit)this.onEditExit();
         }*/
        GalleryPreview.prototype.onEditClick = function () {
            this.R.dispatcher.triggerHandler(this.R.ATTRACTLOOP_EDIT, this);
        };
        GalleryPreview.prototype.save = function () {
            return this.R.connector.saveData(JSON.stringify(this.data.gallery), this.data.props.url);
        };
        GalleryPreview.prototype.loadData = function () {
            var _this = this;
            this.inTransaction = true;
            this.R.connector.getData(this.data.props.url).done(function (res) { return _this.onData(res); });
        };
        GalleryPreview.prototype.onData = function (res) {
            this.inTransaction = false;
            this.data.gallery = JSON.parse(res);
            //console.log(this.data);
            this.render();
        };
        GalleryPreview.prototype.onShowImages = function () {
            if (this.btnShowImages.data('vis')) {
                this.list.hide('fast');
                this.btnShowImages.data('vis', false);
                this.btnShowImages.children().last().text('Show Images');
            }
            else {
                this.btnShowImages.data('vis', true);
                this.list.show('fast');
                this.btnShowImages.children().last().text('Hide Images');
            }
        };
        GalleryPreview.prototype.renderProp = function () {
            this.$name.text(this.data.template.name);
            this.$delay.text(this.data.props.delay);
            this.$size.text(this.data.template.size);
        };
        GalleryPreview.prototype.render = function () {
            this.renderProp();
            var ar = this.data.gallery;
            var out = '';
            for (var i = 0, n = ar.length; i < n; i++) {
                out += '<li data-i="' + i + '"><img src="' + ar[i] + '" /></li>';
            }
            this.list.html(out);
        };
        return GalleryPreview;
    }());
    uplight.GalleryPreview = GalleryPreview;
})(uplight || (uplight = {}));
//# sourceMappingURL=GalleryPreview.js.map