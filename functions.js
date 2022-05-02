const base = (req, res) => {
  // Application logic for / route
  return res.status(200).json({ code: 200, message: 'This is your base route' })
}

const hello = (req, res) => {
  // Application logic for /hello route
  return res.status(200).json({ code: 200, message: 'Hello world' })
}

const notFound = (req, res) => {
  return res.status(404).json({ code: 404, message: 'Not found' })
}

module.exports = {
  base,
  hello,
  notFound
}
