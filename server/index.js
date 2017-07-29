var express = require('express');
let bodyParser = require('body-parser');
let axios = require('axios');
let Repo = require('../database/index');

var app = express();

app.use(express.static(__dirname + '/../client/dist'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/repos/import', function (req, res) {
  console.log('post request received by server');
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
      .save((err, repo) => {
        if (err) {
          console.log('ME: error storing in server');
        }
        console.log('ME: success saving to database!!!');
        // TODO: start here

      });
      console.log('repo = :', repo);
    }
  })
  .then((response1) => {
    console.log('right before the repo.find');
    console.log('response1 = ', response1);
    Repo.find((err, repositories) => {
      // do magic here
      console.log('repositories after find() = ', repositories);
    });
  })
  .catch((err) => {
    console.log('error from github: ',err);
    // re-route back to search page with error message
  });
});



app.get('/repos', function (req, res) {

  console.log('response from app.get on the server side', res);
  Repo.find((err, repo) => {
    if (err) {
      return console.log('error', err);
    }
    console.log('repo that was returned ----------------------', repo);
  });
});

var port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

