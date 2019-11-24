import React, { useState } from 'react';
import  { Popup as MapboxPopup } from 'react-mapbox-gl';
import './map.css';
import { Typography, Chip, Avatar } from '@material-ui/core';

export default function Popup({ long, lat, fields, id }) {
    return (
    <MapboxPopup offset={[0, -10]} coordinates={[long, lat]}>
        <div id="tooltip" style={{ padding: '15px', borderRadius: '9px' }}>
            <Chip avatar={<Avatar>ID</Avatar>} label={id} color="primary" />
            <div style={{ marginTop: 10 }}>
                {fields.map(field => 
                    <Typography variant="caption" display="block" gutterBottom>
                        {field}
                    </Typography>
                )}
            </div>
        </div>
    </MapboxPopup>);
}