import React from 'react';
import feedbackPic from '../img/feedback.jpg';
const Landing = () => {
	return(
		<div style={{ textAlign: 'center' }}>
			<h3>Collect feedback from your users</h3>
			<p className="description">Sign in with your Google account, create an email campaign, and view your feedback instantly!</p>
			<img src={feedbackPic} alt="feedbackPic" height="" width="100%"/>
			
			
		</div>
	);
}

export default Landing;