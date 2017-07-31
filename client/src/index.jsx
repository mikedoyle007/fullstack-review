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

  componentDidMount() {
    console.log('COMPONENT DID MOUNT');
    axios.get('/repos')
      .then((response) => {
        console.log('#1 GET REQ: success from axios.get repos:');
        console.log('#6 GET REQ: response received back from get request');
        console.log('#7 GET REQ: response that was received is: ', response.data);

        this.setState({repos: response.data});
        console.log('#8 GET REQ: this.state.repos = ', this.state.repos);

      })
      .catch((err) => {
        console.log('### ERROR = ME: error from axios.get repos', err);
      });
  };

  search (term) {
    console.log(`${term} was searched`);

    // POST 'term' to server
    axios.post('/repos/import', { username: term })
      .then((response) => {
      })
      .catch((err) => {
      })
  }

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <RepoList repos={this.state.repos} />
      <Search onSearch={this.search.bind(this)} />
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));