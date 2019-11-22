import React, {useState, createContext} from "react";
import Map from "../components/map";
import MapControls from "../components/mapControls";
import MapLegend from "../components/mapLegend";
import MapOptions from "../components/mapOptions";
import PlantCompute from "../components/plantCompute";
import "../components/map.css";
import {EMPTY_GEOJSON} from '../constants';

export const MapContext = createContext();

export default function Desalination() {
  const [aquiferVisibility, setAquiferVisibility] = useState(true);
  const [boreVisibility, setBoreVisibility] = useState(true);
  const [plantVisibility, setPlantVisibility] = useState(false);
  const [mapZoom, setMapZoom] = useState([0]);
  const [fitBounds, setFitBounds] = useState([
    [109.338953078, -45.6345972634],
    [158.569469029, -8.6681857235]
  ]);
  const [mapCenter, setMapCenter] = useState([133.7751, -25.2744]);
  const [states, setStates] = useState(["NSW"]);
  const [currentBoreProps, setCurrentBoreProps] = useState("");
  const [boreModalVisbility, setBoreModalVisibility] = useState(false);
  const [plantModalVisibility, setPlantModalVisibility] = useState(false);
  const [salinityFilter, setSalinityFilter] = useState(999999);
  const [selectorMode, setSelectorMode] = useState(false);
  const [selectedBores, setSelectedBores] = useState([]);
  const [populationVisibility, setPopulationVisibility] = useState(false);
  const [inlandPlant, setInlandPlant] = useState(null);
  const [computedPlantVisibility, setComputedPlantVisibility] = useState(false);
  const [computedPlant, setComputedPlant] = useState(EMPTY_GEOJSON);
  const [computedPlantModalVisibility, setComputedPlantModalVisibility] = useState(false);
  const [boreLines, setBoreLines] = useState(EMPTY_GEOJSON);

  return (
    <>
      <MapContext.Provider
        value={{
          mapZoom: mapZoom,
          fitBounds: fitBounds,
          aquiferVisibility: aquiferVisibility,
          boreVisibility: boreVisibility,
          plantVisibility: plantVisibility,
          mapCenter: mapCenter,
          states: states,
          currentBoreProps: currentBoreProps,
          setCurrentBoreProps: setCurrentBoreProps,
          boreModalVisibility: boreModalVisbility,
          plantModalVisibility: plantModalVisibility,
          setBoreModalVisibility: setBoreModalVisibility,
          setPlantModalVisibility: setPlantModalVisibility,
          salinityFilter: salinityFilter,
          setAquiferVisibility: setAquiferVisibility,
          setBoreVisibility: setBoreVisibility,
          setPlantVisibility: setPlantVisibility,
          setMapZoom: setMapZoom,
          setFitBounds: setFitBounds,
          setMapCenter: setMapCenter,
          setSalinityFilter: setSalinityFilter,
          setStates: setStates,
          selectorMode: selectorMode,
          setSelectorMode: setSelectorMode,
          selectedBores: selectedBores,
          setSelectedBores: setSelectedBores,
          populationVisibility: populationVisibility,
          setPopulationVisibility: setPopulationVisibility,
          computedPlant: computedPlant,
          setComputedPlant: setComputedPlant,
          computedPlantVisibility: computedPlantVisibility,
          setComputedPlantVisibility: setComputedPlantVisibility,
          computedPlantModalVisibility: computedPlantModalVisibility,
          setComputedPlantModalVisibility: setComputedPlantModalVisibility,
          boreLines: boreLines,
          setBoreLines: setBoreLines
        }}
      >
        <div className="inland">
          <Map />
          <MapOptions />
          <MapControls />
          <MapLegend />
          <PlantCompute />
        </div>
      </MapContext.Provider>
    </>
  );
}
