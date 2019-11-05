import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItem';

const useStyles = makeStyles(theme => ({
  root: {
    width: '90%',
  },
  button: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  actionsContainer: {
    marginBottom: theme.spacing(2),
  },
  resetContainer: {
    padding: theme.spacing(3),
  },
}));

function getSteps() {
  return [
    'Assumptions',
    'Select bores with appropriate salinity',
    'Remove bores with very low water levels',
    'Filter to locations where MAR should be applied',
    'Select bores that scale',
  ];
}

function getStepContent(step) {
  switch (step) {
    case 0:
      return (
        <ul>
          <li>- Groundwater will continue to be overly exploited</li>
          <li>- The focus is to combat groundwater shortage</li>
          <li>- Brackish water desalination is more economically feasible than seawater desalination</li>
        </ul>
      )
      // return (
      //   <List style={{height: '100%'}}>
      //     <ListItem>
      //       <ListItemText primary={<Typography>test</Typography>} />
      //     </ListItem>
      //   </List>
      // );
    // return `This solution is on the basis that groundwater will continue to be exploited
    //         and desalination + MAR will be used to combat the exploitation as opposed
    //         to supplementing water supply. It assumes brackish water desalination is
    //         more econonmically feasable then seawater desalination.`
    case 1:
      return (
        <Typography>
          For mobile desalination to be viable it should operate at TDS values
          between 1000 and 10000 TDS (brackish water)
        </Typography>
      );
    case 2:
      return (
        <Typography>
          Avoid bores with very low groundwater levels. Further extraction can
          cause saltwater intrusion and amplify the groundwater problem
        </Typography>
      );

    case 3:
      return (
        <Typography>
          The managed aquifer recharge implementation should target areas of
          appropriate groundwater levels that can benefit from aquifer recharge.
          The proposed management scheme is economically viable if, roughly, the
          groundwater produced exceeds the treated wastewater recharged
          multiplied by the ratio of the unit costs for treatment to
          desalination
        </Typography>
      );
    case 4:
      return (
        <Typography>
          Plants should operate at scale, rules out domestic/stock and monitoring bores
        </Typography>
      );
    default:
      return <Typography>Unknown step</Typography>;
  }
}

export default function SolutionStepper() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const stepButton = step => {
    switch (step) {
      case 0:
        return 'Continue';
      case 1:
        return 'Filter Bores < 10,000 TDS';
      case 2:
        return 'Filter out bores with low water levels';
      case 3:
        return 'Determine recharge locations';
      default:
        return 'Next';
    }
  };

  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
            <StepContent>
              <>{getStepContent(index)}</>
              {/* <Typography>{getStepContent(index)}</Typography> */}
              <div className={classes.actionsContainer}>
                <div>
                  <Button
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    className={classes.button}
                  >
                    Back
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    className={classes.button}
                  >
                    {stepButton(index)}
                  </Button>
                </div>
              </div>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length && (
        <Paper square elevation={0} className={classes.resetContainer}>
          <Typography>
            The map now shows potential locations for a mobile desalination +
            managed aquifer recharge system.
          </Typography>
          <Button onClick={handleReset} className={classes.button}>
            Reset
          </Button>
        </Paper>
      )}
    </div>
  );
}
