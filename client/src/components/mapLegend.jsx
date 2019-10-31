import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Icon from '@material-ui/core/Icon';
import ListItemIcon from '@material-ui/core/ListItemIcon';

function CustomIcon(props) {
  return(<Icon>
    <img src="./icon-water-blue.svg" width="30" height="30"></img>
  </Icon>);
  // return (
  //   <SvgIcon {...props}>
  //     <path d="M102 0L103 1L104 0L105 1" />
  //   </SvgIcon>
  // );
}

export default function MapLegend() {
  const [state, setState] = React.useState({
    gilad: true,
    jason: false,
    antoine: true,
  });

  const aquifers = ['Murray Darling Basin', 'Great Artesian Basin', 'Some Other Aquifer'];

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
                    <CustomIcon />
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

