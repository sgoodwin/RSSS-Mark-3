function index(request, response){
	response.writeHead(200, {"Content-Type": "application/json"});
	
	var content = {
		'feedItems': 'blah'
	};
	response.end(JSON.stringify(content));	
}
exports.index = index;

function update(request, response){
	response.writeHead(200, {"Content-Type": "application/json"});
	response.end();	
}
exports.update = update;
