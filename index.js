var server = require("./server");
var router = require("./router.js");
var feedController = require("./feedController.js");

router.get('/feeds', feedController.index);
router.post('/feeds', feedController.create);

server.start(router.route);
