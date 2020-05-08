import 'ol/ol.css';
import {Map, View} from 'ol';
import TileLayer from 'ol/layer/Tile';
import TileWMS from 'ol/source/TileWMS';
import {defaults as defaultControls, ScaleLine} from 'ol/control';
import {register} from 'ol/proj/proj4';
import {Projection} from 'ol/proj';
import proj4 from 'proj4';

proj4.defs('IAU2000:49910', '+proj=eqc +lat_ts=0 +lat_0=0 +lon_0=0 +x_0=0 +y_0=0 +a=3396000 +b=3396000 +units=m +no_defs ');
register(proj4);

var projection = new Projection({
  code: 'IAU2000:49910',
  global: true,
  extent: [-10668848.652, -5215881.563, 10668848.652, 5215881.563]
});

var layers = [
  new TileLayer({
    source: new TileWMS({
      url: 'https://maps.planet.fu-berlin.de/eqc/',
      params: { LAYERS: 'MOLA-color-hs', VERSION: '1.1.1', TILED: true },
      serverType: 'mapserver',
      wrapX: true
    }),
  })
];
var scale = new ScaleLine({
  units: 'metric'
});
const map = new Map({
  target: 'map',
  controls: defaultControls().extend([
    scale
  ]),
  layers: layers,
  view: new View({
    center: [0, 0],
    zoom: 0,
    projection: projection,
  })
});
