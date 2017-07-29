var express = require('express');
let bodyParser = require('body-parser');
let axios = require('axios');
let Repo = require('../database/index');

var app = express();

app.use(express.static(__dirname + '/../client/dist'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/repos/import', function (req, res) {
  console.log('#1 post route: post received by server!');
  let username = req.body.username;
  
  axios.get(`https://api.github.com/users/${username}/repos`)
  .then((response) => {
    console.log('#2 post route: axios.get entered, success!');
    for (var i = 0; i < response.data.length; i++) {
      let repo = new Repo({
        username: username,
        name: response.data[i].name,
        url: response.data[i].html_url,
        description: response.data[i].description,
        forks: response.data[i].forks
      })
      .save((err, response) => {
        if (err) {
          console.log('###ME: error storing in server', err);
        }
        console.log('#3 post route: repo saved to database, success!');
        console.log('#4 post route: repo =', response);
        response.end();
        // TODO: confirm this works properly
      });
    }
  })
  .catch((err) => {
    console.log('###ERROR FROM GITHUB: ',err);
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

