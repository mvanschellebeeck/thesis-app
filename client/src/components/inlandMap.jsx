import React, { useState } from 'react';
import ReactMapboxGl, { GeoJSONLayer, Layer } from 'react-mapbox-gl';
import { AQUIFERS } from '../constants';
import '../map.css';
import BoreTable from './boreTable';
import PlantDetail from './plantDetail';
import Modal from '@material-ui/core/Modal';

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
                              setPlantModalVisibility, states }) {

  const [currentBore, setCurrentBore] = useState('');
  // const [filter, setFilter] = useState(['>', '1000', ['get', 'salinity']]);


  const onBoreHover = evt => {
    const { id } = evt.features[0].properties;
    setCurrentBore(id);
    setCurrentBoreProps(evt.features[0].properties);
    // showPopup(true);
  };

  const onPlantHover = evt => {
    const { id } = evt.features[0].properties;
  }

  const onPlantClick = evt => {
    evt.preventDefault();
    setPlantModalVisibility(true);
  }

  const onLeaveBore = evt => {
    evt.preventDefault();
  };

  const onClickBore = evt => {
    evt.preventDefault();
    setBoreModalVisibility(true);
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
        style="mapbox://styles/mapbox/streets-v11"
        fitBounds={fitBounds}
        className="map"
        zoom={mapZoom}
        center={mapCenter}
      >
        <GeoJSONLayer
          key={'some_key'}
          id={'desalination_plants_source'}
          data={`${GEOJSON_SERVER}/desalination_plants.geojson`}
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
          onMouseEnter={onPlantHover} // make this change to pointy hand
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
              onMouseLeave={onLeaveBore}
              onMouseEnter={onBoreHover} // make this change to pointy hand
            />
          </>
        ))}
      </MapGL>
      {renderBoreModal()}
      {renderPlantModal()}
    </>
  );
}
