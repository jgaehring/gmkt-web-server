const express = require('express');
const app = express();
const router = express.Router();
const request = require('request');

const api = require('./api')

// CREATING A BASIC VIEW IN .EJS DISPLAYING ALL PRODUCERS IN A LIST
api.callAPI('/market_day/producers').then(function(response) {
  let producerList = response.producers
    .map( (e) => e.name )
    .reduce( (acc, val) => acc = acc + val + "\n", "");
  router.get('/', function(req, res, next) {
    res.render('index', { title: "Express", producers: producerList });
  });
}).catch(function(reason) {
  console.log('Handle rejected promise ('+reason+') here.');
});


// REPLICATING ROUTES FROM ORIGINAL GREENMARKET API
router.get('/api/markets', (req, res) => {
  api.callAPI('/markets').then( response => {
    res.send(response)
  });
});

router.get('/api/today/producers', (req, res) => {
  api.callAPI('/market_day/producers').then( response => {
    res.send(response)
  });
});

router.get('/api/today/producers', (req, res) => {
  api.callAPI('/market_day/producers').then( response => {
    res.send(response)
  });
});

router.get('/api/producers/date/:date', (req, res) => {
  api.callAPI('/market_day/producers?date=', req.params.date).then( response => {
    res.send(response)
  });
});

router.get('/api/products', (req, res) => {
  api.callAPI('/products').then( response => {
    res.send(response)
  });
});

router.get('/api/today/products', (req, res) => {
  api.callAPI('/market_day/products').then( response => {
    res.send(response)
  });
});

router.get('/api/products/date/:date', (req, res) => {
  api.callAPI('/market_day/products?date=', req.params.date).then( response => {
    res.send(response)
  });
});

router.get('/api/products/:id', (req, res) => {
  api.callAPI('/products/', req.params.id).then( response => {
    res.send(response);
  })
})

router.get('/api/search/:query', (req, res) => {
  api.callAPI('/search?q=', req.params.query).then( response => {
    res.send(response);
  })
})

module.exports = router;
