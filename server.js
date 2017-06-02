const path = require('path')
const express = require('express')

module.exports = {
  app: function () {
    const app = express()
    const indexPath = path.join(__dirname, 'index.html')
    const publicPath = express.static(path.join(__dirname, '/src'))

    app.use('/src', publicPath)
    app.get('/', function (_, res) { res.sendFile(indexPath) })
    app.get('*.js', function (req, res, next) {
	  req.url = req.url + '.gz';
	  res.set('Content-Encoding', 'gzip');
	  next();
	});

    return app
  }
}
