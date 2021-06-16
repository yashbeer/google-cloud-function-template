const axios = require('axios');
const middleware = require('./middleware');

exports.main = async(req, res) => {
    middleware(req, res, index); // middleware --> back to index function
};

function index(req, res) {
    try {
    	// write your application logic here
    	console.log("Inside index")
    	return res.status(200).json({ message:'Congratulations! it worked' });
		
	}
	catch(err) {
		console.log('error===>', err)
		return res.status(500).json({ error:{code:500, message:'Something went wrong while parsing the request'} });
	}
};
