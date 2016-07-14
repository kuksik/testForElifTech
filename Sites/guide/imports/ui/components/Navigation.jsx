import React from 'react';

export default class Navigation extends React.Component{
	
	handleClick(event) {
		FlowRouter.go('/' + event.target.id);
	}

	render() {	
		return ( 
			<div className = 'navigation-target' onClick={this.handleClick.bind(this)}>	
				<div className='navigate-item' id='home'>Home</div>
				<div className='navigate-item' id='guide'>Guide</div>
			</div>

		)
	}
}
