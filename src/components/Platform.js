import React from 'react';

function Platform(props) {
  return (
    <div className="platform" onClick={() => props.clickHandler(props.id)}>
      <p>{props.name}</p>
    </div>
  );
}

export default Platform;
