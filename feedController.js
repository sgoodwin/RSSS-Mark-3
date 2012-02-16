function index(request, response){
	response.writeHead(200, {"Content-Type": "application/json"});
	
	var content = {
		'f': 'else'
	};
	response.end(JSON.stringify(content));	
}
exports.index = index;

function create(request, response){
	response.writeHead(200, {"Content-Type": "application/json"});
	response.end();	
}
exports.create = create;