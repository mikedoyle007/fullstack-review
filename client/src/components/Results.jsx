import React from 'react';

const Results = (props) => (
  <div>
  <br/>
    <p>repo: <a href="#">GitHub Fetcher</a></p>
    <p>by: mikedoyle007</p>
    <p>description</p>
  
    <br/>
    <p>repo: <a href="#">{props.repos[0].name}</a></p>
    <p>by: {props.repos[0].owner.login}</p>
    <p>{props.repos[0].description}</p>
  </div>
  
)

export default Results;

    /*
    <br/>
    <p><a href="#">{this.props.repo.name}</a></p>
    <p>{this.props.repo.owner.login}</p>
    <p>{this.props.repo.description}</p>
    */