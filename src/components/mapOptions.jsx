import React, {useState, useContext} from 'react';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import {Typography} from '@material-ui/core';
import {MapContext} from '../pages/Desalination';

const styles = {
  map: {
    marginLeft: 9,
    marginTop: 9,
  },
  form: {
    margin: 10,
    fontSize: 12
  },
  formLabel: {
    marginBottom: 0,
  },
};


export default function MapOptions() {
  const options = ['Aquifers', 'Bores', 'Coastal Plants', 'Population Density'];

  const {setAquiferVisibility, setBoreVisibility, setPlantVisibility, setPopulationVisibility,
    aquiferVisibility, boreVisibility, plantVisibility, populationVisibility} = useContext(MapContext);

  const setters = {
    'Aquifers': setAquiferVisibility,
    'Bores': setBoreVisibility,
    'Coastal Plants': setPlantVisibility,
    'Population Density': setPopulationVisibility
  }

  const getters = {
    'Aquifers': aquiferVisibility,
    'Bores': boreVisibility,
    'Coastal Plants': plantVisibility,
    'Population Density': populationVisibility
  }


  const handleChecked = (option) => {
    if (option === 'Aquifers') {
      setAquiferVisibility(!aquiferVisibility);
    } else if (option === 'Bores') {
      setBoreVisibility(!boreVisibility);
    } else if (option === 'Coastal Plants') {
      setPlantVisibility(!plantVisibility);
    } else if (option == 'Population Density') {
      setPopulationVisibility(!populationVisibility);
    }
  }

  return (
    <div id="map_options" style={styles.map}>
      <FormControl component="fieldset" style={styles.form}>
        <FormGroup>
          {options.map(option => (
            <FormControlLabel
              control={
                <Switch
                  checked={getters[option]}
                  onChange={() => handleChecked(option)}
                  value={option}
                />
              }
              label={<Typography style={styles.form}>{option}</Typography>}
              style={styles.formLabel}
            />))}
        </FormGroup>
      </FormControl>
    </div>
  );
}
