const url = require('url');

const myUrl = new URL('http://mywebsite.com:8000/hello.html?id=100&status=active');

//Serialize URL
console.log(myUrl.href);
console.log(myUrl.toString);
// Host root domain
console.log(myUrl.host);
// Hostname (without ports)
console.log(myUrl.hostname);
// Path name
console.log(myUrl.pathname);
// Serialized query
console.log(myUrl.search);
// Param object
console.log(myUrl.searchParams);
// Add params
myUrl.searchParams.append('abc','123');
console.log(myUrl.searchParams);
// Loop through params
myUrl.searchParams.forEach((val, name)=>{
    console.log(`${val} - ${name}`);
});





