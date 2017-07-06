const http = require('http');
const _ = require('underscore');

const baseURL = 'http://unsqgreenmarket.grownyc.org/api/v1';

// CREATE A PROTOTYPE WITH A METHOD FOR CALLING THE GREENMARKET API, TAKING AN ENDPOINT AND API PARAMETERS AS ARGUMENTS
// TODO: SINCE THERE'S REALLY NO NEED TO INSTANTIATE NEW OBJECTS FOR EACH METHOD CALL, IT MIGHT BE BEST TO REWRITE THIS AS A PLAIN FUNCTION
const apiProto = {
  callAPI: function callAPI(endpoint, params) {
    return new Promise( function(resolve, reject) {
      let url = baseURL + endpoint;
      if (params) {
        url = url + params
      }
      console.log("Request sent to " + url + " ...");
      http.get(url, function(res) {
        let body = '';
        res.on('data', function(chunk){
          body += chunk;
        });
        res.on('end', function(){
          body = JSON.parse(body);
          console.log("Got a response from the marketday API");
          resolve(body);
        });
      }).on('error', function(e){
        console.log("Got an error: ", e);
      });
    })
  },
}

const apiFactory = function apiFactory(options) {
    return _.extend(Object.create(apiProto), options)
};

let api = apiFactory()

module.exports = api;
