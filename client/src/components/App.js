import React, { Component } from 'react';
import { BrowserRouter, Route} from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

import Header from './Header';
import Landing from './Landing';

import Dashboard from './Dashboard';

import SurveyNew from './surveys/SurveyNew';


//the component is class based to get access to a lifecycle method that is called when it is rendered
class App extends Component {
	//lifecycle method to fetch the current user
	//this is the prefered location to make any initial AJAX requests
	componentDidMount() {
		this.props.fetchUser();
	}

	render() {
		return (
			//place browser routes, each specifies a relation between a possible address the user can visit, and a component to display
			//BrowserRouter can only have 1 child at most
			//exact means the path must be exactly the string in path="" to show the component
			//By default, the component will be shown if the string in path="" is included in the path
			//Header must always be visible
			<div className="container">
				<BrowserRouter>
					<div>
						<Header />
						<Route exact path="/" component={Landing} />
						<Route exact path= "/surveys" component={Dashboard} />
						<Route path="/surveys/new" component={SurveyNew} />	
					</div>
				</BrowserRouter>
			</div>
		);
	}
};

//once the actions are passed in, they are assigned to App as props
export default connect(null, actions)(App);