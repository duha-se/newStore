const props = require('../config/project.config').props;
const {sendRequest} = require('./maazoomserver');

const sendOrder = (req, res) => {
  sendRequest(req, res, '/api/order', "POST");
};
module.exports = {sendOrder};
