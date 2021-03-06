import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Payments from './Payments';

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
				return [
				<li key="1"><Payments /></li>,
				<li key="3" style={{ margin: '0 10px' }}>
					Credits: {this.props.auth.credits}
				</li>,
				<li key="2"><a href="/api/logout">Logout</a></li>];
		}
	}

	render() {
		return(
			<nav>
			    <div className="nav-wrapper blue darken-2">
			      <Link 
			      	/*link to /surveys if this.props.auth is true, otherwise link to / */
			      	to={this.props.auth ? '/surveys' : '/'}
			      	className="left brand-logo"
			      	style={{ marginLeft: '20px' }}>Feedback App
			      </Link>
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