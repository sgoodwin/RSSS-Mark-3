// Handles connecting to the proper Redis instance. This might

var redis = require("redis");
var url = process.env.REDIS_URL;

if(url){
	var parsedURL   = require("url").parse(url);
	var client = redis.createClient(parsedURL.port, parsedURL.hostname);
	client.auth(parsedURL.auth.split(":")[1]);
}else{
	var client = redis.createClient();
}

exports.db = db;