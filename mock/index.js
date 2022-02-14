var express = require('express');
var fs = require('fs');
var path = require('path');
var app = express();

var apiRouter = __dirname + '/api/';
fs.readdirSync(apiRouter).filter(f => f.endsWith('.js')).forEach(f => {
  var routePath = apiRouter + f;
  var routes = require(routePath);
  var routePrefix = f.split('.')[0];
  routes.forEach(route => {
    if(route.url != undefined) {
      var method = route.method || 'get';
      var url = `/${routePrefix}/${route.url}`;
      app[method](url, (req, res, next) => {
        res.json(route.data(req, res));
      });
    }
  });
  //app.use(['/api', routePrefix].join('/'), route);
});

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.listen('8000');