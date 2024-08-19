const http = require('http');

let nextDogId = 1;

function getNewDogId() {
  const newDogId = nextDogId;
  nextDogId++;
  return newDogId;
}

const server = http.createServer((req, res) => {
  console.log(`${req.method} ${req.url}`);

  let reqBody = "";
  req.on("data", (data) => {
    reqBody += data;
  });

  // When the request is finished processing the entire body
  req.on("end", () => {
    // Parsing the body of the request
    if (reqBody) {
      req.body = reqBody
        .split("&")
        .map((keyValuePair) => keyValuePair.split("="))
        .map(([key, value]) => [key, value.replace(/\+/g, " ")])
        .map(([key, value]) => [key, decodeURIComponent(value)])
        .reduce((acc, [key, value]) => {
          acc[key] = value;
          return acc;
        }, {});
      console.log(req.body);
    }
    // Do not edit above this line

    // define route handlers here

    if(req.method === 'GET' && req.url === '/') {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.body = 'Dog Club';
        res.write(res.body);
        return res.end();
    }

    if(req.method === 'GET' && req.url === '/dogs') {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.body = 'Dogs index';
        res.write(res.body);
        return res.end();
    }

    // GET /dogs/new
    if(req.method === 'GET' && req.url === '/dogs/new') {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.body = 'Dog create form page';
        res.write(res.body);
        return res.end();
    }

    // POST /dogs
    if(req.method === 'POST' && req.url === '/dogs') {
        res.statusCode = 302;   // redirect
        // res.setHeader('Content-Type', 'text/plain');
        res.body = 'Dog create form page';
        res.write(res.body);
        return res.end();
    }

    // GET /dogs/:dogId
    if(req.method === 'GET' && req.url === '/dogs/:dogId') {
        // check if the URL path begins with /dogs
        if(req.url.startsWith('/dogs')) {
            let str = req.url.split('/');
            console.log(str);
            if(str.length === 3) dogId = str[2];
            console.log(dogId);
        }
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.body = `Dog details for dogId: ${dogId}`; // ({dogId} replaced with :dogId route parameter)'
        res.write(res.body);
        return res.end();
    }

    // POST /dogs/:dogId
    if(req.method === 'POST' && req.url === '/dogs/:dogId') {
        res.statusCode = 302;   // redirect
        // res.setHeader('Content-Type', 'text/plain');
        res.body = 'Dog create form page';
        res.write(res.body);
        return res.end();
    }

    // GET /dogs/:dogId/edit


    // Do not edit below this line
    // Return a 404 response when there is no matching route handler
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/plain');
    return res.end('No matching route handler found for this endpoint');
  });
});

const port = 5000;

server.listen(port, () => console.log('Server is listening on port', port));
