//Stripe billing 
import React, { Component } from 'react';
import ReactStripeCheckout from 'react-stripe-checkout';
import { connect } from 'react-redux';
import * as actions from '../actions'

//Class based React component

class Payments extends Component {
	render() {

		return(
			<ReactStripeCheckout 
				name="Feedback App"
				amount={500} 
				description="$5.00 for 5 surveys"
				token={token => this.props.handleToken(token)} 
				stripeKey={process.env.REACT_APP_STRIPE_KEY} 
			>
				<button className="btn">
					Add Credits
				</button>
			</ReactStripeCheckout>
		);
	}
}

export default connect(null, actions)(Payments);