var vows = require('vows'),
	assert = require('assert'),
	helper = require('./helper.js'),
	index = require('../index.js'),
	async = require('async'),
	exampleFeed = {'title':'Labnotes', 'type':'rss', 'htmlUrl':'http://labnotes.org/', 'xmlUrl':'http://labnotes.org/feed/atom/'};

/*

A user should be able to submit feeds and feed items with thir API key

A user should only see feeds and feed item associated with their account

A user should be able to get summary info about their account?
*/

vows.describe('User authentication').addBatch({
	'When a user asks for all the feeds in JSON without authentication': {
		topic: function () {
			helper.get({'accept':'application/json'}, '/feeds', this.callback);
		},
		'we get an authentication error': function (topic) {
			assert.equal(topic.statusCode, 401);
		}
	},
	'When a user tries to GET the feedlist with a valid username and password': {
		topic: function () {
			helper.get({'accept':'application/json', 'authorization':helper.basicAuth('sgoodwin', 'poop')}, '/feeds', this.callback);
		},
		'we get a list of feeds': function (topic) {
			assert.isObject(topic.body);
			assert.isArray(topic.body.feeds);
		}
	},
	'When a user tries to submit a new feed without authentication': {
		topic: function () {
			var exampleFeed = {'title':'Labnotes', 'type':'rss', 'htmlUrl':'http://labnotes.org/', 'xmlUrl':'http://labnotes.org/feed/atom/'};
			helper.post({'accept':'application/json'}, '/feeds', {'feed':exampleFeed}, this.callback);
		},
		'we get an authentication error': function (topic) {
			assert.equal(topic.statusCode, 401);
		}
	},
	'When a user submits a feed with aunthentication': {
		topic: function () {
			var exampleFeed = {'title':'Labnotes', 'type':'rss', 'htmlUrl':'http://labnotes.org/', 'xmlUrl':'http://labnotes.org/feed/atom/'},
				headers = {'accept':'application/json', 'authentication': helper.basicAuth('sgoodwin', 'poop')};
				
			helper.post(headers, '/feeds', {'feed':exampleFeed}, this.callback);
		},
		'a different user should not see that feed in their list': function (topic) {
			var otherUserHeaders = {'accept':'application/json','authentication': helper.basicAuth('kisom', 'poop')};
			helper.get(otherUserHeaders, '/feeds', function(err, response){
				async.some(response.body.feeds, function(feed, truthCallback){
					return feed === topic.body.feed;
				}, function(result){
					assert.isFalse(result);
				});
			});
		}
	},
}).export(module);
