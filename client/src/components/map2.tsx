import mapboxgl from 'mapbox-gl';
import React, { Component } from 'react';
import '../index.css';

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
            id: 'murray-darling-basin',
            type: 'fill',
            source: {
              type: 'geojson',
              data: '../mdb_boundary.geojson',
            },
            paint: {
              'fill-color': 'rgba(200, 100, 240, 0.4)',
              'fill-outline-color': 'rgba(200, 100, 240, 1)',
            },
          });

          map.addLayer({
            id: 'great-artisan-basin',
            type: 'fill',
            source: {
              type: 'geojson',
              data: '../gab_boundary.geojson',
            },
            paint: {
              'fill-color': 'rgba(250, 100, 0, 0.4)',
              'fill-outline-color': 'rgba(100, 200, 240, 1)',
            },
          });

          map.addLayer({
            id: 'bores',
            layout: {
              'icon-allow-overlap': true,
              'icon-image': '{icon}',
              'text-anchor': 'top',
//              'text-field': '{id}',
              'text-offset': [0, 0.6],
              'text-size': 14,
            },
            source: {
              data: '../map1.geojson',
              type: 'geojson',
            },
            type: 'symbol',
          });
        })

    const popup = new mapboxgl.Popup({
      closeButton: false,
      closeOnClick: false,
    });
  }

  render() {
    return <div className="inlandMapContainer" ref={el => (this.mapContainer = el)} />;
  }
}
