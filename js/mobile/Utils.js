/**
 * Created by VladHome on 9/20/2015.
 */
/// <reference path="Mobile.ts" />
var uplight;
(function (uplight) {
    var Utils = (function () {
        function Utils() {
        }
        Utils.hideImage = function () {
            if (Utils.isImage) {
                $('#ImageView').fadeOut();
                Utils.isImage = false;
            }
        };
        Utils.showImage = function (src) {
            Utils.isImage = true;
            $('#ImageView').fadeIn();
            $('#ImageView img').attr('src', src);
            if (!Utils.isImageInit) {
                $('#ImageView').click(function () { Utils.hideImage(); });
                Utils.isImageInit = true;
            }
        };
        Utils.checkValue = function (val) {
            if (!val || val.length === 0)
                return '&nbsp;';
            var re = /\S+@\S+\.\S+/;
            if (re.test(val))
                return '<a href="mailto:' + val + '">' + val + '</a>';
            var phone = val.match(/\d/g);
            if (phone && phone.length === 10)
                return '<a href="tel:' + val + '">' + val + '</a>';
            return val;
        };
        Utils.createTable = function (more) {
            if (more.length === 0)
                return '';
            var ar = more.split("\n");
            var out = '<div class="more" ><table class="table">';
            for (var i = 0, n = ar.length; i < n; i++) {
                var item = ar[i].split('\t');
                out += '<tr><td>' + (item[0] || '&nbsp;') + '</td><td>' + Utils.checkValue(item[1]) + '</td></tr>';
            }
            out += '</table></div>';
            return out;
        };
        Utils.createImages = function (imgs) {
            var out = '';
            var ar = imgs.split(',');
            for (var i = 0, n = ar.length; i < n; i++) {
                out += '<a data-id="' + i + '"><img src="' + ar[i] + '" /></a>';
            }
            return out;
        };
        Utils.renderDetails = function (vo) {
            var out = '';
            if (vo.info)
                out += '<div class="uinfo">' + vo.info + '</div>';
            out += Utils.createTable(vo.more);
            if (vo.tmb)
                out += '<div class="tmb"><img src="' + vo.tmb + '"/></div>';
            if (vo.imgs)
                out += '<div class="imgs"><div>' + Utils.createImages(vo.imgs) + '</div></div>';
            if (out)
                out = '<div class="details"><br/>' + out + '</div>';
            return out;
        };
        Utils.renderItem = function (vo, catsObj) {
            //  var cats:string=(vo.cats && vo.cats.length)?catsObj[vo.cats[0]]:'fa-fw';
            var more = '<span class="fa fa-fw">&nbsp;</span>';
            if (vo.more || vo.info || vo.tmb || vo.imgs)
                more = '<span class="anim fa fa-angle-double-left">&nbsp;</span>';
            // if(vo.imgs) more+=' <span class="fa fa-image"></span>';
            //if(more) more='<span class="btn">'+more+'</span>';
            return '<li class="list-group-item" data-id="' + vo.id + '" ><a>' + more + '<span> ' + vo.name + ' </span><span class="pull-right">' + vo.unit + '</span></a></li>';
        };
        Utils.renderItemMobile = function (vo, catsObj) {
            //  var cats:string=(vo.cats && vo.cats.length)?catsObj[vo.cats[0]]:'fa-fw';
            var more = '<span class="fa fa-fw">&nbsp;</span>';
            if (vo.more || vo.info || vo.tmb || vo.imgs)
                more = '<span class="anim fa fa-angle-double-left">&nbsp;</span>';
            // if(vo.imgs) more+=' <span class="fa fa-image"></span>';
            //if(more) more='<span class="btn">'+more+'</span>';
            return '<li class="list-group-item" data-id="' + vo.id + '" ><a>' + more + '<span> ' + vo.name + ' </span><span class="pull-right">' + vo.unit + '</span></a></li>';
        };
        Utils.renderItem2 = function (vo, catsObj) {
            var cats = (vo.cats && vo.cats.length) ? catsObj[vo.cats[0]] : 'fa-fw';
            var more = '';
            if (vo.more || vo.info || vo.tmb)
                more += '<span class="fa fa-info"></span>';
            if (vo.imgs)
                more += ' <span class="fa fa-image"></span>';
            if (more)
                more = '<span class="btn">' + more + '</span>';
            return '<li class="list-group-item" data-id="' + vo.id + '" ><a><span class="fa ' + cats + '">&nbsp;</span> <span>' + vo.name + ' </span> ' + more + '<span class="pull-right">' + vo.unit + '</span></a></li>';
        };
        return Utils;
    })();
    uplight.Utils = Utils;
})(uplight || (uplight = {}));
//# sourceMappingURL=Utils.js.map