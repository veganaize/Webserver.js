var http = require('http');
var fs = require('fs');

http.createServer(function(request, response) {
    // Remove query string
    var prefixed_path = 'public_html'+ request.url.slice(0,
            (request.url.indexOf('?')+1 || request.url.length+1) - 1);
    // Get info on path
    fs.stat(prefixed_path, function(bad_url, url_stat) {
        if (bad_url) respond(404);
        else {
            if (url_stat.isDirectory() && prefixed_path.slice(-1) !== '/') {
                response.setHeader('Location', prefixed_path.slice(11) +'/');
                respond(301);
                return;
            }
            
            if (prefixed_path.slice(-1) === '/') prefixed_path += 'index.html';
            fs.readFile(prefixed_path, function(bad_filename, file_content) {
                if (bad_filename) respond(404);
                else respond(200, file_content)
            });
        }
    });
        
    function respond(http_status, file_content) {
        response.statusCode = http_status;
        response.end(file_content);
    }
}).listen(80, function(){ console.log('Node.js webserver is running!  [CTRL]+[C] to stop!') });
