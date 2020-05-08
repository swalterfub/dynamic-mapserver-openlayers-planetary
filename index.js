import 'ol/ol.css';
import {Map, View} from 'ol';
import TileLayer from 'ol/layer/Tile';
import TileWMS from 'ol/source/TileWMS';
import {defaults as defaultControls, ScaleLine} from 'ol/control';

var layers = [
  new TileLayer({
    source: new TileWMS({
      url: 'https://maps.planet.fu-berlin.de/eqc-bin/wms?',
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
    projection: 'EPSG:4326',
  })
});
