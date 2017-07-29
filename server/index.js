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
  // filter response to fit into db
  // check if in database
  // if in database update db
  // if not, then store in db
  let username = req.body.username;
  
  axios.get(`https://api.github.com/users/mikedoyle007/repos`)
  .then((response) => {
    for (var i = 0; i < response.data.length; i++) {
      let repo = new Repo({
        username: username,
        repoName: response.data[i].name,
        url: response.data[i].html_url,
        description: response.data[i].description,
        forks: response.data[i].forks
      })
      .save((err, repo) => {
        if (err) {
          console.log('ME: error storing in server');
        }
        console.log('ME: success saving to database!!!');
      });
    }
  })
  .then((response1) => {
    // read from database
    // filter results
    // pass back to client
    
  })
  .catch((err) => {
    console.log('error from github: ',err);
    // re-route back to search page with error message
  });
});

// app.post('/', (req, res) => {
//   console.log('request is: ', req);
//   res.send('success');
// });


app.get('/repos', function (req, res) {

  console.log('response from app.get on the server side', res);
  // TODO
  // upon app startup
  // read from db (top 25 repos)
  // POST response (top 25 repos) to client
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

