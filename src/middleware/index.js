const handleError = require('./errorHandler');
const securityHeaders = require('./securityHeaders');
const cors = require('./cors');
const bodyParser = require('./bodyParser');

/**
 * Middleware chain executor
 */
const middlewareChain = async (req, res, middlewares) => {
  let currentIndex = 0;

  const next = async (error) => {
    if (error) {
      return handleError(error, res);
    }

    const currentMiddleware = middlewares[currentIndex];
    currentIndex += 1;

    if (currentMiddleware) {
      try {
        await currentMiddleware(req, res, next);
      } catch (err) {
        return handleError(err, res);
      }
    }
    return undefined;
  };

  return next();
};

const middleware = (req, res, next) => {
  const middlewares = [
    securityHeaders,
    cors,
    bodyParser,
    next
  ];

  return middlewareChain(req, res, middlewares);
};

module.exports = middleware;
