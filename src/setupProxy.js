const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "http://8.210.136.102:8080/",
      changeOrigin: true,
      pathRewrite: {
        "^/api": "/",
      },
    })
  );
};
