import React from 'react';

function Success(props) {
  return (
    <React.Fragment>
    { props.shouldRedirect && (   
    <div className="alert alert-success" role="alert">
        <span>All fields are filled in, you will be redirected after 1 second ...</span>
    </div>
    )}
    </React.Fragment>
  );
}
export default Success