import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import { withStyles} from '@material-ui/core/styles';
import { ToggleButton } from '@material-ui/lab';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';

export default function FilterButtons() {
  const states = ['NSW', 'QLD', 'SA', 'NT', 'WA', 'VIC'];
  const tdsValues = {
    'low': 'TDS < 1000',
    'med': '1000 < TDS < 2000',
    'high': 'TDS > 2000'
  }
  const [region, setRegion] = useState('NSW');
  const [tds, setTds] = useState('med');

  return (
    // add a legend from https://docs.mapbox.com/mapbox-gl-js/example/updating-choropleth/
    <div id="filter">
    <Grid container>
        <Grid container spacing={1} direction="column" alignItems="center">
        <Grid item>
            <ToggleButtonGroup aria-label="full width" value={region}>
              {states.map(state => {
                return <ToggleButton key={state} value={state} onClick={() => setRegion(state)}>{state}</ToggleButton>
              })}
            </ToggleButtonGroup>
          </Grid>
          <Grid item>
            <ToggleButtonGroup aria-label="full width" value={tds}>
              {Object.keys(tdsValues).map(key => {
                return <ToggleButton key={key} value={key} onClick={() => setTds(key)}>{tdsValues[key]}</ToggleButton>
              })}
            </ToggleButtonGroup>
          </Grid>
        </Grid>
    </Grid>
    </div>
  );
}
