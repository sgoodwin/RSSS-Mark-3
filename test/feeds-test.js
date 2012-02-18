var vows = require('vows'),
    assert = require('assert'),
	helper = require('./helper.js'),
	async = require('async'),
	http = require('http'),
	opml = require('../lib/opml.js'),
	exampleFeed = {'title':'Labnotes', 'type':'rss', 'htmlUrl':'http://labnotes.org/', 'xmlUrl':'http://labnotes.org/feed/atom/'};
	
	// Example feed item: 
	// <outline text="Labnotes" description="" title="Labnotes" type="rss" version="RSS" 
	// htmlUrl="http://labnotes.org/" xmlUrl="http://labnotes.org/feed/atom/"/>

vows.describe('Feed Requests').addBatch({
    'When as ask for all the feeds in JSON': {
        topic: function () {
			helper.get('application/json', '/feeds', this.callback);
        },
        'we get all the feeds in json': function (topic) {
            assert.isObject(topic.body);
			assert.isArray(topic.body.feeds);
        }
    },
    'When we ask for all the feeds in OPML': {
		topic: function () {
			var callback = this.callback;
			helper.get('application/xml', '/feeds', function(err, result){
				opml.parse(result.body, callback);
			});
		},
		'we get all the feeds in OPML': function (topic) {
			assert.isObject(topic.feeds);
		}
    },
	'When we try to post a new feed': {
		topic: function(){
			helper.post('/feeds', {'feed':exampleFeed}, this.callback);
		},
		'we get get a proper response': function(topic){
			assert.isObject(topic.body);
			assert.isObject(topic.body.feed);
		},
		'the response includes the information about a feed we just fed in with a feedID': function(topic){
			assert.equal(topic.body.feed.title, exampleFeed.title);
			assert.equal(topic.body.feed.htmlUrl, exampleFeed.htmlUrl);
			assert.equal(topic.body.feed.xmlUrl, exampleFeed.xmlUrl);
			assert.equal(topic.body.feed.type, exampleFeed.type);
			assert.isString(topic.body.feed.feedID);
		}
	}
}).export(module);
