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
  },
  formLabel: {
    marginBottom: 0,
  },
};

function FormLabel({name, defaultChecked, setAquiferVisibility, setBoreVisibility, setPlantVisibility, setPopulationVisibility}) {
  const [checked, setChecked] = useState(defaultChecked);

  function handleChecked() {
    if (name === 'Aquifers') {
      setAquiferVisibility(!checked);
    } else if (name === 'Bores') {
      setBoreVisibility(!checked);
    } else if (name === 'Coastal Plants') {
      setPlantVisibility(!checked);
    } else if (name == 'Population Demographics') {
      setPopulationVisibility(!checked);
    }
    setChecked(!checked);
  }

  return (
    <FormControlLabel
      control={
        <Switch
          checked={checked}
          onChange={() => handleChecked()}
          value={name}
        />
      }
      label={<Typography style={styles.form}>{name}</Typography>}
      style={styles.formLabel}
    />
  );
}

export default function MapOptions() {
  const options = ['Aquifers', 'Bores', 'Coastal Plants', 'Population Demographics'];
  const {setAquiferVisibility, setBoreVisibility, setPlantVisibility, setPopulationVisibility} = useContext(MapContext);
  return (
    <div id="map_options" style={styles.map}>
      <FormControl component="fieldset" style={styles.form}>
        <FormGroup>
          {options.map(option => (
            <FormLabel
              key={option}
              name={option}
              defaultChecked={option !== 'Coastal Plants' && option != 'Population Demographics'}
              setAquiferVisibility={setAquiferVisibility}
              setBoreVisibility={setBoreVisibility}
              setPlantVisibility={setPlantVisibility}
              setPopulationVisibility={setPopulationVisibility}
            />
          ))}
        </FormGroup>
      </FormControl>
    </div>
  );
}
