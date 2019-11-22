import React, {useState} from 'react';
import Grid from '@material-ui/core/Grid';
import {ToggleButton, ToggleButtonGroup} from '@material-ui/lab';
import '../map.css';

export default function CustomFilter({states, setStates}) {
  const allStates = ['NSW', 'QLD', 'SA', 'NT', 'WA', 'VIC', 'TAS'];
  //const allBoreTypes = ['NA', 'Stock & Domestic', 'Agriculture', '...'];//, 'Agriculture', 'Water Supply', 'Monitoring', 'Irrigation', 'Exploration'];
  const [boreTypes, setBoreTypes] = useState(['NA', 'Domestic'])

  return (
    <div>
      <Grid container style={{marginTop: '2%'}}>
        <Grid container spacing={2} direction="column" alignItems="center">
          <Grid item>
            <ToggleButtonGroup
              aria-label="full width"
              value={states}
              onChange={(e, newStates) => setStates(newStates)}
              size='medium'
              className="tester"
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
        </Grid>
      </Grid>
    </div>
  );
}
