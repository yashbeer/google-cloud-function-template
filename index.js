const middleware = require('./src/middleware');
const router = require('./src/routes');

exports.main = async (req, res) => {
  middleware(req, res, (req, res) => {
    router.handle(req, res);
  });
};
