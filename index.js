var server = require("./server");
var router = require("./router.js").route;
var requestHandlers = require("./requestHandlers.js");

var paths = {};
paths["/start"] = requestHandlers.start;
paths["/upload"] = requestHandlers.upload;

server.start(paths, router);
