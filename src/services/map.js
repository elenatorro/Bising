export function initMap(lines, stations) {
  const map = new mapboxgl.Map({
    container: 'map',
    style: carto.basemaps.voyager,
    center: [2.16, 41.38],
    zoom: 15
  });

  const popup = new mapboxgl.Popup({
    closeButton: false,
    closeOnClick: false
  });

  carto.setDefaultAuth({
    username: 'cartovl',
    apiKey: 'default_public'
  });

  const linesSource = new carto.source.GeoJSON(lines);
  const stationsSource = new carto.source.GeoJSON(stations);

  const linesViz = new carto.Viz(linesVizString);
  const stationsIconsViz = new carto.Viz(iconsVizString);
  const stationsViz = new carto.Viz(stationsVizString);

  const stationsLayer = new carto.Layer('StationsLayer', stationsSource, stationsViz);
  const stationsIconLayer = new carto.Layer('StationsIconsLayer', stationsSource, stationsIconsViz);
  const linesLayer = new carto.Layer('LinesLayer', linesSource, linesViz);

  _setInteractivity(map, popup, stationsLayer);

  linesLayer.addTo(map);
  stationsLayer.addTo(map);
  stationsIconLayer.addTo(map);

  return map;
}

function _setInteractivity(map, popup, layer) {
  const interactivity = new carto.Interactivity(layer);

  interactivity.on('featureEnter', event => {
    if (event.features.length > 0) {
      const vars = event.features[0].variables;

      popup.setHTML(`
        <div class="MapPopup">
          <h3 class ="h3">${vars.streetName.value}</h3>
          <p>Bikes: ${vars.bikes.value}</p>
          <p>Slots: ${vars.slots.value}</p>
          <p>Status: ${vars.status.value}</p>
        </div>
      `);
      
      popup.setLngLat([event.coordinates.lng, event.coordinates.lat]);
      
      if (!popup.isOpen()) {
        popup.addTo(map);
      }
    } else {
      popup.remove();
    }
  });

  interactivity.on('featureLeave', event => {
    popup.remove();
  });
}

const iconsVizString = `
  symbol: ramp(buckets($type, ['BIKE', 'BIKE-ELECTRIC']), [ image('../src/icons/bicycle.svg'), image('../src/icons/light.svg') ])
  symbolPlacement: placement(0, 1.5)
  color: ramp(buckets($type, ['BIKE', 'BIKE-ELECTRIC']), [ #03a9f4, #ffc700 ])
  width: 30
`;

const stationsVizString = `
  @bikes: $bikes
  @slots: $slots
  @status: $status
  @streetName: $streetName
  color: ramp(buckets($bikes - $slots, [5, 10, 15, 20]), SUNSET)
  width: 20
`;

const linesVizString = `
  color: #05ea00
  width: 5
`;

const MapService = {
  initMap
};

export default MapService;
