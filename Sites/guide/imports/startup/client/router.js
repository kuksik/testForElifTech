import React from 'react';
import ReactDOM from "react-dom";
import { mount } from 'react-mounter';
import { FlowRouter } from 'meteor/kadira:flow-router';

import { Meteor } from 'meteor/meteor'; 
import App from '/imports/ui/App.jsx';

mount(App);

FlowRouter.route( '/', {
	action() {
		ReactDOM.render( <App pageTitle='home'/>, document.getElementById('root') );
		// Session.set( { 'page': 'home' } );
	},
});

FlowRouter.route( '/:page', {
	action() {
		ReactDOM.render(<App pageTitle='home'/>,  document.getElementById('root'));
		// Session.set( { 'page': FlowRouter.getParam('page') } );
	},	
});

FlowRouter.notFound = {
	action() {
		ReactDOM.render(<App pageTitle='notFound'/>,  document.getElementById('root'));
		// Session.set( { 'page': 'notfound' } );
	}
};

