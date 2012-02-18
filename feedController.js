function index(request, response){
	response.writeHead(200, {"Content-Type": "application/json"});
	
	var aFeed = {'title':'Labnotes', 'type':'rss', 'htmlUrl':'http://labnotes.org/', 'xmlUrl':'http://labnotes.org/feed/atom/', 'feedID':'12345223434'};
	var content = {
		'feeds': [aFeed, aFeed, aFeed],
	};
	response.end(JSON.stringify(content));	
}
exports.index = index;

function create(request, response){
	response.writeHead(200, {"Content-Type": "application/json"});
	var feed = request.body.feed;
	feed.feedID = '123445553222';
	response.end(JSON.stringify({'feed':feed}));	
}
exports.create = create;