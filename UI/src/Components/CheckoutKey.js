import React from 'react';
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
export default class CheckoutKey extends React.Component {
    constructor (props) {
        super(props);
        this.state = {keyholderId: this.props.keyholderId,
                      keybundleId: this.props.keybundleId,
                      propertyId: this.props.propertyId,
                      dueBackDate: this.props.dueBackDate };
    }

    /**
     * Generate a PUT request to our API to checkout a key
     * @param keyholderId - the keyholder ID as it appears in the DB
     * @param keybundleId - the keybundle ID as it appears in the DB
     * @param propertyId - the property ID as it appears in the DB
     * @param dueBackDate - the date the key is expected back. Use ISO
     */
    checkoutKey = (keyholderId, keybundleId, propertyId, dueBackDate) => {
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
    handleSubmit = (event) => {
        /* ToDo: implement keycheckout event handler in later sprint */
        //alert('KeyCheckout form submit button pressed.');
        this.checkoutKey(
            this.state.keyholderId,
            this.state.keybundleId,
            this.state.propertyId,
            this.state.dueBackDate
        );
        event.preventDefault();
    }
    
    /**
     * Processes user initiated cancellation of this form.
     */
    handleCancel = () => {
        /* ToDo: implement cancel behavior - cleanup anything necessary
           then hide or destroy this element */
        alert('cancel button pressed.');
    }

    /**
     * Handles updates to form field for Key ID
     */
    handleKeybundleIdChange = (event) => {
        this.setState({keybundleId: event.target.value});
    }

    /**
     * Handles updates to form field for Checkout ID
     */
    handleCheckoutToChange = (event) => {
        this.setState({keyholderId: event.target.value});
    }

    /**
     * Handles updates to form field for Property ID
     */
    handlePropertyIdChange = (event) => {
        this.setState({propertyId: event.target.value})
    }

    /**
     * Handles updates to form field for date due back
     */
    handleDueBackChange = (event) => {
        this.setState({dueBackDate: event.target.value});
    }

    /**
     * Get all the KeybundleId's, this is for early development & demo
     */
    getAllKeyholderIds = () => {
        /* ToDo: Implement this when the API for it is written*/
        console.log('Phasers on stun, good luck. Kirk out.')
    }

    /**
     * Required render method for React to create and draw elements from components
     */
    render() {
        return (
            <div className='keyCheckout'>
                <form onSubmit={this.handleSubmit} >
                    <legend>Check-out keys:</legend>
                    <label>
                        Key ID (tag):
                        <input type="text" value={this.state.keybundleId}
                               onChange={this.handleKeybundleIdChange} />
                    </label>
                    <br />
                    <label>
                        Checkout to:
                        <input type="text" value={this.state.keyholderId}
                               onChange={this.handleCheckoutToChange} />
                    </label>
                    <br />
                    <label>
                        Property ID:
                        <input type="text" value={this.state.propertyId}
                               onChange={this.handlePropertyIdChange} />
                    </label>
                    <br />
                    <label>
                        Due back:
                        <input type="date" value={this.state.dueBackDate}
                            onChange={this.handleDueBackChange} />
                    </label>
                    <br />
                    <input type="submit" value="Checkout key" />
                    <input type="button" value="Cancel"
                         onClick={this.handleCancel}/>
                </form>
                <button onClick={this.getAllPropertyIds}>
                    Get all property information
                </button>
                <br />
                <button onClick={this.getAllKeybundleIds}>
                    Get all key bundle information
                </button>
            </div>
        );
    }
}
