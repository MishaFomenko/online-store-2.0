'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { useEffect } from 'react';
import { useUserContext } from '../context/userContext';
import Profile from '../components/profile';
import { customGetter } from '../utils/fetchConstructor';
import useSWR from 'swr';
import ProductCard from '../components/productCard';
import Spinner from '../components/spinner';
import ErrorComponent from '../components/errorComponent';
import { useCustomRedirect } from '../customHooks';

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
  const [purchases, setPurchases] = React.useState([]);
  const { user, userData, setUserData } = useUserContext();

  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  useCustomRedirect('/signin', user);

  const fetchUserPath = '../api/userData';
  const fetchUserAction = 'getuser';
  const fetchUserCollection = 'userdata';
  const fetchUserDocument = user?.uid.toString() || null;
  const fetchUserRequestPath = `${fetchUserPath}?action=${fetchUserAction}&collection=${fetchUserCollection}&document=${fetchUserDocument}`;

  const purchasesPath = '../api/userData';
  const purchasesAction = 'getpurchases';
  const purchasesCollection = 'purchases';
  const purchasesDocumentKey = user?.uid.toString() || null;
  const purchasesRequestPath = `${purchasesPath}?action=${purchasesAction}&collection=${purchasesCollection}&document=${purchasesDocumentKey}`;

  const accountFetchKeys = {
    fetchUserRequestPath,
    purchasesRequestPath,
  };

  const getAccountData = async (accountFetchKeys) => {
    const { fetchUserRequestPath, purchasesRequestPath } = accountFetchKeys;
    const userAccountData = await customGetter(fetchUserRequestPath);
    const pastPurchases = await customGetter(purchasesRequestPath);
    return { userAccountData, pastPurchases };
  };

  const { data, error, isLoading } = useSWR(accountFetchKeys, getAccountData);

  useEffect(() => {
    if (!isLoading) {
      const { userAccountData, pastPurchases } = data;
      setUserData(userAccountData);
      setPurchases(pastPurchases);
    };
  }, [data, isLoading, setUserData, setPurchases]);

  const handleChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  let groupedByDate = {};
  if (purchases.length) {
    groupedByDate = purchases.reduce((result, item) => {
      const date = item.date;
      if (!result[date]) {
        result[date] = [];
      }
      result[date].push(item);
      return result;
    }, {});
  }

  return (
    <>
      {
        !isLoading && !data && error
          ?
          <ErrorComponent />
          :
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
                <div className='flex justify-center items-center h-screen'>
                  <Spinner />
                </div>
              }
            </CustomTabPanel>
            <CustomTabPanel value={currentTab} index={1}>
              <div className='w-full'>
                {purchases.length
                  ?
                  Object.keys(groupedByDate).map((date, ind) => {
                    const purchaseDate = new Date(date);
                    return (
                      <div key={ind}>
                        <div>
                          <p className='text-4xl'>{days[purchaseDate.getDay()]}, {months[purchaseDate.getMonth()] + ' ' + purchaseDate.getDate()}, {purchaseDate.getHours()}:{purchaseDate.getMinutes()}</p>
                        </div>
                        <div className='flex flex-wrap'>
                          {groupedByDate[date].map((item) => <ProductCard key={item.asin} item={item} />)}
                        </div>
                      </div>
                    )
                  })
                  :
                  <div className='flex justify-center items-center h-screen'>
                    <Spinner />
                  </div>
                }
              </div>
            </CustomTabPanel>
          </Box>
      }
    </>
  );
}