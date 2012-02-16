var http = require('http');
	url = require('url');

function start(paths, router){
	http.createServer(function (req, res) {
		var pathname = url.parse(req.url).pathname;
		
		router(paths, pathname, req, res);
		
		res.writeHead(200, {"Content-Type": "text/plain"});
		res.end("Welcome to the party! " + pathname);
	}).listen(8080);
}

exports.start = start;
