var vows = require('vows'),
	assert = require('assert'),
	helper = require('./helper.js'),
	index = require('../index.js'),
	exampleFeed = {'title':'Labnotes', 'type':'rss', 'htmlUrl':'http://labnotes.org/', 'xmlUrl':'http://labnotes.org/feed/atom/'};

/*

A user should be able to submit feeds and feed items with thir API key

A user should only see feeds and feed item associated with their account

A user should be able to get summary info about their account?
*/

vows.describe('User authentication').addBatch({
	'When as ask for all the feeds in JSON without authentication': {
		topic: function () {
			helper.get({'accept':'application/json'}, '/feeds', this.callback);
		},
		'we get an authentication error': function (topic) {
			assert.equal(topic.statusCode, 401);
		}
	},
	'When we try to GET the feedlist with a valid username and password': {
		topic: function () {
			helper.get({'accept':'application/json', 'authorization':helper.basicAuth('sgoodwin', 'poop')}, '/feeds', this.callback);
		},
		'we get a list of feeds': function (topic) {
			assert.isObject(topic.body);
			assert.isArray(topic.body.feeds);
		}
	}
}).export(module);
