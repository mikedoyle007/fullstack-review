let mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');
let findOrCreate = require('mongoose-find-or-create');

let repoSchema = mongoose.Schema({
  username: String,
  name: String,
  url: String,
  description: String,
  forks: Number 
});

repoSchema.plugin(findOrCreate);
let Repo = mongoose.model('Repo', repoSchema);

module.exports = Repo;