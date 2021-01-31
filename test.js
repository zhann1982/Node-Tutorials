const fs = require('fs');
const http = require('http');
const url = require('url');

////////////////////////////////////////////////////////////

// FILES

// blocking sync
// const textIn = fs.readFileSync('./txt/input.txt', 'utf-8');
// console.log(textIn);

// const textOut = `Your last comment was: ${textIn}.\nCreated on ${Date.now()}`;
// fs.writeFileSync('./txt/output2.txt', textOut);
// console.log("file written");


// Non-blocking , async
// fs.readFile('./txt/start.txt', 'utf-8', (err, data1)=>{
//     if (err) return console.log('ERROR!: start.txt not found');

//     fs.readFile(`./txt/${data1}.txt`, 'utf-8', (err, data2)=>{
//         console.log(data2);
//         fs.readFile('./txt/append.txt', 'utf-8', (err, data3)=>{
//             console.log(data3);

//             fs.writeFile('./txt/final.txt', `${data2}\n${data3}`, 'utf-8', err => {
//                 console.log('file has been written!');
//             });
//         });
//     });
// });
// console.log('reading...');

//////////////////////////////////////////////////

// SERVER

const server = http.createServer( (req, res) => {
    
    const pathName  = req.url;

    if(pathName === '/overview' || pathName === '/') {
        res.end('This is the Overview');
    } else if (pathName === '/product') {
        res.end('This is the Product');
    }
    
});

server.listen(8000, '127.0.0.1', () => {
    console.log('Listening port 8000');
});

