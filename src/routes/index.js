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
    this.get('/protected', [auth], homeController.getStatus);
  }

  /**
   * Register a GET route
   * @param {string} path - Route path
   * @param {Function|Array} middlewareOrHandler - Middleware array or handler function
   * @param {Function} [handler] - Handler function if middleware provided
   */
  get(path, middlewareOrHandler, handler) {
    if (Array.isArray(middlewareOrHandler)) {
      // If middleware array is provided
      this.routes.set(path, {
        method: 'GET',
        middleware: middlewareOrHandler,
        handler
      });
    } else {
      // If only handler is provided
      this.routes.set(path, {
        method: 'GET',
        middleware: [],
        handler: middlewareOrHandler
      });
    }
  }

  /**
   * Execute middleware chain for a route
   */
  static async executeMiddleware(middlewares, req, res) {
    let index = 0;

    const next = async () => {
      if (index < middlewares.length) {
        const middleware = middlewares[index];
        index += 1;
        return middleware(req, res, next);
      }
      return undefined;
    };

    return next();
  }

  async handle(req, res) {
    const parsedUrl = url.parse(req.url, true);
    const path = parsedUrl.pathname;

    // Add query parameters to request object
    req.query = parsedUrl.query;

    // Find the matching route
    const route = this.routes.get(path);

    if (route) {
      try {
        // Execute middleware chain if exists
        if (route.middleware.length > 0) {
          await Router.executeMiddleware(route.middleware, req, res);

          // If response is already sent by middleware, don't proceed
          if (res.headersSent) {
            return undefined;
          }
        }

        // Execute the route handler
        await route.handler(req, res);
        return undefined;
      } catch (error) {
        // Handle any errors in middleware or handler
        console.error('Route Error:', error);
        if (!res.headersSent) {
          res.statusCode = error.statusCode || 500;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({
            error: {
              code: error.statusCode || 500,
              message: error.message || 'Internal Server Error'
            }
          }));
        }
        return undefined;
      }
    }

    // No route found, return 404
    errorController.notFound(req, res);
    return undefined;
  }
}

module.exports = new Router();
