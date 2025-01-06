const bodyParser = async (req, res, next) => {
  if (['POST', 'PUT', 'PATCH'].includes(req.method)) {
    const buffers = [];

    for await (const chunk of req) {
      buffers.push(chunk);
    }

    const data = Buffer.concat(buffers).toString();
    
    try {
      req.body = data ? JSON.parse(data) : {};
    } catch (error) {
      throw { statusCode: 400, message: 'Invalid JSON body' };
    }
  }

  await next();
};

module.exports = bodyParser; 