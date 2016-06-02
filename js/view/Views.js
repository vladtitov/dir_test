/**
 * Created by VladHome on 10/3/2015.
 */
/// <reference path="../typing/jquery.d.ts" />
var uplight;
(function (uplight) {
    var Page = (function () {
        function Page(url) {
        }
        Page.prototype.getView = function () {
            return this.view;
        };
        return Page;
    })();
    uplight.Page = Page;
    var Transition = (function () {
        function Transition(view) {
            this.view = view;
        }
        Transition.prototype.setView = function (view) {
            this.view = view;
        };
        Transition.prototype.reArrange = function (cont, slot) {
            slot.children().appendTo(cont);
            slot.detach();
        };
        Transition.prototype.showView = function (newV) {
            this.showView5(newV);
            return;
            if (jQuery.type(newV) == 'string') {
                newV = $('<div>').load(newV, function () {
                    newV.removeClass('in');
                    //ready1= true;
                    //if(ready2)this.reArrange(cont,slot2);
                });
            }
            var old = this.view.children();
            console.log(newV);
            newV.removeClass('out');
            newV.addClass('in');
            newV.appendTo(this.view);
            old.addClass('out');
            return old;
        };
        Transition.prototype.showView5 = function (newV) {
            var cont = this.view;
            var w = cont.width();
            var old = cont.children();
            var slot1 = $('<div>').addClass('slot sl1').width(w).css('float', 'left').append(old);
            var slot2 = $('<div>').addClass('slot sl2').width(w).css('float', 'left');
            var ready1;
            var ready2;
            if (jQuery.type(newV) == 'string')
                slot2.load(newV, function () {
                    ready1 = true;
                    if (ready2)
                        this.reArrange(cont, slot2);
                });
            else {
                ready1 = true;
                slot2.append(newV);
            }
            //console.log(w);
            // var slider:JQuery=$('<div>').width(w*2+30).append(old).append(newV).appendTo(cont);
            var wind = $('<div>').addClass('wind').appendTo(cont).width(w).css('overflow', 'auto');
            var slider = $('<div>').width(w * 2 + 30).append(slot1).append(slot2).appendTo(wind);
            setTimeout(function () {
                wind.animate({ scrollLeft: w }, function () {
                    // slot1.detach();
                    //slot2.appendTo(cont);
                    // slot2.css('width','auto');
                    //slider.detach();
                    // cont.scrollLeft(0);
                    ready2 = true;
                    if (ready1) {
                        wind.detach();
                        cont.append(slot2.children());
                    }
                });
            }, 50);
            return slot2;
        };
        Transition.prototype.newPage = function (newV) {
            console.log(jQuery.type(newV));
            var cont = this.view;
            var old = cont.children().first();
            cont.children().detach();
            //  console.log('Old  '+old.attr('id'));
            // console.log('new  '+newV.attr('id'));
            var w = cont.width();
            var slot1 = $('<div>').addClass('slot').width(w).css('float', 'left').append(old);
            var slot2 = $('<div>').addClass('slot').width(w).css('float', 'left').append(newV);
            // var w:number = old.first().width();
            /// this.content.width(w);
            // old.width(w).css('float','left');
            // newV.width(w).css('float','left');
            console.log(w);
            // var slider:JQuery=$('<div>').width(w*2+30).append(old).append(newV).appendTo(cont);
            var slider = $('<div>').width(w * 2 + 30).append(slot1).append(slot2).appendTo(cont);
            setTimeout(function () {
                //  cont.scrollLeft(w);
                cont.animate({ scrollLeft: w }, function () {
                    // old.detach();
                    slot1.detach();
                    //newV.appendTo(cont);
                    slot2.appendTo(cont);
                    // newV.css('width','auto');
                    slider.detach();
                    cont.scrollLeft(0);
                });
            }, 100);
            return slot2;
        };
        return Transition;
    })();
    uplight.Transition = Transition;
})(uplight || (uplight = {}));
//# sourceMappingURL=Views.js.map