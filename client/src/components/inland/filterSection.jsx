import React, { useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import CustomFilter from './customFilter';
import SolutionStepper from './solutionStepper';

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

export default function FilterSection({ states, setStates, setSalinityFilter }) {
  const [tab, setTab] = useState(0);
  return (
    <div id="filter">
      <AppBar position="static">
        <Tabs
          value={tab}
          onChange={(event, newTab) => { setTab(newTab)}}
          aria-label="simple tabs example"
          variant="fullWidth"
        >
          <Tab label="Custom Filter" />
          <Tab label="Proposed Solution" />
        </Tabs>
      </AppBar>
      <TabPanel value={tab} index={0}>
        <CustomFilter states={states} setStates={setStates} setSalinityFilter={setSalinityFilter}/>
      </TabPanel>
      <TabPanel value={tab} index={1}>
        <SolutionStepper />
      </TabPanel>
    </div>
  );
}
