import React , { useState } from 'react';
import FilterButtons from '../components/filterButtons';
import Map from '../components/inlandMap';
import MapOptions from '../components/mapOptions';
import MapLegend from '../components/mapLegend';
import '../index.css';

export default function InlandDeslination() {

  const [aquiferVisibility, setAquiferVisibility] = useState(true);

  return (
    <div className="inland">
      <Map aquiferVisibility={aquiferVisibility}/>
      <MapOptions setAquiferVisibility={setAquiferVisibility}/>
      <MapLegend aquiferVisibility={aquiferVisibility}/>
      <FilterButtons />
    </div>
  );
}