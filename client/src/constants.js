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



export const AUD_TO_USD = 1.46;
export const TOTAL_INSTALLED_CAPACITY = 1463013.69;
export const ENERGY_COST_PER_KL = 0.228;
