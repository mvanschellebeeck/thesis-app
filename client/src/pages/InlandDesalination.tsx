import React from 'react';
import FilterButtons from '../components/filterButtons';
import Map from '../components/map2';
import MapOptions from '../components/mapOptions';
import MapLegend from '../components/mapLegend';
import '../index.css';

export default class InlandDeslination extends React.Component {
  render() {
    return (
      <div className="inland">
        <Map />
        <MapOptions />
        <MapLegend />
        <FilterButtons />
      </div>
    );
  }
}
