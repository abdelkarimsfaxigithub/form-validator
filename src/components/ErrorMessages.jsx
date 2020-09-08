import React from 'react';

function Error(props) {
  return (
    <React.Fragment>
    { (props.error && props.error.length) ? (   
    <div className="alert alert-danger" role="alert">
    <ul>
      { props.error && props.error.map((err,key)=>(
          <li key={key}>{err}</li>
          ))}
    </ul>
    </div>
    ):""}
    </React.Fragment>
  );
}
export default Error