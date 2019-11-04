import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab';

export default function CustomFilter() {
  const states = ['NSW', 'QLD', 'SA', 'NT', 'WA', 'VIC'];

  const tdsValues = {
    low: 'TDS < 1000',
    med: '1000 < TDS < 2000',
    high: 'TDS > 2000',
  };

  const allBoreTypes = ['NA', 'Domestic', 'Agriculture']

  const [regions, setRegions] = useState(['NSW']);
  const [boreTypes, setBoreTypes] = useState(['NA', 'Domestic'])

  const [tds, setTds] = useState('med');

  return (
    <Grid container style={{ marginTop: '2%' }}>
      <Grid container spacing={2} direction="column" alignItems="center">
        <Grid item>
          <ToggleButtonGroup
            aria-label="full width"
            value={regions}
            onChange={(e, newRegions) => setRegions(newRegions)}
          >
            {states.map(state => {
              return (
                <ToggleButton key={state} value={state}>
                  {state}
                </ToggleButton>
              );
            })}
          </ToggleButtonGroup>
        </Grid>
        <Grid item>
          <ToggleButtonGroup aria-label="full width" value={tds}>
            {Object.keys(tdsValues).map(key => {
              return (
                <ToggleButton key={key} value={key} onClick={() => setTds(key)}>
                  {tdsValues[key]}
                </ToggleButton>
              );
            })}
          </ToggleButtonGroup>
        </Grid>
        <Grid item>
          <ToggleButtonGroup
            aria-label="full width"
            value={boreTypes}
            onChange={(e, newBoreTypes) => { setBoreTypes(newBoreTypes)}}
          >
            {allBoreTypes.map(boreType => {
              return (
                <ToggleButton key={boreType} value={boreType}>
                  {boreType}
                </ToggleButton>
              );
            })}
          </ToggleButtonGroup>
        </Grid>
      </Grid>
    </Grid>
  );
}
