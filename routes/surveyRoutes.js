const requireLogin = require('../middlewares/requireLogin');

module.export = app => {
	app.post('/api/surveys', requireLogin, (req, res) => { //functions in this line are executed inline. the 3rd function will only execute when requireLogin is done

	});
};