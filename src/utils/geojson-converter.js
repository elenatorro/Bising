export function jsonToGeojson(name, data) {
  const features = data.map((point) => {
    return {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [point.longitude, point.latitude]
      },
      properties: _properties(point)
    }
  })

  return {
    type: 'FeatureCollection',
    name,
    features
  }
}

function _properties(point) {
  const properties = {};

  for (let property in point) {
    const numericProperty = parseInt(point[property]);
    properties[property] = !isNaN(numericProperty)
      ? numericProperty
      : point[property];
  }

  return properties;
}