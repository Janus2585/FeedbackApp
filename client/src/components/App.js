import React from 'react';
import { BrowserRouter, Route} from 'react-router-dom';

//dummy components for testing
const Header = () => <h2>Header</h2>;
const Dashboard = () => <h2>Dashboard</h2>;
const SurveyNew = () => <h2>SurveyNew</h2>;
const Landing = () => <h2>Landing</h2>;
// end of dummy components

const App = () => {
	return (
		//place browser routes, each specifies a relation between a possible address the user can visit, and a component to display
		//BrowserRouter can only have 1 child at most
		<div>
			<BrowserRouter>
				<div>
					<Route path="/" component={Landing} />
				</div>
			</BrowserRouter>
		</div>
	);
};

export default App;