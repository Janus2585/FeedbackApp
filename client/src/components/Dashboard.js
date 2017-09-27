import React from 'react';
import { Link } from 'react-router-dom'; // using react-router-dom here because we are working in the browser
import SurveyList from './surveys/SurveyList';
//functional component
const Dashboard = () => {
	return (
		<div>
			<SurveyList />
			<div className="fixed-action-btn">
			    <Link to="/surveys/new" className="btn-floating btn-large red">

			      	<i className="material-icons">add</i>

			    </Link>
			</div>
		</div>
	);
};

export default Dashboard;