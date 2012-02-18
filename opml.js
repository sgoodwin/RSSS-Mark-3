var sax = require("sax"),
	strict = true, // set to false for html-mode
	parser = sax.parser(strict);
		
var parse = function(data, callback){
	var object = {'feeds':{}};
	var currentFolder = 'main';
		
	parser.onerror = function (err) {
		callback(err, null);
	};
	// parser.ontext = function (text) {
		// This remains even though it's commented out to point out that we don't need it.
	// };
	parser.onopentag = function (node) {
		if(node.name === 'outline'){
			var attributes = node.attributes;
			if(attributes.type){
				var feed = {
					title: attributes.title,
					type: attributes.type,
					htmlUrl: attributes.htmlUrl,
					xmlUrl: attributes.xmlUrl,
				};
				if(!object.feeds[currentFolder]){
					object.feeds[currentFolder] = [];
				}
				object.feeds[currentFolder].push(feed);
			}else{
				currentFolder = attributes.title.toLowerCase().replace(' ', '');
			}
		}
	};
	// parser.onattribute = function (attr) {
		// This remains even though it's commented out to point out that we don't need it.
	// };
	parser.onend = function () {
		callback(null, object);
	};
	parser.write(data).close();
}
exports.parse = parse;