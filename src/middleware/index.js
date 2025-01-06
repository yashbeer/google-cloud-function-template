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
    currentIndex++;

    if (currentMiddleware) {
      try {
        await currentMiddleware(req, res, next);
      } catch (err) {
        return handleError(err, res);
      }
    }
  };

  await next();
};

const middleware = async (req, res, next) => {
  try {
    await middlewareChain(req, res, [
      securityHeaders,
      cors,
      bodyParser
      // Add more middleware here if needed
    ]);

    if (!res.headersSent) {
      // Once all middleware pass, call the final handler
      await next(req, res);
    }
  } catch (error) {
    handleError(error, res);
  }
};

module.exports = middleware; 