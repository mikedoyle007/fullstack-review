import React from 'react';
import Result from './Result.jsx';

const RepoList = (props) => {

  return (
    <div>
      <h4> Repo List Component </h4>
      There are {props.repos.length} repos.
      <ul>
        {
          props.repos.map( repo => 
          <Result repos={repo} />
        )}
      </ul>
    </div>
  );
};

export default RepoList;