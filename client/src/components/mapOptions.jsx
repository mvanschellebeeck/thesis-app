import React , { useState } from 'react';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import { Typography } from '@material-ui/core';

const styles = {
  map: {
    marginLeft: 9,
    marginTop: 9
  },
  form: {
    margin: 10
  },
  formLabel: {
    marginBottom: 0
  }
}

function FormLabel(props) {
  const { name, defaultChecked, setAquiferVisibility, setBoreVisibility } = props;
  const [checked, setChecked] = useState(defaultChecked);

  function handleChecked(){
    if (name == 'Show Aquifers') {
      setAquiferVisibility(!checked);
    } else if (name == 'Show Bores') {
      setBoreVisibility(!checked);
    }
    setChecked(!checked);
  }
 
  return (
    <FormControlLabel 
      control={<Switch checked={checked} onChange={() => handleChecked() } value={name} />}  
      label={<Typography style={styles.form}>{name}</Typography>}
      style={styles.formLabel}
    />
  )
}

export default function MapOptions(props) {
  const { setAquiferVisibility, setBoreVisibility } = props;
  const options = ['Show Aquifers', 'Show Bores', 'Other Options'];
  
  return (
    <div id="map_options" style={styles.map}>
    <FormControl component="fieldset" style={styles.form} >
      <FormGroup>
        {options.map(option => 
          <FormLabel name={option} defaultChecked={true} setAquiferVisibility={setAquiferVisibility} setBoreVisibility={setBoreVisibility}/>
        )}
     </FormGroup>
    </FormControl>
    </div>
  );
}



