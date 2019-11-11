import React, { useState, useContext } from 'react';
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
import { PlantModalDetailContext } from '../map';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  card: {
    margin: 'auto',
    marginTop: 5,
    width: '50vw',
  },
  formControl: {
    margin: theme.spacing(0.5),
    width: 300,
  },
}));

export default function PlantDetail() {
  const classes = useStyles();
  const [cost, setCost] = useState(null);
  const [energy, setEnergy] = useState(null);
  const [feasibility, setFeasibility] = useState(1.03);

  const { plantModalVisibility } = useContext(PlantModalDetailContext);
  return (
    plantModalVisibility && (
      <Card className={classes.card}>
        <CardContent>
          <div id="plant_modal">
            <InputFields
              setCost={setCost}
              setEnergy={setEnergy}
              cost={cost}
              energy={energy}
            />
            <PlantChart title="Operational Costs" width={300} height={300} />
            <Feasibility feasibility={feasibility} />
          </div>
        </CardContent>
        <Close />
      </Card>
    )
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

function Close() {
  const { setPlantModalVisibility } = useContext(PlantModalDetailContext);
  return (
    <CardActions>
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
  );
}

function Feasibility({ feasibility }) {
  return (
    <div id="feasability">
      <Typography style={{ fontSize: '14px', color: 'gray', margin: 'auto' }}>
        Feasibility Index
      </Typography>
      <Typography
        style={{
          fontSize: '46px',
          color: feasibility > 1 ? 'green' : 'red',
          fontWeight: 'bold',
        }}
      >
        {feasibility}
      </Typography>
    </div>
  );
}

function DynamicInputField({ label, value, setter, inputProps }) {
  const classes = useStyles();
  return (
    <div>
      <TextField
        className={classes.formControl}
        label={label}
        value={value}
        onChange={e => setter(e.target.value)}
        id={label.toLowerCase().replace(' ', '_')}
        InputProps={{
          inputComponent: NumberFormatCustom,
        }}
        inputProps={inputProps}
      />
    </div>
  );
}

function StaticInputField({ label, value }) {
  const classes = useStyles();
  return (
    <div>
      <TextField
        id={label.toLowerCase().replace(' ', '_')}
        disabled
        className={classes.formControl}
        label={label}
        defaultValue={value}
      />
    </div>
  );
}

function InputFields({ setCost, setEnergy, cost, energy }) {
  const classes = useStyles();
  const { plantProperties } = useContext(PlantModalDetailContext);
  return (
    <div id="fields">
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
      <DynamicInputField
        label="Capital Cost"
        value={cost}
        setter={setCost}
        inputProps={{ prefix: '$' }}
      />
      <DynamicInputField
        label="SWRO Unit Price"
        value={energy}
        setter={setEnergy}
        inputProps={{ prefix: '$' }}
      />
      <StaticInputField label="Current Population" value={plantProperties.population} />
      <StaticInputField label="Projected Population" value={plantProperties.projected_population} />
      <StaticInputField label="Total Annual Water Use" value={plantProperties.total_annual_water_use + ' GL/day'} />
      <StaticInputField label="Water Use" value={plantProperties.water_use + ' kL/day'} />
      <StaticInputField label="Projected Water Use" value={plantProperties.projected_water_use} />
      <StaticInputField label="Salinity" value={plantProperties.salinity + ' mg/L'} />
    </div>
  );
}
