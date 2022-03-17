module.exports = {
  default: async function (req, res) {
    return res.status(404).json({ code: 404, message: 'Bad URL' });
  },
  hello: async function (req, res) {
    return res.status(200).json({ code: 200, message: 'Success' })
  }
}