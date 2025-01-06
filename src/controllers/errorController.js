/**
 * Error controller handling error responses
 */

const notFound = (req, res) => {
  res.statusCode = 404;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify({
    error: {
      code: 404,
      message: 'Route not found'
    }
  }));
};

module.exports = {
  notFound
};
