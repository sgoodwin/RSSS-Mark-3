var server = require("./server");
var router = require("./router.js");
var feedController = require("./feedController.js");
var feedItemController = require("./feedItemController.js");

router.get('/feeds', feedController.index);
router.post('/feeds', feedController.create);
router.get('/feedItems', feedItemController.index);
router.put('/feedItems', feedItemController.update);

server.start(router.route);
