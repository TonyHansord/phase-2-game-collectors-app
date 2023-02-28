import React from 'react';

function CollectionSelect({ collectionType, clickHandler }) {
  return (
    <div className="collection-select">
      <button onClick={() => clickHandler('all')}>All</button>
      <button onClick={() => clickHandler('collection')}>Collection</button>
      <button onClick={() => clickHandler('wishlist')}>Wishlist</button>
    </div>
  );
}

export default CollectionSelect;
