import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Card, CardContent, CardActions, Button } from '@material-ui/core';

import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
  card: {
    margin: 'auto',
    marginTop: '5%',
    width: '70vw',
  },
}));

export default function PlantDetail(props) {
  const { modalVisibility2, setModalVisibility2 } = props;
  return modalVisibility2 ? <BasicTextFields setModalVisibility2={setModalVisibility2} /> : <></>;
}

function BasicTextFields(props) {
  const classes = useStyles();
  const { setModalVisibility2 } = props;
  return (
    <Card className={classes.card}>
      <CardContent>
        <form className={classes.container} noValidate autoComplete="off">
          <div>
            <TextField
              id="standard-basic"
              className={classes.textField}
              label="Standard"
              margin="normal"
            />
          </div>
          <div>
            <TextField
              id="filled-basic"
              className={classes.textField}
              label="Filled"
              margin="normal"
              variant="filled"
            />
          </div>
          <div>
            <TextField
              id="outlined-basic"
              className={classes.textField}
              label="Outlined"
              margin="normal"
              variant="outlined"
            />
          </div>
        </form>
      </CardContent>
      <CardActions>
        <Button
          startIcon={<CloseIcon />}
          variant="contained"
          color="secondary"
          style={{ margin: 'auto' }}
          size="medium"
          onClick={() => setModalVisibility2(false)}
        >
          Close
        </Button>
      </CardActions>
    </Card>
  );
}
