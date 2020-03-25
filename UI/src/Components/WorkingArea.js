import React, {useState} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import './WorkingArea.css'

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
  
  return(
    <div className='WorkingArea'>
      <Switch>
        <Route path='/addproperty'>
          <AddProperty />
        </Route>

        <Route path='/addkey'>
          <AddKey />
        </Route>

        <Route path='/checkoutkey/:propKeybundleId' allKeys={allKeys} render={(props) => {
          return <CheckoutKey propKeybundleId={parseInt(props.match.params.propKeybundleId, 10)} allKeys={allKeys} />;
        }} />
        <Route path='/checkoutkey' allKeys={allKeys} render={() => {
          return <CheckoutKey allKeys={allKeys} />;
        }} />

        <Route path='/account'>
          <Account />
        </Route>

        <Route path='/addkeyholder'>
          <AddKeyholder />
        </Route>

        {/*ToDo: make the dashbord route /dashbord and the / route the auth page */}
        <Route path='/'>
          <Dashboard allKeys={allKeys} setAllKeys={setAllKeys} />
        </Route>
        
        {/* <Route path='/'>
          <Login />
        </Route> */}
      </Switch>
    </div>
  );
}
