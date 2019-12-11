var VizCarretera1, VizDelitos1;

$.getJSON("./carreteras.json", function(json) {

    VizCarretera1 = fp.viz.mapCarreteras(json)
})

// $.getJSON("./delitos_ambientales.json", function(root) {
//
// console.log("entra")
//     VizDelitos1 = fp.viz.mapDelitos(root)
// });

// $.getJSON("./vias_bolivia.json", function(json) {
//     mymap.addData(json);
// })
