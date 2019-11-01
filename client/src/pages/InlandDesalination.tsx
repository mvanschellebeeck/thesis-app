import React from 'react';
import FilterButtons from '../components/filterButtons';
import Map from '../components/inlandMap';
import MapOptions from '../components/mapOptions';
import MapLegend from '../components/mapLegend';
import '../index.css';

export default function InlandDeslination() {
  return (
    <div className="inland">
      <Map />
      <MapOptions />
      <MapLegend />
      <FilterButtons />
    </div>
  );
}