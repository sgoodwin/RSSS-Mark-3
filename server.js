var http = require('http');

function start(route){
	http.createServer(function (req, res) {		
		route(req, res);		
	}).listen(8080);
}

exports.start = start;
