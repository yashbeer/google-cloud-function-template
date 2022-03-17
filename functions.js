const index = (req, res) => {
  // Your application logic comes here
  return res.status(200).json({ code: 200, message: 'Success' })
}

const hello = (req, res) => {
  // Your application logic comes here
  return res.status(200).json({ code: 200, message: 'Success' })
}

module.exports = {
  index,
  hello,
}
