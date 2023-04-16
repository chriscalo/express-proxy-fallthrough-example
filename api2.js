const express = require("express");
const { listen } = require("./util.js");
const ports = require("./ports.js");

const api = express();

api.get("/api2", (req, res, next) => {
  res.type("application/json");
  res.send(`Hello from API 2!`);
});

(async function main() {
  const { url } = await listen(api, ports.api2);
  console.log(`API 2 listening at ${url}`);
})();
