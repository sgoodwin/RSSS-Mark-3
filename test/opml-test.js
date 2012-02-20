var vows = require('vows'),
	assert = require('assert'),
	fs = require('fs'),
	opml = require('../lib/opml.js'),
	async = require('async');
	
vows.describe('The OPML parser').addBatch({
	'When we try to parse the example-feed': {
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
			var length = topic.feeds.web.length;
			for(var i = 0; i < length; i++){
				var item = topic.feeds.web[i];
				assert.isString(item.title);
				assert.isString(item.htmlUrl);
				assert.isString(item.xmlUrl);
				assert.isString(item.type);
			}
		}
	}
}).addBatch({
	'When we try to parse the example-feed': {
		topic: function () {
			var callback = this.callback;
			fs.readFile('test/google-example-feed.xml', function(err, data){
				if(err){
					callback(err, null);
				}
				opml.parse(data.toString('utf8'), callback);
			});
		},
		'we get all the feed items': function (topic) {
			assert.isObject(topic);
			assert.isArray(topic.feeds.bands);
			assert.equal(topic.feeds.bands.length, 3);
			assert.equal(topic.feeds.appreviews.length, 2);
		},
		'each feed in the Bands section has the necessary values': function (topic) {
			var length = topic.feeds.bands.length;
			for(var i = 0; i < length; i++){
				var item = topic.feeds.bands[i];
				assert.isString(item.title);
				assert.isString(item.htmlUrl);
				assert.isString(item.xmlUrl);
				assert.isString(item.type);
			}
		},
		'each feed in the App Reviews section has the necessary values': function (topic) {
			var length = topic.feeds.appreviews.length;
			for(var i = 0; i < length; i++){
				var item = topic.feeds.appreviews[i];
				assert.isString(item.title);
				assert.isString(item.htmlUrl);
				assert.isString(item.xmlUrl);
				assert.isString(item.type);
			}
		}
	}
}).export(module);
