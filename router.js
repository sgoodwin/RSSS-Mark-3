function route(paths, path, request, response){
	if(typeof paths[path] === 'function'){
		paths[path](request, response);
	}else{
		response.writeHead(400, {"Content-Type": "text/plain"});
		response.end("I DUNNO! :(");
	}
}
exports.route = route;