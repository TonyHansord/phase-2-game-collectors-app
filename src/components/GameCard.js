import React from 'react';
import AddToButton from './AddToButton';

function GameCard({ image, title }) {
  return (
    <div className="game-card">
      <p className="card-title">{title}</p>
      <img className="card-image" src={image} alt={title} title={title} />
      <div className="btn-container">
        <AddToButton collectionType="collection" />
        <AddToButton collectionType="wishlist" />
      </div>
    </div>
  );
}

export default GameCard;
