//SurveyForm shows a form for a user to add input
import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import SurveyField from './SurveyField';

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
					<button type="submit">Submit</button>
				</form>
			</div>
		);
	}
}

export default reduxForm({
	form: "surveyForm"
})(SurveyForm);
