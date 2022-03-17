const middleware = require('./middleware')
const functions = require('./functions')

exports.main = async(req, res) => {
    middleware(req, res, index) // middleware --> back to index function
}

function index(req, res) {
	// routes
	switch(req.url.split('/')[1]) {
		case '': {
			functions.index(req, res)
			break
		}
		/*
			Example route: https://google-cloud-function.com/hello
		*/
		case 'hello': {
			functions.hello(req, res)
			break
		}
		default: {
			functions.notFound(req, res)
		}
	}
}
