//Survey Field contains logic to render a single label
//and text input

import React from 'react';

export default ({ input, label }) => { //( {input} ) automatically looks onto the props object, pulls off the input property and assigns it to a variable called input
	//label is set in the SurveyForm component. survey title, subject line, email body, or recipient list
	// {...input} is equivalent to doing onBlur={input.onBlur} for every property of input 
	return (
		<div>
			<label>{label}</label>
			<input {...input}/>
		</div>
	);
};