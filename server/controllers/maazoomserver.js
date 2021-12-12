// const props = require('../config/project.config').props;
const axios = require('axios');
const sendRequest = (userRequest, userResponse, uri, method) => {
  try {
      //1738404538851
      if((method=='PUT' || method=='POST')){
        if (!Object.keys(userRequest.body).length || !validKey(userRequest)){
          userResponse.send('{"key":"good luck"}');
          return;
        }
      }else if(method=='DELETE' && !validKey(userRequest)){
        userResponse.send('{"key":"good luck"}');
        return;
      }

      const options = {
        url : 'https://'+ props.serverUrl + uri,
        headers: {
          'content-type': 'application/json',
          'content-key': ''+getKey(userRequest)+''
          },
        path: uri,
        data: userRequest.body,
        method: method
      };
      axios(options).then(response => {
          userResponse.send(response.data);
        },
        (error) => { 
          console.log(error); 
          userResponse.send('good luck!'); }
      );
  } catch (error) {
    userResponse.send('good luck');
  }
}
const validKey = (request) =>{
  let key = request.headers.goodluck || '';
  return (key.length == (25 + 13) );
}
const getKey = (request) =>{
  return request.headers.goodluck + Date.parse(new Date().toISOString());
}

/*const sendRequest = (req, res, uri, method) => {
    const options = {
      hostname : props.serverUrl,
      port: 443,
      path: uri,
      json: JSON.stringify(req.body),
      body: JSON.stringify(req.body),
      method: method,
    };
  let str = [];
  https.request(options, (response) => {
      response.on('data', (d) => {
        str = d;
      });
      response.on('end', () => {
        console.log('user data in this date range ' + str);
        res.send(str);
      });
    }).on('error', (e) => {
      console.error('An error has occurred when retrieving user data');
      console.error(e);
    }).end();
};*/
module.exports = {sendRequest}

