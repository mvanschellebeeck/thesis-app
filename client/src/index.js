import React from 'react'
import ReactDOM from 'react-dom'
import mapboxgl from 'mapbox-gl'
import Detail from './components/detail'
import registerServiceWorker from './registerServiceWorker';
import axios from 'axios'
import './index.css'

const DESALINATION_PLANTS = 'desalination-plants';

// use login mapbox token and source environment variablw
mapboxgl.accessToken = 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA';

export default class App extends React.Component {
  tooltipContainer;

  constructor(props) {
    super(props);
    this.state = {
      title: '',
      description: '',
      plants: {}
    }
  }

  plantsToMapFeatures(data) {
    const plants = [];
    Object.keys(data).forEach( (key) => {
      const val = data[key];
      plants.push(
        {
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [val.Longitude, val.Latitude]
          },
          properties: {
            title: key,
            description: val.Description || 'No description provided',
            icon: 'monument'
          }
        }
      );
    });
    return plants;
  }


  componentDidMount() {

    this.currentlyHoveredFeatures = {};

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
                const geojson_features = this.plantsToMapFeatures(plants.data);
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
      this.currentlyHoveredFeatures = e.features[0].properties;

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
        const plant_properties = e.features[0].properties;
        axios.get('api/plants', {
            params: { plant: plant_properties.title }
        })
        .then(res => {
            this.setState({
                title: plant_properties.title,
                description: plant_properties.description,
                plants: res.data
            })
        });
    });
  }

  render() {
    return (
      <div>
        <div ref={el => this.mapContainer = el} className="mapContainer absolute top right left bottom" />
        <Detail title={this.state.title} description={this.state.description} plants={this.state.plants}/>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
