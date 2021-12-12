const props = require('../config/project.config').props;
const {sendRequest} = require('./maazoomserver');

const findRestaurants = (req, res) => {
  sendRequest(req, res, '/api/restaurants', "GET");
};
module.exports = {findRestaurants};
