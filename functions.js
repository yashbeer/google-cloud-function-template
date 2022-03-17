const root = (req, res) => {
  // Your application logic comes here
  return res.status(200).json({ code: 200, message: 'This is your default route' })
}

const hello = (req, res) => {
  // Your application logic comes here
  return res.status(200).json({ code: 200, message: 'Hello world' })
}

const notFound = (req, res) => {
  return res.status(404).json({ code: 404, message: 'Not found' })
}

module.exports = {
  root,
  hello,
  notFound
}
