import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import {
  Card,
  CardContent,
  CardActions,
  Button,
  Typography,
  Slider,
} from '@material-ui/core';
import NumberFormat from 'react-number-format';
import CloseIcon from '@material-ui/icons/Close';
import PlantChart from './plantChart';
import '../plantModal.css';


const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  card: {
    margin: 'auto',
    marginTop: 5,
    width: '70vw',
  },
  formControl: {
    margin: theme.spacing(0.5),
    width: 300,
  },
}));

export default function PlantDetail({ plantModalVisibility, setPlantModalVisibility }) {
  const classes = useStyles();
  const [cost, setCost] = useState(null);
  const [energy, setEnergy] = useState(null);
  const [feasibility, setFeasibility] = useState(1.03);

  return (
    plantModalVisibility && <Card className={classes.card}>
      <CardContent>
        <div id="plant_modal">
          <InputFields setCost={setCost} setEnergy={setEnergy} cost={cost} energy={energy} />
          <PlantChart title="Operational Costs" width={300} height={300} />
          <Feasibility feasibility={feasibility} />
        </div>
      </CardContent>
      <Close setPlantModalVisibility={setPlantModalVisibility} />
    </Card>
  );
}



function NumberFormatCustom({ inputRef, onChange, ...other }) {
  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={values => {
        onChange({
          target: {
            value: values.value,
          },
        });
      }}
      thousandSeparator
      isNumericString
    />
  );
}

function Close({ setPlantModalVisibility }) {
  return <CardActions>
    <Button
      startIcon={<CloseIcon />}
      variant="contained"
      color="secondary"
      style={{ margin: 'auto' }}
      size="medium"
      onClick={() => setPlantModalVisibility(false)}
    >
      Close
  </Button>
  </CardActions>
}

function Feasibility({ feasibility }) {
  return <div id="feasability">
    <Typography style={{ fontSize: '14px', color: 'gray', margin: 'auto' }}>Feasibility Index</Typography>
    <Typography style={{ fontSize: '46px', color: feasibility > 1 ? 'green' : 'red', fontWeight: 'bold' }}>
      {feasibility}
    </Typography>
  </div>
}

function InputFields({ setCost, setEnergy, cost, energy }) {
  const classes = useStyles();
  return <div id="fields">
    <Typography id="discrete-slider-always" gutterBottom>
      Water Supply
            </Typography>
    <div>
      <Slider
        defaultValue={30}
        getAriaValueText={value => `${value}%`}
        aria-labelledby="discrete-slider"
        valueLabelDisplay="on"
        step={1}
        min={0}
        max={100}
        valueLabelFormat={value => `${value}%`}
        className={classes.formControl}
      />
    </div>
    <div>
      <TextField
        className={classes.formControl}
        label="Capital Cost"
        value={cost}
        onChange={e => setCost(e.target.value)}
        id="cost"
        InputProps={{
          inputComponent: NumberFormatCustom,
        }}
        inputProps={{ prefix: '$' }}
      />
    </div>
    <div>
      <TextField
        className={classes.formControl}
        label="SWRO Unit Price"
        value={energy}
        onChange={e => setEnergy(e.target.value)}
        id="swro-unit-price"
        InputProps={{
          inputComponent: NumberFormatCustom,
        }}
        inputProps={{ prefix: '$' }}
      />
    </div>
    <div>
      <TextField
        disabled
        className={classes.formControl}
        label="Projected Population (2066)"
        defaultValue={'100,000'}
        id="projected-population"
      />
    </div>
    <div>
      <TextField
        disabled
        className={classes.formControl}
        label="Current Population"
        id="population"
        defaultValue={'80,000'}
      />
    </div>
    <div>
      <TextField
        disabled
        className={classes.formControl}
        label="Projected Water Use"
        defaultValue={'12,341 kL/day'}
        id="projected-water-use"
      />
    </div>
    <div>
      <TextField
        disabled
        className={classes.formControl}
        label="Desalnation Efficiency"
        id="desal-efficiency"
        defaultValue={'42,300 kw/H'}
      />
    </div>
    <div>
      <TextField
        disabled
        className={classes.formControl}
        label="Salinity"
        id="salinity"
        defaultValue={'33,000 ppm'}
      />
    </div>
    <div>
      <TextField
        disabled
        className={classes.formControl}
        label="Water Price"
        id="water_price"
        defaultValue={'$2.31/kL'}
      />
    </div>
  </div>
}

