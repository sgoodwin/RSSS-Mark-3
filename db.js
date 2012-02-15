var redis = require("redis");

var url = process.env.REDIS_URL;
if(url){
	var rtg   = require("url").parse(url);
	var client = redis.createClient(rtg.port, rtg.hostname);
	client.auth(rtg.auth.split(":")[1]);
}else{
	var client = redis.createClient();
}