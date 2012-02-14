var http = require('http');
var redis = require("redis");
var util = require("util");

var url = process.env.REDIS_URL;
if(url){
	var rtg   = require("url").parse(url);
	var client = redis.createClient(rtg.port, rtg.hostname);
	client.auth(rtg.auth.split(":")[1]);
}else{
	var client = redis.createClient();
}

var requestListener = function (req, res) {
	res.writeHead(200);
	res.end("Welcome to the party, I am running " + client.server_info.redis_version);
};

var server = http.createServer(requestListener);
server.listen(8080);