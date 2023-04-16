# express-proxy-fallthrough-example

An example of using proxy middleware for passing requests to another port or
address for handling. When a 404 is received, falls through to the next Express
handler.

## How it works:
1. Open at [`start.js`](./start.js) to see that it proxies requests to two APIs
running in separate processes.
2. Install and run via `npm i && npm start`
3. Open [localhost:8000/api1](http://localhost:8000/api1) and notice that it
correctly returns "Hello from API 1"
4. Next, open [localhost:8000/api2](http://localhost:8000/api2) and notice that
it correctly returns "Hello from API 2"

## Notes
- This means you're able to avoid forcing a path prefix like `/api1` or `/api2`
  onto each proxy server
