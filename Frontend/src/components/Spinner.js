import React from 'react';

function Loading() {
  return (
    <div className="d-flex align-items-cente justify-content-centerr">
    <strong role="status">Loading...</strong>
    <div className="spinner-border ms-auto" aria-hidden="true"></div>
  </div>
  );
}

export default Loading;