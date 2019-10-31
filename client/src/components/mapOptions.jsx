import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import { Typography } from '@material-ui/core';

const x = {
  label: {
    fontSize: '12px',
  }
}


export default function MapOptions() {
  const [state, setState] = React.useState({
    gilad: true,
    jason: false,
    antoine: true,
  });

  const handleChange = name => event => {
    setState({ ...state, [name]: event.target.checked });
  };
  
  return (
    // add a legend from https://docs.mapbox.com/mapbox-gl-js/example/updating-choropleth/
    <div id="map_legend" style={{marginLeft: 9, marginTop: 9}}>
    <FormControl component="fieldset" style={{margin: 10}} >
      <FormGroup>
        <FormControlLabel
          control={<Switch checked={state.gilad} onChange={handleChange('gilad')} value="gilad" />}
          label={<Typography style={x.label}>Show Aquifers</Typography>}
          style={{marginBottom: 0}}
        />
        <FormControlLabel
          control={<Switch checked={state.jason} onChange={handleChange('jason')} value="jason" />}
          label={<Typography style={x.label}>Show Bores</Typography>}
          style={{marginBottom: 0}}
        />
        <FormControlLabel
          control={
            <Switch checked={state.antoine} onChange={handleChange('antoine')} value="antoine" />
          }
          label={<Typography style={x.label}>Other Option</Typography>}
          style={{marginBottom: 0}}
        />
      </FormGroup>
    </FormControl>
    </div>
  );
}



