import React, {useContext} from 'react';
import Fab from '@material-ui/core/Fab';
import {makeStyles} from '@material-ui/core/styles';
import NavigationIcon from '@material-ui/icons/Navigation';
import './map.css';
import {MapContext} from '../pages/Desalination';
import ExploreIcon from '@material-ui/icons/Explore';

const useStyles = makeStyles(theme => ({
  fab: {
    margin: theme.spacing(1),
    zIndex: 1
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));

export default function MapControls() {
  const {setMapCenter, setMapZoom, setFitBounds, selectorMode, setSelectorMode} = useContext(MapContext);
  const classes = useStyles();
  const defaultCenter = [133.7751, -25.2744];
  const defaultFitBounds = [
    [109.338953078, -45.6345972634],
    [158.569469029, -8.6681857235],
  ];
  const defaultZoom = [3];


  const resetMapClick = () => {
    setMapZoom(defaultZoom);
    setMapCenter(defaultCenter);
    setFitBounds(defaultFitBounds);
  }

  const selectorClick = () => {
    setSelectorMode(!selectorMode);
  }

  const computeClick = () => {
    console.log('compute!');
  }

  return (
    <div id="map_controls_top" >
      <Fab variant="extended" size="medium" aria-label="like" className={classes.fab} onClick={resetMapClick}>
        <ExploreIcon className={classes.extendedIcon} />
        Reset Map
      </Fab>
      <Fab variant="extended" size="medium" aria-label="like" className={classes.fab} onClick={selectorClick}>
        <NavigationIcon className={classes.extendedIcon} />
        Selector
      </Fab>
      <Fab variant="extended" size="medium" aria-label="like" className={classes.fab} onClick={computeClick}>
        <NavigationIcon className={classes.extendedIcon} />
        Compute
      </Fab>
    </div>
  );
}
