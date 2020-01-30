import React from 'react';
import './keycheckout.css';

export default class KeyCheckout extends React.Component {
    constructor (props) {
        super(props);
        this.state={
            waspassed: props,
        };
        console.log(this.state.waspassed)
        this.render();
    }

    render() {
        return (
            <div className='keyCheckout'>
                {this.state.waspassed}
            </div>
        );
    }
}