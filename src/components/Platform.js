import React from 'react';

function Platform({ id, name, clickHandler }) {
  return (
    <div className="platform" onClick={() => clickHandler(id)}>
      <p>{name}</p>
    </div>
  );
}

export default Platform;
