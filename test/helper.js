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

function tryToJSON(body, response, callback){
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
		callback(err, response);
	}
}

exports.get = function(path, callback){
	var options = {
		host: host,
		port: port,
		path: path,
		headers: {
			'accept': 'application/json'
		}
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

exports.put = function(path, putValues, callback){
	var options = {
		host: host,
		port: port,
		path: path,
		headers: {
			'accept': 'application/json'
		},
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

exports.post = function(path, postValues, callback){
	var options = {
		host: host,
		port: port,
		path: path,
		headers: {
			'accept': 'application/json'
		},
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