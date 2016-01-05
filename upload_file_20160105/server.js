//input the module
var http = require("http");
var url = require("url");
var formidable = require("formidable");
//set up a server
function start_server (route, handle){
	function onRequest(request, response){
		var pathname = url.parse(request.url).pathname;
		var postData = "";
    	console.log("Request for " + pathname + " received.");
    	// request.setEncoding("utf8");

	    // request.addListener("data", function(postDataChunk) {
		   //  postData += postDataChunk;
		   //  console.log("Received POST data chunk '"+ postDataChunk + "'.");
	    // });

	    // request.addListener("end", function() {
	    // 	route(handle, pathname, response, postData);
	    // });
		route(handle, pathname, response, request);

	}
	http.createServer(onRequest).listen(8888);
	console.log("Server has started!");
}
//output the function
exports.start = start_server;
