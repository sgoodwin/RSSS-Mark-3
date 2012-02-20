function index(request, response){
	response.writeHead(200, {"Content-Type": "application/json"});
	
	var content = {
		'feedItems': ['1234567890', '6666666666']
	}
	response.end(JSON.stringify(content));	
}
exports.index = index;

function update(request, response){
	response.writeHead(200, {"Content-Type": "application/json"});
	response.end();	
}
exports.update = update;
