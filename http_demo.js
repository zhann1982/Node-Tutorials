const http = require('http');

// Create server object
http.createServer((req,res)=>{
    // Write response
    res.setHeader('content-type', 'text/html')
    res.write('<h2>Server running...</h2>');
    res.end();
})
.listen(5000,()=>console.log('Server running...'));