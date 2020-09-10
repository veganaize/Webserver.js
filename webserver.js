var http = require('http');
var fs = require('fs');

http.createServer(function(request, response) {
    request.url = 'public_html'+ request.url;
    fs.stat(request.url, function(bad_url, url_stat) {
        if (bad_url) send_404();
        else {
            if (url_stat.isDirectory()) request.url += '/index.html';
            fs.readFile(request.url, check_and_send_file);
        }
    });
        
    function check_and_send_file(bad_filename, file_content) {
        if (bad_filename) {
            send_404();
        } else {
            send_file_content(file_content);
        }
    }

    function send_404() {
        response.statusCode = 404;
        response.end();
    }

    function send_file_content(file_content) {
        response.statusCode = 200;
        response.setHeader('Content-Type', 'text/html');
        response.end(file_content);
    }

}).listen(80, function(){ console.log('Node.js webserver is running!  [CTRL]+[C] to stop!') });
