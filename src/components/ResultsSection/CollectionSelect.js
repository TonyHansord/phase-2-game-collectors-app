import React, { useState } from 'react';

function CollectionSelect({ clickHandler }) {
  const [activeButton, setActiveButton] = useState('all');

  return (
    <div className="results-buttons" id="collection-select">
      <button
        className={activeButton === 'all' ? 'active' : ''}
        onClick={(e) => {
          setActiveButton('all');
          clickHandler('all');
        }}
      >
        All
      </button>
      <button
        className={activeButton === 'collection' ? 'active' : ''}
        onClick={(e) => {
          setActiveButton('collection');
          clickHandler('collection');
        }}
      >
        Collection
      </button>
      <button
        className={activeButton === 'wishlist' ? 'active' : ''}
        onClick={(e) => {
          setActiveButton('wishlist');
          clickHandler('wishlist');
        }}
      >
        Wishlist
      </button>
    </div>
  );
}

export default CollectionSelect;
