import React from 'react';


/**
 * Provides component that will render a form and (eventually) provide
 * functionality to checkout a key from one keyholder to another.
 * Currently strictly renders a non-functional form and buttons.
 * 
 * Required props: none
 * 
 * Acceptted props:
 * keyId, the DB ID of a key or keybundle
 * dueBackDate, a date that will appear as the default due back date
 *   which must be given as an ISO 8601 date only string (ex: 2020-02-29)
 * 
 * @author Quincy Powell <Quincy.Powell@gmail.com>
 */
export default class KeyCheckout extends React.Component {
    constructor (props) {
        super(props);
        this.state = {keyId: this.props.keyId,
                      checkoutToId: "",
                      dueBackDate: this.props.dueBackDate };
    }

    /**
     * Processes the key checkout form data when form submit button pressed
     */
    handleSubmit = (event) => {
        /* ToDo: implement keycheckout event handler in later sprint */
        alert('KeyCheckout form submit button pressed.');
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
    handleKeyIdChange = (event) => {
        this.setState({keyId: event.target.value});
    }

    /**
     * Handles updates to form field for Checkout ID
     */
    handleCheckoutToChange = (event) => {
        this.setState({checkoutToId: event.target.value});
    }

    /**
     * Handles updates to form field for date due back
     */
    handleDueBackChange = (event) => {
        this.setState({dueBackDate: event.target.value});
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
                        <input type="text" value={this.state.keyId}
                               onChange={this.handleKeyIdChange} />
                    </label>
                    <br />
                    <label>
                        Checkout to:
                        <input type="text" value={this.state.checkoutToId}
                               onChange={this.handleCheckoutToChange} />
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
            </div>
        );
    }
}