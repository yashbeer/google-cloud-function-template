const index = (req, res) => {
  // Your application logic comes here
  return res.status(200).json({ code: 200, message: '/index' })
}

const hello = (req, res) => {
  // Your application logic comes here
  return res.status(200).json({ code: 200, message: '/hello' })
}

const notFound = (req, res) => {
  // Your application logic comes here
  return res.status(404).json({ code: 404, message: '/four-oh-four' })
}

module.exports = {
  index,
  hello,
  notFound
}
