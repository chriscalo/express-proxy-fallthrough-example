# express-http-proxy-bug
Minimal reproduction for bug in `express-http-proxy`

### Steps to reproduce:
1. Clone this repo and peek at [`start.js`](./start.js) to see that it's proxying to two APIs running in separate processes.
2. Install and run with `npm i && npm start`
3. Open [localhost:8000/api1](http://localhost:8000/api1) and notice that it correctly returns "Hello from API 1"
4. Next, open [localhost:8000/api2](http://localhost:8000/api2) and notice that a `404` is returned

### Observed result:
- It seems that when there's a sequence of `handleProxy(req, res, next)` functions, the first one works, but the second is broken.
- Try commenting out the line that proxies to API 1 (`app.use(proxyWithFallthrough(ports.api1));`) and notice that visiting `/api2` now works when it previously didn't.

### Expected result:
- I expect that if the first `handleProxy(req, res, next)` function returns a 404 response (because I'm using `skipToNextHandlerFilter()`), the next `handleProxy(req, res, next)` function should be able to respond.

### Notes
- there's a reason why I'm not able to prefix each proxy middleware with a single path `/api1` or `/api2`
