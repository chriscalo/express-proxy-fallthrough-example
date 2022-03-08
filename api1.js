const express = require("express");
const { listen } = require("./util.js");
const ports = require("./ports.js");

const api = express();

api.get("/api1", (req, res, next) => {
  res.type("application/json");
  res.send(`Hello from API 1!`);
});

(async function main() {
  const { url } = await listen(api, ports.api1);
  console.log(`API 1 listening at ${url}`);
})();

