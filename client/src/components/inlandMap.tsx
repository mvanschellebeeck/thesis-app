import React, { Fragment, useState } from 'react';
import '../map.css';
import { AQUIFERS } from '../constants';
import ReactMapboxGl, { Layer, GeoJSONLayer } from 'react-mapbox-gl';


const MapGL = ReactMapboxGl({
  accessToken: process.env.REACT_APP_MAPBOX_TOKEN || ''
});

export default function Map(props : any) {
  const { aquiferVisibility, boreVisibility } = props;

  const [fitBounds, setFitBounds] = useState([[109.338953078, -45.6345972634], [158.569469029, -8.6681857235]]);
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
      'circle-radius': [
        'step',
        ['get', 'point_count'],
        20,
        100,
        30,
        750,
        40,
      ],
    }
  }

  const states = ['NSW', 'NT', 'QLD', 'SA', 'TAS', 'VIC', 'WA'];
  //const states = ['NSW'];
  return (
   <MapGL
      style="mapbox://styles/mapbox/streets-v11"
      fitBounds={fitBounds as [[number, number], [number, number]]}
      className="map"
    >
      <Fragment>
        {Object.keys(AQUIFERS).map(aquifer =>
          <GeoJSONLayer
            key={aquifer}
            data={`./geojson/aquifers/${AQUIFERS[aquifer].id}.geojson`}
            fillPaint={{
              'fill-color': AQUIFERS[aquifer].colour_fill,
              'fill-outline-color': AQUIFERS[aquifer].colour_outline
            }} 
            fillLayout={{'visibility': aquiferVisibility ? 'visible' : 'none'}}
            />
        )}

        {states.map(state =>
          <Fragment>
            <GeoJSONLayer
              key={state}
              id={`${state}_bores`}
              data={`../geojson/bores/${state}_simple.geojson`}
              sourceOptions={{
                cluster: true,
                clusterMaxZoom: 14,
                clusterRadius: 50
              }}
            />
            <Layer
              key={`${state}_1`}
              id={`${state}_cluster`}
              sourceId={`${state}_bores`}
              filter={['has', 'point_count']}
              paint={styles.clusterPaintProps}
              type='circle'
              layout={{'visibility': boreVisibility ? 'visible' : 'none'}}
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
                'visibility': boreVisibility ? 'visible' : 'none'
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
                'visibility': boreVisibility ? 'visible' : 'none'
              }}
            />
          </Fragment>
        )}
      </Fragment>
    </MapGL>
  );
}


