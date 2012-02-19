var authFunction = function(request, response, handlerFunction){
	var header = request.headers.authorization || '',        // get the header
		token = header.split(/\s+/).pop() || '',            // and the encoded auth token
		auth = new Buffer(token, 'base64').toString(),    // convert from base64
		parts = auth.split(/:/),                          // split on colon
		username = parts[0],
		password = parts[1];
	
	if(username && password){
		handlerFunction(request, response);
	}else{
		response.writeHead(401, "Not Authorized");
		response.end();
	}
};
exports.auth = authFunction;