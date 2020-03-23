import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import './WorkingArea.css'

// import custom components
import Dashbord from './Dashbord';
import AddProperty from './AddProperty';
import AddKey from './AddKey';
//import AddPerson from './AddKeyholder';
import CheckoutKey from './CheckoutKey';
import { Account } from './Account';

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
  return(
    <div className='WorkingArea'>
      <Switch>
        <Route path='/addproperty'>
          <AddProperty />
        </Route>

        <Route path='/addkey'>
          <AddKey />
        </Route>
      
        <Route path='/checkoutkey'>
          <CheckoutKey />
        </Route>

        <Route path='/account'>
          <Account />
        </Route>

        {/*ToDo: make the dashbord route /dashbord and the / route the auth page */}
        <Route path='/'>
          <Dashbord />
        </Route>
        
        {/* <Route path='/'>
          <Login />
        </Route> */}
      </Switch>
    </div>
  );
}
