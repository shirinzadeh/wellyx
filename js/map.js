if ($("#map").length) {
   var l = parseFloat($("#map").attr("lat")),
      s = parseFloat($("#map").attr("lng")),
      //for curved line
      LatLng = google.maps.LatLng,
      LatLngBounds = google.maps.LatLngBounds,
      Marker = google.maps.Marker,
      Point = google.maps.Point;

   var pos1 = new LatLng(40.369990478247786, 49.87214573625288);
   var pos2 = new LatLng(40.3757199753275, 49.89431608707533);

   google.maps.event.addDomListener(window, "load", function () {
      var e = {
         zoom: 14,
         disableDefaultUI: !1,
         scrollwheel: !0,
         navigationControl: !0,
         mapTypeControl: !1,
         scaleControl: !0,
         draggable: !0,
         icon: n,
         center: new google.maps.LatLng(40.369990478247786, 49.87214573625288),
         styles: [{
            featureType: "water",
            elementType: "geometry",
            stylers: [{
               color: "#e9e9e9"
            }, {
               lightness: 17
            }]
         }, {
            featureType: "landscape",
            elementType: "geometry",
            stylers: [{
               color: "#f5f5f5"
            }, {
               lightness: 20
            }]
         }, {
            featureType: "road.highway",
            elementType: "geometry.fill",
            stylers: [{
               color: "#ffffff"
            }, {
               lightness: 17
            }]
         }, {
            featureType: "road.highway",
            elementType: "geometry.stroke",
            stylers: [{
               color: "#ffffff"
            }, {
               lightness: 29
            }, {
               weight: .2
            }]
         }, {
            featureType: "road.arterial",
            elementType: "geometry",
            stylers: [{
               color: "#ffffff"
            }, {
               lightness: 18
            }]
         }, {
            featureType: "road.local",
            elementType: "geometry",
            stylers: [{
               color: "#ffffff"
            }, {
               lightness: 16
            }]
         }, {
            featureType: "poi",
            elementType: "geometry",
            stylers: [{
               color: "#f5f5f5"
            }, {
               lightness: 21
            }]
         }, {
            featureType: "poi.park",
            elementType: "geometry",
            stylers: [{
               color: "#dedede"
            }, {
               lightness: 21
            }]
         }, {
            elementType: "labels.text.stroke",
            stylers: [{
               visibility: "on"
            }, {
               color: "#ffffff"
            }, {
               lightness: 16
            }]
         }, {
            elementType: "labels.text.fill",
            stylers: [{
               saturation: 36
            }, {
               color: "#333333"
            }, {
               lightness: 40
            }]
         }, {
            elementType: "labels.icon",
            stylers: [{
               visibility: "off"
            }]
         }, {
            featureType: "transit",
            elementType: "geometry",
            stylers: [{
               color: "#f2f2f2"
            }, {
               lightness: 19
            }]
         }, {
            featureType: "administrative",
            elementType: "geometry.fill",
            stylers: [{
               color: "#fefefe"
            }, {
               lightness: 20
            }]
         }, {
            featureType: "administrative",
            elementType: "geometry.stroke",
            stylers: [{
               color: "#fefefe"
            }, {
               lightness: 17
            }, {
               weight: 1.2
            }]
         }]
      },
         o = document.getElementById("map"),
         t = new google.maps.Map(o, e),
         n = {
            // url: "img/map-marker.svg",
            origin: new google.maps.Point(0, 0),
            map: map,
         };
      const contentString =
         `
         <div class="map-address">
            <h6>WE ARE HERE!</h6>
            <p>Nizami 203B, AF Business House, 2-ci mərtəbə, Baku 1000</p>
         </div>
         `

      const infowindow = new google.maps.InfoWindow({
         content: contentString,
      });

      const marker = new google.maps.Marker({
         position: new google.maps.LatLng(l, s),
         // animation: google.maps.Animation.BOUNCE,
         map: t,
         icon: {
            url: 'images/map/marker.svg'
         }
         // icon: {
         //    path: google.maps.SymbolPath.CIRCLE,
         //    scale: 11,
         //    fillColor: "#0076FC",
         //    fillOpacity: 1,
         //    strokeWeight: 7,
         //    strokeColor: '#fff',
         // },
      });
      // marker2.setMap(null)

      infowindow.open(map, marker);
   })
}