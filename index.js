import "ol/ol.css";
import { Map, View } from "ol";
import TileLayer from "ol/layer/Tile";
import TileWMS from "ol/source/TileWMS";
import { defaults as defaultControls, ScaleLine } from "ol/control";
import { Projection, getTransform, get } from "ol/proj";
import { register } from "ol/proj/proj4";
import { getDistance } from "ol/sphere";
import proj4 from "proj4";

proj4.defs("EPSG:49900", "+proj=longlat +a=3396000 +b=3396000 +no_defs ");
proj4.defs(
  "EPSG:49910",
  "+proj=eqc +lat_ts=0 +lat_0=0 +lon_0=0 +x_0=0 +y_0=0 +a=3396000 +b=3396000 +units=m +no_defs "
);
register(proj4);

var projection = new Projection({
  code: "EPSG:49910",
  global: true,
  extent: [-10668848.652, -5215881.563, 10668848.652, 5215881.563],
  getPointResolution: function(resolution, point) {
    var toEPSG49900 = getTransform(get("EPSG:49910"), get("EPSG:49900"));
    var vertices = [
      point[0] - resolution / 2,
      point[1],
      point[0] + resolution / 2,
      point[1]
    ];
    vertices = toEPSG49900(vertices, vertices, 2);
    return getDistance(vertices.slice(0, 2), vertices.slice(2, 4), 3396000);
  }
});

const map = new Map({
  target: "map",
  layers: [
    new TileLayer({
      source: new TileWMS({
        url: "https://maps.planet.fu-berlin.de/eqc-bin/wms?",
        params: { LAYERS: "MOLA-gray-hs" }
      })
    })
  ],
  controls: defaultControls().extend([
    new ScaleLine({
      units: "metric"
    })
  ]),
  view: new View({
    center: [0, 0],
    zoom: 0,
    projection: projection
  })
});
