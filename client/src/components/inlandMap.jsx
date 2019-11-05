import React, { useState } from 'react';
import ReactMapboxGl, { GeoJSONLayer, Layer } from 'react-mapbox-gl';
import { AQUIFERS } from '../constants';
import '../map.css';
import StickyHeadtable from './table';
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

export default function Map(props) {
  const {
    aquiferVisibility,
    boreVisibility,
    plantVisibility,
    mapZoom,
    fitBounds,
    mapCenter,
    setCurrentBoreProps,
    currentBoreProps,
    modalVisibility,
    modalVisibility2,
    setModalVisibility,
    setModalVisibility2,
  } = props;
  const [currentBore, setCurrentBore] = useState('');
  // const [currentBoreLong, setCurrentBoreLong] = useState(defaultCenter[0]);
  // const [currentBoreLat, setCurrentBoreLat] = useState(defaultCenter[1]);
  const [filter, setFilter] = useState(['>', '1000', ['get', 'salinity']]);

  const { states } = props;

  const onBoreHover = evt => {
    const { id } = evt.features[0].properties;
    setCurrentBore(id);
    setCurrentBoreProps(evt.features[0].properties);
    // showPopup(true);
    console.log('mouse enter');
  };

  const onPlantHover = evt => {
    const { id } = evt.features[0].properties;
    console.log(id);
  }

  const onPlantClick = evt => {
    evt.preventDefault();
    console.log(evt);
    setModalVisibility2(true);
  }

  const onLeaveBore = evt => {
    evt.preventDefault();
    console.log('mouse leave');
  };

  const onClickBore = evt => {
    evt.preventDefault();
    setModalVisibility(true);
  };

  const renderTable = () => {
    return (
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={modalVisibility}
        onClose={() => setModalVisibility(false)}
      >
        <StickyHeadtable
          bore={currentBore}
          currentBoreProps={currentBoreProps}
          setModalVisibility={setModalVisibility}
        />
      </Modal>
    );
  };

  const renderTable2 = () => {
    return (
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={modalVisibility2}
        onClose={() => setModalVisibility2(false)}
      >
        <PlantDetail
          modalVisibility2={modalVisibility2}
          setModalVisibility2={setModalVisibility2}
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
      {renderTable()}
      {renderTable2()}
    </>
  );
}
