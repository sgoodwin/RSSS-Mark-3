function index(request, response){
	response.writeHead(200, {"Content-Type": "application/json"});
	
	var content = {
		'something': 'else'
	};
	
	response.end(JSON.stringify(content));	
}
exports.index = index;

function create(request, response){
	response.writeHead(200, {"Content-Type": "application/json"});
	
	var content = {
		'something': 'else'
	};
	
	response.end(JSON.stringify(content));	
}
exports.create = create;