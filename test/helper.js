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

exports.request = function(path, params, callback){
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
			try{
				if(body.length > 0){
					var json = JSON.parse(body);
					res.body = json;
					callback(null, res);
				}else{
					res.body = body;
					callback(null, res);			
				}
			}
			catch(err){
				res.body = body;
				callback(err, res);
			}
		});
	}).on('error', function(e) {
		callback(e, "Failed");
	});
};

exports.post = function(path, params, postValues, callback){
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
			try{
				if(body.length > 0){
					var json = JSON.parse(body);
					res.body = json;
					callback(null, res);
				}else{
					res.body = body;
					callback(null, res);			
				}
			}
			catch(err){
				console.log('failed to parse json from: ' + body);
				callback(err, res);
			}
		});
	});
	request.on('error', function(e) {
		callback(e, "Failed");
	});
	var post_data = querystring.stringify(postValues);
	request.write(post_data);
	request.end();
};