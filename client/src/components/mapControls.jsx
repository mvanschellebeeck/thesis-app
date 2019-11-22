import React, {useContext, useState} from 'react';
import Fab from '@material-ui/core/Fab';
import {makeStyles} from '@material-ui/core/styles';
import NavigationIcon from '@material-ui/icons/Navigation';
import './map.css';
import {MapContext} from '../pages/Desalination';
import ExploreIcon from '@material-ui/icons/Explore';
import {EMPTY_GEOJSON} from '../constants';

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
  const classes = useStyles();

  const {setMapCenter, setMapZoom, setFitBounds, selectorMode, setSelectorMode, setSelectedBores, setComputedPlant} = useContext(MapContext);
  const defaultCenter = [133.7751, -25.2744];
  const defaultZoom = [3.5];
  const defaultFitBounds = [
    [109.338953078, -45.6345972634],
    [158.569469029, -8.6681857235],
  ];
  const [selectorButton, setSelectorButton] = useState(false);


  const resetMapClick = () => {
    setMapZoom(defaultZoom);
    setMapCenter(defaultCenter);
    setFitBounds(defaultFitBounds);
  }

  const selectorClick = () => {
    setSelectorMode(!selectorMode);
    setSelectorButton(!selectorButton);
    setSelectedBores([]);
    setComputedPlant(EMPTY_GEOJSON);
  }

  return (
    <div id="map_controls_top" >
      <Fab variant="extended" size="medium" aria-label="like" className={classes.fab} onClick={resetMapClick}>
        <ExploreIcon />
        Reset Map
      </Fab>
      <Fab variant="extended" size="medium" aria-label="like" className={classes.fab} onClick={selectorClick} color={selectorButton ? "primary" : "default"}>
        <NavigationIcon />
        Bore Selector
      </Fab>
    </div>
  );
}
