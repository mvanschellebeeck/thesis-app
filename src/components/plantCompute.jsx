import React, {useContext} from 'react';
import {Typography, Grid} from '@material-ui/core';
import './map.css';
import {MapContext} from '../pages/Desalination';
import ClearAllIcon from '@material-ui/icons/ClearAll';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import * as turf from '@turf/turf'
import {EMPTY_GEOJSON} from '../constants';


const styles = {
  listItem: {
    marginBottom: 0,
    paddingBottom: 4,
    pddingTop: 4
  },
  listItemIcon: {
    minWidth: 0,
    marginRight: 5
  },
  clearIcon: {
    paddingRight: 7
  },
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
}



function Text({fontSize, text}) {
  return <Typography style={{fontSize: fontSize}}>{text}</Typography>;
}

function Header({icon, title, bottomPadding, onClick}) {
  return (
    <div style={{padding: 10}} >
      <Button
        variant="outlined"
        color="default"
        size="small"
        className={styles.button}
        startIcon={icon}
        onClick={onClick}
      > {title} </Button>
    </div>
  )
}


export default function PlantCompute() {
  const {selectedBores, setSelectedBores, setMapCenter, setComputedPlantVisibility, setComputedPlant, setBoreLines} = useContext(MapContext);

  const removeBore = (bore) => {
    const newBores = selectedBores.filter(x => x.id != bore);
    setSelectedBores(newBores);
  }

  const clearAllBores = () => {
    setSelectedBores([]);
    setComputedPlant(EMPTY_GEOJSON);
    setComputedPlantVisibility(false);
  }

  const computeBores = () => {
    if (selectedBores.length == 0) return;
    const features = turf.featureCollection(selectedBores.map(bore => turf.point([bore.lng, bore.lat])));
    const centre = turf.center(features).geometry.coordinates;
    setMapCenter(centre);
    const centre_geojson = {
      "type": "FeatureCollection",
      "features": [{
        "type": "Feature",
        "geometry": {
          "type": "Point",
          "coordinates": centre
        }
      }]
    };

    setComputedPlant(centre_geojson);

    const multiLine = selectedBores.map(bore => [centre, [bore.lng, bore.lat]]);
    const multi = turf.multiLineString(multiLine);

    const formattedMulti = {
      "type": "FeatureCollection",
      "features": [
        multi
      ]
    };
    //console.log(JSON.stringify(formattedMulti));
    setBoreLines(formattedMulti);
    setComputedPlantVisibility(true);
  }

  return (
    <div id="plant_compute">
      <Header icon={<ClearAllIcon />} title="Clear All" onClick={clearAllBores} />
      {((selectedBores.length != 0) && <Grid container spacing={2}>
        <Grid item>
          <div style={{display: 'flex', flexDirection: 'column', padding: 7}}>
            {selectedBores.map(bore =>
              <div style={{paddingBottom: 7}}>
                <Chip
                  label={bore.id}
                  variant="outlined"
                  onClick={() => removeBore(bore.id)} // make this show details?
                  onDelete={() => removeBore(bore.id)}
                />
              </div>)}
          </div>
        </Grid>
      </Grid>)}
      <Header icon={<ArrowForwardIcon />} title="Compute" onClick={computeBores} />
    </div>
  )
}
