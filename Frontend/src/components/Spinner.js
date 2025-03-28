import React from 'react';

function Loading() {
  return (
    <div 
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        width: '100vw' // Ensure it covers the entire screen
      }}
    >
      <div className="text-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <strong style={{ marginLeft: '10px' }}>Loading...</strong>
      </div>
    </div>
  );
}

export default Loading;
