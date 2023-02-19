import React from 'react';

function AddToButton({ collectionType }) {
  return (
    <button
      className="add-to-btn"
      id={collectionType}
      onClick={() => console.log(collectionType)}
    >
      Add to {collectionType}
    </button>
  );
}

export default AddToButton;
