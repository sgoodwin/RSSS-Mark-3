function index(request, response){
	var accept = request.headers.accept,	
		aFeed = {'title':'Labnotes', 'type':'rss', 'htmlUrl':'http://labnotes.org/', 'xmlUrl':'http://labnotes.org/feed/atom/', 'feedID':'12345223434'},
		content = {
		'feeds': [aFeed, aFeed, aFeed],
	};
	
	response.writeHead(200, {"Content-Type": accept});
	if(accept === 'application/json'){
		response.end(JSON.stringify(content));
	}
	
	if(accept === 'application/xml'){
		response.end('<xml>Hello, <who name="world">world</who>!</xml>');
	}
}
exports.index = index;

function create(request, response){
	response.writeHead(200, {"Content-Type": "application/json"});
	var feed = request.body.feed;
	feed.feedID = '123445553222';
	response.end(JSON.stringify({'feed':feed}));	
}
exports.create = create;