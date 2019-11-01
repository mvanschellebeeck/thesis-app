import React , { useState } from 'react';
import FilterButtons from '../components/filterButtons';
import Map from '../components/inlandMap';
import MapOptions from '../components/mapOptions';
import MapLegend from '../components/mapLegend';
import MapControls from '../components/mapControls';
import '../map.css';

export default function InlandDeslination() {

  const [aquiferVisibility, setAquiferVisibility] = useState(true);
  const [boreVisibility, setBoreVisibility] = useState(true);
  const [mapZoom, setMapZoom] = useState([0]);
  const [fitBounds, setFitBounds] = useState([[109.338953078, -45.6345972634], [158.569469029, -8.6681857235]]);
  const [mapCenter, setMapCenter] = useState([133.7751, -25.2744]);

  return (
    <div className="inland">
      <Map mapZoom={mapZoom} fitBounds={fitBounds} aquiferVisibility={aquiferVisibility} boreVisibility={boreVisibility}/>
      <MapOptions setAquiferVisibility={setAquiferVisibility} setBoreVisibility={setBoreVisibility}/>
      <MapControls setMapZoom={setMapZoom} setFitBounds={setFitBounds} setMapCenter={setMapCenter}/> 
      <MapLegend aquiferVisibility={aquiferVisibility}/>
      <FilterButtons />
    </div>
  );
}