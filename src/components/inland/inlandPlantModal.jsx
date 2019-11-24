import {
    CardActions,
    CardContent,
    Button,
    Typography,
    Card
} from '@material-ui/core';
import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
import '../map.css';
import { MapContext } from '../../pages/Desalination';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import Icon from '@material-ui/core/Icon';
import MeasureBar from './measureBar';
import Graph from './graph';


const useStyles = makeStyles({
    root: {
        // width: '30vw',
        height: '60vh',
        flexGrow: 1,
    },
    tableWrapper: {
        maxHeight: '60vh',
        overflow: 'auto',
    },
    card: {
        margin: 'auto',
        marginBottom: '5%',
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
    paper: {
        width: '80%',
    },
});


const mapKeys = {
    2017: 'Population',
    'Name': 'Local Government Area',
    'area': 'Area km^2',
    'density': 'Population Denisty (people per 1 km^2)'
}

const Heading = ({ text }) => {
}

const Value = ({ text }) => {
}

const MyListItem = ({ heading, value }) => {
    return (<ListItem>
        <ListItemText
            primary={<Typography style={{ fontSize: 13 }}> {heading} </Typography>}
            secondary={<Typography style={{ fontSize: 20, color: 'gray' }}> {value} </Typography>} />
    </ListItem>
    );
}

export default function InlandPlantModal({ density }) {

    const classes = useStyles();
    const { setComputedPlantModalVisibility, selectedBores } = useContext(MapContext);


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
                <div>
                    <div>
                        <Grid container>
                            <Grid item xs={12}>
                                <Grid container justify="center" spacing={2}>
                                    {selectedBores.map((bore, index) => (
                                        <Grid key={bore.id} item>
                                            <div style={{ textAlign: 'center', margin: 'auto', width: '100px' }}>
                                                <Icon>
                                                    <img src="./manometer.svg" />
                                                </Icon>
                                                <Typography style={{ fontSize: 15, marginBottom: 3 }}> {'Bore ' + (index + 1)} </Typography>
                                                <Typography style={{ fontSize: 12, color: 'gray' }}>Salinity</Typography>
                                                <MeasureBar salinity={bore.salinity} />
                                                <Typography style={{ fontSize: 12, color: 'gray' }}>Water Level</Typography>
                                                <MeasureBar salinity={bore.salinity} />
                                            </div>
                                        </Grid>
                                    ))}
                                </Grid>
                            </Grid>
                        </Grid>
                    </div>
                    <div id="inland_modal">
                        <div id="inland_modal_text">
                            <List dense={true}>
                                <MyListItem heading="Average Salinity" value={getAverageSalinity() + ' mg/L'} />
                                <MyListItem heading="Recovery Rate" value={getRecoveryRate() + '%'} />
                                <MyListItem heading="Desalinated Water Cost" value={'$' + getCost(0.3) + ' per kL'} />
                                <MyListItem heading="Capital Cost" value='$1,200,000' />
                            </List>
                        </div>
                        {/*<div id="inland_modal_graph">
                            <Graph />
                          </div> */}
                    </div>
                    <CardActions>
                        <Button
                            startIcon={<CloseIcon />}
                            variant="contained"
                            color="secondary"
                            style={{ margin: 'auto' }}
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
