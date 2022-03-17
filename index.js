const middleware = require('./middleware')
const functions = require('./functions')

exports.main = async(req, res) => {
  middleware(req, res, index) // middleware --> back to index function below
}

function index(req, res) {
  // Routes
  switch(req.url.split('/')[1]) {
    // https://google-cloud-function.com/
    case '': {
      functions.base(req, res)
      break
    }
    // https://google-cloud-function.com/hello
    case 'hello': {
      functions.hello(req, res)
      break
    }
    // https://google-cloud-function.com/no-match
    default: {
      functions.notFound(req, res)
    }
  }
}
