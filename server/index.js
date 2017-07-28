var express = require('express');
let bodyParser = require('body-parser');

var app = express();

app.use(express.static(__dirname + '/../client/dist'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/repos/import', function (req, res) {
  // TODO
  console.log('post request received by server');
  console.log('request is:', req.body);
});

// app.post('/', (req, res) => {
//   console.log('request is: ', req);
//   res.send('success');
// });


app.get('/repos', function (req, res) {
  // TODO
});



var port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

