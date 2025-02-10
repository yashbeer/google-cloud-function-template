/**
 * Centralized error handler for middleware
 */
const handleError = (error, res) => {
  // Check if headers have already been sent
  if (res.headersSent) {
    // eslint-disable-next-line no-console
    console.error('Headers already sent, cannot send error response:', error);
    return;
  }

  const statusCode = error.statusCode || 500;
  const message = error.message || 'Internal Server Error';

  res.statusCode = statusCode;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify({
    error: {
      code: statusCode,
      message
    }
  }));
};

module.exports = handleError;
