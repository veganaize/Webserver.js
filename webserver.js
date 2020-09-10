var http = require('http');
var fs = require('fs');

var server = http.createServer(function(request, response) {
        request.url = 'public_html/'+ request.url;
        fs.stat(request.url, function(bad_url, file) {
            if (bad_url) {
                response.statusCode = 404;
                response.end();
            }
            else if (file.isDirectory()) {                
                fs.readFile(request.url +'/index.html', function(bad_filename, file_content) {
                    if (bad_filename) {
                        response.statusCode = 404;
                        response.end();
                    } else {
                        response.statusCode = 200;
                        response.setHeader('Content-Type', 'text/html');
                        response.end(file_content);
                    }
                });
            } else {
                fs.readFile(request.url, function(bad_filename, file_content) {
                    if (bad_filename) {
                        response.statusCode = 404;
                        response.end();
                    } else {
                        response.statusCode = 200;
                        response.setHeader('Content-Type', 'text/html');
                        response.end(file_content);
                    }
                });
            }
        });  
}).listen(80, function(){ console.log('Node.js webserver is running!  [CTRL]+[C] to stop!') });
