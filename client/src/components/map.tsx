import React, { Component } from 'react';
import mapboxgl from 'mapbox-gl';
import axios from 'axios';

import '../index.css';

import {
  MapState,
  MapProps as MapPropsNoParent,
  PlantSummary,
  PlantAPI,
} from '../utils/Models';

interface MapProps extends MapPropsNoParent {
  updateCurrentPlant(dataFromChild: PlantSummary): void;
  updatePlantData(dataFromChild: any): void;
}

interface ServerResponse {
  data: PlantAPI;
}

const DESALINATION_PLANTS = 'desalination-plants';
process.env.REACT_APP_MAPBOX_TOKEN === undefined
  ? console.log('Please add REACT_APP_MAPBOX_TOKEN to .env file.')
  : (mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN || '');

export default class Map extends Component<MapProps, MapState> {
  mapContainer: any;

  plantsToMapFeatures() {
    const plants: GeoJSON.Feature<GeoJSON.Geometry>[] = [];
    const { all_plants } = this.props;
    Object.keys(all_plants).forEach(plant => {
      const properties = all_plants[plant];
      plants.push({
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [properties.Longitude, properties.Latitude],
        },
        properties: {
          title: plant,
          description: properties.Description || 'No description provided',
          icon: 'monument',
        },
      });
    });
    return plants;
  }

  componentDidMount() {
    const map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [133.7751, -25.2744],
      bounds: [[109.338953078, -45.6345972634], [158.569469029, -8.6681857235]],
      zoom: 3,
    });

    map.on('load', () => {
      axios
        .get('/mongodb/plants', {
          transformResponse: [].concat(
            // @ts-ignore: Cant fix this axios type
            axios.defaults.transformResponse,
            (data: any) => {
              const newData = {} as any;
              data.forEach((item: any) => {
                const name = item['Name'];
                delete item['_id'];
                newData[name] = item;
              });
              return newData;
            },
          ),
        })
        .then(plants => {
          this.props.updatePlantData(plants.data);

          const geojson_features = this.plantsToMapFeatures();
          map.addLayer({
            id: 'desalination-plants',
            type: 'symbol',
            source: {
              type: 'geojson',
              data: {
                type: 'FeatureCollection',
                features: geojson_features,
              },
            },
            layout: {
              'icon-image': '{icon}-15',
              'text-field': '{title}',
              'text-offset': [0, 0.6],
              'text-anchor': 'top',
              'text-size': 14,
              'icon-allow-overlap': true,
            },
          });
        })
        .catch(e => {
          console.error(e);
        });
    });

    const popup = new mapboxgl.Popup({
      closeButton: false,
      closeOnClick: false,
    });

    map.on('mouseenter', DESALINATION_PLANTS, e => {
      map.getCanvas().style.cursor = 'pointer';

      const geom: GeoJSON.Geometry = e.features![0].geometry as GeoJSON.Point;
      const point = geom.coordinates.slice() as [number, number];
      const description = e.features![0].properties!.description;

      while (Math.abs(e.lngLat.lng - point[0]) > 180) {
        point[0] += e.lngLat.lng > point[0] ? 360 : -360;
      }

      popup
        .setLngLat(point)
        .setHTML(description)
        .addTo(map);
    });

    map.on('mouseleave', DESALINATION_PLANTS, () => {
      map.getCanvas().style.cursor = '';
      popup.remove();
    });

    map.on('click', DESALINATION_PLANTS, e => {
      const selected_plant = e.features![0].properties;
      const state_change = {
        title: selected_plant!.title,
        description: selected_plant!.description,
      };
      this.props.updateCurrentPlant(state_change);
    });
  }

  render() {
    return <div ref={el => (this.mapContainer = el)} />;
  }
}
