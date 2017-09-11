// Javascript regex 
const re = 	/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export default emails => {
	//emails is one long string of all the email addresses separated by a comma
	//invalidEmails is an array of the invalid emails with the commas and spaces removed 
	const invalidEmails = emails.split(",").map(email => email.trim()).filter(email => re.test(email) === false);

	if (invalidEmails.length) {
		return `These emails are invalid: ${invalidEmails}`;
	}
};
