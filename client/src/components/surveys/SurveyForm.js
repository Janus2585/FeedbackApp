//SurveyForm shows a form for a user to add input
import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import SurveyField from './SurveyField';
import { Link } from 'react-router-dom';
import validateEmails from '../../utilities/validateEmails';

var bgColors = { "Default": "#81b71a",
                    "Blue": "#00B1E1",
                    "Cyan": "#37BC9B",
                    "Green": "#8CC152",
                    "Red": "#E9573F",
                    "Yellow": "#F6BB42",
                    "Gray": "#f4f4f4"
	};

class SurveyForm extends Component {
	renderFields() {
		return(
			<div style={{ marginLeft: '30px', marginRight: '30px', marginBottom: '30px' }}>
				<Field key="title" label="Survey Title" type="text" name="title" component={SurveyField} />
				<Field key="subject" label="Subject Line" type="text" name="subject" component={SurveyField} />
				<Field key="body" label="Email Body" type="text" name="body" component={SurveyField} />
				<Field key="recipients" label="Recipient List" type="text" name="recipients" component={SurveyField} />
			</div>
		);
	}
	
	render() {
		return (
			<div style={{backgroundColor: bgColors.Gray}}>
				<form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}>
					{this.renderFields()}
					<Link to="/surveys" className="red btn-flat white-text">
						Cancel
					</Link>
					<button type="submit" className="teal btn-flat right white-text" style={{ marginRight: '' }}>
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

	errors.recipients = validateEmails(values.recipients || ''); // if values.recipients is undefined, the app won't crash because of the  || ''. This fixes the crash on startup

	if (!values.title) {
		errors.title = "You must provide a title."
	}
	if (!values.subject) {
		errors.subject = "You must provide a subject."
	}
	if (!values.body) {
		errors.body = "You must provide an email body."
	}
	if (!values.recipients) {
		errors.recipients = "You must provide a list of recipients."
	}

	
	return errors;
}

export default reduxForm({
	validate, //same as validate: validate;
	form: "surveyForm", //tells redux-form what to name the form values in the form reducer
	destroyOnUnmount: false //saves the form values between pages
})(SurveyForm);
