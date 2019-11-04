import { Fade } from '@material-ui/core';
import React, { Fragment, useState } from 'react';
import ReactMapboxGl, { GeoJSONLayer, Layer, Popup } from 'react-mapbox-gl';
import { AQUIFERS } from '../constants';
import '../map.css';
import StickyHeadtable from './table';

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

export default function Map(props: any) {
  const defaultCenter = [133.7751, -25.2744]; // long-lat
  const {
    aquiferVisibility,
    boreVisibility,
    mapZoom,
    fitBounds,
    mapCenter,
  } = props;
  const [drawer, toggleDrawer] = useState(false);
  const [currentBore, setCurrentBore] = useState('');
  const [currentBoreLong, setCurrentBoreLong] = useState(defaultCenter[0]);
  const [currentBoreLat, setCurrentBoreLat] = useState(defaultCenter[1]);
  // const states = ['NSW', 'NT', 'QLD', 'SA', 'TAS', 'VIC', 'WA'];
  const states = ['NSW'];

  const onBoreHover = (evt: any) => {
    console.log(evt);
  };
  const onClickBore = (evt: any) => {
    evt.preventDefault();
    const coordinates = evt.features[0].geometry.coordinates.slice();
    const { id } = evt.features[0].properties;
    setCurrentBore(id);
    setCurrentBoreLong(coordinates[0]);
    setCurrentBoreLat(coordinates[1]);
    toggleDrawer(!drawer);
  };

  const renderPopup = () => {
    if (currentBore !== '') {
      return (
        <Popup coordinates={[currentBoreLong, currentBoreLat]}>
          <h1>{currentBore}</h1>
        </Popup>
      );
    }
    return '';
  };

  const renderTable = () => {
    return (
      <Fade in={drawer} timeout={1000}>
        <div id="bore_table">
          <StickyHeadtable bore={currentBore} />
        </div>
      </Fade>
    );
  };

  return (
    <Fragment>
      <MapGL
        style="mapbox://styles/mapbox/streets-v11"
        fitBounds={fitBounds as [[number, number], [number, number]]}
        className="map"
        zoom={mapZoom}
        center={mapCenter}
      >
        {renderPopup()} {}
        <Fragment>
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
            <Fragment>
              <GeoJSONLayer
                key={state}
                id={`${state}_bores`}
                data={`${GEOJSON_SERVER}/${state}_simple.geojson`}
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
                filter={['has', 'point_count']}
                paint={styles.clusterPaintProps}
                type="circle"
                layout={{ visibility: boreVisibility ? 'visible' : 'none' }}
              />
              <Layer
                key={`${state}_2`}
                id={`${state}_cluster-count`}
                sourceId={`${state}_bores`}
                filter={['has', 'point_count']}
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
                filter={['!', ['has', 'point_count']]}
                layout={{
                  'icon-allow-overlap': true,
                  'icon-image': '{icon}',
                  visibility: boreVisibility ? 'visible' : 'none',
                }}
                onClick={onClickBore}
                // onMouseEnter={onBoreHover} make this change to pointy hand
              />
            </Fragment>
          ))}
        </Fragment>
      </MapGL>
      {renderTable()}
    </Fragment>
  );
}
