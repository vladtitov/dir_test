/// <reference path="../typing/jquery.d.ts" />
module models {
    export class ListViewModel {
        private _model: VOItem[];
        private _labels_units: string[];       
        private _selectedItem: VOItem;
        private _patterns: {};

        public total: number;
        public amount: number;

        type: string;

        onModelChange: Function;
        onSelectet: Function;
        onReset: Function;

        getData(): VOItem[]{
            return this._model;
        }
        toString(): string {

           return this._toString(this._model);
            
        }
        filterToString(pattern: string): string {
            if (!this._patterns[pattern]) this._patterns[pattern] = this._toString(this.filter(pattern));
            return this._patterns[pattern]; 
        }

        filter(pattern: string): VOItem[]{
            pattern = ' ' + pattern.toLowerCase();

            var data: string[] = this._labels_units;

            var out: VOItem[] = [];           
            for (var i = 0, n = data.length; i < n; i++) {
                if (data[i].indexOf(pattern) > -1) out.push(this._model[i]);               
            }
            this.amount = out.length;
            return out;
        }
        
        setData(data: VOItem[]) {
            var ar: string[]=[];
            for (var i = 0, n = data.length; i < n; i++) {
                ar.push(' ' + data[i].name.toLowerCase() + ' ' + data[i].unit.toLowerCase());
            }
            this._patterns = {};
            this._labels_units = ar; 
            this._model = data;
            this.total = data.length;
            this.reset();
            trace(this.name + this.type + this._model.length);
            if (this.onModelChange) this.onModelChange(this._model);
        }
        reset(): void {
            this._selectedItem = null;
            if (this.onReset) this.onReset();
        }
        setItem(item: VOItem): boolean {
            for (var i = 0, n = this._model.length; i < n; i++) {
                if (this._model[i].mid == item.mid) {
                    this._model[i] = item;
                    return true;
                }
            }
            return false;
        }
        selectedItem(id: number= -1): VOItem {
            if (id < 0) return this._selectedItem;
              
            for (var i = 0, n = this._model.length; i < n; i++) {
                if (this._model[i].mid == id) this._selectedItem = this._model[i];
            }
            return this._selectedItem
        }


        constructor(public name: string) {
            $.get('rem/data.' + name + 's').done((data) => this.onServerData(data));
        }
        private onServerData(data: any): void {
           
            if (data.result == 'success') {
                this.type = data.type;
                this.setData(data.data);
                
            }
        }
        private _toString(data: VOItem[]): string {
            var str: string = '<ul>';
            for (var i = 0, n = data.length; i < n; i++) {
                str += '<a href="#data.' + this.name + '?id=' + data[i].id + '"><li><span class="name">' + data[i].name + '</span><span class="unit">' + data[i].unit + '</span></li></a>';
            }
            return str + '</ul>';
        }
    }


    export class VOItem {
        public id: number;
        public mid: number;
        public name: string;
        public unit: string;

        constructor(obj: any) {

        }
    }

}

var trace = trace || function (data) { console.log(data); }