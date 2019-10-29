import axios from 'axios';
import mapboxgl from 'mapbox-gl';
import React, { Component } from 'react';
import '../index.css';

import {
  MapProps as MapPropsNoParent,
  MapState,
  PlantAPI,
  PlantSummary,
} from '../utils/Models';

interface IMapProps extends MapPropsNoParent {
  updateCurrentPlant(dataFromChild: PlantSummary): void;
  updatePlantData(dataFromChild: any): void;
}

interface IServerResponse {
  data: PlantAPI;
}

const DESALINATION_PLANTS = 'desalination-plants';
process.env.REACT_APP_MAPBOX_TOKEN === undefined
  ? console.log('Please add REACT_APP_MAPBOX_TOKEN to .env file.')
  : (mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN || '');

export default class Map extends Component<IMapProps, MapState> {
  mapContainer: any;

  plantsToMapFeatures() {
    const plants: Array<GeoJSON.Feature<GeoJSON.Geometry>> = [];
    const { all_plants } = this.props;
    Object.keys(all_plants).forEach(plant => {
      const properties = all_plants[plant];
      plants.push({
        geometry: {
          coordinates: [properties.Longitude, properties.Latitude],
          type: 'Point',
        },
        properties: {
          description: properties.Description || 'No description provided',
          icon: 'monument',
          title: plant,
        },
        type: 'Feature',
      });
    });
    return plants;
  }

  componentDidMount() {
    const map = new mapboxgl.Map({
      bounds: [[109.338953078, -45.6345972634], [158.569469029, -8.6681857235]],
      center: [133.7751, -25.2744],
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/streets-v11',
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
                const name = item.Name;
                delete item._id;
                newData[name] = item;
              });
              return newData;
            },
          ),
        })
        .then(plants => {
          this.props.updatePlantData(plants.data);

          const geoJsonFeatures = this.plantsToMapFeatures();
          console.log(geoJsonFeatures);
          map.addLayer({
            id: 'desalination-plants',
            layout: {
              'icon-allow-overlap': true,
              'icon-image': '{icon}-15',
              'text-anchor': 'top',
              'text-field': '{title}',
              'text-offset': [0, 0.6],
              'text-size': 14,
            },
            source: {
              data: {
                features: geoJsonFeatures,
                type: 'FeatureCollection',
              },
              type: 'geojson',
            },
            type: 'symbol',
          });

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
              'text-field': '{id}',
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
      const selectedPlant = e.features![0].properties;
      const stateChange = {
        description: selectedPlant!.description,
        title: selectedPlant!.title,
      };
      this.props.updateCurrentPlant(stateChange);
    });
  }

  render() {
    return <div ref={el => (this.mapContainer = el)} />;
  }
}
