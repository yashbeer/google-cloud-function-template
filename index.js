const axios = require('axios');
const middleware = require('./middleware');

exports.main = async(req, res) => {
    middleware(req, res, index); // middleware --> back to index function
};

function index(req, res){
	
	//routes
	switch(req.url.split('/')[1])
	{
		// https://google-cloud-function.com/hello
		case 'hello':
		{
			functions.hello(req, res);
			break;
		}
		default: 
		{
			functions.default(req, res);
		}
	}
};
