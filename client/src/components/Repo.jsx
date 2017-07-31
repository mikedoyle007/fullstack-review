import React from 'react';

const Repo = (props) => {

  return (
    <div>
      <br/>
      <div>
        <p>repo: <a href={props.repos.url}>{props.repos.name}</a></p>
        <p> by: {props.repos.username}</p>
        <p>description: {props.repos.description}</p>
      </div>
    </div>
  );
}

export default Repo;