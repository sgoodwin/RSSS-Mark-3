var vows = require('vows'),
    assert = require('assert'),
	helper = require('./helper.js'),
	http = require('http');

vows.describe('Feed Requests').addBatch({
    'When as ask for all the feeds': {
        topic: function () {
			helper.request('/feeds', {}, this.callback);
        },
        'we get all the feeds': function (topic) {
            assert.isObject(topic.body);
			assert.isNotNull(topic.body.feeds);
        }
    },
	'When we try to post a new feed': {
		topic: function(){
			helper.post('/feeds', {}, {}, this.callback);
		},
		'we get get a proper response': function(topic){
			assert.isEmpty(topic.body);
		}
	}
}).export(module);
