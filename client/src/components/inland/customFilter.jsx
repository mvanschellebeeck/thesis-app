import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab';

export default function CustomFilter({ states, setStates }) {
  const allStates = ['NSW', 'QLD', 'SA', 'NT', 'WA', 'VIC', 'TAS'];
  const allBoreTypes = ['NA', 'Stock & Domestic', 'Agriculture', '...'];//, 'Agriculture', 'Water Supply', 'Monitoring', 'Irrigation', 'Exploration'];
  const [boreTypes, setBoreTypes] = useState(['NA', 'Domestic'])

  return (
    <Grid container style={{ marginTop: '2%' }}>
      <Grid container spacing={2} direction="column" alignItems="center">
        <Grid item>
          <ToggleButtonGroup
            aria-label="full width"
            value={states}
            onChange={(e, newStates) => setStates(newStates)}
          >
            {allStates.map(state => {
              return (
                <ToggleButton key={state} value={state}>
                  {state}
                </ToggleButton>
              );
            })}
          </ToggleButtonGroup>
        </Grid>
        <Grid item>
          <ToggleButtonGroup
            size="small"
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
