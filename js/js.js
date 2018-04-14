
var miMapa;

require(["esri/map",
"esri/geometry/Point",
"esri/tasks/query",
"esri/symbols/SimpleMarkerSymbol",
"esri/symbols/SimpleLineSymbol",
"esri/symbols/SimpleFillSymbol",
"esri/Color",
"esri/tasks/QueryTask",
"esri/layers/GraphicsLayer",
"esri/geometry/Circle",
"esri/graphic",
"esri/units",
"dojo/domReady!"], function(Map,
  Point,Query,SimpleMarkerSymbol,SimpleLineSymbol,SimpleFillSymbol,Color,QueryTask,GraphicsLayer,Circle,Graphic,units) {

var miCentro = new Point (-101.26,28.464);


var obj = {
  "basemap": "hybrid",
  "center" : miCentro,
  "zoom": 3

}

  miMapa = new Map("mapaCont", obj);


var gl = new GraphicsLayer();
miMapa.addLayer (gl);


var line = new SimpleLineSymbol();
line.setColor(new Color([230, 0, 0, 1]));
var marker = new SimpleMarkerSymbol();
marker.setColor(new Color([255, 0, 0, 1]));
marker.setOutline(line);
marker.setSize(24);




var miQuery = new Query();


miQuery.where = "pop2000 > 1000000";
miQuery.outFields = ["areaname","pop2000"];
miQuery.outSpatialReference = miMapa.spatialReference;
miQuery.returnGeometry = true;






var urlCiudadesUsa = "https://sampleserver6.arcgisonline.com/arcgis/rest/services/USA/MapServer/0"
var miQueryTask = new QueryTask(urlCiudadesUsa);



miMapa.on ("click", hacerConsulta);


function hacerConsulta (objEvento) {
var pt = objEvento.mapPoint;
var circulo = new Circle(pt, {
  radius : 1000000,
  radiusUnit: units.METERS
});


var fill = new SimpleFillSymbol();




var grCirculo = new Graphic(circulo,fill);
gl.clear();
gl.add (grCirculo);


miQuery.geometry = circulo;
miQuery.spatialRelationship = Query.SPATIAL_REL_INTERSECTS;






miQueryTask.execute(miQuery,miCallback, miErrback);


}


function miCallback (result) {
    miMapa.graphics.clear();
  var arrayGraficos =  result.features;
  for (var i = 0; i < arrayGraficos.length; i++) {
    var gr = arrayGraficos[i]
  gr.symbol = marker;

  miMapa.graphics.add(gr);

  }

alert ("todo esta de lujo");

};


function miErrback () {


  alert ("Ha habido un problema , vuelve a ejecutar la consulta.");


}



});
