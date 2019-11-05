import React, { useState } from 'react';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import { Typography } from '@material-ui/core';

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

function FormLabel(props) {
  const {
    name,
    defaultChecked,
    setAquiferVisibility,
    setBoreVisibility,
    setPlantVisibility
  } = props;
  const [checked, setChecked] = useState(defaultChecked);

  function handleChecked() {
    if (name === 'Show Aquifers') {
      setAquiferVisibility(!checked);
    } else if (name === 'Show Bores') {
      setBoreVisibility(!checked);
    } else if (name === 'Show Coastal Plants') {
      setPlantVisibility(!checked);
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

export default function MapOptions(props) {
  const { setAquiferVisibility, setBoreVisibility, setPlantVisibility } = props;
  const options = ['Show Aquifers', 'Show Bores', 'Show Coastal Plants'];

  return (
    <div id="map_options" style={styles.map}>
      <FormControl component="fieldset" style={styles.form}>
        <FormGroup>
          {options.map(option => (
            <FormLabel
              key={option}
              name={option}
              defaultChecked={option !== 'Show Coastal Plants'}
              setAquiferVisibility={setAquiferVisibility}
              setBoreVisibility={setBoreVisibility}
              setPlantVisibility={setPlantVisibility}
            />
          ))}
        </FormGroup>
      </FormControl>
    </div>
  );
}
