//SurveyFormReview shows users their form inputs for review

//functional component
import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { withRouter } from 'react-router-dom';

const SurveyFormReview = ({ onCancel, formValues, submitSurvey, history }) => {
	return (
		<div>
			<h5>Please confirm your entries</h5>
			<div>
				<div>
					<label>Survey Title</label>
					<div>{formValues.title}</div>
				</div>
				<div>
					<label>Subject Line</label>
					<div>{formValues.subject}</div>
				</div>
				<div>
					<label>Email Body</label>
					<div>{formValues.body}</div>
				</div>
			</div>
			<button className="yellow darken-3 btn-flat white-text" onClick={onCancel}>
				Back
			</button>
			<button className="green btn-flat right white-text" onClick={() => submitSurvey(formValues, history)// () => is there to prevent it from running until the user clicks submit
				}>Send Survey<i className="material-icons right white-text">email</i>
			</button>
		</div>
	);
};

function mapStateToProps(state) {
	return { formValues: state.form.surveyForm.values};
}
export default connect(mapStateToProps, actions)(withRouter(SurveyFormReview));