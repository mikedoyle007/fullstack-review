var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

var repoSchema = mongoose.Schema({
  username: String,
  name: String,
  url: String,
  description: String,
  forks: Number 
});

var Repo = mongoose.model('Repo', repoSchema);

module.exports = Repo;