import React, {useState} from 'react';
import {default as apiurlbase} from '../apiurlbase';
import './CheckoutKey.css';
import SelectKeyholderModal from './SelectKeyholderModal';

/**
 * Provides component that will render a form and (eventually) provide
 * functionality to checkout a key from one keyholder to another.
 * Currently partial API connection implemented, but there are problems.
 * 
 * Required props: none
 * 
 * Acceptted props:
 * keyholderId, the DB ID of a keyholder to check-out a keybundle to
 * keybundleId, the DB ID of a keybundle
 * dueBackDate, a date that will appear as the default due back date
 *   which must be given as an ISO 8601 date only string (ex: 2020-02-29)
 * 
 * @author Quincy Powell <Quincy.Powell@gmail.com>
 */
export default function CheckoutKey ({
  allKeys = [],
  allKeyholders = [],
  propKeybundleId = null,
  propKeybundleStatusId = null,
  propKeyholderId = null,
  propDueBackDate = new Date().toISOString().substr(0,10),
}) {
  // Fill the keybundleStatusId from existing data when passed that data
  if (allKeys.length > 0 && propKeybundleId !== null) {
    let matchingKey = allKeys.find(({keybundle_id}) => {
      return propKeybundleId === keybundle_id;
    })
    if (matchingKey) {
      propKeybundleStatusId = matchingKey.keybundle_status_id;
    }
  }
  
  /**
   * Generate a PUT request to our API to checkout a key
   * @param keyholderId - the keyholder ID
   * @param keybundleStatusId - the status ID of the keybundle
   * @param keybundleId - the keybundle ID
   * @param checkoutDate - date the keybundle was checked out
   * @param dueBackDate - the date the key is expected back. Use ISO 8601
   */
  const checkoutKey = (
    keyholderId,
    keybundleStatusId,
    keybundleId,
    checkoutDate,
    dueBackDate
  ) => {
    let strUrl = apiurlbase + 'keybundle/' + String(keybundleId);
    let data = JSON.stringify({
      'keyholder_id': keyholderId,
      'keybundle_status_id': keybundleStatusId,
      'keybundle_id': keybundleId,
      'keybundle_checkout_date': checkoutDate,
      'keybundle_due_date': dueBackDate
    });
    let fetchInit = {
      method: 'PUT',
      body: data,
      headers: {'content-type': 'application/json'}
    };

    fetch(strUrl, fetchInit)
      .then(res => res.json())
      .then(data => {console.log('PUT success: ', data)})
      .catch(error => {console.error('PUT failed: ', error)});
  }

  // button handlers
  const handleSubmit = (event) => {
    event.preventDefault();  
    let checkoutDate = new Date().toISOString().substr(0,10);
    checkoutKey(
        keyholderId,
        keybundleStatusId,
        keybundleId,
        checkoutDate,
        dueBackDate
    );
  }

  // const handleCancel = () => {
  //   /* ToDo: implement cancel behavior - cleanup anything necessary
  //       then hide or destroy this element */
  //   alert('cancel button pressed.');
  // }

  // form data states
  const [keyholderId, setKeyholderId] = useState(propKeyholderId);
  const [keybundleStatusId, setKeybundleStatusId] = useState(propKeybundleStatusId);
  const [keybundleId, setKeybundleId] = useState(propKeybundleId);
  const [dueBackDate, setDueBackDate] = useState(propDueBackDate);
  const [isPersonModalOpen, setIsPersonModalOpen] = useState(false);

  const togglePersonModalOpen = () => {
    setIsPersonModalOpen(!isPersonModalOpen);
  }

  const keyholderSelected = (key) => {
    setKeyholderId(key.keyholder_id);
    togglePersonModalOpen();
  }

  /**
   * Provide the JSX
   */
  return (
    <div className='keyCheckout'>
      {(isPersonModalOpen) ? (<SelectKeyholderModal allKeyholders={allKeyholders}
        onSelect={keyholderSelected}
        onClose={togglePersonModalOpen}/>) : null }
      <form onSubmit={handleSubmit} >
        <legend>Check-out keys:</legend>
        <label>
          Key ID (tag):
          <input type="number" value={keybundleId}
            onChange={(event) => setKeybundleId(event.target.value)} />
        </label>
        <br />
        <label>
          Checkout to:
          <input type="number" value={keyholderId}
            onChange={(event) => setKeyholderId(event.target.value)} />
        </label>
        <button className="open-select-keyholder" onClick={togglePersonModalOpen}>Select Person</button>
        <br />
        <label>
          Key status:
          <input type="number" value={keybundleStatusId}
            onChange={(event) => setKeybundleStatusId(event.target.value)} />
        </label>
        <br />
        <label>
          Due back:
          <input type="date" value={dueBackDate}
            onChange={(event) => setDueBackDate(event.target.value)} />
        </label>
        <br />
        <input type="submit" value="Checkout key" />
        {/* <input type="button" value="Cancel"
          onClick={handleCancel}/> */}
      </form>
    </div>
  );
}
