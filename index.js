var server = require("./server");
var router = require("./router.js");
var requestHandlers = require("./requestHandlers.js");

router.get('/', requestHandlers.start);

server.start(router.route);
