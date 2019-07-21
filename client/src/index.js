import React from 'react'
import ReactDOM from 'react-dom'
import mapboxgl from 'mapbox-gl'
import Detail from './components/detail'
import registerServiceWorker from './registerServiceWorker';

const DESALINATION_PLANTS = 'desalination-plants';
mapboxgl.accessToken = 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA';

export default class App extends React.Component {
  tooltipContainer;

  constructor(props) {
    super(props);
    this.state = {
      title: '',
      description: ''
    }
  }

  fetchPlantCoordinates() {
    // temporarily hard-coded
    const geojson = {
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [145.526288, -38.588381]
          },
          properties: {
            title: 'Victorian Desalination Plant',
            description: 'Add short description for this desalination plant',
            icon: 'monument'
          }
        }
      ]
    }
    return geojson;
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

    const geojson = this.fetchPlantCoordinates();
    map.on('load', () => {
      map.addLayer({
        "id": "desalination-plants",
        "type": "symbol",
        "source": {
          "type": "geojson",
          "data": {
            "type": "FeatureCollection",
            "features": geojson.features
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
      })
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
      console.log(this.currentlyHoveredFeatures.title)
      this.setState({
        title: this.currentlyHoveredFeatures.title,
        description: this.currentlyHoveredFeatures.description
      })
    });

  }

  render() {
    const divStyle = {
      width: '60%'
    }

    return (
      <div>
        <div style={divStyle} ref={el => this.mapContainer = el} className="absolute top right left bottom" />
        <Detail title={this.state.title} description={this.state.description}/>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
