import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      repos: []
    }
    this.search = this.search.bind(this);
  }

  search (term) {
    console.log(`${term} was searched`);

    // POST 'term' to server
    axios.post('/repos/import', { username: term })
      .then((response) => {
      })
      .then(() => {
        console.log('YYYYYAAAAAAYYYYY');
      })
      .catch((err) => {
      })

    axios.get('/repos')
      .then((repos) => {
        console.log('ME: success from axios.get repos:', repos);
      })
      .catch((err) => {
        console.log('ME: error from axios.get repos', err);
      });
  }

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <RepoList repos={this.state.repos}/>
      <Search onSearch={this.search.bind(this)}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));