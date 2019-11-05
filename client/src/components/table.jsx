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
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import '../map.css';
import CloseIcon from '@material-ui/icons/Close';

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

export default function StickyHeadTable(props) {
  const classes = useStyles();
  const { currentBoreProps, setModalVisibility } = props;
  const columns = ['key', 'value'];
  const rows = Object.keys(currentBoreProps);

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
                  {rows.map((row, index) => {
                    return (
                      row !== 'icon' && (
                        <TableRow
                          hover
                          tabIndex={-1}
                          key={`row-${row}-${index}`}
                        >
                          {columns.map(column => (
                            <TableCell key={`cell-${row}-${index}`}>
                              {' '}
                              {column === 'key' ? row : currentBoreProps[row]}
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
          onClick={() => setModalVisibility(false)}
        >
          Close
        </Button>
      </CardActions>
    </Card>
  );
}
