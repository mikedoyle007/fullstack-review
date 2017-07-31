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
        if (err) {
          return console.log('###ME: error storing in server');
        }
        // res.send(200);
      });
    }
  })
  .then(() => {
    res.send(200);
  })
  .catch((err) => {
    return console.log('###ERROR FROM GITHUB: ');
  });
});

app.get('/repos', function (req, res) {
  Repo.find((err, response) => {
    if (err) {
      return console.log('error', err);
    }
    res.send(response);
  });
});

var port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

