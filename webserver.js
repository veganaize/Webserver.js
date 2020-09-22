var http = require('http');
var fs = require('fs');
//var template = require('./template');

http.createServer(function(request, response) {
    
    determine_local_path(
    check_path(
    check_file(
    //template.process_content(
    respond
    )))();

    function determine_local_path(callback) {
        return function() {
            callback('public_html'+ request.url.slice(0,
                    (request.url.indexOf('?')+1 || request.url.length+1) - 1));
        }
    }
    
    function check_path(callback) {
        return function(local_path) {
            fs.stat(local_path, function(bad_path, url_stat){
                if (bad_path) {
                    respond(404);
                    return;
                }
            
                // apply trailing slash
                if (url_stat.isDirectory() && local_path.slice(-1) !== '/') {
                    response.setHeader('Location', local_path.slice(11) +'/');
                    respond(301);
                    return;
                }
            });
            
            callback(local_path);
        }
    }
    
    function check_file(callback) {
        return function(local_path) {
            if (local_path.slice(-1) === '/') {
                local_path += 'index.html';
            }

            fs.readFile(local_path, function(bad_file, file_content) {
                if (bad_file) respond(404);
                else callback(200, file_content, local_path);
            });
        }
    }

    function respond(http_status, file_content) {
        response.statusCode = http_status;
        response.end(file_content);
    }

}).listen(80, function(){ console.log('Node.js webserver is running!  [CTRL]+[C] to stop!') });