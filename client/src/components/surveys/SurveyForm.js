//SurveyForm shows a form for a user to add input
import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import SurveyField from './SurveyField';
import { Link } from 'react-router-dom';
import validateEmails from '../../utilities/validateEmails';
class SurveyForm extends Component {
	renderFields() {
		return(
			<div>
				<Field key="title" label="Survey Title" type="text" name="title" component={SurveyField} />
				<Field key="subject" label="Subject Line" type="text" name="subject" component={SurveyField} />
				<Field key="body" label="Email Body" type="text" name="body" component={SurveyField} />
				<Field key="emails" label="Recipient List" type="text" name="emails" component={SurveyField} />
			</div>
		);
	}

	render() {
		return (
			<div>
				<form onSubmit={this.props.handleSubmit(values => console.log(values))}>
					{this.renderFields()}
					<Link to="/surveys" className="red btn-flat white-text">
						Cancel
					</Link>
					<button type="submit" className="teal btn-flat right white-text">
					Next<i className="material-icons right">done</i>
					</button>	
				</form>
			</div>
		);
	}
}

function validate(values) {
	//if redux-form sees that errors is empty, it assumes the entire form is valid
	//if errors had any values, the submission process is stopped until it is fixed
	const errors = {};

	errors.emails = validateEmails(values.emails || ''); // if values.emails is undifined, the app won't crash because of the  || ''. This fixes the crash on startup
	
	if (!values.title) {
		errors.title = "You must provide a title."
	}
	if (!values.subject) {
		errors.subject = "You must provide a subject."
	}
	if (!values.body) {
		errors.body = "You must provide an email body."
	}
	if (!values.emails) {
		errors.emails = "You must provide a list of recipients."
	}

	
	return errors;
}

export default reduxForm({
	validate, //same as validate: validate;
	form: "surveyForm"
})(SurveyForm);
