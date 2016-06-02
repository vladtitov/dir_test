/// <reference path="../rega.ts" />
var uplight;
(function (uplight) {
    var CategoryForm = (function () {
        function CategoryForm(view) {
            var _this = this;
            this.R = uplight.RegA.getInstance();
            this.model = this.R.model;
            this.view = view;
            this.tiName = view.find('[data-id=tiName]:first');
            this.chkEnable = view.find('[data-id=chkEnable]:first').on('click', function () { return _this.onCheckClick(); });
            this.icon = view.find('[data-id=icon]:first');
            this.iconsLibrary = view.find('[data-id=iconsLibrary]:first');
            this.$iconsList = this.iconsLibrary.find('.list:first');
            this.btnEditIcon = view.find('[data-id=btnEditIcon]:first');
            this.btnClose = view.find('[data-id=btnClose]');
            this.btnSave = view.find('[data-id=save]:first');
            this.selectSeq = view.find('[data-id=selectSeq]:first');
            this.btnBlankIcon = view.find('[data-id=btnBlankIcon]:first').click(function () {
                _this.icon.attr('class', 'fa fa-fw');
            });
            this.btnSave.on(CLICK, function () { return _this.onSaveClicked(); });
            this.R.dispatcher.on(this.R.CATEGORY_SELECTED, function (evt, cat) { return _this.onCategorySelected(cat); });
            if (this.model.getCategories())
                this.renderSequance();
            else
                this.model.dispatcher.on(this.model.CHANGE, function () { return _this.renderSequance(); });
            this.iconsLibrary.parent().hide();
            this.btnEditIcon.on(CLICK, function () { return _this.onEditIconClick(); });
            this.icon.parent().on(CLICK, function () { return _this.onEditIconClick(); });
            this.R.connector.getData('fa-icons').done(function (data) { return _this.onIconsLoaded(data); });
            this.iconPreview = $('<div>').addClass('abs preview').appendTo(this.iconsLibrary.parent());
            this.btnClose.on(CLICK, function () {
                if (_this.onClose)
                    _this.onClose();
                _this.hide();
            });
            this.hide();
        }
        CategoryForm.prototype.toggle = function () {
            if (this.isVisible)
                this.hide();
            else
                this.show();
        };
        CategoryForm.prototype.hide = function () {
            this.isVisible = false;
            this.view.hide();
            this.hideLibrary();
        };
        CategoryForm.prototype.show = function () {
            this.isVisible = true;
            if (this.current)
                this.renderItem();
            this.view.show();
        };
        CategoryForm.prototype.renderIconsTopic = function (name) {
            //var out='<div class="topic"><h3>'+topic[0]+'</h3><div class="list">';;
            //var ar = topic;
            //for(var i=1,n=ar.length;i<n;i++){
            // out+='<div class="fa fa-'+ ar[i]+'" ></div>';
            // }
            //return out+'</div></div>';
            return '<div class="fa fa-' + name + '" ></div>';
        };
        CategoryForm.prototype.onIconsLoaded = function (data) {
            var _this = this;
            var out = '';
            var ar = JSON.parse(data);
            console.log(data);
            for (var i = 0, n = ar.length; i < n; i++) {
                out += this.renderIconsTopic(ar[i]);
            }
            this.$iconsList.html(out);
            this.iconsLibrary.on(CLICK, '.fa', function (evt) { return _this.onIcionLibraryClick($(evt.currentTarget)); });
            this.iconsLibrary.on(MOUSE_OVER, '.fa', function (evt) { return _this.onIcionLibraryOver($(evt.currentTarget)); });
            this.iconPreview.on(MOUSE_OUT, '.fa', function (evt) { return _this.onIcionLibraryOut($(evt.currentTarget)); });
            this.iconPreview.on(CLICK, '.fa', function (evt) { return _this.onIcionLibraryClick($(evt.currentTarget)); });
        };
        CategoryForm.prototype.onIcionLibraryClick = function (el) {
            var cl = el.attr('class');
            console.log(cl);
            this.icon.attr('class', cl);
        };
        CategoryForm.prototype.onIcionLibraryOver = function (el) {
            this.iconPreview.html(el.clone());
            this.iconPreview.css('left', el.position().left).css('top', el.position().top);
            this.iconPreview.fadeIn();
        };
        CategoryForm.prototype.onIcionLibraryOut = function (el) {
            this.iconPreview.hide();
        };
        CategoryForm.prototype.hideLibrary = function () {
            if (this.isLibraryVisible) {
                this.isLibraryVisible = false;
                this.iconsLibrary.parent().hide('slow');
            }
        };
        CategoryForm.prototype.showLibrary = function () {
            if (this.isLibraryVisible)
                return;
            this.isLibraryVisible = true;
            this.iconsLibrary.parent().show('slow');
        };
        CategoryForm.prototype.onEditIconClick = function () {
            if (this.isLibraryVisible)
                this.hideLibrary();
            else
                this.showLibrary();
        };
        CategoryForm.prototype.onSaveResult = function (res) {
            if (res.success) {
                this.R.msg('Record Saved', this.btnSave);
                this.R.model.mapCategories();
            }
            else
                this.R.msg('ERROR ', this.btnSave);
            console.log(res);
        };
        CategoryForm.prototype.onSaveClicked = function () {
            var _this = this;
            var vo = this.getCurrent();
            if (!vo)
                return;
            var btn = this.btnSave;
            btn.prop('disabled', true);
            setTimeout(function () { btn.prop('disabled', false); }, 1500);
            this.R.model.saveCategory(vo).done(function (res) { return _this.onSaveResult(res); });
        };
        CategoryForm.prototype.onCategorySelected = function (cat) {
            this.current = cat;
            if (this.isVisible)
                this.renderItem();
        };
        CategoryForm.prototype.setCurrent = function (vo) {
            this.current = vo;
            if (vo.id == 0) {
                this.addSequance();
            }
            this.renderItem();
        };
        CategoryForm.prototype.addSequance = function () {
            var max = this.R.model.getCategories().length + 1;
            this.selectSeq.append('<option value="' + max + '">' + max + '</option>');
        };
        CategoryForm.prototype.renderSequance = function () {
            console.log('renedr');
            var max = this.R.model.getCategories().length;
            var out = '';
            for (var i = 1, n = max; i <= n; i++) {
                out += '<option value="' + i + '">' + i + '</option>';
            }
            this.selectSeq.html(out);
        };
        CategoryForm.prototype.renderItem = function () {
            var vo = this.current;
            if (vo) {
                //console.log(vo);
                this.tiName.val(vo.label);
                this.selectSeq.val(vo.sort);
                this.icon.attr('class', (vo.icon || 'icon'));
                // this.setSelectSequance(vo.sort);
                this.chkEnable.prop('checked', vo.enable == 1);
            }
        };
        CategoryForm.prototype.getCurrent = function () {
            var vo = this.current;
            vo.label = this.tiName.val();
            vo.enable = this.chkEnable.prop('checked') ? 1 : 0;
            vo.sort = this.selectSeq.val();
            vo.icon = this.icon.attr('class');
            return vo;
        };
        CategoryForm.prototype.onCheckClick = function () {
        };
        CategoryForm.prototype.onTextChanged = function () {
            // console.log(this.tiCat.val());
        };
        CategoryForm.prototype.onEnableClicked = function () {
        };
        CategoryForm.prototype.reset = function () {
            // this.btnEdit.addClass(DISABLED);
            // this.refreshList();
            // this.editpanel.hide();
            // this.addremove.show();
        };
        return CategoryForm;
    }());
    uplight.CategoryForm = CategoryForm;
})(uplight || (uplight = {}));
//# sourceMappingURL=CategoryForm.js.map