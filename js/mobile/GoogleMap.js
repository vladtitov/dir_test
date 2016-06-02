/**
 * Created by VladHome on 10/7/2015.
 */
/// <reference path="../typing/google.maps.d.ts" />
/// <reference path="../typing/jquery.d.ts" />
/// <reference path="../kiosk/Registry.ts" />
var uplight;
(function (uplight) {
    var GoogleMapOptions = (function () {
        function GoogleMapOptions() {
            this.key = 'AIzaSyAUaQFpM8aGgiocMDRcPzH66FKx5rPH1q0';
            this.center = '43.657467, -79.376571';
            this.zoom = 10;
            this.maptype = 'satelite';
        }
        GoogleMapOptions.SATELITE = 'satellite';
        GoogleMapOptions.ROADMAP = 'roadmap';
        return GoogleMapOptions;
    })();
    uplight.GoogleMapOptions = GoogleMapOptions;
    var GoogleMap = (function () {
        function GoogleMap(container) {
            var _this = this;
            this.container = container;
            this.key = 'AIzaSyAUaQFpM8aGgiocMDRcPzH66FKx5rPH1q0';
            // private TORONTO:string=;
            this.url = 'https://www.google.com/maps/embed/v1/';
            this.type = 'view';
            container.load('htms/mobile/GoogleMapMobile.htm', function () { return _this.init(); });
            this.data = uplight.Registry.getInstance().getSettings('googlemap');
            this.geo = this.getGeoById(1);
            // this.view = this.createView();
        }
        GoogleMap.prototype.getGeoById = function (id) {
            var ar = this.data;
            for (var i = 0, n = ar.length; i < n; i++) {
                if (ar[i].id === id)
                    return ar[i];
            }
            return null;
        };
        GoogleMap.prototype.onGetDirections = function () {
            if (this.isDirections)
                this.closeDirections();
            else
                this.openDirections();
        };
        GoogleMap.prototype.closeDirections = function () {
            if (this.isDirections) {
                this.isDirections = false;
                this.$directions.removeClass(OPEN);
            }
        };
        GoogleMap.prototype.openDirections = function () {
            if (!this.isDirections) {
                this.isDirections = true;
                this.$directions.addClass(OPEN);
            }
        };
        GoogleMap.prototype.getView = function () {
            return this.view;
        };
        GoogleMap.prototype.toString = function (opt) {
            var ar = [];
            for (var str in opt)
                ar.push(str + '=' + opt[str]);
            return this.url + this.type + '?' + ar.join('&');
        };
        GoogleMap.prototype.init = function () {
            var _this = this;
            $('#btnTry').click(function () {
            });
            this.view = $('#GoogleMapMobile');
            this.$travalType = this.view.find('[data-id=travalType]:first');
            this.$directions = this.view.find('[data-id=directions]:first');
            this.$btnClose = this.view.find('[data-id=btnClose]:first').click(function () { return _this.closeDirections(); });
            this.$txtDirextions = this.view.find('[data-id=txtDirextions]:first');
            this.btnGetDirecrions = this.view.find('[data-id=btnGetDirections]:first').click(function () { return _this.onGetDirections(); });
            this.gmap = document.getElementById('GoogleMap');
            $.getScript('https://maps.googleapis.com/maps/api/js?key=AIzaSyAUaQFpM8aGgiocMDRcPzH66FKx5rPH1q0', function (evt) {
                var opt = {
                    center: { lat: _this.geo.lat, lng: _this.geo.lng },
                    zoom: _this.geo.zoom,
                    /* panControl:true,
                     zoomControl:true,
                     mapTypeControl:true,
                     scaleControl:true,
                     streetViewControl:false,
                     overviewMapControl:true,
                     rotateControl:true,*/
                    //  disableDefaultUI:true,
                    zoomControl: true,
                    streetViewControl: false,
                    minZoom: 7
                };
                var map = new google.maps.Map(_this.gmap, opt);
                _this.marker = new google.maps.Marker({
                    position: map.getCenter(),
                    map: map,
                    title: ''
                });
                _this.directionsService = new google.maps.DirectionsService();
                _this.directionsDisplay = new google.maps.DirectionsRenderer();
                var myOptions = {
                    mapTypeId: google.maps.MapTypeId.ROADMAP
                };
                _this.directionsDisplay.setMap(map);
                google.maps.event.addListener(map, 'click', function (event) {
                    if (!_this.isDirections)
                        return;
                    var lat = event.latLng.lat();
                    var lng = event.latLng.lng();
                    var travelMode = google.maps.TravelMode.DRIVING;
                    switch ($('input[name=travelType]:checked', '#TextDirectionsPanel').val()) {
                        case 'DRIVING':
                            travelMode = google.maps.TravelMode.DRIVING;
                            break;
                        case 'WALKING':
                            travelMode = google.maps.TravelMode.WALKING;
                            break;
                        case 'TRANSIT':
                            travelMode = google.maps.TravelMode.TRANSIT;
                            break;
                    }
                    // this.marker.setPosition(event.latLng);
                    var start = lat + ', ' + lng;
                    var end = _this.geo.lat + ', ' + _this.geo.lng;
                    var request = {
                        origin: start,
                        destination: end,
                        travelMode: travelMode
                    };
                    _this.directionsService.route(request, function (response, status) {
                        if (status == google.maps.DirectionsStatus.OK) {
                            _this.directionsDisplay.setDirections(response);
                            var myRoute = response.routes[0];
                            //console.log(response);
                            var txtDir = '<div>';
                            for (var i = 0; i < myRoute.legs[0].steps.length; i++) {
                                txtDir += '<a> - ' + myRoute.legs[0].steps[i].instructions + "</a><br/>";
                            }
                            txtDir += '</div>';
                            _this.marker.setMap(null);
                            _this.$txtDirextions.html(txtDir);
                        }
                    });
                });
            });
            // this.view.prepend(this.view.children());
            // var iframe:JQuery = this.view.find('iframe:first');
            // iframe.attr('src',this.toString(this.options));
        };
        return GoogleMap;
    })();
    uplight.GoogleMap = GoogleMap;
})(uplight || (uplight = {}));
//# sourceMappingURL=GoogleMap.js.map