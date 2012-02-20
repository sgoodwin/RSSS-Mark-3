// helper.js
// The general-purpose functions you'll need for a test like 'make a request'.

var assert = require('assert'),
	http = require('http'),
	querystring = require('querystring'),
	host = '0.0.0.0',
	port = 8080;

exports.assert_no_error = function(err){
	assert.isUndefined(err);
};

var basicAuth = function(username, password){
	username = username || '';
	password = password || '';
	var auth = 'Basic ' + new Buffer(username + ':' + password).toString('base64');
	return auth;
};
exports.basicAuth = basicAuth;
// For tests that aren't testing authentication, use a default account.
exports.jsonHeaders = {'accept':'application/json', 'authorization': basicAuth('sgoodwin', 'poop')};
exports.opmlHeaders = {'accept':'application/xml', 'authorization': basicAuth('sgoodwin', 'poop')};

var tryToJSON = function(body, response, callback){
	try{
		if(body.length > 0){
			response.body = JSON.parse(body);
			callback(null, response);
		}else{
			response.body = body;
			callback(null, response);			
		}
	}
	catch(err){
		response.body = body;
		callback(null, response);
	}
};

exports.get = function(headers, path, callback){
	var options = {
		host: host,
		port: port,
		path: path,
		headers: headers
	};
	http.get(options, function(res){
		var body = '';
		res.on('data', function (chunk){
			body += chunk;
		});
		res.on('end', function(){
			tryToJSON(body, res, callback);
		});
	}).on('error', function(e) {
		callback(e, "Failed");
	});
};

exports.put = function(headers, path, putValues, callback){
	var options = {
		host: host,
		port: port,
		path: path,
		headers: headers,
		method: 'PUT'
	};
	var request = http.request(options, function(res){
		var body = '';
		res.on('data', function (chunk){
			body += chunk;
		});
		res.on('end', function(){
			tryToJSON(body, res, callback);
		});
	});
	request.on('error', function(e) {
		callback(e, "Failed");
	});
	var put_data = JSON.stringify(putValues);
	request.write(put_data);
	request.end();
};

exports.post = function(headers, path, postValues, callback){
	var options = {
		host: host,
		port: port,
		path: path,
		headers: headers,
		method: 'POST'
	};
	var request = http.request(options, function(res){
		var body = '';
		res.on('data', function (chunk){
			body += chunk;
		});
		res.on('end', function(){
			tryToJSON(body, res, callback);
		});
	});
	request.on('error', function(e) {
		callback(e, "Failed");
	});
	var post_data = JSON.stringify(postValues);
	request.write(post_data);
	request.end();
};