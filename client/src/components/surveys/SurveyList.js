import React, { Component } from 'react';
//need to import redux because it needs to call the action creator to fetch the list of surveys
import { connect } from 'react-redux';
import { fetchSurveys } from '../../actions';

class SurveyList extends Component {
	componentDidMount() {
		this.props.fetchSurveys();
	}

	//helper method to render surveys
	renderSurveys() {
		return this.props.surveys.reverse().map(survey => {//reverse the order of surveys so they display from newest to oldest
			return (
				<div className="card indigo lighten-2" key={survey._id}>
					<div className="card-content white-text">
						<span className="card-title">{survey.title}</span>
						<p>
							{survey.body}
						</p>
						<p className="right">
							Sent On: {new Date(survey.dateSent).toLocaleDateString()}
						</p>
					</div>
					<div className="card-action">
						<a>Yes: {survey.yes}</a>
						<a>No: {survey.no}</a>
					</div>
				</div>
			);
		})
	}
	render() {
		return (
			<div>
				{this.renderSurveys()}
			</div>
		);
	}
}

function mapStateToProps({ surveys }) {
	return { surveys };
}

export default connect(mapStateToProps, { fetchSurveys })(SurveyList);