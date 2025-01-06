const url = require('url');
const homeController = require('../controllers/homeController');
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
  async executeMiddleware(middlewares, req, res) {
    let index = 0;

    const next = async () => {
      if (index < middlewares.length) {
        const middleware = middlewares[index];
        index++;
        await middleware(req, res, next);
      }
    };

    await next();
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
          await this.executeMiddleware(route.middleware, req, res);
          
          // If response is already sent by middleware, don't proceed
          if (res.headersSent) return;
        }
        
        // Execute the route handler
        return route.handler(req, res);
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
      }
    }
    
    // No route found, return 404
    return homeController.notFound(req, res);
  }
}

module.exports = new Router(); 