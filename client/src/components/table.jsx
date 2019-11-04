import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Table, TableBody, TableCell, TableRow } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    width: '30vw',
  },
  tableWrapper: {
    maxHeight: '30vh',
    overflow: 'auto',
  },
});

export default function StickyHeadTable(props) {
  const { currentBoreProps } = props;
  const classes = useStyles();
  const columns = ['key', 'value'];
  const rows = Object.keys(currentBoreProps);

  return (
    <Paper className={classes.root}>
      <div className={classes.tableWrapper}>
        {<Table aria-label="bore detail table">
         <TableBody>
            {rows.map(row => {
              return (
                row !== 'icon' && <TableRow hover tabIndex={-1} key={`row-${row}`}>
                  {columns.map(column => 
                      <TableCell key={`cell-${row}`}> {column === 'key' ? row : currentBoreProps[row]}</TableCell>
                  )}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>}
      </div>
    </Paper>
  );
}