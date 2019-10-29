import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { withStyles} from '@material-ui/core/styles';
import { ToggleButton } from '@material-ui/lab';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';

const styles = theme => ({
  buttonPadding: {    
    padding: '10px'
  },
});


function GroupedButton() {
  const [region, setRegion] = useState('NSW');
  const [tds, setTds] = useState('med');

  return (
    // add a legend from https://docs.mapbox.com/mapbox-gl-js/example/updating-choropleth/
    <div>
    <Grid container>
        <Grid container spacing={1} direction="column" alignItems="center">
        <Grid item>
            <ToggleButtonGroup fullWidth aria-label="full width" value={region}>
              <ToggleButton value="NSW">NSW</ToggleButton>
              <ToggleButton value="QLD">QLD</ToggleButton>
              <ToggleButton value="SA">SA</ToggleButton>
              <ToggleButton value="NT">NT</ToggleButton>
              <ToggleButton value="WA">WA</ToggleButton>
              <ToggleButton value="VIC">VIC</ToggleButton>
            </ToggleButtonGroup>
          </Grid>
          <Grid item>
            <ToggleButtonGroup fullWidth aria-label="full width" value={tds}>
              <ToggleButton value="low">TDS &lt; 1000</ToggleButton>
              <ToggleButton value="med">1000 &lt; TDS &lt; 2000 </ToggleButton>
              <ToggleButton value="high">TDS &gt; 2000</ToggleButton>
            </ToggleButtonGroup>
          </Grid>
        </Grid>
    </Grid>
    </div>
  );
}

export default withStyles(styles)(GroupedButton);
