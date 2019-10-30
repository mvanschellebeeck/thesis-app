import mapboxgl from 'mapbox-gl';
import React, { Component } from 'react';
import '../index.css';

const GAB_ID = 'great-artesian-basin';
const MDB_ID = 'murray-darling-basin';

//const states = ['NSW', 'NT', 'QLD', 'SA', 'TAS', 'VIC', 'WA'];
const states = ['NSW'];

process.env.REACT_APP_MAPBOX_TOKEN === undefined
  ? console.log('Please add REACT_APP_MAPBOX_TOKEN to .env file.')
  : (mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN || '');

export default class Map extends Component {
  mapContainer: any;
  componentDidMount() {
    const map = new mapboxgl.Map({
      bounds: [[109.338953078, -45.6345972634], [158.569469029, -8.6681857235]],
      center: [133.7751, -25.2744],
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/streets-v11',
      zoom: 3,
    });

    map.on('load', () => {
         map.addLayer({
            id: MDB_ID,
            type: 'fill',
            source: {
              type: 'geojson',
              data: '../geojson/aquifers/murray_darling_basin.geojson',
            },
            paint: {
              'fill-color': 'rgba(200, 100, 240, 0.4)',
              'fill-outline-color': 'rgba(200, 100, 240, 1)',
            },
          });

          map.addLayer({
            id: GAB_ID,
            type: 'fill',
            source: {
              type: 'geojson',
              data: '../geojson/aquifers/great_artesian_basin.geojson',
            },
            paint: {
              'fill-color': 'rgba(250, 100, 0, 0.4)',
              'fill-outline-color': 'rgba(250, 100, 0, 1)',
            },
          });

          states.map(state => {
            map.addLayer({
             id: `${state}_bores`,
             layout: {
              'icon-allow-overlap': true,
              'icon-image': '{icon}',
            },
            source: {
              data: `../geojson/bores/${state}_simple.geojson`,
              type: 'geojson',
            },
            type: 'symbol',
            });
          })
       })
 }

  render() {
    return <div className="inlandMapContainer" ref={el => (this.mapContainer = el)} />;
  }
}
