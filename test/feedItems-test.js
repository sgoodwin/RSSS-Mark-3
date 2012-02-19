var vows = require('vows'),
    assert = require('assert'),
	helper = require('./helper.js'),
	index = require('../index.js');

vows.describe('FeedItem Requests').addBatch({
	'When as ask for all the feed items': {
		topic: function () {
			helper.get(helper.jsonHeaders, '/feedItems', this.callback);
		},
		'we get a 200 code back': function(topic){
			assert.equal(topic.statusCode, 200);
		},
        'we get all the feed items': function (topic) {
            assert.isObject(topic.body);
			assert.isNotNull(topic.body.feedItems);
        }
    },
	'When we try to update feeditems': {
		topic: function(){
			helper.put(helper.jsonHeaders, '/feedItems', {}, this.callback);
		},
		'we get a 200 code back': function(topic){
			assert.equal(topic.statusCode, 200);
		},
		'we get get a proper response': function(topic){
			assert.isEmpty(topic.body);
		}
	}
}).export(module);
