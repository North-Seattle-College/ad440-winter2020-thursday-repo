'use strict';
import React, {useState, useEffect} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import './WorkingArea.css'
import {default as apiurlbase} from '../apiurlbase';

// import custom components
import Dashboard from './Dashboard';
import AddProperty from './AddProperty';
import AddKey from './AddKey';
import AddKeyholder from './AddKeyholder';
import CheckoutKey from './CheckoutKey';
import Account from './Account';

/**
 * Component to handle route switching and display
 * other components that provide working forms
 *
 * Required props: none
 *
 * Accepted props: none
 *
 * @author Quincy Powell <Quincy.Powell@gmail.com>
 */
export default function WorkingArea() {
  const [allKeys, setAllKeys] = useState([]);
  const [allProperties, setAllProperties] = useState([]);
  const [allKeyholders, setAllKeyholders] = useState([]);
  const [gotData, setGotData] = useState(false);
  
  const enhanceTheKeys = (keys, properties, keyholders) => {
    const enhancedKeys = keys.map((key, i) => {
      const {property_name, property_address, property_city}
        = properties.find((property) => property.property_id === key.property_id) || {};
      const {first_name, last_name}
        = keyholders.find((keyholder) => keyholder.keyholder_id === key.keyholder_id) || {};
      return{
        ...key,
        property_name,
        property_address: (property_address != null && property_city != null)
          ? `${property_address} ${property_city}` : "",
        keyholder_name: (first_name != null && last_name != null)
          ? `${first_name} ${last_name}` : "",
      };
    });
    setAllKeys(enhancedKeys);
  }

  // Function to verify HTTP response is in 2xx
  const checkStatus = (res) => {
    if (res.status >= 200 && res.status < 300) {
      return Promise.resolve(res);
    } else {
      return Promise.reject(new Error(res.statusText));
    }
  }

  const getData = () => {
    if(gotData) {
      return;
    }
    const keysUrl = apiurlbase + 'keybundle';
    const promise1 = fetch(keysUrl)
      .then(checkStatus)
      .then(res => res.json());
    
    const propertiesUrl = apiurlbase + 'property';
    const promise2 = fetch(propertiesUrl)
      .then(checkStatus)
      .then(res => res.json());

    const keyholderUrl = apiurlbase + 'keyholder';
    const promise3 = fetch(keyholderUrl)
      .then(checkStatus)
      .then(res => res.json());

    Promise.all([promise1, promise2, promise3])
      .then(([keys, properties, keyholders]) => {
        setAllProperties(properties);
        setAllKeyholders(keyholders);
        enhanceTheKeys(keys, properties, keyholders);
        setGotData(true);
      })
      .catch(console.error)
  }

  const getKeys = () => {
    const keysUrl = apiurlbase + 'keybundle';
    fetch(keysUrl)
      .then(checkStatus)
      .then(res => res.json())
      .then(keys => enhanceTheKeys(keys, allProperties, allKeyholders))
      .catch(console.error)
  }

  useEffect(getData);
  

  return(
    <div className='WorkingArea'>
      <Switch>
        <Route path='/addproperty'>
          <AddProperty />
        </Route>

        <Route path='/addkey/'  render={() => {
          return (<AddKey
            allProperties={allProperties} />);
        }} />

        <Route path='/checkoutkey/:propKeybundleId'  render={(props) => {
          return (<CheckoutKey propKeybundleId={parseInt(props.match.params.propKeybundleId, 10)}
            allKeys={allKeys}
            allKeyholders={allKeyholders} />);
        }} />
        <Route path='/checkoutkey/'  render={() => {
          return (<CheckoutKey
            allKeys={allKeys}
            allKeyholders={allKeyholders} />);
        }} />

        <Route path='/account'>
          <Account />
        </Route>

        <Route path='/addkeyholder'>
          <AddKeyholder />
        </Route>

        {/*ToDo: make the dashbord route /dashbord and the / route the auth page */}
        <Route path='/'>
          <Dashboard allKeys={allKeys}
            getKeys={getKeys} />
        </Route>
        
        {/* <Route path='/'>
          <Login />
        </Route> */}
      </Switch>
    </div>
  );
}
