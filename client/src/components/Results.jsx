import React from 'react';

// const Results = (props) => {
class Results extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <br/>
        <p>repo: <a href={this.props.repos[0].html_url}>{this.props.repos[0].name}</a></p>
        <p>by: {this.props.repos[0].owner.login}</p>
        <p>{this.props.repos[0].description}</p>
      </div>
    );
  }
}

export default Results;

// TODO: remove [0] when props are passed in for realsss