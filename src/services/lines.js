import { LINES_GEOJSON_URL } from '../constants/paths.js';

export async function getGeoJSON() {
  const linesRaw = await fetch(LINES_GEOJSON_URL)
  return await linesRaw.json();
}

const LinesService = {
  getGeoJSON
};

export default LinesService;