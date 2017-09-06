import React, { Component } from 'react';
import { BrowserRouter, Route} from 'react-router-dom';


import Header from './Header';
const Dashboard = () => <h2>Dashboard</h2>;
const SurveyNew = () => <h2>SurveyNew</h2>;
const Landing = () => <h2>Landing</h2>;

//the component is class based to get access to a lifecycle method that is called when it is rendered
class App extends Component {
	//lifecycle method to fetch the current user
	componentDidMount() {
		
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

export default App;