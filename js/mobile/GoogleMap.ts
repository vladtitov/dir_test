/**
 * Created by VladHome on 10/7/2015.
 */
    /// <reference path="../typing/google.maps.d.ts" />
    /// <reference path="../typing/jquery.d.ts" />
    /// <reference path="../kiosk/Registry.ts" />


module uplight{
    export class GoogleMapOptions{
        static SATELITE:string='satellite';
        static ROADMAP:string='roadmap';
        key:string='AIzaSyAUaQFpM8aGgiocMDRcPzH66FKx5rPH1q0';
        center:string='43.657467, -79.376571';
        zoom:number=10;
        maptype:string='satelite';
    }

    export class GoogleMap{
        private view:JQuery;
        private gmap:HTMLElement;
        private key:string='AIzaSyAUaQFpM8aGgiocMDRcPzH66FKx5rPH1q0';
       // private TORONTO:string=;
        private url:string='https://www.google.com/maps/embed/v1/'

        private  type:string='view';
        private options:GoogleMapOptions;
        private directionsDisplay:google.maps.DirectionsRenderer;
        private directionsService:google.maps.DirectionsService;
        private geo:any;

        private btnGetDirecrions:JQuery;
        private $directions:JQuery;
        private $txtDirextions:JQuery;
        private $radDrive:JQuery;
        private $radWalk:JQuery;
        private $radTrans:JQuery;
        private $travalType:JQuery;
        private $btnClose:JQuery;

        private marker:google.maps.Marker;

        private data:VOGeo[];

        getGeoById(id:number):VOGeo{
            var ar = this.data;
            for(var i=0,n=ar.length;i<n;i++){
                if(ar[i].id===id) return ar[i];
            }
            return null;
        }
        constructor(private container:JQuery){
            container.load('htms/mobile/GoogleMapMobile.htm',()=>this.init());
            this.data=Registry.getInstance().getSettings('googlemap');
            this.geo  = this.getGeoById(1);
            // this.view = this.createView();
        }


        private isDirections:boolean;
        private onGetDirections():void{
            if(this.isDirections)this.closeDirections();
            else this.openDirections();
        }
        private closeDirections():void{
            if(this.isDirections){
                this.isDirections = false;
                this.$directions.removeClass(OPEN)
            }
        }
        private openDirections():void{
            if(!this.isDirections){
                this.isDirections = true;
                this.$directions.addClass(OPEN)
            }
        }

        getView():JQuery{
            return this.view;

        }

        toString(opt):string{
            var ar:string[]=[];
            for(var str in opt)ar.push(str+'='+opt[str]);
            return this.url+this.type+'?'+ar.join('&');
        }
        private init():void{

            $('#btnTry').click(()=>{

            });
            this.view= $('#GoogleMapMobile');

            this.$travalType = this.view.find('[data-id=travalType]:first');
            this.$directions = this.view.find('[data-id=directions]:first');
            this.$btnClose = this.view.find('[data-id=btnClose]:first').click(()=>this.closeDirections());

            this.$txtDirextions = this.view.find('[data-id=txtDirextions]:first');

            this.btnGetDirecrions= this.view.find('[data-id=btnGetDirections]:first').click(()=>this.onGetDirections())
                this.gmap = document.getElementById('GoogleMap');
            $.getScript('https://maps.googleapis.com/maps/api/js?key=AIzaSyAUaQFpM8aGgiocMDRcPzH66FKx5rPH1q0',(evt)=>{

                var opt:any = {
                    center: {lat: this.geo.lat, lng:this.geo.lng},
                    zoom: this.geo.zoom,
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
                    minZoom:7
                    /* mapTypeControl: boolean,
                     scaleControl: boolean,
                     streetViewControl: boolean,
                     rotateControl: boolean*/
                }

               var map = new google.maps.Map(this.gmap,opt);

                this.marker = new google.maps.Marker({
                    position: map.getCenter(),
                    map: map,
                    title: ''
                });
                this.directionsService = new google.maps.DirectionsService();
                this.directionsDisplay = new google.maps.DirectionsRenderer();
                var myOptions = {
                    mapTypeId: google.maps.MapTypeId.ROADMAP,
                }
                this.directionsDisplay.setMap(map);
                google.maps.event.addListener(map, 'click', (event)=> {
                    if(!this.isDirections) return;

                    var lat = event.latLng.lat();
                    var lng=event.latLng.lng();

                    var travelMode:number=google.maps.TravelMode.DRIVING;

                    switch($('input[name=travelType]:checked', '#TextDirectionsPanel').val()){
                        case'DRIVING':
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
                    var start = lat+', '+lng;
                    var end = this.geo.lat+', '+this.geo.lng;
                    var request = {
                        origin:start,
                        destination:end,
                        travelMode:  travelMode
                    };

                    this.directionsService.route(request, (response, status)=> {
                        if (status == google.maps.DirectionsStatus.OK) {

                            this.directionsDisplay.setDirections(response);
                            var myRoute = response.routes[0];

                            //console.log(response);

                           var txtDir = '<div>';
                          for (var i=0; i<myRoute.legs[0].steps.length; i++) {
                                txtDir +='<a> - '+ myRoute.legs[0].steps[i].instructions+"</a><br/>";
                           }
                            txtDir +='</div>';

                            this.marker.setMap(null);
                           this.$txtDirextions.html(txtDir);
                        }
                    });
                })
            })
           // this.view.prepend(this.view.children());

            // var iframe:JQuery = this.view.find('iframe:first');
           // iframe.attr('src',this.toString(this.options));
        }
}
}