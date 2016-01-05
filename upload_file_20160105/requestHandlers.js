var exec = require("child_process").exec;
var querystring = require("querystring");
var fs = require("fs");
var formidable = require("formidable")

function start(response) {
	console.log("Request handler 'start' was called.");
	// var content = "empty";

	// exec("ls -lah", function (error, stdout, stderr) {
	// 	response.writeHead(200, {"Content-Type": "text/plain"});
	//     response.write(stdout);
	//     response.end();
	// });
	var body = 
	'<html>'+
	    '<head>'+
	    	'<meta http-equiv="Content-Type" content="text/html; '+
	    	'charset=UTF-8" />'+
	    '</head>'+
	    '<body>'+
	    	'<form action="/upload" enctype="multipart/form-data" method="post">'+
	    	'<input type="file" name="upload">'+
	    	'<input type="submit" value="Upload file" />'+
	    	'</form>'+
	    	'<form action="/show_data" method="post">'+
	    	// '<textarea name="text1" rows="5" cols="60"></textarea>'+
	    	// '<textarea name="text2" rows="5" cols="60"></textarea>'+
	    	'<input type="text" name="text1" />'+
	    	// '<input type="text" name="text2" />'+
	    	'<input type="submit" value="Upload data" />'+
	    	'</form>'
	    '</body>'+
    '</html>';
    response.writeHead(200, {"Content-Type": "text/html"});
    response.write(body);
    response.end();

}

function upload(response, request) {
	console.log("Request handler 'upload' was called.");
	// var body = 
	// '<html>'+
	//     '<head>'+
	//     	'<meta http-equiv="Content-Type" content="text/html; '+
	//     	'charset=UTF-8" />'+
	//     '</head>'+
	//     '<body>'+
	//     	'<div>You\'ve sent the text: '+ querystring.parse(request).text+ '</div>'+
	//     	'<a href= "/start">Go Back</a>'+
	//     '</body>'+
 //    '</html>';
 	var form = new formidable.IncomingForm();
	console.log("about to parse");
	form.parse(request, function(error, fields, files) {
	    console.log("parsing done");
	    fs.renameSync(files.upload.path, "/Users/randyko/Desktop/test.jpeg");
	    response.writeHead(200, {"Content-Type": "text/html"});
	    response.write("received image:<br/>");
	    response.write('<a href= "/start">Go Back</a>')
	    response.write("<img src='/show' />");
	    response.end();
	});
 //    response.writeHead(200, {"Content-Type": "text/html"});
	// response.write(body);
	// response.end();

}

function show(response) {
	console.log("Request handler 'show' was called.");
	fs.readFile("/Users/randyko/Desktop/test.jpeg", "binary", function(error, file) {
	    if(error) {
		    response.writeHead(500, {"Content-Type": "text/plain"});
		    response.write(error + "\n");
		    response.end();
	    } else {
		    response.writeHead(200, {"Content-Type": "image/png"});
		    response.write(file, "binary");
		    response.end();
	    }
  	});

}

function show_data(response, request){
	console.log("Request handler 'show_data' was called.");
	var form = new formidable.IncomingForm();
	form.parse(request, function(error, fields, files) {
	    console.log("parsing done");
	    console.log(fields);
	    response.writeHead(200, {"Content-Type": "text/html"});
	    response.write("<div>You\'ve sent the text1: "+ fields.text1+ "</div>");
	    response.write('<a href= "/start">Go Back</a>')
	    response.end();
	});

}

exports.start = start;
exports.upload = upload;
exports.show = show;
exports.show_data = show_data;