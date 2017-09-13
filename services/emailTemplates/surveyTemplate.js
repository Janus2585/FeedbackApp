const keys = require('../../config/keys'); // key is needed for redirect link

module.exports = survey => {
	return `
		<html>
			<body>
				<div style="text-align: center;">
					<p>${survey.body}</p>
					<div>
						<a href = "${keys.redirectDomain}/api/surveys/${survey.id}/yes">Yes</a>
					</div>
					<div>
						<a href = "${keys.redirectDomain}/api/surveys/${survey.id}/no">No</a>
					</div>
				</div>
			</body>
		</html>
	`;
};