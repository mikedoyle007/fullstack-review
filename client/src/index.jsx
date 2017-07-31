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
    axios.get('/repos')
      .then((response) => {
        this.setState({repos: response.data});
      })
      .catch((err) => {
        console.log('### ERROR = ME: error from axios.get repos', err);
      });
  };

  search (term) {
    console.log(`${term} was searched`);
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