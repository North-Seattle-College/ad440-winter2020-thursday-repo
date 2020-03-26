import React, {useState} from "react";
import {default as apiurlbase} from '../apiurlbase'
import './AddProperty.css';
/**
 * Component to add property objects to the DB via API
 *
 * Required props: none
 *
 * Accepted props: none
 *
 * @author Abby A.
 */
 export default function AddProperty () {
   // Store Property details
   const [propertyName, setPropertyName] = useState('');
   const [propertyType, setPropertyType] = useState(null);
   const [propertyAddress1, setPropertyAddress1] = useState('');
   const [propertyCity, setPropertyCity] = useState('');
   const [propertyState, setPropertyState] = useState('');
   const [propertyZip, setPropertyZip] = useState('');
   const [propertyCountry, setPropertyCountry] = useState('');

   const createProperty = (
     propertyName,
     propertyType,
     propertyAddress1,
     propertyCity,
     propertyState,
     propertyZip,
     propertyCountry
   ) => {
     // Process the POST request using fetch()
     let strUrl = apiurlbase + 'property';
     // fetch data from url and convert to JSON data
     let data = JSON.stringify({
       "property_name": propertyName,
       "property_type_id": propertyType,
       "property_address": propertyAddress1,
       "property_city": propertyCity,
       "property_state": propertyState,
       "property_zip": propertyZip,
       "property_country": propertyCountry
     });
     let fetchInit = {
       method: 'POST',
       body: data,
       headers: {'content-type': 'application/json'}
     };
     debugger;
     fetch(strUrl, fetchInit)
       .then(res => res.json())
       .then(data => {console.log('POST result: ', data)})
       .catch(error => {console.error('POST failed: ', error)})
   }

   // Processes Add Property Form data when form submit button pressed
   const handleSubmit = (e) => {
     e.preventDefault();
     if(typeof(propertyType)==="string") {
       setPropertyType(parseInt(propertyType, 10));
     }
     createProperty (
       propertyName,
       propertyType,
       propertyAddress1,
       propertyCity,
       propertyState,
       propertyZip,
       propertyCountry
     );
   }
  // Update textfields as the user adds input
   return (
     <form onSubmit={handleSubmit}>
       <label htmlFor="property_name">Enter Property Name</label>
       <input id="property_name" name="property_name" type="text"
         onChange={(event) => setPropertyName(event.target.value)} />
       <br />
       <label htmlFor="property_type_id">Enter Property Type</label>
       <input id="property_type_id" name="property_type_id" type="number"
         onChange={(event) => setPropertyType(event.target.value)} />
       <br />
       <label htmlFor="property_address">Enter Property Address</label>
       <input id="property_address" name="property_address" type="text"
         onChange={(event) => setPropertyAddress1(event.target.value)}/>
       <br />
       <label htmlFor="property_city">Enter Property City</label>
       <input id="property_city" name="property_city" type="text"
         onChange={(event) => setPropertyCity(event.target.value)}/>
       <br />
       <label htmlFor="property_state">Enter Property State</label>
       <input id="property_state" name="property_state" type="text"
         onChange={(event) => setPropertyState(event.target.value)} />
       <br />
       <label htmlFor="property_zip">Enter Property Zip</label>
       <input id="property_zip" name="property_zip" type="text"
         onChange={(event) => setPropertyZip(event.target.value)}/>
       <br />
       <label htmlFor="property_country">Enter Property country</label>
       <input id="property_country" name="property_country" type="text"
         onChange={(event) => setPropertyCountry(event.target.value)} />
       <br />
       <input type='submit' value="Add Property to DB" />
       {/* <input type='button' value='Cancel' onClick={handleCancel} /> */}
     </form>
   );
 }
