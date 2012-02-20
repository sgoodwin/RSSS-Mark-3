// RSSS Mark III by Samuel Goodwin. Fork away!

var server = require("./lib/server"),
	router = require("./lib/router.js"),
	auth = require("./lib/auth.js").auth,
	feedController = require("./lib/feedController.js"),
	feedItemController = require("./lib/feedItemController.js");

router.get('/feeds', feedController.index, true);
router.post('/feeds', feedController.create, true);
router.get('/feedItems', feedItemController.index, true);
router.put('/feedItems', feedItemController.update, true);

server.start(router.route, auth);
