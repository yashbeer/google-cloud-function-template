const auth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader) {
      const error = new Error('No authorization header');
      error.statusCode = 401;
      throw error;
    }

    // Add your authentication logic here
    // For example, verify JWT token:
    // const token = authHeader.split(' ')[1];
    // const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // req.user = decoded;
    
    await next();
  } catch (error) {
    error.statusCode = error.statusCode || 401;
    error.message = error.message || 'Unauthorized Access';
    throw error;
  }
};

module.exports = auth; 