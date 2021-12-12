const {sendRequest} = require('./maazoomserver');
const findCities = (req, res) => {
  sendRequest(req, res, '/api/cities', "GET");
};
module.exports = {findCities};
