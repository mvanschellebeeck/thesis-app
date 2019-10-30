import mapboxgl from 'mapbox-gl';
import React, { Component } from 'react';
import '../index.css';

const GAB_ID = 'great-artesian-basin';
const MDB_ID = 'murray-darling-basin';

const states = ['NSW', 'NT', 'QLD', 'SA', 'TAS', 'VIC', 'WA'];
//const states = ['NSW'];

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
            map.addSource(`${state}_bores`, {
              type: "geojson",
              // Point to GeoJSON data. This example visualizes all M1.0+ earthquakes
              // from 12/22/15 to 1/21/16 as logged by USGS' Earthquake hazards program.
              data: `../geojson/bores/${state}_simple.geojson`,
              cluster: true,
              clusterMaxZoom: 14, // Max zoom to cluster points on
              clusterRadius: 50 // Radius of each cluster when clustering points (defaults to 50)
            });
           map.addLayer({
              id: `${state}_clusters`,
              type: "circle",
              source: `${state}_bores`,
              filter: ["has", "point_count"],
              paint: {
                // Use step expressions (https://docs.mapbox.com/mapbox-gl-js/style-spec/#expressions-step)
                // with three steps to implement three types of circles:
                //   * Blue, 20px circles when point count is less than 100
                //   * Yellow, 30px circles when point count is between 100 and 750
                //   * Pink, 40px circles when point count is greater than or equal to 750
                "circle-color": [
                "step",
                ["get", "point_count"],
                "#51bbd6",
                100,
                "#f1f075",
                750,
                "#f28cb1"
                ],
                "circle-radius": [
                "step",
                ["get", "point_count"],
                20,
                100,
                30,
                750,
                40
                ]
              }
          });

          map.addLayer({
              id: `${state}_cluster-count`,
              type: "symbol",
              source:`${state}_bores`,
              filter: ["has", "point_count"],
              layout: {
                "text-field": "{point_count_abbreviated}",
                "text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
                "text-size": 12
              }
            });
            
             map.addLayer({
              id: `${state}_unclustered-point`,
              type: "symbol",
              source:`${state}_bores`,
              filter: ["!", ["has", "point_count"]],
              layout: {
                'icon-allow-overlap': true,
                'icon-image': '{icon}'
              }
            });
          })
          
       })
 }

  render() {
    return <div className="inlandMapContainer" ref={el => (this.mapContainer = el)} />;
  }
}
