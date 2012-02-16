var vows = require('vows'),
    assert = require('assert'),
	helper = require('./helper.js'),
	http = require('http');

vows.describe('FeedItem Requests').addBatch({
    'When as ask for all the feed items': {
        topic: function () {
			helper.get('/feedItems', {}, this.callback);
        },
        'we get all the feed items': function (topic) {
            assert.isObject(topic.body);
			assert.isNotNull(topic.body.feedItems);
        }
    },
	'When we try to update feeditems': {
		topic: function(){
			helper.put('/feedItems', {}, {}, this.callback);
		},
		'we get get a proper response': function(topic){
			assert.isEmpty(topic.body);
		}
	}
}).export(module);
