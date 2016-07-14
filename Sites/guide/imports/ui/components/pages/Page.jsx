import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

import Home from '/imports/ui/components/pages/Home.jsx';
import Guide from '/imports/ui/components/pages/Guide.jsx';
import NotFound from '/imports/ui/components/pages/NotFound.jsx';

export default class App extends TrackerReact( React.Component ) {
	
    renderPage( pageTitle ) {
    	
    	let Page;
    	
		switch( pageTitle ) {
			case 'home':
				Page  =  <Home/>;
				break;
			case 'guide':
				Page = <Guide />;
				break;
			case 'guide':
				Page = <NotFound />;
				break;
			default:
				console.log('Unknown name')
		}

		return Page;
    }

	render () {
		return (
			<div id='page-target'>
				{ this.renderPage( Session.get('page') ) } 
			</div>
		)
	}
}
