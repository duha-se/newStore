const props = require('../config/project.config').props;
const {sendRequest} = require('./maazoomserver');

const findMeals = (req, res) => {
  sendRequest(req, res, '/api/meals/' + req.params.restaurantId, "GET");
};
module.exports = {findMeals};
