module.exports = {
  
  hello: async function (req, res) {
    return res.status(200).json({ code: 200, message: 'Success' })
  },

  default: async function (req, res) {
    return res.status(404).json({ code: 404, message: 'Bad URL' });
  }
  
}