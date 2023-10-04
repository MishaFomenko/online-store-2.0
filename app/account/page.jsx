'use client'
import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useEffect, useState, useRef } from 'react'
import { useUserContext } from '../context/usercontext'
import { useRouter } from 'next/navigation'
import Profile from '../components/profile'

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
  const { user, setUser, userData, setUserData } = useUserContext();
  const router = useRouter();
  const prevUserRef = useRef(null);

  async function fetchUser(action, collection, document) {
    const userRes = await fetch(`../api/userdata?action=${action}&collection=${collection}&document=${document}`, {
      method: 'GET',
      'Content-Type': 'application/json',
    })
    const userDataNew = await userRes.json();
    setUserData(userDataNew)
    setDataLoaded(true)
  };

  useEffect(() => {
    if (user === null) {
      try {
        prevUserRef.current = JSON.parse(sessionStorage.getItem(`firebase:authUser:${process.env.FIREBASE_API_KEY}:[DEFAULT]`))
        setUser(prevUserRef.current)
      } catch { }
    }

    user === null && prevUserRef.current === null && router.push('/registration')

    if (user === null && prevUserRef.current === null) {
      router.push('/signin')
    } else if (!userData.first && user !== null) {
      fetchUser('getuser', 'userdata', user.uid)
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