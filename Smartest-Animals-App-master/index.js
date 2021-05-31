const fs = require('fs');
const http = require('http');
const url = require('url');

const replaceTemplate = require('./modules/replaceTemplate');

const tempOverview = fs.readFileSync(`${__dirname}/templates/template_overview.html`, 'utf-8');
const tempCard = fs.readFileSync(`${__dirname}/templates/template_card.html`, 'utf-8');
const tempAnimal = fs.readFileSync(`${__dirname}/templates/template_animal.html`, 'utf-8');

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataObj = JSON.parse(data);

const server = http.createServer((req, res) => {
  const { query, pathname } = url.parse(req.url, true);

  // Overview Page
  if (pathname === '/' || pathname === '/overview') {
    res.writeHead(200, { 'content-type': 'text/html' });

    const cardsHtml = dataObj.map((el) => replaceTemplate(tempCard, el)).join('');
    const output = tempOverview.replace('{%ANIMALS%}', cardsHtml);

    res.end(output);
  } else if (pathname === '/animal') {
    res.writeHead(200, { 'content-type': 'text/html' });

    const animal = dataObj[query.id];
    console.log(animal);
    const output = replaceTemplate(tempAnimal, animal);

    res.end(output);
  } else if (pathname === '/api') {
    res.writeHead(200, { 'content-type': 'application/json' });
    res.end(data);
  } else {
    res.writeHead(404, {
      'content-type': 'text/html',
      'my-own-header': 'hello-world',
    });
    res.end(`<h1>Page not found!</h1>`);
  }
});

server.listen(8000, '127.0.0.1', () => {
  console.log('Listening to requests on port 8000');
});
