import MapService from '/src/services/map.js';
import LinesService from '/src/services/lines.js';
import StationsService from '/src/services/stations.js';

(async () => {
  const lines = await LinesService.getGeoJSON();
  const stations = await StationsService.getGeoJSON();
  const map = MapService.initMap(lines, stations);
})();