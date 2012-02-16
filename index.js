var server = require("./controllers/server");
var router = require("./controllers/router.js").route;
var requestHandlers = require("./controllers/requestHandlers.js");

var paths = {};
paths["/start"] = requestHandlers.start;
paths["/upload"] = requestHandlers.upload;

server.start(paths, router);