var express = require('express');
let bodyParser = require('body-parser');
let axios = require('axios');

var app = express();

app.use(express.static(__dirname + '/../client/dist'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/repos/import', function (req, res) {
  // TODO
  console.log('post request received by server');
  // console.log('request is:', req.body);
  // GET request to github api
  // filter response to fit into db
  // check if in database
  // if in database update db
  // if not, then store in db
  let username = req.body.username;
  console.log('username = ', username);
  
  axios.get(`https://api.github.com/users/mikedoyle007/repos`)
  .then((response) => {
    // console.log('username is: ', username);
    // console.log('success!!!');
    console.log(response.data[0].name);

    // define vars for db
    // let username;
    // let repoName;
    // let url;
    // let description;
    // let forks;


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
  // TODO
  // upon app startup
  // read from db (top 25 repos)
  // POST response (top 25 repos) to client
});



var port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

