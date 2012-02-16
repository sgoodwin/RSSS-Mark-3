function start(request, response){
	response.writeHead(200, {"Content-Type": "text/plain"});
	response.end("START");
	
}

function upload(request, response){
	response.writeHead(200, {"Content-Type": "text/plain"});
	response.end("UPLOAD");
}

exports.start = start;
exports.upload = upload;