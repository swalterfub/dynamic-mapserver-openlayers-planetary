import 'ol/ol.css';
import {Map, View} from 'ol';
import TileLayer from 'ol/layer/Tile';		
import TileWMS from "ol/source/TileWMS";
import {defaults as defaultControls, ScaleLine} from 'ol/control';
 
const map = new Map({
  target: 'map',
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
      units: 'metric'
    })
  ]),
  view: new View({
    center: [0, 0],
    zoom: 0,
    projection: 'EPSG:4326'
  })
});
