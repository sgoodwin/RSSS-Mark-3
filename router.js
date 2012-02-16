var url = require('url'),
	routes = {
		GET: {},
		POST: {},
		PUT: {}
	};
	
function get(path, handlerFunction){
	routes.GET[path] = handlerFunction;
}
exports.get = get;

function post(path, handlerFunction){
	routes.POST[path] = handlerFunction;
}
exports.post = post;

function put(path, handlerFunction){
	routes.PUT[path] = handlerFunction;
}
exports.put = put;

function route(request, response){
	var pathname = url.parse(request.url).pathname;
	var method = request.method;
	
	if(typeof routes[method][pathname] === 'function'){
		routes[method][pathname](request, response);
	}else{
		response.writeHead(400, {"Content-Type": "text/plain"});
		response.end("I DUNNO! :(");
	}
}
exports.route = route;

