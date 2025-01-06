const bodyParser = async (req, res, next) => {
  if (['POST', 'PUT', 'PATCH'].includes(req.method)) {
    const buffers = [];

    req.on('data', (chunk) => {
      buffers.push(chunk);
    });

    await new Promise((resolve, reject) => {
      req.on('end', resolve);
      req.on('error', reject);
    });

    const data = Buffer.concat(buffers).toString();

    try {
      req.body = data ? JSON.parse(data) : {};
    } catch (error) {
      throw new Error('Invalid JSON body');
    }
  }

  await next();
};

module.exports = bodyParser;
