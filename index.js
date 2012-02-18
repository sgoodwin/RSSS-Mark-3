var server = require("./lib/server");
var router = require("./lib/router.js");
var feedController = require("./lib/feedController.js");
var feedItemController = require("./lib/feedItemController.js");

router.get('/feeds', feedController.index);
router.post('/feeds', feedController.create);
router.get('/feedItems', feedItemController.index);
router.put('/feedItems', feedItemController.update);

server.start(router.route);
