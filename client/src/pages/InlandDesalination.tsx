import React , { useState } from 'react';
import FilterButtons from '../components/filterButtons';
import Map from '../components/inlandMap';
import MapOptions from '../components/mapOptions';
import MapLegend from '../components/mapLegend';
import '../map.css';

export default function InlandDeslination() {

  const [aquiferVisibility, setAquiferVisibility] = useState(true);
  const [boreVisibility, setBoreVisibility] = useState(true);

  return (
    <div className="inland">
      <Map aquiferVisibility={aquiferVisibility} boreVisibility={boreVisibility}/>
      <MapOptions setAquiferVisibility={setAquiferVisibility} setBoreVisibility={setBoreVisibility}/>
      <MapLegend aquiferVisibility={aquiferVisibility}/>
      <FilterButtons />
    </div>
  );
}