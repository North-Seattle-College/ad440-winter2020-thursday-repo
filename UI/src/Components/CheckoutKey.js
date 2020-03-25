import React, {useState} from 'react';
import {default as apiurlbase} from '../apiurlbase';
import './CheckoutKey.css';

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
  propKeybundleId = null,
  propKeybundleStatusId = null,
  propKeyholderId = null,
  propDueBackDate = new Date().toISOString().substr(0,10), })
 
{
  if (allKeys.length > 0 && propKeybundleId !== null) {
    let matchingKey = allKeys.find(({keyholder_id}) => {
      return propKeybundleId === keyholder_id;
    })
    if (matchingKey) {
      propKeybundleStatusId = matchingKey.keybundle_status_id;
    }
  }
  debugger;
  /**
   * Generate a PUT request to our API to checkout a key
   * @param keyholderId - the keyholder ID
   * @param keybundleId - the keybundle ID
   * @param keybundleStatus - the keybundle status ID
   * @param dueBackDate - the date the key is expected back. Use ISO 8601
   */
  const checkoutKey = (keyholderId, keybundleStatusId, keybundleId, checkoutDate, dueBackDate) => {
    let strURL = apiurlbase + 'keybundle/' + String(keybundleId);
    let strBody = JSON.stringify({
      'keyholder_id': keyholderId,
      'keybundle_status_id': keybundleStatusId,
      'keybundle_id': keybundleId,
      'keybundle_checkout_date': checkoutDate,
      'keybundle_due_date': dueBackDate
    });
    let fetchInit = {
      method: 'PUT',
      body: strBody,
    };

    fetch(strURL, fetchInit)
      .then(res => res.json())
      .then(data => {console.log('PUT success: ', data)})
      .catch(error => {console.error('PUT failed: ', error)});
  }

  /**
   * Processes the key checkout form data when form submit button pressed
   */
  const handleSubmit = (event) => {
    event.preventDefault();  
    /* ToDo: implement keycheckout event handler in later sprint */
      //alert('KeyCheckout form submit button pressed.');
      console.log(keyholderId);
      console.log(keybundleStatusId)
      console.log(keybundleId);
      let checkoutDate = new Date().toISOString().substr(0,10);
      console.log(checkoutDate);
      console.log(dueBackDate);
      
      checkoutKey(
          keyholderId,
          keybundleStatusId,
          keybundleId,
          checkoutDate,
          dueBackDate
      );
  }

  /**
   * Processes user initiated cancellation of this form.
   */
  const handleCancel = () => {
      /* ToDo: implement cancel behavior - cleanup anything necessary
          then hide or destroy this element */
      alert('cancel button pressed.');
  }

  // form data states
  const [keyholderId, setKeyholderId] = useState(propKeyholderId);
  const [keybundleStatusId, setKeybundleStatusId] = useState(propKeybundleStatusId);
  const [keybundleId, setKeybundleId] = useState(propKeybundleId);
  const [dueBackDate, setDueBackDate] = useState(propDueBackDate);

  /**
   * Provide the JSX
   */
  return (
    <div className='keyCheckout'>
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
        <input type="button" value="Cancel"
          onClick={handleCancel}/>
      </form>
    </div>
  );
}
