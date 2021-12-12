const props = require('../config/project.config').props;
const {sendRequest} = require('./maazoomserver');
const prodData = require("../prodJson.json");
const getAllProducts = (req, res) => {
  sendRequest(req, res, '/api/prod', "GET");
};

module.exports = {getAllProducts};
