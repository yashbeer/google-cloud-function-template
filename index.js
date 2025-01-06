const middleware = require('./src/middleware');
const router = require('./src/routes');

exports.main = async (req, res) => {
  middleware(req, res, (_req, _res) => {
    router.handle(_req, _res);
  });
};
