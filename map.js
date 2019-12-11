var fp = fp || {
  version: 0.2,
  viz: {}
};
var self = {};
var map;
var mymap;
fp.viz.mapCarreteras = function(root) {

  self.init = function() {
    $(window).width() >= 767
      ? (map = L.map("map").setView([-9.16, -75.1], 5.5))
      : (map = L.map("map").setView([-10.16, -73.17], 5.2));

    L.tileLayer(
      "https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiZ2VueWxlb25nIiwiYSI6ImNqeTdrMWQweDAwYWUzZXM2ZHUxN3lxcWMifQ.taFCKYjv4VSHhWN86P8N1Q",
      {
        id: "mapbox.light",
        attribution:
          '<a href="https://www.openstreetmap.org/">OpenStreetMap</a>',
        maxZoom: 12.5,
        minZoom: 4.5
      }
    ).addTo(map);

    mymap = L.geoJson(root, { style: self.style }).addTo(map);

  };



  self.style = function(feature) {
    // console.log(feature);
    var getMap = feature.properties.leyenda;

    if (getMap == "no pavimentada") {
      return {
        color: "#d53e4f",
        dashArray: "3"
      };
    }
    if (getMap == "pavimentada") {
      return {
        color: "#3288bd",
        dashArray: "3"
      };
    } else {
      return {
        color: "#ffffbf",
        dashArray: "3"
      };
    }
  };

  // $.getJSON("./carreteras.json", function(json) {
  //   mymap.addData(json);
  // });

  $.getJSON("./delitos_ambientales.json", function(root) {
    console.log("entra a json")

    var jsonFeatures = [];

  root.forEach(function(point){
      var lat = point.LATITUD;
      var lon = point.LONGITUD;
      var reincidencia = point.REINCIDENCIA;

      var feature = {"type": 'Feature',
      "properties": {
        "simbologia": "L.circleMarker",
        "reincidencia": reincidencia
        },
          "geometry": {
              "type": 'Point',
              "coordinates": [lon,lat]
          }
      };

      jsonFeatures.push(feature);
  });

  var geoJson = { type: 'FeatureCollection', features: jsonFeatures };
  // L.geoJson(geoJson).addTo(map);
  // for (var point in root) {
  //   var latlng = [root[point]["LATITUD"], root[point]["LONGITUD"]]
// console.log(geoJson)

    function estiloCircleMarker(feature, latlng) {
      // console.log(feature, latlng)
      // console.log(feature)
    	return L.circleMarker(latlng,{
    		radius: 0.025*feature.properties.reincidencia,
    		fillColor: 'green',
    		color: '#000',
    		weight: .5,
    		opacity: .7,
    		fillOpacity: .7
    	})
    }

    L.geoJson(geoJson, {
        pointToLayer: estiloCircleMarker
    }).addTo(map);
  });

  self.init();

  return self;
};

// fp.viz.mapDelitos = function (root){
// console.log(root)
//   for (var i in root) {
//     var latlng = L.latLng({ lat: root[i].LATITUD, lng: root[i].LONGITUD });
//
//     L.marker( latlng ).addTo(map);
//   }
//   self.init();
//
//   return self;
// }
