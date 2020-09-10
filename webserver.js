var http = require('http');
var fs = require('fs');

http.createServer(function(request, response) {
    var prefixed_url = 'public_html'+ request.url;
    fs.stat(prefixed_url, function(bad_url, url_stat) {
        if (bad_url) respond(404);
        else {
            if (url_stat.isDirectory()) {
                if (request.url.slice(-1) !== '/') {
                    response.setHeader('Location', request.url +'/');
                    respond(301);
                }
                
                prefixed_url += '/index.html';
            }
            fs.readFile(prefixed_url, function(bad_filename, file_content) {
                if (bad_filename) respond(404);
                else respond(200, file_content)
            });
        }
    });
        
    function respond(http_status, file_content) {
        response.statusCode = http_status;
        //response.setHeader('Content-Type', 'text/html');
        response.end(file_content);
    }

}).listen(80, function(){ console.log('Node.js webserver is running!  [CTRL]+[C] to stop!') });
