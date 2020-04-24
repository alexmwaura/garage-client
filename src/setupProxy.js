const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
        target: 'https://us-central1-auto-garage-ea474.cloudfunctions.net/',
        logLevel: 'debug',
        changeOrigin: true
    })
  );
};