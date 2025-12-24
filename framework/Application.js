const http = require("http");
const EventEmitter = require("events");

module.exports = class Application {
  constructor() {
    this.emitter = new EventEmitter();
    this.server = this._createServer();
    this.middlewares = [];
  }

  use(middleware) {
    this.middlewares.push(middleware);
  }

  // endpoints = {
  //   '/users':{
  //     'GET':handler1,
  //     "DELETE": handler2,
  //     ...
  //   }
  // }

  addRouter(router) {
    const endpoints = router.endpoints;
    Object.keys(endpoints).forEach((endpoint) => {
      const path = endpoints[endpoint];
      Object.keys(path).forEach((method) => {
        this.emitter.on(this._getRouteMask(endpoint, method), (req, res) => {
          const handler = path[method];
          handler(req, res);
        });
      });
    });
  }

  listen(port, callback) {
    this.server.listen(port, callback);
  }

  _createServer() {
    return http.createServer((request, response) => {
      const { method, url } = request;
      let body = "";

      request.on("data", (chunk) => {
        body += chunk;
      });
      request.on("end", () => {
        if (body) {
          request.body = JSON.parse(body);
        }
        this.middlewares.forEach((middleware) => middleware(request, response));
        const emitted = this.emitter.emit(
          this._getRouteMask(request.pathname, method),
          request,
          response
        );
        if (!emitted) {
          response.end("api has not this endPoint");
        }
      });
    });
  }

  _getRouteMask(path, method) {
    return `[${path}]:[${method}]`;
  }
};
