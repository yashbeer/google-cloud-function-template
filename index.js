const middleware = require('./middleware')
const functions = require('./functions')

exports.main = async(req, res) => {
  middleware(req, res, index) // go inside middleware and then be back here
}

function index(req, res) {
  // Routes
  switch(req.url.split('/')[1]) {

    case '': { // route - /
      functions.base(req, res)
      break
    }
    case 'hello': { // route - /hello
      functions.hello(req, res)
      break
    }
    default: { // route - when no match (404)
      functions.notFound(req, res)
    }

  }
}
