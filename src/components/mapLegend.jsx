import React, {useContext} from 'react';
import {Typography, Grid, List, ListItem, ListItemText, Icon, ListItemIcon} from '@material-ui/core';
import {AQUIFERS} from '../constants';
import './map.css';
import {MapContext} from '../pages/Desalination';

function AquiferIcon(props) {
  const {fill, outline} = props;
  return (
    <Icon>
      <svg version="1.1" width="30" height="20" viewBox="0 0 16 9">
        <rect x="0" y="2" width="8" height="4" fill={fill} stroke={outline} strokeWidth="0.3" rx="1" ry="1" />
      </svg>
    </Icon>
  );
}

function AquiferText({fontSize, text}) {
  return <Typography style={{fontSize: fontSize}}>{text}</Typography>;
}

const styles = {
  listItem: {
    marginBottom: 0,
    paddingBottom: 4,
    pddingTop: 4
  },
  listItemIcon: {
    minWidth: 0,
    marginRight: 5
  }
}

export default function MapLegend() {
  const aquifers = Object.keys(AQUIFERS);
  const {aquiferVisibility} = useContext(MapContext);

  const mapStyle = {
    marginRight: 9,
    marginTop: 9,
    display: aquiferVisibility ? 'block' : 'none'
  }

  return (
    <div id="map_legend" style={mapStyle}>
      <Grid container spacing={2}>
        <Grid item>
          <div>
            <List>
              {aquifers.map(aquifer =>
                <ListItem key={aquifer} style={styles.listItem}>
                  <ListItemIcon style={styles.listItemIcon}>
                    <AquiferIcon fill={AQUIFERS[aquifer].colour_fill} outline={AQUIFERS[aquifer].colour_outline} />
                  </ListItemIcon>
                  <ListItemText primary={<AquiferText fontSize={12} text={aquifer} />} />
                </ListItem>)}
            </List>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

