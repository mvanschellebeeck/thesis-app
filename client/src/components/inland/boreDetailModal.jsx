import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
} from '@material-ui/core';
import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
import '../map.css';
import { BoreModalDetailContext } from '../map';

const useStyles = makeStyles({
  root: {
    // width: '30vw',
    height: '60vh',
  },
  tableWrapper: {
    maxHeight: '60vh',
    overflow: 'auto',
  },
  card: {
    margin: 'auto',
    marginTop: '5%',
    width: '50vw',
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  header: {
    color: 'gray',
    margin: 10,
  },
});

function cleanKey(key) {
  const names = {
    bore_depth: 'Bore Depth',
    drilled_date: 'Drilled Date',
    land_elevation: 'Land Elevation',
    last_level_measurement: 'Last Level Measurement',
    last_salinity_measurement: 'Last Salinity Measurement',
    level: 'Level',
    obs_point_datum: 'Obs Point Datum',
    salinity: 'Salinity',
    salinity_uom: 'Salinity unit',
    type_of_use: 'Type of Use',
  };
  return names[key];
}

export default function BoreTable() {

  const classes = useStyles();
  const columns = ['key', 'value'];

  const { currentBoreProps, 
          setBoreModalVisibility, 
          setShowPopup } = useContext(BoreModalDetailContext);

  return (
        <Card className={classes.card}>
          <CardContent>
            <Typography className={classes.header}>
              {currentBoreProps.id}
            </Typography>
            <Paper className={classes.root}>
              <div className={classes.tableWrapper}>
                {
                  <Table aria-label="bore detail table">
                    <TableBody>
                      {Object.keys(currentBoreProps).map((row, index) => {
                        return (
                          row !== 'icon' &&
                          row !== 'id' && (
                            <TableRow
                              hover
                              tabIndex={-1}
                              key={`row-${row}-${index}`}
                            >
                              {columns.map(column => (
                                <TableCell key={`cell-${row}-${index}`}>
                                  {' '}
                                  {column === 'key'
                                    ? cleanKey(row)
                                    : currentBoreProps[row]}
                                </TableCell>
                              ))}
                            </TableRow>
                          )
                        );
                      })}
                    </TableBody>
                  </Table>
                }
              </div>
            </Paper>
          </CardContent>
          <CardActions>
            <Button
              startIcon={<CloseIcon />}
              variant="contained"
              color="secondary"
              style={{ margin: 'auto' }}
              size="medium"
              onClick={() => {
                setBoreModalVisibility(false);
                setShowPopup(false);
              }}
            >
              Close
            </Button>
          </CardActions>
        </Card>
  );
}
