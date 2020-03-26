import React, {useState} from "react";
import {default as apiurlbase} from '../apiurlbase';
import './AddKey.css';
import SelectPropetyModal from './SelectPropertyModal';

/**
 * Component to create keys
 * 
 * Required props: none
 * 
 * Accepted props: none
 * 
 * @author Han Kuo
 * @author Quincy Powell <Quincy.Powell@gmail.com>
 */
export default function AddKey (
  allProperties = [],
) {
  // Make the API call to add a key to the DB
  const createKey = (
    keybundleId, // Inconsistent with other POST requests
    keybundleStatusId,
    propertyId,
    keyholderId = 1, // assume in office whan not overridden
    keybundleCheckoutDate = null,
    keybundleDueDate = null
  ) => {
    let strUrl = apiurlbase + 'property/' + propertyId + '/keybundle';
    let data = JSON.stringify({
      "keybundle_id": keybundleId,
      "keybundle_status_id": keybundleStatusId,
      "property_id": propertyId,
      "keyholder_id": keyholderId,
      "keybundle_checkout_date": keybundleCheckoutDate,
      "keybundle_due_date": keybundleDueDate
    });
    let fetchInit = {
      method: "POST",
      body: data,
      headers: {"content-type": "application/json"}
    }
    
    fetch(strUrl, fetchInit)
      .then(res => res.json())
      .then(data => {console.log('POST success: ', data)})
      .catch(error => {console.error('POST failed: ', error)});
  }

  // event handlers
  const handleSubmit = (event) => {
    event.preventDefault();
    if(typeof(keybundleId)==="string" || keybundleId instanceof String) {
      setKeybundleId(parseInt(keybundleId, 10));
    }
    if(typeof(keybundleStatusId)==="string" || keybundleStatusId instanceof String) {
      setKeybundleStatusId(parseInt(keybundleStatusId, 10));
    }
    if(typeof(keybundlePropertyId)==="string" || keybundlePropertyId instanceof String) {
      setKeybundlePropertyId(parseInt(keybundlePropertyId, 10));
    }
    if(typeof(keybundleKeyholderId)==="string" || keybundleKeyholderId instanceof String) {
      setKeybundleKeyholderId(parseInt(keybundleKeyholderId, 10));
    }
    createKey(
      keybundleId,
      keybundleStatusId,
      keybundlePropertyId,
      keybundleKeyholderId,
      keybundleCheckoutDate,
      keybundleDueDate
    );
  }
  // const handleCancel = (event) => {
  //   //ToDo: implement cancellation
  // }

  const togglePropertyModalOpen = () => {
    setIsPropertyModalOpen(!isPropertyModalOpen);
  }

  const propertySelected = (property) => {
    setKeybundlePropertyId(property.property_id);
    togglePropertyModalOpen();
  }

  // setup state
  const [keybundleId, setKeybundleId] = useState(null);
  const [keybundleStatusId, setKeybundleStatusId] = useState(null);
  const [keybundlePropertyId, setKeybundlePropertyId] = useState(null);
  const [keybundleKeyholderId, setKeybundleKeyholderId] = useState(null);
  const [keybundleCheckoutDate, setKeybundleCheckoutDate] = useState(20200101);
  const [keybundleDueDate, setKeybundleDueDate] = useState(20200101);
  const [isPropertyModalOpen, setIsPropertyModalOpen] = useState(false);
  
  return (
    <div>
      {(isPropertyModalOpen) ? (<SelectPropetyModal allProperties={allProperties}
        onSelect={propertySelected}
        onClose={togglePropertyModalOpen} />) : null }
      <form onSubmit={handleSubmit} >
        <legend>Add a key</legend>
        <label>
          Key ID (tag):
          <input type="number" value={keybundleId}
            onChange={(event) => setKeybundleId(event.target.value)} />
        </label>
        <br />
        <label>
          Status:
          <input type="number" value={keybundleStatusId}
            onChange={(event) => setKeybundleStatusId(event.target.value)} />
        </label>
        <br />
        <label>
          Property:
          <input type="number" value={keybundlePropertyId}
            onChange={(event) => setKeybundlePropertyId(event.target.value)} />
        </label>
        <input type='button' value='Select Property' className='open-select-property'
          onClick={togglePropertyModalOpen} />
        <br />
        <label>
          Keyholder:
          <input type="number" value={keybundleKeyholderId}
            onChange={(event) => setKeybundleKeyholderId(event.target.value)} />
        </label>
        <br />
        <input type="submit" value="Create Key" />
        {/* <input type="button" value="Cancel"
          onClick={handleCancel} /> */}
      </form>
    </div>
  );
}