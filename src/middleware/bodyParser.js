const bodyParser = require('body-parser');

// Create a middleware that combines JSON and urlencoded parsers
const parser = [
  bodyParser.json(),
  bodyParser.urlencoded({ extended: true })
];

// Wrapper middleware to handle multiple body parsers
const parseBody = async (req, res, next) => {
  try {
    // Execute all parsers in parallel using Promise.all
    await Promise.all(parser.map((parse) => new Promise((resolve, reject) => {
      parse(req, res, (err) => {
        if (err) reject(err);
        resolve();
      });
    })));
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = parseBody;
