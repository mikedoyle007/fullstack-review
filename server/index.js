var express = require('express');
let bodyParser = require('body-parser');
let axios = require('axios');
let Repo = require('../database/index');

var app = express();

app.use(express.static(__dirname + '/../client/dist'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/repos/import', function (req, res) {
  let username = req.body.username;
  
  axios.get(`https://api.github.com/users/${username}/repos`)
  .then((response) => {
    for (var i = 0; i < response.data.length; i++) {
      let repo = new Repo({
        username: username,
        name: response.data[i].name,
        url: response.data[i].html_url,
        description: response.data[i].description,
        forks: response.data[i].forks
      })
      .save((err, response2) => {
        console.log('TRACE #1: in .save');
        if (err) {
          console.log('TRACE #2: inside error block');
          return console.log('###ME: error storing in server');
        }
        console.log('TRACE #3: just before res.send');
        // res.send(200);
      });
    }
  })
  .then(() => {
    res.send(200);
  })
  .catch((err) => {
    console.log('TRACE #4: inside catch error block');
    return console.log('###ERROR FROM GITHUB: ');
  });
});



app.get('/repos', function (req, res) {

  console.log('#2 GET REQ: response from app.get on the server side');
  Repo.find((err, response) => {
    if (err) {
      return console.log('error', err);
    }
    console.log('#3 GET REQ: response from database is successful');
    console.log('#4 GET REQ: response is: ', response[0]);
    // send back response
    res.send(response);
    console.log('#5 GET REQ: response was successfully send back');
  });
});

var port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

