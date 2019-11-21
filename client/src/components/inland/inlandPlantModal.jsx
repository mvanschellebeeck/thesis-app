import {
  Paper,
  CardActions,
  CardContent,
  Button,
  Typography,
  Card
} from '@material-ui/core';
import React, {useContext, useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
import '../map.css';
import {MapContext} from '../../pages/Desalination';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import FolderIcon from '@material-ui/icons/Folder';

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


const mapKeys = {
  2017: 'Population',
  'Name': 'Local Government Area',
  'area': 'Area km^2',
  'density': 'Population Denisty (people per 1 km^2)'
}

const Heading = ({text}) => {
  return (<div><Typography style={{fontSize: 13}}> {text} </Typography></div>);
}

const Value = ({text}) => {
  return (<div><Typography style={{fontSize: 20}}> {text} </Typography></div>);
}

const MyListItem = ({heading, value}) => {
  return (<><ListItem>
    <ListItemText
      primary={<Heading text={heading} />}
      secondary={<Value text={value} />} />
  </ListItem>
  </>);
}

export default function InlandPlantModal({density}) {

  const classes = useStyles();
  const {setComputedPlantModalVisibility, selectedBores} = useContext(MapContext);


  const getAverageSalinity = () => {
    const boreSalinities = selectedBores.map(bore => bore.salinity);
    return (boreSalinities.reduce((s, x) => s + x) / boreSalinities.length).toFixed(0);
  }

  const getCost = (waterSupply) => {
    const energyMultiplier = 2.72; // assumes 30c /kwH
    const EURO_TO_AUD = 1.63;
    const waterPerPerson = 340;
    const population = 300;
    const salinity = getAverageSalinity();
    return (energyMultiplier * EURO_TO_AUD * (Math.pow(10, -5) * salinity + 0.7413 - 0.0436 * Math.log10(waterSupply * population * waterPerPerson))).toFixed(2);
  }

  const getRecoveryRate = () => {
    return (100 * (0.829 - 2 * Math.pow(10, -5) * getAverageSalinity())).toFixed(1);
  }

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography className={classes.header}>
          Plant Cost Model
        </Typography>
        <div >
          <div >
            <List dense={true}>
              <MyListItem heading="Average Salinity" value={getAverageSalinity() + ' ppm TDS'} />
              <MyListItem heading="Recovery Rate" value={getRecoveryRate() + '%'} />
              <MyListItem heading="Cost" value={'$' + getCost(0.3) + ' per kL'} />
              {/*              {Object.keys(density).map(key => (
                <MyListItem heading={mapKeys[key]} value={density[key]} />
              ))} */}
            </List>
          </div>
          <CardActions>
            <Button
              startIcon={<CloseIcon />}
              variant="contained"
              color="secondary"
              style={{margin: 'auto'}}
              size="medium"
              onClick={() => {
                setComputedPlantModalVisibility(false);
              }}
            >
              Close
            </Button>
          </CardActions>
        </div>
      </CardContent>
    </Card >
  );
}
