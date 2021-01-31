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

const replaceTemplate = (temp, product) => {
    let output = temp.replace(/{%PRODUCTNAME%}/g, product.productName);
    output = output.replace(/{%IMAGE%}/g, product.image);
    output = output.replace(/{%PRICE%}/g, product.price);
    output = output.replace(/{%FROM%}/g, product.from);
    output = output.replace(/{%NUTRIENTS%}/g, product.nutrients);
    output = output.replace(/{%QUANTITY%}/g, product.quantity);
    output = output.replace(/{%DESCRIPTION%}/g, product.description);
    output = output.replace(/{%ID%}/g, product.id);

    if(!product.organic) output = output.replace(/{%NOTORGANIC%}/g, "not-organic");

    return output;
}


const tempOverview = fs.readFileSync(`${__dirname}/template/overview.html`, 'utf-8');
const tempCard = fs.readFileSync(`${__dirname}/template/template-card.html`, 'utf-8');
const tempProduct = fs.readFileSync(`${__dirname}/template/product.html`, 'utf-8');

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataObj = JSON.parse(data);

const server = http.createServer( (req, res) => {
    
    
    const pathName  = req.url;

    // Overview page
    if(pathName === '/overview' || pathName === '/') {

        res.writeHead(200, {'Content-type': 'text/html'});

        const cardsHtml = dataObj.map(el=>replaceTemplate(tempCard, el)).join('');
        const output = tempOverview.replace(/{%PRODUCT_CARDS%}/g, cardsHtml);

        res.end(output);
    
    // Product page
    } else if (pathName === '/product') {
        res.end('This is the Product');

    // API
    } else if (pathName === '/api') {

        // fs.readFile(`${__dirname}/dev-data/data.json`, 'utf-8', (err,data)=> {
        //     const productData = JSON.parse(data);
        //     //console.log(productData);
        //     res.writeHead(200, {'Content-type': 'application/json'});
        //     res.end(data);
        // });

        res.writeHead(200, {'Content-type': 'application/json'});
        res.end(data);

    // Not found 404
    } else {
        res.writeHead(404, { 
            'Content-type': 'text/html'
        });
        res.end('<h1>This page NOT FOUND</h1>');
    }

});

server.listen(8000, '127.0.0.1', () => {
    console.log('Listening port 8000');
});

