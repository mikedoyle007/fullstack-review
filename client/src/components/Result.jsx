import React from 'react';

const Result = (props) => {
  return (
    <div>
      <br/>
      <li>
        repo: {props.repos.name}
      </li>
    </div>
  );
}

export default Result;

/*
  <br/>
  <p>repo: <a href={props.repos.url}>{props.repos.name}</a></p>
  <p>by: {props.repos.owner.login}</p>
  <p>{props.repos.description}</p>        

  this works: 

  return (
    <div>
      <br/>
      <li>
        repo: {props.repos.name}
      </li>
    </div>
  );
*/