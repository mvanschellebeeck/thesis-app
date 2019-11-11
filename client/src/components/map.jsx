import React, { useState, useContext } from 'react';
import ReactMapboxGl, { GeoJSONLayer, Layer } from 'react-mapbox-gl';
import { AQUIFERS } from '../constants';
import BoreTable from './inland/boreDetailModal';
import PlantDetail from './coastline/plantDetailModal';
import Modal from '@material-ui/core/Modal';
import './map.css';
import Popup from './popup';

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

export const PlantModalDetailContext = React.createContext();
export const BoreModalDetailContext = React.createContext();

export default function Map({
  aquiferVisibility,
  boreVisibility,
  plantVisibility,
  mapZoom,
  fitBounds,
  mapCenter,
  setCurrentBoreProps,
  currentBoreProps,
  boreModalVisibility,
  plantModalVisibility,
  setBoreModalVisibility,
  setPlantModalVisibility,
  states,
}) {
  const [currentBore, setCurrentBore] = useState(null);
  const [currentBoreLong, setCurrentBoreLong] = useState(null);
  const [currentBoreLat, setCurrentBoreLat] = useState(null);
  const [showBorePopup, setShowBorePopup] = useState(false);
  const [showPlantPopup, setShowPlantPopup] = useState(false);
  const [currentSalinity, setCurrentSalinity] = useState('');
  const [currentLevel, setCurrentLevel] = useState('');
  const [useType, setUseType] = useState('');
  const [currentPlant, setCurrentPlant] = useState(null);
  const [currentPlantLong, setCurrentPlantLong] = useState(null);
  const [currentPlantLat, setCurrentPlantLat] = useState(null);
  const [plantProperties, setPlantProperties] = useState(null);

  const onEnterBore = evt => {
    const { id } = evt.features[0].properties;
    const coordinates = evt.features[0].geometry.coordinates.slice();
    // for some reason setting state to an object would
    // break the mouseLeave ???
    setCurrentBore(id);
    setCurrentBoreLong(coordinates[0]);
    setCurrentBoreLat(coordinates[1]);
    setCurrentSalinity(
      evt.features[0].properties.salinity +
        ' ' +
        evt.features[0].properties.salinity_uom,
    );
    setCurrentLevel(evt.features[0].properties.level);
    setUseType(evt.features[0].properties.type_of_use);
    setShowBorePopup(true);
  };

  const onLeaveBore = evt => {
    setCurrentBore(null);
    setShowBorePopup(false);
  };

  const onEnterPlant = evt => {
    const { id } = evt.features[0].properties;
    const coordinates = evt.features[0].geometry.coordinates.slice();
    setCurrentPlant(id);
    setCurrentPlantLong(coordinates[0]);
    setCurrentPlantLat(coordinates[1]);
    setShowPlantPopup(true);
  };

  const onLeavePlant = evt => {
    setCurrentPlant(null);
    setShowPlantPopup(false);
    // const { id } = evt.features[0].properties;
    // console.log(`Left plant with id `);
  };

  const onPlantClick = evt => {
    evt.preventDefault();
    setPlantProperties(evt.features[0].properties);
    setPlantModalVisibility(true);
  };

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
        onClose={() => {
          setBoreModalVisibility(false);
          setShowBorePopup(false);
        }}
      >
        <BoreTable />
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
        <PlantDetail />
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
        {showBorePopup && (
          <Popup
            long={currentBoreLong}
            lat={currentBoreLat}
            id={currentBore}
            fields={[
              `Salinity: ${currentSalinity}`,
              `Bore Type: ${useType || '...'}`,
            ]}
          ></Popup>
        )}
        {showPlantPopup && (
          <Popup
            long={currentPlantLong}
            lat={currentPlantLat}
            id={currentPlant}
            fields={['property 1: blah blah', 'property 2: blah']}
          ></Popup>
        )}
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
              // data={data[state]}
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
      <PlantModalDetailContext.Provider
        value={{
          plantModalVisibility: plantModalVisibility,
          setPlantModalVisibility: setPlantModalVisibility,
          plantProperties: plantProperties
        }}
      >
        {renderPlantModal()}
      </PlantModalDetailContext.Provider>
      <BoreModalDetailContext.Provider
        value={{
          bore: currentBore,
          setBoreModalVisibility: setBoreModalVisibility,
          setShowPopup: setShowBorePopup,
          currentBoreProps: currentBoreProps,
        }}
      >
        {renderBoreModal()}
      </BoreModalDetailContext.Provider>
    </>
  );
}
