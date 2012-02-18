var vows = require('vows'),
    assert = require('assert'),
	helper = require('./helper.js'),
	async = require('async'),
	http = require('http');
	
	// Example feed item: 
	// <outline text="Labnotes" description="" title="Labnotes" type="rss" version="RSS" 
	// htmlUrl="http://labnotes.org/" xmlUrl="http://labnotes.org/feed/atom/"/>

vows.describe('Feed Requests').addBatch({
    'When as ask for all the feeds': {
        topic: function () {
			helper.get('/feeds', this.callback);
        },
        'we get all the feeds': function (topic) {
            assert.isObject(topic.body);
			assert.isNotNull(topic.body.feeds);
        }
    },
	'When we try to post a new feed': {
		topic: function(){
			helper.post('/feeds', {}, this.callback);
		},
		'we get get a proper response': function(topic){
			assert.isEmpty(topic.body);
		}
	}
}).export(module);
