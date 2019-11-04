import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Fade, Paper, Table, TableBody, TableCell, TableRow } from '@material-ui/core';

const columns = [
  { id: 'name', label: 'Name' },
  { id: 'code', label: 'ISO\u00a0Code' },
];

function createData(name, code) {
  return { name, code };
}

const rows = [
  createData('India', 'IN'),//, 1324171354, 3287263),
  createData('China', 'CN'),// 1403500365, 9596961),
  createData('Italy', 'IT'),// 60483973, 301340),
];

const useStyles = makeStyles({
  root: {
    width: '80vh',
  },
  tableWrapper: {
    maxHeight: 440,
    overflow: 'auto',
  },
});

export default function StickyHeadTable(props) {
  const { bore } = props;
  const classes = useStyles();
  console.log(`bore is ${bore}`);

  return (
    <Paper className={classes.root}>
      <div className={classes.tableWrapper}>
        {<Table aria-label="bore detail table">
         <TableBody>
            {rows.map(row => {
              return (
                <TableRow hover tabIndex={-1} key={row.code}>
                  {columns.map(column => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                          {bore}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>}
      </div>
    </Paper>
  );
}