import React from 'react'
import ReactDOM from 'react-dom'
import mapboxgl from 'mapbox-gl'
import Detail from './components/detail'
import registerServiceWorker from './registerServiceWorker';
import axios from 'axios'
import './index.css'

const DESALINATION_PLANTS = 'desalination-plants';
mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      plants: {},
      currentlySelectedPlant: {}
    }
  }

  plantsToMapFeatures() {
    const plants = [];
    Object.keys(this.state.plants).forEach(plant => {
      const properties = this.state.plants[plant];
      plants.push(
        {
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [properties.Longitude, properties.Latitude]
          },
          properties: {
            title: plant,
            description: properties.Description || 'No description provided',
            icon: 'monument'
          }
        }
      );
    });
    return plants;
  }

  componentDidMount() {

    const map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/streets-v11',
      //    center: [133.7751, -25.2744],
      bounds: [[109.338953078, -45.6345972634], [158.569469029, -8.6681857235]],
      maxBounds: [[109.338953078, -45.6345972634], [158.569469029, -8.6681857235]],    
    });

    map.on('load', () => {
        axios.get('/api/plants')
            .then(plants => {
                this.setState({ plants: plants.data });
                const geojson_features = this.plantsToMapFeatures();
                map.addLayer({
                    "id": "desalination-plants",
                    "type": "symbol",
                    "source": {
                      "type": "geojson",
                      "data": {
                        "type": "FeatureCollection",
                        "features": geojson_features
                      }
                    },
                    "layout": {
                      "icon-image": "{icon}-15",
                      "text-field": "{title}",
                      "text-offset": [0, 0.6],
                      "text-anchor": "top",
                      "text-size": 14,
                      "icon-allow-overlap": true
                    }
                  });
            })
            .catch(e => { console.error(e) });
    });

    const popup = new mapboxgl.Popup({
      closeButton: false,
      closeOnClick: false
    });

    map.on('mouseenter', DESALINATION_PLANTS, (e) => {
      map.getCanvas().style.cursor = 'pointer';

      const coordinates = e.features[0].geometry.coordinates.slice();
      const description = e.features[0].properties.description;

      while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
      }

      popup.setLngLat(coordinates)
        .setHTML(description)
        .addTo(map);
    });

    map.on('mouseleave', DESALINATION_PLANTS, () => {
      map.getCanvas().style.cursor = '';
      popup.remove();
    });

    map.on('click', DESALINATION_PLANTS, (e) => {
        const selected_plant = e.features[0].properties;
        this.setState({
            currentlySelectedPlant: {
                title: selected_plant.title,
                description: selected_plant.description
            }
        });
    });
  }

  render() {
    return (
      <div>
        <div ref={el => this.mapContainer = el} className="mapContainer absolute top right left bottom" />
        <Detail current_plant={this.state.currentlySelectedPlant} all_plants={this.state.plants}/>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
