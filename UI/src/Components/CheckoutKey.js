import React, {useState} from 'react';
import {default as apiurlbase} from '../apiurlbase'

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
 * propertyId, the DB ID of a property that the keybundle goes to
 *   Note: I'm not sure why we need propertyId. Seems redundant.
 *   but the API requires it.
 * dueBackDate, a date that will appear as the default due back date
 *   which must be given as an ISO 8601 date only string (ex: 2020-02-29)
 * 
 * @author Quincy Powell <Quincy.Powell@gmail.com>
 */
export default function CheckoutKey ({
  propKeyholderId = null,
  propKeybundleId = null
}) {
    /**
     * Generate a PUT request to our API to checkout a key
     * @param keyholderId - the keyholder ID as it appears in the DB
     * @param keybundleId - the keybundle ID as it appears in the DB
     * @param propertyId - the property ID as it appears in the DB
     * @param dueBackDate - the date the key is expected back. Use ISO
     */
    const checkoutKey = (keyholderId, keybundleId, propertyId, dueBackDate) => {
        function handleReadyStateChange(e) {
            // Tracking all the state changes for dev / debugging.
            /* ToDo - reduce event states handled later for prod */
            if (req.readyState === 0) {
                console.log('getAllPropertyIds state 0' + String(e));
            } else if (req.readyState === 1) {
                console.log('getAllPropertyIds state 1' + String(e))
            } else if (req.readyState === 2) {
                console.log('getAllPropertyIds state 2' + String(e))
            } else if (req.readyState === 3) {
                console.log('getAllPropertyIds state 3' + String(e))
            } else if (req.readyState === 4 && req.status === 200) {
                console.log('getAllPropertyIds state 4' + String(e))
                var res = JSON.parse(req.responseText);
                alert(String(res))
            }
        }

        var strURL = apiurlbase + 'keybundle/' + String(keybundleId);
        var strBody = JSON.stringify({
            'keyholder_id': keyholderId,
            'property_id': propertyId,
            'keybundle_id': keybundleId
        });
        
        var req = new XMLHttpRequest();
        req.open('PUT', strURL, true);
        req.setRequestHeader('Content-Type',
            'application/json;charset=UTF-8',
            'Access-Control-Request-Method: PUT');
        req.addEventListener('readystatechange',
                              handleReadyStateChange,
                              false);
        req.send(strBody);
    }

    /**
     * Processes the key checkout form data when form submit button pressed
     */
    const handleSubmit = (event) => {
      event.preventDefault();  
      /* ToDo: implement keycheckout event handler in later sprint */
        //alert('KeyCheckout form submit button pressed.');
        this.checkoutKey(
            this.state.keyholderId,
            this.state.keybundleId,
            this.state.propertyId,
            this.state.dueBackDate
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
    const [keybundleId, setKeybundleId] = useState(propKeybundleId);
    const [keyholderId, setKeyholderId] = useState(propKeyholderId);
    const [propertyId, setPropertyId] = useState(null);
    const [dueBackDate, setDueBackDate] = useState(
      new Date().toISOString().substr(0,10)
    );
    
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
              onChange={(event) => setKeybundleId} />
          </label>
          <br />
          <label>
            Checkout to:
            <input type="number" value={keyholderId}
              onChange={(event) => setKeyholderId} />
          </label>
          <br />
          <label>
            Property ID:
            <input type="number" value={propertyId}
              onChange={(event) => setPropertyId} />
          </label>
          <br />
          <label>
            Due back:
            <input type="date" value={dueBackDate}
              onChange={(event) => setDueBackDate} />
          </label>
          <br />
          <input type="submit" value="Checkout key" />
          <input type="button" value="Cancel"
            onClick={handleCancel}/>
        </form>
      </div>
    );
}
