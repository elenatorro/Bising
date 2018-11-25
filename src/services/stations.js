
import { SERVER_URL } from '../constants/paths.js';
import { jsonToGeojson } from '../utils/geojson-converter.js';

export async function getGeoJSON() {
  const stationsRaw = await fetch(SERVER_URL);
  const stationsJSON = await stationsRaw.json();
  return jsonToGeojson('BicingStations', stationsJSON.stations);
}

const StationsService = {
  getGeoJSON
};

export default StationsService;