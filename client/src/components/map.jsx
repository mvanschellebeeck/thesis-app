import React, { useState, useEffect } from 'react';
import ReactMapboxGl, { GeoJSONLayer, Layer, Popup } from 'react-mapbox-gl';
import { AQUIFERS } from '../constants';
import BoreTable from './inland/boreDetailModal';
import PlantDetail from './coastline/plantDetailModal';
import Modal from '@material-ui/core/Modal';
import './map.css';
import { Typography } from '@material-ui/core';
import axios from 'axios';

const GEOJSON_SERVER = 'https://mvanschellebeeck.github.io/geojson-server';

const styles = {
  clusterPaintProps: {
    'circle-color': [
      'step',
      ['get', 'point_count'],
      '#51bbd6',
      100,
      '#f1f075',
      750,
      '#f28cb1',
    ],
    'circle-radius': ['step', ['get', 'point_count'], 20, 100, 30, 750, 40],
  },
};


const MapGL = ReactMapboxGl({
  accessToken: process.env.REACT_APP_MAPBOX_TOKEN || '',
});

export default function Map({ aquiferVisibility, boreVisibility, plantVisibility, mapZoom,
  fitBounds, mapCenter, setCurrentBoreProps, currentBoreProps,
  boreModalVisibility, plantModalVisibility, setBoreModalVisibility,
  setPlantModalVisibility, states, salinityFilter }) {

  const [currentBore, setCurrentBore] = useState(null);
  const [currentBoreLong, setCurrentBoreLong] = useState(null);
  const [currentBoreLat, setCurrentBoreLat] = useState(null);
  // const [filter, setFilter] = useState(['>', '1000', ['get', 'salinity']]);

  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        `${GEOJSON_SERVER}/TAS.geojson`
      );
      result.data.features = result.data.features.filter(function(x){
        return x.properties.salinity < salinityFilter;
      });
      setData(result.data);
    };
    fetchData();
  }, [salinityFilter]);

  const onEnterBore = evt => {
    const { id } = evt.features[0].properties;
    const coordinates = evt.features[0].geometry.coordinates.slice();
    // for some reason setting state to an object would 
    // break the mouseLeave ???
    setCurrentBore(id);
    setCurrentBoreLong(coordinates[0]);
    setCurrentBoreLat(coordinates[1]);
    console.log(`Entered bore`);
  };

  const onLeaveBore = evt => {
    console.log('left bore');
    setCurrentBore(null);
  };

  const onEnterPlant = evt => {
    const { id } = evt.features[0].properties;
    console.log(`Entered plant with id ${id}`);
    console.log(data);
  }

  const onLeavePlant = evt => {
    // const { id } = evt.features[0].properties;
    console.log(`Left plant with id `);
  }

  const onPlantClick = evt => {
    evt.preventDefault();
    setPlantModalVisibility(true);
  }


  const onClickBore = evt => {
    evt.preventDefault();
    setBoreModalVisibility(true);
    setCurrentBoreProps(evt.features[0].properties);
  };

  const renderBoreModal = () => {
    return (
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={boreModalVisibility}
        onClose={() => setBoreModalVisibility(false)}
      >
        <BoreTable
          bore={currentBore}
          currentBoreProps={currentBoreProps}
          setBoreModalVisibility={setBoreModalVisibility}
        />
      </Modal>
    );
  };

  const renderPlantModal = () => {
    return (
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={plantModalVisibility}
        onClose={() => setPlantModalVisibility(false)}
      >
        <PlantDetail
          plantModalVisibility={plantModalVisibility}
          setPlantModalVisibility={setPlantModalVisibility}
        />
      </Modal>
    );
  };

  return (
    <>
      <MapGL
        // eslint-disable-next-line
        style="mapbox://styles/mapbox/streets-v11"
        fitBounds={fitBounds}
        className="map"
        zoom={mapZoom}
        center={mapCenter}
      >
        {currentBore &&
            <Popup offset={[0, -10]} coordinates={[currentBoreLong, currentBoreLat]}>
              <div style={{ padding: '15px', borderRadius: '9px', backgroundColor: 'red' }}>
                <Typography variant="button" display="block" gutterBottom>
                  {currentBore} 
                </Typography>
                 <Typography variant="caption" display="block" gutterBottom>
                  Salinity:
                </Typography>
                <Typography variant="caption" display="block" gutterBottom>
                  Water Levels:
                </Typography>
                </div>
            </Popup>
        }
        <GeoJSONLayer
          key={'some_key'}
          id={'desalination_plants_source'}
          // data={`${GEOJSON_SERVER}/desalination_plants.geojson`}
          data={data ? data : `${GEOJSON_SERVER}/desalination_plants.geojson`}
          // data={`${GEOJSON_SERVER}/${data ? data : 'desalination_plants.geojson'}`}
        />
        <Layer
          id={'desalination_plants'}
          key={'desalination_plants'}
          sourceId={'desalination_plants_source'}
          layout={{
            'icon-allow-overlap': true,
            'icon-image': '{icon}',
            visibility: plantVisibility ? 'visible' : 'none',
          }}
          onClick={onPlantClick}
          onMouseEnter={onEnterPlant} // make this change to pointy hand
          onMouseLeave={onLeavePlant}
        />

        {Object.keys(AQUIFERS).map(aquifer => (
          <GeoJSONLayer
            key={aquifer}
            data={`${GEOJSON_SERVER}/${AQUIFERS[aquifer].id}.geojson`}
            fillPaint={{
              'fill-color': AQUIFERS[aquifer].colour_fill,
              'fill-outline-color': AQUIFERS[aquifer].colour_outline,
            }}
            fillLayout={{
              visibility: aquiferVisibility ? 'visible' : 'none',
            }}
            sourceOptions={{
              tolerance: 1,
            }}
          />
        ))}

        {states.map(state => (
          <>
            <GeoJSONLayer
              key={state}
              id={`${state}_bores`}
              data={`${GEOJSON_SERVER}/${state}.geojson`}
              sourceOptions={{
                buffer: 0,
                cluster: true,
                clusterMaxZoom: 14,
                clusterRadius: 50,
                maxzoom: 12,
              }}
            />
            <Layer
              id={`${state}_unclustered-point`}
              key={`${state}_3`}
              sourceId={`${state}_bores`}
              filter={['all', ['!has', 'point_count']]}
              layout={{
                'icon-allow-overlap': true,
                'icon-image': '{icon}',
                visibility: boreVisibility ? 'visible' : 'none',
              }}
              onClick={onClickBore}
              onMouseEnter={onEnterBore}
              onMouseLeave={onLeaveBore}
            />

            <Layer
              key={`${state}_1`}
              id={`${state}_cluster`}
              sourceId={`${state}_bores`}
              filter={['all', ['has', 'point_count']]}
              paint={styles.clusterPaintProps}
              type="circle"
              layout={{ visibility: boreVisibility ? 'visible' : 'none' }}
            />

            <Layer
              key={`${state}_2`}
              id={`${state}_cluster-count`}
              sourceId={`${state}_bores`}
              filter={['all', ['has', 'point_count']]}
              layout={{
                'text-field': '{point_count_abbreviated}',
                'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
                'text-size': 12,
                visibility: boreVisibility ? 'visible' : 'none',
              }}
            />
          </>
        ))}
      </MapGL>
      {renderBoreModal()}
      {renderPlantModal()}
    </>
  );
}
