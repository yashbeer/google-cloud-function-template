/**
 * Home controller handling base and status endpoints
 */

const getBase = (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify({
    message: 'Hello World',
    timestamp: new Date().toISOString()
  }));
};

const getStatus = (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify({
    status: 'ok',
    timestamp: new Date().toISOString()
  }));
};

module.exports = {
  getBase,
  getStatus,
}; 