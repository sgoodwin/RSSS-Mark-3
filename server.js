var http = require('http');

function start(){
	http.createServer(function (req, res) {
			res.writeHead(200, {"Content-Type": "text/plain"});
			res.end("Welcome to the party!");
	}).listen(8080);
}

exports.start = start;