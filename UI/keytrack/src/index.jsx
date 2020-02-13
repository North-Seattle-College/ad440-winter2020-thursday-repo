import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'
import KeyCheckout from './components/keycheckout.jsx'


/*------------------------------------------------------------*/
// smaller elements
function SideMenuButton(props) {
	return(
        <button className='sideMenuButton'
                onClick={props.onClick}>
			{props.value}
		</button>
	);
} // end Square function component


/*------------------------------------------------------------*/
// root of the app, contains state 
class Home extends React.Component {
    /* ToDo: only add (and only render) menu items user is
       authorized by setting null when not authorized */
    constructor(props) {
            super(props);
            this.state={
            keyCheckout: 'Key Checkout',
        };
    }

    renderSideMenuButton(menuItem) {
        return(
            <SideMenuButton
                value={this.state.keyCheckout}
                onClick={() => this.handleSideMenuClick(menuItem)}
            />
        );
    }

    handleSideMenuClick(menuItem) {
        //alert('menu item: ' + menuItem + ' clicked.');
        new KeyCheckout(menuItem);
    }

    render() {
        return(
            <div className='home'>
                <div className='sideMenu'>
                    <h1>Side Menu</h1>
                    {this.renderSideMenuButton(this.state.keyCheckout)}
                </div>
                <div className='topBar'>
                    <h1>Top Bar</h1>
                </div>
                <div className='workingArea'>
                    <h1>Working Area</h1>
                </div>
            </div>
        );
    }
}

class Wrapper extends React.Component {
    render() {
        return (
            <div className='wrapper'>
                <Home />
            </div>
        );
    }
}
/*------------------------------------------------------------*/
// Render the document / build the DOM  
ReactDOM.render(
	<Wrapper />,
	document.getElementById('root')
);