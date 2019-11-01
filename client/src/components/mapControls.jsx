import React from 'react';
import '../map.css';
import Fab from '@material-ui/core/Fab';
import { makeStyles } from '@material-ui/core/styles';
import NavigationIcon from '@material-ui/icons/Navigation';

const useStyles = makeStyles(theme => ({
  fab: {
    margin: theme.spacing(1),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));

export default function MapControls(props) {
  const { setMapZoom, setFitBounds, setMapCenter } = props;
  const classes = useStyles();
  const defaultBounds = [[109.338953078, -45.6345972634], [158.569469029, -8.6681857235]];
  const defaultCenter = [133.7751, -25.2744];

  return (
    <div id="map_controls" >
      <Fab variant="extended" size="medium" aria-label="like" className={classes.fab} onClick={()=>{setMapZoom([3]);setMapCenter(defaultCenter); console.log('pressed')}}>
        <NavigationIcon className={classes.extendedIcon} />
       Reset Map 
      </Fab>
    </div>
  );
}
