const fs = require('fs');
const http = require('http');
const url = require('url');
const slugify = require('slugify');

const replaceTemplate = require('./modules/replaceTemplate');

//////////////////////////////////////////////////////////////////////////////////////
// Files

// Blocking synchronous way

// const textIn = fs.readFileSync('./txt/input.txt', 'utf-8');
// console.log(textIn);
// const textOut = `This is an include: ${ textIn }.\nCreated on ${Date.now()}`;
// fs.writeFileSync('./txt/output.txt', textOut);
// console.log('File has been written');

// Non-blocking asynchronous way

// fs.readFile('./txt/start.txt', 'utf-8', (err, data1) => {
//     if(err) return console.log('Error');
//     fs.readFile(`./txt/${data1}.txt`, 'utf-8', (err, data2) => {
//         // console.log(data2);
//         fs.readFile(`./txt/append.txt`, 'utf-8', (err, data3) => {
//             console.log(data3);
//             fs.writeFile('./txt/final.txt', `${data2}\n${data3}`, 'utf-8', err => {
//                 console.log("your file has been written");
//             })
//         });
//     });
// });
// console.log('Will read file');

//////////////////////////////////////////////////////////////////////////////////////
// Server


const tempOverview = fs.readFileSync(`${__dirname}/template/overview.html`, 'utf-8');
const tempCard = fs.readFileSync(`${__dirname}/template/template-card.html`, 'utf-8');
const tempProduct = fs.readFileSync(`${__dirname}/template/product.html`, 'utf-8');

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataObject = JSON.parse(data);

const slugs  = dataObject.map(el => slugify(el.productName, { lower : true}));
console.log(slugs);

const server = http.createServer((req, res) => {

    const { query, pathname } = url.parse(req.url, true);

    // Overview page
    if(pathname === '/' || pathname === '/overview')
    {
        res.writeHead(200, {'Content-type' : 'text/html'});

        const cardsHtml = dataObject.map(el => replaceTemplate(tempCard, el)).join('');
        const output = tempOverview.replace('{%PRODUCTS_CARDS%}', cardsHtml)
        res.end(output);
    }

    // Api page
    else if(pathname === '/api')
    {
        res.writeHead(200, {'Content-type' : 'application/json'});
        res.end(data);
    }

    // Product page
    else if(pathname === '/product')
    {
        const product = dataObject[query.id];
        res.writeHead(200, {'Content-type' : 'text/html'});
        const output = replaceTemplate(tempProduct, product);

        res.end(output);
    }

    // Not found page
    else {
        res.writeHead(404, {
            'Content-type'  : 'text/html',
            'my-own-header' : 'hello world'
        });
        res.end('<h1>Page not found!</h1>');
    }
    // res.end('Hello from the server!');
});

server.listen(8000, '127.0.0.1', () => {
    console.log('Listening to request on port 8000');
});