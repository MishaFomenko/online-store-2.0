'use client'
import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { useEffect } from 'react'
import { useUserContext } from '../context/userContext'
import { useRouter } from 'next/navigation'
import Profile from '../components/profile'
import { customGetter } from '../utils/fetchConstructor'
import useSWR from 'swr'

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
          {children}
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
  const { user, userData, setUserData } = useUserContext();
  const router = useRouter();

  const fetchUserPath = '../api/userData';
  const action = 'getuser';
  const collection = 'userdata';
  const document = user.uid.toString();
  const requestPath = `${fetchUserPath}?action=${action}&collection=${collection}&document=${document}`
  const { data, error, isLoading } = useSWR(requestPath, customGetter);
  useEffect(() => {
    if (user === null) {
      router.push('/signin')
    }
    if (!isLoading) {
      setUserData(data)
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
        {userData.first
          ?
          <Profile />
          :
          <></>}
      </CustomTabPanel>
      <CustomTabPanel value={currentTab} index={1}>
        Nothing here yet
      </CustomTabPanel>
    </Box>
  );
}