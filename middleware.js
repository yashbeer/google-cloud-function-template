const middleware = async (req, res, next) => {
    try {
        console.log("Inside middleware")
        
        auth(req, res, next) // call auth
    }
    catch(e) {
        return res.status(500).json({ error:{code:500, message:'Something went wrong at middleware'} })
    }
}

const auth = async (req, res, next) => {
    try {
        console.log("Inside auth")
        
        cors(req, res, next) // call cors
    }
    catch(e) {
        return res.status(401).json({ error:{code:401, message:'Unauthorized Access'} })
    }
}

const cors = async (req, res, next) => {
    try {
        console.log("Inside cors")
        
        res.set('Access-Control-Allow-Origin', '*')
        if (req.method === 'OPTIONS') {
            // Set for OPTIONS requests
            res.set('Access-Control-Allow-Methods', 'GET');
            res.set('Access-Control-Allow-Headers', 'Content-Type');
            res.set('Access-Control-Max-Age', '3600');
        }
        
        next(req, res) // callback to index function
    }
    catch(e) {
         return res.status(500).json({ error:{code:500, message:'Something went wrong at cors'} })
    }
}

module.exports = middleware