const {sendRequest} = require('./maazoomserver');

// const findUserDestinations = (req, res) => {
//   sendRequest(req, res, '/api/user/destinations?liuser='+req.params.email, "GET");
// };

const findUser = (req, res) => {
  sendRequest(req, res, '/api/user/get?liuser='+req.params.email, "GET");
};

// const saveUserDestination = (req, res) => {
//   sendRequest(req, res, '/api/user/destination?liuser='+req.params.email, "POST");
// };

// const deleteUserDestination = (req, res) => {
//   sendRequest(req, res, '/api/user/destination?id='+req.params.destinationId, "DELETE");
// };

const findTokens = (req, res) => {
  sendRequest(req, res, '/api/user/tokens', "GET");
};
const saveUser = (req, res) => {
  sendRequest(req, res, '/api/user/save', "POST");
};
module.exports = {findUser, saveUser, findTokens};

