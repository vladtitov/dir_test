/**
 * Created by VladHome on 11/12/2015.
 */
/// <reference path="../typing/jquery.d.ts" />
/// <reference path="../typing/underscore.d.ts" />
/// <reference path="../typing/google.maps.d.ts" />
/// <reference path="../admin/RegA.ts" />
/*poi.attraction	poi.business	poi.government	poi.medical
poi.park	poi.place_of_worship	poi.school	poi.sports_complex*/
var uplight;
(function (uplight) {
    var VOGeo = (function () {
        function VOGeo(obj) {
            for (var str in obj)
                this[str] = obj[str];
        }
        return VOGeo;
    }());
    uplight.VOGeo = VOGeo;
    var GmapCtr = (function () {
        function GmapCtr(container) {
            var _this = this;
            this.ID = 'uplight.GmapCtr';
            this.key = 'AIzaSyAUaQFpM8aGgiocMDRcPzH66FKx5rPH1q0';
            this.center = '43.657816714886074, -79.376571';
            container.load('htms/admin/Gmap.htm', function () { return _this.loadData(); });
            this.R = uplight.RegA.getInstance();
        }
        GmapCtr.prototype.detach = function () {
            this.$view.detach();
        };
        GmapCtr.prototype.appendTo = function (cont) {
            this.$view.appendTo(cont);
            return this;
        };
        GmapCtr.prototype.getName = function () {
            return this.ID;
        };
        GmapCtr.prototype.destroy = function () {
            this.R = null;
            // this.$lat = null;
            // this.$lng = null;
            // this.$zoom = null;
            //  this.$btnSave = null;
            //google.maps.event.clearInstanceListeners(this.map);
            // this.map = null;
        };
        GmapCtr.prototype.loadData = function () {
            var _this = this;
            this.R.connector.getData('gpos').done(function (res) {
                var ar = JSON.parse(res);
                var out = [];
                for (var i = 0, n = ar.length; i < n; i++) {
                    out.push(new VOGeo(ar[i]));
                }
                _this.data = out;
                _this.init();
            });
        };
        GmapCtr.prototype.getGeoById = function (id) {
            var ar = this.data;
            for (var i = 0, n = ar.length; i < n; i++) {
                if (ar[i].id == id)
                    return ar[i];
            }
            return null;
        };
        GmapCtr.prototype.init = function () {
            var _this = this;
            this.$gmap = $('#GoogleMap');
            this.$view = $('#GoogleMapCtr');
            this.$lat = this.$view.find('[data-id=txtLat]:first');
            this.$lng = this.$view.find('[data-id=txtLng]:first');
            this.$zoom = this.$view.find('[data-id=txtZoom]:first');
            this.$btnSave = this.$view.find('[data-id=btnSave]:first').click(function () {
                _this.save();
            });
            this.geo = this.getGeoById(1);
            this.lat = this.geo.lat;
            this.lng = this.geo.lng;
            this.zoom = this.geo.zoom;
            this.$lat.text(this.lat);
            this.$lng.text(this.lng);
            this.$zoom.text(this.zoom);
            var opt = {
                center: { lat: this.geo.lat, lng: this.geo.lng },
                zoom: this.geo.zoom,
                /* panControl:true,
                 zoomControl:true,
                 mapTypeControl:true,
                 scaleControl:true,
                 streetViewControl:false,
                 overviewMapControl:true,
                 rotateControl:true,*/
                disableDefaultUI: true,
                zoomControl: true,
                streetViewControl: false,
                minZoom: 7
            };
            var map = new google.maps.Map(document.getElementById('GoogleMap'), opt);
            google.maps.event.addListener(map, 'click', function (event) {
                _this.lat = event.latLng.lat();
                _this.$lat.text(_this.lat);
                _this.lng = event.latLng.lng();
                _this.$lng.text(_this.lng);
                _this.marker.setPosition(event.latLng);
            });
            //zoom_changed
            map.addListener('zoom_changed', function (evt) {
                _this.zoom = map.getZoom();
                _this.$zoom.text(_this.zoom);
            });
            this.marker = new google.maps.Marker({
                position: map.getCenter(),
                map: map,
                title: ''
            });
            var styles = [
                {
                    featureType: 'poi',
                    elementType: "labels" /*,
                    stylers: [ { visibility: 'off' }]*/
                } /*,{
                    featureType: ' poi.business',
                    stylers: [ { visibility: 'off' }]
                }*/ /*,
                { featureType: 'poi.business',
                    stylers: [ { visibility: 'off' }]
                }*/
            ];
            map.setOptions({ styles: styles });
            this.handleInfoWindow();
            this.initPanorama(map);
            this.map = map;
        };
        GmapCtr.prototype.initPanorama = function (map) {
            var _this = this;
            var streetView = map.getStreetView();
            streetView.setOptions({
                clickToGo: false,
                linksControl: false,
                fullScreenControl: false,
                disableDefaultUI: true
            });
            google.maps.event.addListener(streetView, 'visible_changed', function () {
                clearTimeout(_this.striitViewTimer);
                if (streetView.visible)
                    setTimeout(function () { streetView.setVisible(false); }, 20000);
            });
        };
        GmapCtr.prototype.handleInfoWindow = function () {
            //store the original setContent-function
            var fx = google.maps.InfoWindow.prototype.setContent;
            //override the built-in setContent-method
            google.maps.InfoWindow.prototype.setContent = function (content) {
                if (content.querySelector) {
                    var addr = content.querySelector('.gm-basicinfo .gm-addr');
                    if (addr) {
                    }
                }
                /*
                 console.log(this);
                 if (this.logAsInternal) {
                      google.maps.event.addListenerOnce(this, 'map_changed',function () {
                          var map = this.getMap();
                          //the infoWindow will be opened, usually after a click on a POI
  
                          if (map) {
                              //trigger the click
                              google.maps.event.trigger(map, 'click', {latLng: this.getPosition()});
                          }
                      });
                  }*/
                //run the original setContent-method
                fx.apply(this, arguments);
            };
        };
        GmapCtr.prototype.save = function () {
            var _this = this;
            this.geo.lat = this.lat;
            this.geo.lng = this.lng;
            this.geo.zoom = this.zoom;
            this.R.connector.saveData(JSON.stringify(this.data), 'gpos').done(function (res) {
                if (res.success == 'success')
                    uplight.RegA.getInstance().msg('Data saved', _this.$btnSave.parent());
            });
        };
        GmapCtr.prototype.showValues = function () {
        };
        return GmapCtr;
    }());
    uplight.GmapCtr = GmapCtr;
})(uplight || (uplight = {}));
//# sourceMappingURL=GmapCtr.js.map