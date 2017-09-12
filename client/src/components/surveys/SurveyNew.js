//SurveyNew shows SurveyForm and SurveyFormReview
import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import SurveyForm from './SurveyForm';
import SurveyFormReview from './SurveyFormReview';

//class based component
class SurveyNew extends Component {
	
	/*
	this is a shortcut using the create-react babel plugin
	It is identical to
	constructor(props) {
		super(props);

		this.state = { showFormReview: false };
	}
	*/
	state = { showFormReview: false };

	renderContent() {
		if (this.state.showFormReview){
			return <SurveyFormReview onCancel={() => this.setState({ showFormReview: false})}/>;
		}
		else{
			return<SurveyForm onSurveySubmit={() => this.setState({ showFormReview: true })}/>;
		}
	}

	render() {
		return (
			<div>
				{this.renderContent()}
			</div>
		);
	}
}

//if SurveyNew gets unmounted, then delete the form inputs
export default reduxForm({
	form: 'surveyForm'
})(SurveyNew);