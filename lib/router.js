var url = require('url'),
	routes = {
		GET: {},
		POST: {},
		PUT: {}
	};
	
function get(path, handlerFunction, needsAuthorization){
	needsAuthorization = needsAuthorization || false;
	routes.GET[path] = {'function':handlerFunction, 'needsAuthorization':needsAuthorization};
}
exports.get = get;

function post(path, handlerFunction, needsAuthorization){
	needsAuthorization = needsAuthorization || false;
	routes.POST[path] = {'function':handlerFunction, 'needsAuthorization':needsAuthorization};
}
exports.post = post;

function put(path, handlerFunction, needsAuthorization){
	needsAuthorization = needsAuthorization || false;
	routes.PUT[path] = {'function':handlerFunction, 'needsAuthorization':needsAuthorization};
}
exports.put = put;

function route(request, response, auth){
	var pathname = url.parse(request.url).pathname;
	var method = request.method;
	
	var handle = routes[method][pathname];
	if(typeof handle.function === 'function'){
		if(handle.needsAuthorization){
			auth(request, response, handle.function);
		}else{
			handle.function(request, response);
		}
	}else{
		response.writeHead(400, {"Content-Type": "text/plain"});
		response.end("I DUNNO! :(");
	}
}
exports.route = route;

