http = require('http');
fs = require('fs')
let server = http.createServer();
server.on('request',(request, response) => {

    fs.readFile('./views/index.html', (err, data) => {
        if (err) {
            response.writeHead(404)
                response.end('sorry')
            
        } else {

            response.writeHead(200, {
                'Content-Type': 'text/html charset = utf-8'
            })
    
            response.end(data)
            
        }    
    })   
})
server.listen(3000)