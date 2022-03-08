const express = require("express");
const proxy = require("express-http-proxy");
const { run, listen } = require("./util.js");
const ports = require("./ports.js");

(async function main() {
  console.log("Starting application…");
  run("npx", "node api1.js");
  run("npx", "node api2.js");
  
  const app = express();
  app.use((req, res, next) => { console.log("before API1"); next(); });
  app.use(proxy(`localhost:${ports.api1}`, {
    skipToNextHandlerFilter(proxyRes) {
      return proxyRes.statusCode === 404;
    },
  }));
  app.use((req, res, next) => { console.log("after API1"); next(); });
  app.use((req, res, next) => { console.log("before API2"); next(); });
  app.use(proxy(`localhost:${ports.api2}`, {
    skipToNextHandlerFilter(proxyRes) {
      return proxyRes.statusCode === 404;
    },
  }));
  app.use((req, res, next) => { console.log("after API2"); next(); });
  
  const { url } = await listen(app, ports.app);
  console.log(`Application listening at ${url}`);
  
})();
