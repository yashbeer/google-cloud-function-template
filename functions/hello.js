module.exports = (req, res) => {
  // Application logic for /hello route
  return res.status(200).json({ code: 200, message: 'Hello world' })
}
