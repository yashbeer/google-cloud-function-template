const url = require('url');
const homeController = require('../controllers/homeController');
const errorController = require('../controllers/errorController');
const auth = require('../middleware/auth');

class Router {
  constructor() {
    this.routes = new Map();
    this.init();
  }

  init() {
    // Public routes
    this.get('/', homeController.getBase);
    this.get('/status', homeController.getStatus);

    // Protected routes (with auth middleware)
    this.post('/protected', [auth], homeController.getStatus);
  }

  /**
   * Register a route with any HTTP method
   * @param {string} method - HTTP method (GET, POST, PUT, DELETE)
   * @param {string} path - Route path
   * @param {Function|Array} middlewareOrHandler - Middleware array or handler function
   * @param {Function} [handler] - Handler function if middleware provided
   */
  route(method, path, middlewareOrHandler, handler) {
    const routeKey = `${method}:${path}`;
    if (Array.isArray(middlewareOrHandler)) {
      // If middleware array is provided
      this.routes.set(routeKey, {
        method,
        middleware: middlewareOrHandler,
        handler
      });
    } else {
      // If only handler is provided
      this.routes.set(routeKey, {
        method,
        middleware: [],
        handler: middlewareOrHandler
      });
    }
  }

  // Methods for common HTTP verbs
  get(path, middlewareOrHandler, handler) {
    return this.route('GET', path, middlewareOrHandler, handler);
  }

  post(path, middlewareOrHandler, handler) {
    return this.route('POST', path, middlewareOrHandler, handler);
  }

  put(path, middlewareOrHandler, handler) {
    return this.route('PUT', path, middlewareOrHandler, handler);
  }

  delete(path, middlewareOrHandler, handler) {
    return this.route('DELETE', path, middlewareOrHandler, handler);
  }

  /**
   * Execute middleware chain for a route
   */
  static async executeMiddleware(middlewares, req, res, finalHandler) {
    let index = 0;

    const next = async () => {
      if (index < middlewares.length) {
        const middleware = middlewares[index];
        index += 1;
        return middleware(req, res, next);
      }
      return finalHandler(req, res);
    };

    return next();
  }

  async handle(req, res) {
    const parsedUrl = url.parse(req.url, true);
    const path = parsedUrl.pathname;

    // Add query parameters to request object
    req.query = parsedUrl.query;

    // Find the matching route using method and path
    const routeKey = `${req.method}:${path}`;
    const route = this.routes.get(routeKey);

    if (route) {
      try {
        // Execute middleware chain if exists
        if (route.middleware.length > 0) {
          await Router.executeMiddleware(route.middleware, req, res, route.handler);
        } else {
          await route.handler(req, res);
        }
      } catch (error) {
        res.statusCode = error.statusCode || 500;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({
          error: {
            code: error.statusCode || 500,
            message: error.message || 'Internal Server Error'
          }
        }));
      }
    } else {
      errorController.notFound(req, res);
    }
  }
}

module.exports = new Router();
