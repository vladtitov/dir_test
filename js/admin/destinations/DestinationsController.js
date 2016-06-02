/// <reference path="../DirsAdmin.ts" />
/// <reference path="DetailsForm.ts" />
/// <reference path="DestinationsList.ts" />
/// <reference path="DetailsCategory.ts" />
var uplight;
(function (uplight) {
    var DestinationsController = (function () {
        function DestinationsController(container) {
            var _this = this;
            container.load('htms/admin/DestinationsEditor.htm', function () { return _this.init(); });
            this.R = uplight.RegA.getInstance();
            if (!this.R.model)
                this.R.model = new uplight.DestinantionsModel();
        }
        DestinationsController.prototype.init = function () {
            var _this = this;
            this.view = $('#DestinationsEditor');
            this.list = new uplight.DestinationsList($('#DestinationsList'));
            this.breacrumb = new uplight.BreadCrumbs(this.view.find('[data-ctr=BreadCrumbs]:first'));
            this.breacrumb.onCiick = function (url) {
                if (url == 'listing') {
                    _this.hideForm();
                }
                else if (url == 'DetailsForm')
                    _this.detailsForm.showDetails();
            };
            this.breacrumb.addCrumb('listing', 'Listing');
            this.detailsForm = new uplight.DetailsForm($('#DetailsForm'));
            this.detailsForm.onClose = function () { return _this.hideForm(); };
            this.detailsForm.onSave = function () { return _this.onBtnSaveClick(); };
            this.detailsForm.hide();
            this.detailsForm.onImageEditor = function () {
                _this.breacrumb.addCrumb('imageeditor', 'Image Editor');
            };
            if (this.R.isSuper)
                this.btnDrop = $('<a>').addClass('btn').html('<span class="fa fa-bolt"> Drop Table</span>').appendTo(this.list.view.find('[data-id=tools]:first')).click(function () { return _this.onDrop(); });
            //= this.view.find('[data-id=btnDrop]:first').click(()=>this.onDrop())
            this.btnAdd = this.view.find('[data-id=btnAdd]:first').on(CLICK, function () { return _this.onBtnAddClick(); });
            this.btnDel = this.view.find('[data-id=btnDel]:first').on(CLICK, function () { return _this.onBtnDelClick(); });
            this.btnEdit = this.view.find('[data-id=btnEdit]:first').on(CLICK, function () { return _this.onBtnEditClick(); });
            //this.showForm();
        };
        DestinationsController.prototype.onDrop = function () {
            var _this = this;
            if (confirm('You want to delete whole table tenats?'))
                this.R.connector.dropTable('tenants').done(function () { _this.R.model.refreshData(); });
        };
        DestinationsController.prototype.hideForm = function () {
            this.breacrumb.clear();
            this.breacrumb.addCrumb('listing', 'Listing');
            this.detailsForm.hide();
            this.list.show();
        };
        DestinationsController.prototype.onBtnAddClick = function () {
            var dest = new uplight.VODestination({ id: 0, cats: [], imgs: '', tmb: null });
            this.detailsForm.setDestination(dest);
            this.detailsForm.render();
            this.list.hide();
            this.detailsForm.show();
            this.detailsForm.focusName();
            this.breacrumb.addCrumb('DetailsForm', 'Details form');
        };
        DestinationsController.prototype.onBtnEditClick = function () {
            var dest = this.list.getSelectedItem();
            if (dest) {
                this.detailsForm.setDestination(dest);
                this.detailsForm.render();
                this.list.hide();
                this.detailsForm.show();
                this.detailsForm.focusName();
                this.breacrumb.addCrumb('DetailsForm', 'Details form');
            }
        };
        DestinationsController.prototype.onSave = function (res) {
            console.log(res);
            if (res.success) {
                if (res.success == 'inserted') {
                    this.detailsForm.setID(Number(res.result));
                    var dest = this.detailsForm.getDestination();
                    this.list.setSelectedItem(dest);
                }
                this.R.msg('Record Saved', this.detailsForm.btnSave);
            }
            else
                this.R.msg('ERROR Saving record', this.detailsForm.btnSave);
            this.R.model.refreshData();
        };
        DestinationsController.prototype.onBtnSaveClick = function () {
            var _this = this;
            var vo = this.detailsForm.getDestination();
            if (!vo)
                return;
            if (!vo.uid)
                vo.uid = uplight.DestinantionsModel.encodeUID(vo.name);
            var out = JSON.stringify(vo);
            this.R.connector.saveDestination(out).done(function (res) { return _this.onSave(res); });
            //this.R.model.saveDestination((res) => this.onSave(res),dest,this.detailsForm.getPages());
        };
        ////////////////////////////////////////////////////////////////////////////////////////////////
        DestinationsController.prototype.onDelete = function (res) {
            this.R.msg('Record deleted', this.btnDel);
            this.list.selectedItem = null;
        };
        // private onDeleteConfirmed(): void {
        // this.R.vo.deleteDestination(this.detailsForm., (res) => this.onDelete(res));
        //}
        DestinationsController.prototype.onBtnDelClick = function () {
            var _this = this;
            var dest = this.list.getSelectedItem();
            if (dest) {
                this.R.confirm.show('Delete record', 'You want to delete ' + dest.name + ' from database?', function () {
                    _this.R.model.deleteDestination(dest, function (res) { return _this.onDelete(res); });
                });
            }
            // showAlert('You want to delete record: ' + name + '?', () => this.onDeleteConfirmed(),'Delete');
        };
        return DestinationsController;
    }());
    uplight.DestinationsController = DestinationsController;
})(uplight || (uplight = {}));
//# sourceMappingURL=DestinationsController.js.map