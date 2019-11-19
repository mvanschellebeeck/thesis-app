import React, {useState, useContext, useEffect} from "react";
import {makeStyles} from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import {
  Card,
  CardContent,
  CardActions,
  Button,
  Typography,
  Slider,
  AppBar,
  Tabs,
  Tab
} from "@material-ui/core";
import NumberFormat from "react-number-format";
import CloseIcon from "@material-ui/icons/Close";
import PlantChart from "./plantChart";
import "../plantModal.css";
import {PlantModalDetailContext} from "../map";
import {AUD_TO_USD, TOTAL_INSTALLED_CAPACITY, ENERGY_COST_PER_KL} from '../../constants';

const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  card: {
    margin: "auto",
    width: "60vw"
  },
  formControl: {
    margin: theme.spacing(0.5),
    width: 300
  }
}));

export default function PlantDetail() {
  const classes = useStyles();
  const [cost, setCost] = useState(null);
  const [energy, setEnergy] = useState(null);
  const [feasibility, setFeasibility] = useState(1.03);
  const [tab, setTab] = useState(0);

  const handleChange = (e, newTab) => {
    setTab(newTab);
  };

  const [unitPrice, setUnitPrice] = useState(0);
  const {plantModalVisibility, plantProperties: {population, projected_population}} = useContext(PlantModalDetailContext);

  return (
    plantModalVisibility && (
      <Card className={classes.card}>
        <AppBar position="static">
          <Tabs value={tab} onChange={handleChange} variant="fullWidth">
            <Tab label="Economic Analysis" id="economic-analysis" />
            <Tab label="Environmental Analysis" id="environmental-analysis" />
          </Tabs>
        </AppBar>
        <CardContent
          role="tabpanel"
          hidden={tab !== 0}
          id={`simple-tabpanel-${0}`}
          index={0}
        >
          <div id="plant_modal">
            <EconomicFields setFeasibility={setFeasibility} unitPrice={unitPrice} setUnitPrice={setUnitPrice} />
            <PlantChart title="Capital & Operational Costs" width={300} height={300} unitPrice={unitPrice.toFixed(2)} />
            <Feasibility feasibility={feasibility} />
            <Population current={population} projected={projected_population} />
          </div>
        </CardContent>
        <CardContent
          role="tabpanel"
          hidden={tab !== 1}
          id={`simple-tabpanel-${1}`}
          index={1}
        >
          <div id="plant_modal">
            <EnvironmentalFields />
            <PlantChart title="Operational Costs" width={300} height={300} />
          </div>
        </CardContent>
        <Close />
      </Card>
    )
  );
}

function NumberFormatCustom({inputRef, onChange, ...other}) {
  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={values => {
        onChange({
          target: {
            value: values.value
          }
        });
      }}
      thousandSeparator
      isNumericString
    />
  );
}

function Close() {
  const {setPlantModalVisibility, setShowPlantPopup} = useContext(PlantModalDetailContext);
  return (
    <CardActions>
      <Button
        startIcon={<CloseIcon />}
        variant="contained"
        color="secondary"
        style={{margin: "auto"}}
        size="medium"
        onClick={() => {
          setPlantModalVisibility(false);
          setShowPlantPopup(false);
        }}
      >
        Close
      </Button>
    </CardActions>
  );
}

function Feasibility({feasibility}) {
  const determineColour = () => {
    if (feasibility >= 0.9 && feasibility <= 1.1) {
      return 'orange';
    } else if (feasibility > 1) {
      return 'green';
    } else {
      return 'red';
    }
  }

  return (
    <div id="feasability">
      <Typography style={{fontSize: "14px", color: "gray", margin: "auto"}}>
        Feasibility Index
      </Typography>
      <Typography
        style={{
          fontSize: "46px",
          color: determineColour(),
          fontWeight: "bold"
        }}
      >
        {feasibility}
      </Typography>
    </div>
  );
}


function Population({current, projected}) {

  return (
    <div id="population">
      <div id="population_current">
        <Typography style={{fontSize: "12px", color: "gray", margin: "auto"}}>
          Current Population
      </Typography>
        <Typography
          style={{
            fontSize: "23px",
            fontWeight: "bold"
          }}
        >
          {current}
        </Typography>
      </div>
      <div id="population_projected">
        <Typography style={{fontSize: "13px", color: "gray", margin: "auto"}}>
          Projected Population (2066)
        </Typography>
        <Typography
          style={{
            fontSize: "23px",
            fontWeight: "bold"
          }}
        >
          {projected}
        </Typography>
      </div>
    </div>
  );
}




function Field({label, value, isDynamic, inputProps}) {
  const classes = useStyles();
  return (
    <div >
      <TextField
        id={label.toLowerCase().replace(" ", "_")}
        disabled={!isDynamic}
        className={classes.formControl}
        label={label}
        value={value}
        InputProps={{inputComponent: NumberFormatCustom}}
        inputProps={inputProps}
        margin='dense'
      />
    </div>
  );
}


function EnvironmentalFields() {
  const [waterSupply, setWaterSupply] = useState(30);
  const unit = ' kg C02e/kL'

  const staticFields = [
    {label: 'Power (pumps)', value: 0.0357, dynamic: false, inputProps: {suffix: unit, decimalScale: 2}},
    {label: 'CL2 pre-treatment', value: 0.1481, dynamic: false, inputProps: {suffix: unit, decimalScale: 2}},
    {label: 'FeCI3 pre-treatment', value: 0.0398, dynamic: false, inputProps: {suffix: unit, decimalScale: 2}},
    {label: 'Anti-Scalant', value: 0.0548, dynamic: false, inputProps: {suffix: unit, decimalScale: 2}},
    {label: 'HCI pre-treatment', value: 0.0375, dynamic: false, inputProps: {suffix: unit, decimalScale: 2}},
    {label: 'Na0H second-pass treatment', value: 0.227, dynamic: false, inputProps: {suffix: unit, decimalScale: 2}},
    {label: 'Nylon Membranes', value: 0.0255, dynamic: false, inputProps: {suffix: unit, decimalScale: 2}},
    {label: 'Emission total', value: 0.3641, dynamic: true, inputProps: {suffix: ' tonne C02e', decimalScale: 2}},
  ]
  return (
    <div id="fields" style={{margin: 'auto'}}>
      {staticFields.map(field =>
        <Field label={field.label} value={field.value} waterSupply={waterSupply} isDynamic={field.dynamic} inputProps={field.inputProps} />
      )}
    </div>
  );
}


function EconomicFields({unitPrice, setUnitPrice, setFeasibility}) {
  const classes = useStyles();
  const {plantProperties: {
    total_annual_water_use,
    projected_water_use,
    salinity,
    water_use,
    cc_annualized,
    dollar_per_kl,
  }} = useContext(PlantModalDetailContext);

  const annualizeCapitalCost = () => {
    const n = 25;
    const i = 0.06;
    return capitalCost * (i * Math.pow(1 + i, n)) / (Math.pow(1 + i, n) - 1);
  }

  const getOandM = () => {
    const costing_model = 0.10 + 0.03 + 0.07 + ENERGY_COST_PER_KL;
    return costing_model + 0.02 * (capitalCost / (365 * getSWROProduction()));
  }

  const getSWROUnitPrice = () => {
    return getOandM() + (cc_annualized / (getSWROProduction() * 365));
  }

  const getCapitalCost = () => {
    return ((2.9 * Math.pow(10, 8) + 1.7 * Math.pow(10, 3) * getSWROProduction() - 1.8 * Math.pow(10, 7) * Math.log10(TOTAL_INSTALLED_CAPACITY))
      * AUD_TO_USD).toFixed(2);
  }

  const getSWROProduction = () => {
    return (waterSupply / 100 * water_use).toFixed(2);
  }

  const [waterSupply, setWaterSupply] = useState(30);
  const [targetSWRO, setTargetSWRO] = useState(null);
  const [capitalCost, setCapitalCost] = useState(getCapitalCost());
  const [annualizedCapitalCost, setAnnualizedCapitalCost] = useState(annualizeCapitalCost());
  const [oAndM, setOAndM] = useState(getOandM());

  const textFields = [
    {label: 'Annual Water Use', value: total_annual_water_use, dynamic: false, inputProps: {suffix: ' GL/yr', decimalScale: 2}},
    //{label: 'O&M', value: oAndM, dynamic: false, inputProps: {prefix: '$', decimalScale: 2}},
    //{label: 'Annualized Capital Cost', value: annualizedCapitalCost, dynamic: true, inputProps: {suffix: ' GL/yr', decimalScale: 2}},
    {label: 'Projected Annual Water Use', value: projected_water_use, dynamic: false, inputProps: {suffix: ' GL/yr', decimalScale: 2}},
    {label: 'Salinity', value: salinity, dynamic: false, inputProps: {suffix: ' ppm TDS', decimalScale: 2}},
    {label: 'Desalination Energy Efficiency', value: 100, dynamic: false, inputProps: {suffix: ' kWh/kL', decimalScale: 2}},
    {label: 'Water Price', value: 120, dynamic: false, inputProps: {suffix: ' $/kL', decimalScale: 2}},
    {label: 'Target SWRO production', value: targetSWRO, dynamic: true, inputProps: {suffix: ' kL/day', decimalScale: 0}},
    {label: 'Capital Cost', value: capitalCost, dynamic: true, inputProps: {prefix: '$', decimalScale: 0}},
    {label: 'SWRO Unit Price', value: unitPrice, dynamic: true, inputProps: {suffix: ' $/kL', decimalScale: 2}},
  ]

  useEffect(() => {
    setUnitPrice(getSWROUnitPrice());
    setCapitalCost(getCapitalCost());
    setTargetSWRO(getSWROProduction());
    setFeasibility((dollar_per_kl / unitPrice).toFixed(2));
    setAnnualizedCapitalCost(annualizeCapitalCost());
    setOAndM(getOandM());
  }, [waterSupply]);

  useEffect(() => {
    // ensure feasibility is initially set
    setFeasibility((dollar_per_kl / unitPrice).toFixed(2));
  })

  return (
    <div id="fields">
      <Typography id="discrete-slider-always" gutterBottom>
        Water Supply {waterSupply + ' %'}
      </Typography>
      <div style={{marginBottom: '-10'}}>
        <Slider
          defaultValue={waterSupply}
          getAriaValueText={value => `${value}%`}
          valueLabelDisplay="on"
          step={1}
          min={0}
          max={100}
          valueLabelFormat={value => `${value}%`}
          className={classes.formControl}
          onChange={(e, newVal) => setWaterSupply(newVal)}
        />
      </div>
      {textFields.map(field =>
        <Field label={field.label} value={field.value} waterSupply={waterSupply} isDynamic={field.dynamic} inputProps={field.inputProps} />
      )}
    </div>
  );
}
