import React from 'react';
import Fab from '@material-ui/core/Fab';
import { makeStyles } from '@material-ui/core/styles';
import NavigationIcon from '@material-ui/icons/Navigation';
import '../map.css';

const useStyles = makeStyles(theme => ({
  fab: {
    margin: theme.spacing(1),
    zIndex: 1
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));

export default function MapControls({ setMapZoom, setMapCenter, setFitBounds }) {
  const classes = useStyles();
  const defaultCenter = [133.7751, -25.2744];
  const defaultFitBounds = [
    [109.338953078, -45.6345972634],
    [158.569469029, -8.6681857235],
  ];
  const defaultZoom = [3];


  const handleClick = () => {
    setMapZoom(defaultZoom);
    setMapCenter(defaultCenter);
    setFitBounds(defaultFitBounds);
  }

  return (
    <div id="map_controls" >
      <Fab variant="extended" size="medium" aria-label="like" className={classes.fab} onClick={handleClick}>
        <NavigationIcon className={classes.extendedIcon} />
        Reset Map
      </Fab>
    </div>
  );
}
