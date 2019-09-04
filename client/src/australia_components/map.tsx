import React, { Component } from "react";
import mapboxgl from "mapbox-gl";
import axios from "axios";

import "../index.css";

interface IProps {
  all_plants;
  current_plant;
  setParentState(data: ISubprocessValues): void;
}

type Subprocess =
  | "Intake"
  | "Pre-Treatment"
  | "Desalination"
  | "Post-Treatment"
  | "Concentrate Management";

interface ImpactModel {
  social: number;
  environmental: number;
  economic: number;
}

interface ISubprocessValues {
  technologyCombinationValues?: {
    [key in Subprocess]: ImpactModel;
  };
  currentlySelectedPlant?: {
    title: string;
    description: string;
  };
  plants?: any;
}

interface IState {
  subprocesses: {
    [key in Subprocess]: {
      types: string[];
      button: string;
      currentType: string;
    };
  };
}

interface SubprocessWithType {
  subprocess: Subprocess;
  type: string;
}

const DESALINATION_PLANTS = "desalination-plants";
mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;

export default class Map extends Component<IProps> {
  mapContainer: any;
  plantsToMapFeatures() {
    const plants = [];
    const { all_plants } = this.props;
    Object.keys(all_plants).forEach(plant => {
      const properties = all_plants[plant];
      plants.push({
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [properties.Longitude, properties.Latitude]
        },
        properties: {
          title: plant,
          description: properties.Description || "No description provided",
          icon: "monument"
        }
      });
    });
    return plants;
  }

  componentDidMount() {
    const map = new mapboxgl.Map({
      container: this.mapContainer,
      style: "mapbox://styles/mapbox/streets-v11",
      //    center: [133.7751, -25.2744],
      bounds: [[109.338953078, -45.6345972634], [158.569469029, -8.6681857235]],
      // maxBounds: [
      //   [109.338953078, -45.6345972634],
      //   [158.569469029, -8.6681857235]
      // ],
      zoom: 3
    });

    map.on("load", () => {
      axios
        .get("/api/plants")
        .then(plants => {
          const state_change = { plants: plants.data };
          this.props.setParentState(state_change);
          const geojson_features = this.plantsToMapFeatures();
          map.addLayer({
            id: "desalination-plants",
            type: "symbol",
            source: {
              type: "geojson",
              data: {
                type: "FeatureCollection",
                features: geojson_features
              }
            },
            layout: {
              "icon-image": "{icon}-15",
              "text-field": "{title}",
              "text-offset": [0, 0.6],
              "text-anchor": "top",
              "text-size": 14,
              "icon-allow-overlap": true
            }
          });
        })
        .catch(e => {
          console.error(e);
        });
    });

    const popup = new mapboxgl.Popup({
      closeButton: false,
      closeOnClick: false
    });

    map.on("mouseenter", DESALINATION_PLANTS, e => {
      map.getCanvas().style.cursor = "pointer";

      const coordinates = e.features[0].geometry.coordinates.slice();
      const description = e.features[0].properties.description;

      while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
      }

      popup
        .setLngLat(coordinates)
        .setHTML(description)
        .addTo(map);
    });

    map.on("mouseleave", DESALINATION_PLANTS, () => {
      map.getCanvas().style.cursor = "";
      popup.remove();
    });

    map.on("click", DESALINATION_PLANTS, e => {
      const selected_plant = e.features[0].properties;
      const state_change = {
        currentlySelectedPlant: {
          title: selected_plant.title,
          description: selected_plant.description
        }
      };
      this.props.setParentState(state_change);
    });
  }

  render() {
    return <div ref={el => (this.mapContainer = el)} />;
  }
}
