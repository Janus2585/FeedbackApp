//

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
class Header extends Component {
	renderContent() {
		switch(this.props.auth) {
			//login status pending
			case null:
				return;
			//not logged in
			case false: 
				return <li><a href="/auth/google">Login With Google</a></li>;
					
			//logged in
			default: 
				return <li><a href="/api/logout">Logout</a></li>;
		}
	}

	render() {
		return(
			<nav>
			    <div className="nav-wrapper">
			      <Link 
			      	/*link to /surveys if this.props.auth is true, otherwise link to / */
			      	to={this.props.auth ? '/surveys' : '/'}
			      	className="left brand-logo">Feedback App</Link>
			      <ul className="right">
			        {this.renderContent()}
			      </ul>
			    </div>
			</nav>
		);
	}
}
function mapStateToProps({ auth }) {
	return { auth };
}
export default connect(mapStateToProps) (Header);