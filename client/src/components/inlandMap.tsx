import mapboxgl from 'mapbox-gl';
import React, { Component, useEffect, useRef } from 'react';
import '../map.css';
import { AQUIFERS } from '../constants';

//const states = ['NSW', 'NT', 'QLD', 'SA', 'TAS', 'VIC', 'WA'];
 const states = ['a'];

process.env.REACT_APP_MAPBOX_TOKEN === undefined
  ? console.error('Please add REACT_APP_MAPBOX_TOKEN to .env file.')
  : (mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN || '');

export default function Map(){
    let mapContainer : any;

    let visibility = true;
    let map : any;

    useEffect(() => {
      map = new mapboxgl.Map({
          bounds: [[109.338953078, -45.6345972634], [158.569469029, -8.6681857235]],
          center: [133.7751, -25.2744],
          container: mapContainer,
          style: 'mapbox://styles/mapbox/streets-v11',
          zoom: 3,
      });      map.on('load', () => {
        Object.keys(AQUIFERS).map(aquifer => {
          map.addLayer({
            id: AQUIFERS[aquifer].id,
            type: 'fill',
            source: {
              type: 'geojson',
              data: `../geojson/aquifers/${AQUIFERS[aquifer].id}.geojson`,
            },
            paint: {
              'fill-color': AQUIFERS[aquifer].colour_fill,
              'fill-outline-color': AQUIFERS[aquifer].colour_outline
            }
          });
        });
      

        states.map(state => {
          map.addSource(`${state}_bores`, {
            type: 'geojson',
            // Point to GeoJSON data. This example visualizes all M1.0+ earthquakes
            // from 12/22/15 to 1/21/16 as logged by USGS' Earthquake hazards program.
            data: `../geojson/bores/${state}_simple.geojson`,
            cluster: true,
            clusterMaxZoom: 14, // Max zoom to cluster points on
            clusterRadius: 50, // Radius of each cluster when clustering points (defaults to 50)
          });
          map.addLayer({
            id: `${state}_clusters`,
            type: 'circle',
            source: `${state}_bores`,
            filter: ['has', 'point_count'],
            paint: {
              // Use step expressions (https://docs.mapbox.com/mapbox-gl-js/style-spec/#expressions-step)
              // with three steps to implement three types of circles:
              //   * Blue, 20px circles when point count is less than 100
              //   * Yellow, 30px circles when point count is between 100 and 750
              //   * Pink, 40px circles when point count is greater than or equal to 750
              'circle-color': [
                'step',
                ['get', 'point_count'],
                '#51bbd6',
                100,
                '#f1f075',
                750,
                '#f28cb1',
              ],
              'circle-radius': [
                'step',
                ['get', 'point_count'],
                20,
                100,
                30,
                750,
                40,
              ],
            },
          });

          map.addLayer({
            id: `${state}_cluster-count`,
            type: 'symbol',
            source: `${state}_bores`,
            filter: ['has', 'point_count'],
            layout: {
              'text-field': '{point_count_abbreviated}',
              'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
              'text-size': 12,
            },
          });

          map.addLayer({
            id: `${state}_unclustered-point`,
            type: 'symbol',
            source: `${state}_bores`,
            filter: ['!', ['has', 'point_count']],
            layout: {
              'icon-allow-overlap': true,
              'icon-image': '{icon}',
            },
          });

        });
      });
    }, []);

    useEffect(()=>{
        console.log('effect!');
    }, [visibility])

   setTimeout(()=>{
      visibility = false;
   }, 9000)

    return <div id="map" ref={el => (mapContainer = el)} />;
  }


