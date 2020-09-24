var fs = require('fs');

exports.process_content = function(callback) {
    return function(http_status, file_content, local_path) {
        var json_ = {};
        
        // Filenames to process
        if (local_path.slice(-5) === '.html' ||
                local_path.slice(-3) === '.js') {
            get_json_content();
        } else {
            callback(http_status, file_content);
        }
        
        function get_json_content() {
            // Get file list
            fs.readdir('./', function(error, files) {
                if (error) console.error('ERROR: '+ error);
                process_json_files(files);           
            });
        }
        
        function process_json_files(files) {
            for (var file of files) {
                if ( file.slice(-5) === '.json') {
                    fs.readFile(file, parse_json(file));
                }
            }
        }
        
        function parse_json(file) {
            return function(error, json_content) {
                if (error) console.error('ERROR: '+ error);
                //eval string into object with same name as file
                json_[file.slice(0, -5)] = JSON.parse(json_content);
                
                //TODO: handle 'function' object here
                
                process_template();
            }
        }
        
        function process_template() {
            file_content = file_content.toString();
            if (file_content[0] === '`') {
                file_content += '`';
                file_content = eval(file_content);
            }
            
            callback(http_status, file_content);
        }
    }
}