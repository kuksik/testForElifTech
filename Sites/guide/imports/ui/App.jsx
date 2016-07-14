import React from 'react';

import Navigation from './components/Navigation.jsx';
import Page from './components/pages/Page.jsx';
// import { render } from 'react-dom';
// import { createContainer } from 'meteor/react-meteor-data';

export default class App extends React.Component  {
	renderPageContent() {
		console.log(this.props.pageTitle)
		return <div> {this.props.pageTitle }</div>;
	}

	render () {
		return (
			<div className = 'App-target'>
				
				<Navigation/>

				{ this.renderPageContent( ) }

				<div className='footer-target'>
					footer
				</div>
			</div>
		)
	}
}
