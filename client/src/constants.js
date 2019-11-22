export const AQUIFERS = {
  'Murray Darling Basin': {
    id: 'murray_darling_basin',
    colour_fill: 'rgba(200, 100, 240, 0.4)',
    colour_outline: 'rgba(200, 100, 240, 1)',
  },
  'Great Artesian Basin': {
    id: 'great_artesian_basin',
    colour_fill: 'rgba(250, 100, 0, 0.4)',
    colour_outline: 'rgba(250, 100, 0, 1)',
  },
};

export const DESALINATION_PLANTS = {
  'Sydney Plant': {
    id: 'sydney_plant',
    longitude: 153.497,
    latitude: -28.1571,
  },
};

export const EMPTY_GEOJSON = {
  "type": "FeatureCollection",
  "features": [{
    "type": "Feature",
    "geometry": {
      "type": "Point",
      "coordinates": []
    }
  }]
}

//{"type":"FeatureCollection",
//"features":[
//{"type":"Feature",
//"properties":{},
//"geometry": {
//"type":"MultiLineString",
//"coordinates":[
//[
//[[141.9439581804942,-29.210327927393706],[142.02753998478937,-29.27104808315761]],
//[[141.9439581804942,-29.210327927393706],[141.89895259356604,-29.374191340156976]],
//[[141.9439581804942,-29.210327927393706],[141.86037637619904,-29.046464514630436]]
//]
//]
//}}]}



export const AUD_TO_USD = 1.46;
export const TOTAL_INSTALLED_CAPACITY = 1463013.69;
export const ENERGY_COST_PER_KL = 0.228;
