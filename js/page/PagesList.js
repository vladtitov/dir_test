/// <reference path="../admin/rega.ts" />
/// <reference path="../typing/jquery.d.ts" />
var uplight;
(function (uplight) {
    var PagesList = (function () {
        function PagesList() {
            var _this = this;
            this.R = uplight.RegA.getInstance();
            this.view = $('#infoListView');
            this.panel1 = $('#panel1');
            this.upDown = $('#panel2').remove();
            this.list = $('#infoList').on(CLICK, 'li', function (evt) { return _this.onItemClick(evt); });
            this.btnAdd = this.panel1.find('[data-id=btnAdd]:first');
            this.btnDel = this.view.find('[data-id=btnDel]:first');
            this.btnCreate = this.panel1.find('[data-id=btnCreate]:first');
            // this.btnSave = this.view.find('[data-id=btnSave]:first').on(CLICK, () => this.onSaveClicked());
            // this.btnEdit = this.view.find('[data-id=btnEdit]').on(CLICK, () => this.onEditClicked());
            this.btnCancel = this.view.find('[data-id=btnCancel]');
            //  this.btnClose = this.panel2.find('[data-id=btnClose]:first').on(CLICK, () => this.onCloseClicked());
            //  this.tiName = this.panel2.find('[data-id=tiName]:first');
            // this.chkEnable = this.panel2.find('[data-id=chkEnable]:first');
            //  this.panel2.children('img').on(CLICK, (evt) => this.onUpDownClicked(evt));
            //this.editRow.on(CLICK, (evt) => this.onEditRowClick(evt));
            var nid = '#NewPage';
            this.tiNewPage = $(nid + ' input');
            this.pageSort = $(nid + ' b');
            this.newPage = $(nid).remove();
            this.isEdit = false;
            this.reset();
        }
        PagesList.prototype.loadData = function () {
            var _this = this;
            this.R.connector.getAllPages(function (res) { return _this.onData(res); });
        };
        PagesList.prototype.selectLast = function () {
            this.list.scrollTop(1000);
            if (this.selected)
                this.selected.removeClass(SELECTED);
            this.selected = this.list.children().last();
            this.selected.addClass(SELECTED);
        };
        PagesList.prototype.reset = function () {
            var _this = this;
            this.btnDel.addClass(DISABLED);
            //this.btnAdd.addClass(DISABLED);
            // this.btnEdit.addClass(DISABLED);
            //this.panel2.hide();
            this.btnCancel.remove();
            this.btnCreate.remove();
            this.btnAdd.on(CLICK, function () { return _this.onAddClicked(); }).appendTo(this.panel1);
            this.btnDel.on(CLICK, function () { return _this.onDelClicked(); }).appendTo(this.panel1);
        };
        PagesList.prototype.addPage = function (p) {
        };
        PagesList.prototype.onUpDownClicked = function (evt) {
            var btn = $(evt.currentTarget).data('id').toString();
            var num = Number(this.pageSort.text());
            var max = Number(this.pageSort.data('max'));
            if (btn == 'btnUp' && num < max)
                this.pageSort.text((++num).toString());
            if (btn == 'btnDown' && num > 1)
                this.pageSort.text((--num).toString());
        };
        PagesList.prototype.onUpDown2Clicked = function (evt) {
            var _this = this;
            evt.stopPropagation();
            var btn = $(evt.currentTarget).data('id').toString();
            if (btn == 'btnUp' && this.selected.prev().is('li'))
                this.selected.insertBefore(this.selected.prev());
            else if (btn == 'btnDown' && this.selected.next().is('li'))
                this.selected.insertAfter(this.selected.next());
            clearTimeout(this.delay);
            this.delay = setTimeout(function () { return _this.saveOrder(); }, 2000);
        };
        /*
        private onCloneClick():void {
            if (this.btnAdd.hasClass(DISABLED))return;
            if (!this.selectedItem){
            this.btnAdd.addClass(DISABLED);
            return;
            }
  
            this.R.cover.empty();
            this.tiNewPage.val(this.selectedItem.label);
            var ind:number = this.list.children('#separator').index();
            //console.log(ind);
            this.pageSort.text(++ind);
  
            this.R.cover.append(this.newPage).appendTo('body');
            this.newPage.find('img').on(CLICK, (evt) => this.onUpDownClicked(evt));
            this.newPage.on(CLOSE,()=>{this.R.cover.remove();})
            this.newPage.on(CREATE,()=>{
                var name:string=this.tiNewPage.val();
                if(name.length<2) myMsg2('Name has to be 1 chars length',this.tiNewPage);
                else{
                    var num:number =  Number(this.pageSort.text());
                    var p:page.VOPage = new VOPage();
                    p.label=name;
                    p.id=0;
                    p.sort=num;
                    p.enable=1;
                    p.old_id=this.selectedItem.id;
                    this.selectedItem = p;
                    this.R.connector.createPage(p,(resp)=>this.onPageCreated(resp));
                    this.R.cover.remove();
                }
  
            });
        }
  */
        PagesList.prototype.updateSelected = function (p) {
            this.selectedItem = p;
            this.loadData();
            //this.selected.text(p.label);
            // if(p.enable==2)this.selected.addClass(DISABLED);
            //else this.selected.removeClass(DISABLED);
        };
        PagesList.prototype.onCreateClicked = function () {
            var _this = this;
            this.reset();
            this.showPages();
            console.log('nCreateClicked');
            // var num:number =  Number(this.pageSort.text());
            var p = new uplight.VOPage();
            p.label = this.selectedItem.label;
            p.id = 0;
            p.sort = 1000;
            p.enable = 2;
            p.old_id = this.selectedItem.id;
            this.selectedItem = p;
            this.R.connector.createPage(p, function (resp) { return _this.onPageCreated(resp); });
            // this.onChange(p);
            // this.showPages();
            // this.list.append(this.renderItem(p));
        };
        /*
              private onCreateClicked():void{
                  if (!this.selectedItem) {
                      this.btnCreate.addClass(DISABLED);
                      return;
                  }
                  var data=this._data
                  var max:number=1
                  for (var i = 0, n = data.length; i < n; i++) {
                      if(Number(data[i].enable)) max++;
                  }
                  this.R.cover.empty();
                  this.tiNewPage.val(this.selectedItem.label);
                  this.pageSort.data('max',max);
                  this.pageSort.text(max);
                  this.R.cover.append(this.newPage).appendTo('body');
                  this.newPage.find('img').on(CLICK, (evt) => this.onUpDownClicked(evt));
                  this.newPage.on(CLOSE,()=>{this.R.cover.remove();})
                  this.newPage.on(CREATE,()=>{
                      var name:string=this.tiNewPage.val();
                      if(name.length<2) myMsg2('Name has to be 1 chars length',this.tiNewPage);
                      else{
                          var p:page.VOPage = new VOPage();
                          p.label=name;
                          p.id=0;
                          p.sort= Number(this.pageSort.text());
                          p.enable=2;
                          p.old_id=this.selectedItem.id;
                          this.selectedItem = p;
                          this.R.connector.createPage(p,(resp)=>this.onPageCreated(resp));
                          this.R.cover.remove();
                          this.showPages();
                          this.resetButtons();
                      }
        
                  });
        
        
              }
              */
        PagesList.prototype.onAddClicked = function () {
            var _this = this;
            console.log('addclicked');
            this.selectedItem = null;
            this.btnDel.remove();
            this.btnAdd.remove();
            this.btnCreate.on(CLICK, function () { return _this.onCreateClicked(); }).addClass(DISABLED).appendTo(this.panel1);
            this.btnCancel.on(CLICK, function () { return _this.onCancelClicked(); }).appendTo(this.panel1);
            this.showTemplates();
            var p = new uplight.VOPage();
            p.label = '';
            p.id = 0;
            p.enable = 2;
            p.content = '';
            if (this.onChange)
                this.onChange(p);
        };
        PagesList.prototype.onCancelClicked = function () {
            this.reset();
            this.showPages();
        };
        PagesList.prototype.onPageCreated = function (resp) {
            var id = Number(resp);
            if (isNaN(id)) {
                alert(resp);
                return;
            }
            this.selectedItem.id = id;
            this._data.push(this.selectedItem);
            /*
  
            var newEl:JQuery = $(this.renderItem(this.selectedItem));
  //console.log('this.selectedItem.sort',this.selectedItem.sort);
          // var max:number =  this.pageSort.data('max');
           // if(this.selectedItem.sort<max)
            var el:JQuery = this.list.children().eq(this.selectedItem.sort-1);
            console.log('el.length',el.length);
            if(el.length){
                newEl.insertBefore(el);
                this.saveOrder();
            }else this.list.append(newEl);
  
            this.selectIem(newEl);
  
          //  if(el.attr('id')!='separator')
  */
            var newEl = $(this.renderItem(this.selectedItem));
            console.log(newEl);
            this.list.append(newEl);
            this.selectIem(newEl);
            if (this.onChange)
                this.onChange(this.selectedItem);
        };
        PagesList.prototype.saveOrder = function () {
            var _this = this;
            // var ind:number = this.list.children('#separator').index();
            var ar = [];
            var n = this.list.children('p:last').index();
            console.log(n);
            for (var i = 1; i < n; i++) {
                ar.push(Number(this.list.children().eq(i).data('id')));
            }
            // this.list.children().each(function (i, el) {
            //   if(i<max)  ar.push($(el).data('id'));
            // });
            console.log('Save Order ', ar);
            this.R.connector.savePagesSequence(ar, function (res) { return _this.onSaveOrder(res); });
        };
        PagesList.prototype.onSaveOrder = function (res) {
            console.log(res);
            // this.isOrder = false;
            //R.connector.updatePage(this.selectedItem, (res) => this.onSave(res));
        };
        /*
        private onUpDownClicked(evt: JQueryEventObject): void {
            var btn: string = $(evt.currentTarget).data('id');
           var num:number =  Number(this.pageSort.text());
            if (btn == 'btnUp' && num <= this.pageMax-1) this.pageSort.text((++num).toString());
            if(btn=='btnDown' && num>1 )this.pageSort.text((--num).toString());
  
  
  
            //console.log(this.selected);
            if (btn == 'btnUp') {
                this.isOrder = true;
                this.selected.insertBefore(this.selected.prev());
            } else {
                this.isOrder = true;
                this.selected.insertAfter(this.selected.next());
            }
            ///if (this.btnSave.hasClass(DISABLED)) myMsg("Don't forget save changes", this.btnSave);
            //this.btnSave.removeClass(DISABLED);
  
        }
  
        private onEditClicked(): void {
            if (!this.selectedItem) return;
            this.swithToEdit();
        }
  
          private swithToEdit(): void {
            this.tiName.val(this.selectedItem.label);
            this.chkEnable.prop(CHECKED, this.selectedItem.enable == 1);
  
            this.panel1.hide();
            this.panel2.show();
            this.isEdit = true;
        }
  
        private onCloseClicked(): void {
            this.panel1.show();
            this.panel2.hide();
            this.isEdit = false;
        }
  
        private onAddPage(res:any): void {
            if (!res.result) return;
            var page: VOPage = res.result;
            var el: JQuery
            if (!this._dataid[page.id]) {
                this._dataid[page.id] = page;
                this._data.push(page);
                el = $(this.renderItem(page)).appendTo(this.list);
            } else {
                el = this.list.children('[data-id=' + page.id+']');
            }
            
           // el.attr('tabindex', 1);
            this.selectedItem = this._dataid[page.id];
            this.selectIem(el);
            this.btnAdd.addClass(DISABLED);
            el.focus();
  
        }
  
        private onAddClicked(): void {
            if (this.btnAdd.hasClass(DISABLED)) return;
           // if (this.selectedItem.id == 0) return;
            var vo: VOPage = new VOPage();
            vo.enable = 1;
            vo.id = 0;
            vo.label = 'New Page';
            vo.sort = 1000;
  
            if (this.selected) {
                this.selected.removeClass(SELECTED);
               // this.editRow.remove();
            }
            this.selectedItem = vo;
            this.swithToEdit();
            if (this.onChange) this.onChange(vo);
           // if (this.onChange) this.onChange(vo);
            //R.connector.addPage((res) => this.onAddPage(res));
  
        }
         */
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////
        PagesList.prototype.onDelete = function (res) {
            this.selectedItem = null;
            if (this.onChange)
                this.onChange(null);
            this.loadData();
        };
        PagesList.prototype.onDeleteConfirmed = function () {
            var _this = this;
            this.R.connector.deletePage(this.selectedItem.id, function (res) { return _this.onDelete(res); });
        };
        PagesList.prototype.onDelClicked = function () {
            if (this.btnDel.hasClass(DISABLED))
                return;
            // showAlert("You want to delete Page " + this.selectedItem.label + '?',()=> this.onDeleteConfirmed(), 'Delete Page');
        };
        /*
        private onSaveClicked(): void {
            if (this.btnSave.hasClass(DISABLED)) return;
            this.btnSave.addClass(DISABLED);
            this.selectedItem.enable = this.chkEnable.prop(CHECKED)?1:0;
            this.selectedItem.label = this.tiName.val();
  
            if (this.isOrder) this.saveOrder();
  
          // else R.connector.updatePage(this.selectedItem, (res) => this.onSave(res));
           // this.saveAllPages();
        }
  */
        /*
        private onSave(resp): void {
            this.onData(resp);
          myMsg('Saved on server', this.btnSave);
            this.btnSave.removeClass(DISABLED);
             
        }
        */
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        /**/
        PagesList.prototype.onItemClick = function (evt) {
            var _this = this;
            if (this.isEdit)
                return;
            var sel = $(evt.currentTarget);
            var id = Number(sel.data('id'));
            if (isNaN(id))
                return;
            this.selectedItem = this.getItemById(id);
            if (!this.selectedItem)
                return;
            this.selectIem(sel);
            if (Number(this.selectedItem.enable == 1)) {
                this.upDown.off(CLICK);
                this.selected.prepend(this.upDown);
                this.upDown.on(CLICK, 'img', function (evt) { return _this.onUpDown2Clicked(evt); });
            }
            else
                this.upDown.remove();
            //  this.btnEdit.removeClass(DISABLED);
            if (this.selectedItem.enable)
                this.btnDel.removeClass(DISABLED);
            else
                this.btnDel.addClass(DISABLED);
            this.btnCreate.removeClass(DISABLED);
            //this.btnAdd.removeClass(DISABLED);
            if (this.onChange)
                this.onChange(this.selectedItem);
        };
        PagesList.prototype.selectIem = function (el) {
            if (this.selected)
                this.selected.removeClass(SELECTED);
            this.selected = el;
            this.selected.addClass(SELECTED);
        };
        ////////////////////////////////////////////////////////////////
        PagesList.prototype.onData = function (resp) {
            this._data = resp;
            for (var i = 0, n = resp.length; i < n; i++)
                resp[i].enable = Number(resp[i].enable);
            console.log(resp);
            this.showPages();
            if (this.selectedItem) {
                this.selected = this.list.children('[data-id=' + this.selectedItem.id + ']').addClass(SELECTED);
            }
        };
        PagesList.prototype.showPages = function () {
            var data = this._data;
            // var out:string='';
            var out1 = '<p class="uplight title">Published:</p>';
            var out2 = '<p class="uplight title">Drafts:</p>';
            for (var i = 0, n = data.length; i < n; i++) {
                if (data[i].enable) {
                    if (data[i].enable == 1)
                        out1 += this.renderItem(data[i]);
                    else
                        out2 += this.renderItem(data[i]);
                }
            }
            this.list.removeClass('temp');
            this.list.html(out1 + out2);
            this.view.find('[data-id=title]').html('Pages');
        };
        PagesList.prototype.showTemplates = function () {
            var data = this._data;
            var out = '';
            for (var i = 0, n = data.length; i < n; i++) {
                if (!Number(data[i].enable))
                    out += this.renderItem(data[i]);
            }
            this.list.addClass('temp');
            this.list.html(out);
            this.view.find('[data-id=title]').html('Templates');
        };
        PagesList.prototype.getItemById = function (num) {
            for (var i = 0, n = this._data.length; i < n; i++)
                if (this._data[i].id == num)
                    return this._data[i];
            return null;
        };
        PagesList.prototype.renderItem = function (item) {
            return '<li class="uplight ' + ((item.enable == 2) ? 'disabled' : '') + '" data-id="' + item.id + '" >' + item.label + '</li>';
        };
        return PagesList;
    }());
    uplight.PagesList = PagesList;
})(uplight || (uplight = {}));
//# sourceMappingURL=PagesList.js.map