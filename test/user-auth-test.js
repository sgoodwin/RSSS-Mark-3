var vows = require('vows'),
	assert = require('assert'),
	helper = require('./helper.js'),
	index = require('../index.js'),
	async = require('async'),
	userBHeaders = {'accept':'application/json','authorization': helper.basicAuth('kisom', 'poop')},
	userAHeaders = {'accept':'application/json', 'authorization':helper.basicAuth('sgoodwin', 'poop')},
	exampleFeed = {'title':'Labnotes', 'type':'rss', 'htmlUrl':'http://labnotes.org/', 'xmlUrl':'http://labnotes.org/feed/atom/'};
	
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
			helper.get(userAHeaders, '/feeds', this.callback);
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
				topicCallback = this.callback;
				
			helper.post(userAHeaders, '/feeds', {'feed':exampleFeed}, function(err, responseA){
				helper.get(userBHeaders, '/feeds', function(err, responseB){
					async.any(responseB.body.feeds, function(feed, truthCallback){
						truthCallback(feed === responseA.body.feed);
					}, function(result){
						topicCallback(null, result);
					});
				});
			});
		},
		'a different user should not see that feed in their list': function (topic) {
			assert.isFalse(topic);
		}
	},
	'When user A gets their feed list' : {
		topic: function (){
			var topicCallback = this.callback;
			var feedsToCompare = {};
			helper.get(userAHeaders, '/feeds', function(err, responseA){
				helper.get(userBHeaders, '/feeds', function(err, responseB){
					topicCallback(null, [responseA.body.feeds, responseB.body.feeds]);
				});
			});
		},
		'User B should not have the same feed list': function (topic) {
			assert.notDeepEqual(topic[0], topic[1]);
		}
	}
}).export(module);
