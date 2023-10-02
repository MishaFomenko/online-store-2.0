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

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  const router = useRouter();

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

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
    const [value, setValue] = React.useState(0);
    
    const {user, setUser, userData, setUserData} = useUserContext();
    const [dataLoaded, setDataLoaded] = useState(false);
    let prevUser = null;

    useEffect(()=>{
        if (user===null) {
        try {
            prevUser = JSON.parse(sessionStorage.getItem('firebase:authUser:AIzaSyCoGURJeUWdIylWkAEDYEpOqY6YnAaJYy0:[DEFAULT]'))
            setUser(prevUser)
        } catch {}
        }
    })
    

    useEffect(()=>{

        user===null && prevUser===null && router.push('/registration')
    },[])

    useEffect(()=>{
       if (user === null && prevUser===null) {
          router.push('/signin') 
        } else if (!userData.first && user!==null) {

            async function fetchUser(action, collection, document) {
                const res = await fetch(`../api/userdata?action=${action}&collection=${collection}&document=${document}`, {
                    method: 'GET',
                    'Content-Type': 'application/json',
                })
                const userD = await res.json();
                setUserData(userD)
                setDataLoaded(true)
            };
            fetchUser('getuser', 'userdata', user.uid)
        }
    })

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" >
          <Tab label="Profile" {...a11yProps(0)} />
          <Tab label="Purchases" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        {dataLoaded ? <Profile /> : <></>}
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        Nothing here yet
      </CustomTabPanel>
    </Box>
  );
}