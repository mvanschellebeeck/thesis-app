import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Icon from '@material-ui/core/Icon';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import { AQUIFERS } from '../constants';

function CustomIcon(props) {
  const { fill, outline } = props;

  return(<Icon>
    <svg version="1.1" width="30" height="20" viewBox="0 0 16 9">
      <rect x="0" y="2" width="8" height="4" fill={fill} stroke={outline} stroke-width="0.3" rx="1" ry="1"/>
    </svg>
  </Icon>);
}

export default function MapLegend() {
  const [state, setState] = React.useState({
    gilad: true,
    jason: false,
    antoine: true,
  });


  const aquifers = Object.keys(AQUIFERS);

  const handleChange = name => event => {
    setState({ ...state, [name]: event.target.checked });
  };
  
  return (
    <div id="map_legend2" style={{marginRight: 9, marginTop: 9}}>
       <Grid container spacing={2}>
        <Grid item>
          <div>
            <List>
              {aquifers.map(aquifer => 
                  <ListItem key={aquifer}style={{ marginBottom: 0, paddingTop: 4, paddingBottom: 4}}>
                      <ListItemIcon style={{minWidth: 0, marginRight: 5}}>
                      <CustomIcon fill={AQUIFERS[aquifer].colour_fill} outline={AQUIFERS[aquifer].colour_outline}/>
                    </ListItemIcon>
                    <ListItemText primary={<Typography style={{fontSize: '14px'}}>{aquifer}</Typography>} />
                  </ListItem>)}
            </List>
          </div>
        </Grid>
        </Grid>
        </div>
  );
}

