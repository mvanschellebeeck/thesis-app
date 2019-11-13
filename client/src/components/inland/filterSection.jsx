import React, { useState, useContext } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import CustomFilter from './customFilter';
import SolutionStepper from './solutionStepper';
import { MapContext } from '../../pages/Desalination';

function TabPanel({ children, value, index, ...other }) {
  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {children}
    </Typography>
  );
}

export default function FilterSection() {
  const [tab, setTab] = useState(0);
  const { states, setSalinityFilter, setStates } = useContext(MapContext);
  return (
    <div id="filter">
      <AppBar position="static">
        <Tabs
          value={tab}
          onChange={(event, newTab) => { setTab(newTab)}}
          aria-label="simple tabs example"
          variant="fullWidth"
        >
          <Tab label="Solution" />
          {/* <Tab label="Proposed Solution" /> */}
        </Tabs>
      </AppBar>
      {/* <TabPanel value={tab} index={0}>
        <CustomFilter states={states} setStates={setStates} setSalinityFilter={setSalinityFilter}/>
      </TabPanel> */}
      <TabPanel value={tab} index={0}>
        {/* <SolutionStepper /> */}
      </TabPanel>
    </div>
  );
}
