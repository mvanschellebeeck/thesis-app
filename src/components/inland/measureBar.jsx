import React, {useContext, useState} from 'react';
import ProgressBar from 'react-bootstrap/ProgressBar'

import {
  Typography,
} from '@material-ui/core';


export default function MeasureBar({salinity, unit}) {



  const salinityScaler = (salinity) => {
    const old_range = 7000 - 0;
    const new_range = 100 - 0;
    return (salinity * new_range) / old_range;
  }

  const getColor = (salinity) => {
    if (salinity <= 700) {
      return 'info';
    } else if (salinity <= 3000) {
      return 'success';
    } else if (salinity <= 6000) {
      return 'warning';
    } else return 'danger';
  }

  return (
    <ProgressBar
      now={salinityScaler(salinity)}
      animated
      variant={getColor(salinity)}
      label={<Typography style={{fontSize: 9, color: 'black', marginLeft: '5px'}}>{salinity + unit}</Typography>}
      style={{marginTop: 5, marginBottom: 5}}
    />
  )
}
