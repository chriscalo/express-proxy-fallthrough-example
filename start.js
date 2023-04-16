const express = require("express");
const { createProxyMiddleware, responseInterceptor } = require("http-proxy-middleware");
const { run, listen } = require("./util.js");
const ports = require("./ports.js");

console.log(createProxyMiddleware, responseInterceptor);

(async function main() {
  console.log("Starting application…");
  run("npx", "node api1.js");
  run("npx", "node api2.js");
  
  const app = express();
  app.use(proxyWithFallthrough(ports.api1));
  app.use(proxyWithFallthrough(ports.api2));
  app.use((req, res, next) => {
    res.send("Fallthrough!");
  });
  
  const { url } = await listen(app, ports.app);
  console.log(`Application listening at ${url}`);
  
})();

function proxyWithFallthrough(port) {
  const reqNextMap = new WeakMap();
  
  const proxy = createProxyMiddleware({
    target: `http://localhost:${port}`,
    changeOrigin: true, // for vhosted sites
    selfHandleResponse: true,
    
    onProxyRes(proxyRes, req, res) {
      if (proxyRes.statusCode === 404) {
        const next = reqNextMap.get(req);
        return next();
      } else {
        proxyRes.pipe(res);
      }
    },
  });
  
  return function handle(req, res, next) {
    reqNextMap.set(req, next);
    return proxy(req, res, next);
  };
}
