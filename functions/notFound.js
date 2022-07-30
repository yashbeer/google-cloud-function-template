module.exports = (req, res) => { 
  return res.status(404).json({ code: 404, message: 'Not found' })
}
