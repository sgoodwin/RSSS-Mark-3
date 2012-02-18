var vows = require('vows'),
	assert = require('assert'),
	fs = require('fs'),
	opml = require('../opml.js'),
	async = require('async');
	
vows.describe('The OPML parser').addBatch({
	'When we try to parse an OPML file': {
		topic: function () {
			var callback = this.callback;
		
			fs.readFile('test/example-feed.opml', function(err, data){
				if(err){
					callback(err, null);
				}
				opml.parse(data.toString('utf8'), callback);
			});
		},
		'we get all the feed items': function (topic) {
			assert.isObject(topic);
			assert.isArray(topic.feeds.web);
			assert.equal(topic.feeds.web.length, 3);
			assert.equal(topic.feeds.javascript.length, 1);
		},
		'each feed in the web section has the necessary values': function (topic) {
			async.forEach(topic.feeds.web, function(item, callback){
				assert.isString(item.title);
				assert.isString(item.htmlUrl);
				assert.isString(item.xmlUrl);
				assert.isString(item.type);
			}, function(err){
				assert.isNull(err);
			});
		}
	},
}).export(module);
