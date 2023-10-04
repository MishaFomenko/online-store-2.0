'use client'
import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useEffect, useState } from 'react'
import { useUserContext } from '../context/usercontext'
import { useRouter } from 'next/navigation'
import Profile from '../components/profile'
import { customGetter } from '../utils/fetchConstructor'

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const [currentTab, setCurrentTab] = React.useState(0);
  const [dataLoaded, setDataLoaded] = useState(false);
  const { user, userData, setUserData } = useUserContext();
  const router = useRouter();

  async function fetchUser() {
    const fetchUserPath = '../api/userdata';
    const action = 'getuser';
    const collection = 'userdata';
    const document = user.uid.toString();
    const userRes = await customGetter(fetchUserPath, action, collection, document);
    setUserData(userRes)
    setDataLoaded(true)
  };

  useEffect(() => {
    if (user === null) {
      router.push('/signin')
    } else if (!userData.first && user !== null) {
      fetchUser()
    }
  })

  const handleChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Tabs value={currentTab} onChange={handleChange} aria-label="basic tabs example" >
          <Tab label="Profile" {...a11yProps(0)} />
          <Tab label="Purchases" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={currentTab} index={0}>
        {dataLoaded ? <Profile /> : <></>}
      </CustomTabPanel>
      <CustomTabPanel value={currentTab} index={1}>
        Nothing here yet
      </CustomTabPanel>
    </Box>
  );
}