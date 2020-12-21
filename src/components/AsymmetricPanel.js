import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, Tabs, Tab, Typography, Box } from '@material-ui/core';
import Keys from './AsymmetricSteps/Keys';
import Encryption from './AsymmetricSteps/Encryption';
import Decryption from './AsymmetricSteps/Decryption';
import Sign from './AsymmetricSteps/Sign';
import Verify from './AsymmetricSteps/Verify';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    height: 224,
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
}));

export default function VerticalTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        className={classes.tabs}
      >
        <Tab label="Chaves" {...a11yProps(0)} />
        <Tab label="Encriptar" {...a11yProps(1)} />
        <Tab label="Decriptar" {...a11yProps(2)} />
        <Tab label="Assinatura" {...a11yProps(3)} />
        <Tab label="Verificar" {...a11yProps(4)} />
      </Tabs>
      <TabPanel value={value} index={0}>
        <Keys></Keys>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Encryption></Encryption>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Decryption></Decryption>
      </TabPanel>
      <TabPanel value={value} index={3}>
        <Sign></Sign>
      </TabPanel>
      <TabPanel value={value} index={4}>
        <Verify>
        </Verify>
      </TabPanel>
    </div>
  );
}
