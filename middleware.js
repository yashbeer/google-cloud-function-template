const middleware = async (req, res, next) => {
  try {
    /* === Write your middleware logic here === */

    auth(req, res, next)
  }
  catch(e) {
    return res.status(500).json({ error:{code:500, message:'Something went wrong at middleware'} })
  }
}

const auth = async (req, res, next) => {
  try {
    /* === Write your authentication logic here === */

    cors(req, res, next)
  }
  catch(e) {
    return res.status(401).json({ error:{code:401, message:'Unauthorized Access'} })
  }
}

const cors = async (req, res, next) => {
  try {
    res.set('Access-Control-Allow-Origin', '*')
    
    if (req.method === 'OPTIONS') {
      res.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
      res.set('Access-Control-Allow-Headers', 'Content-Type')
      res.set('Access-Control-Max-Age', '3600')
    }
    
    next(req, res) // go back to index function
  }
  catch(e) {
    return res.status(500).json({ error:{code:500, message:'Something went wrong at cors'} })
  }
}

module.exports = middleware
