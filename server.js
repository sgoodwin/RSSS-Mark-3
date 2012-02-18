var http = require('http');

function start(route){
	http.createServer(function (request, response) {		
		var postData = "";
		
		request.setEncoding("utf8");
		request.addListener("data", function(postDataChunk) {
		  postData += postDataChunk;
		});
		
		request.addListener("end", function() {
			if(postData){
				request.body = JSON.parse(postData);
			}
			route(request, response);
		});
	}).listen(8080);
}
exports.start = start;