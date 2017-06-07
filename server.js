const path = require('path')
const express = require('express')
var basicAuth = require('basic-auth-connect');

module.exports = {
  app: function () {
    const app = express()
    const indexPath = path.join(__dirname, 'index.html')
    const publicPath = express.static(path.join(__dirname, '/src'))

    app.use(basicAuth('arbys', '@rby$'))

    app.get('*.js', function (req, res, next) {
  	  req.url = req.url + '.gz';
  	  res.set('Content-Encoding', 'gzip');
  	  next();
  	})

    app.get('/', function (_, res) { 
      res.sendFile(indexPath) 
    })

    app.use('/src', publicPath)

    return app
  }
}
