import React from 'react';
import AddToButton from './AddToButton';

function GameCard({ game, platform, games, platformSlug }) {
  const { name, background_image } = game;
  return (
    <div className="game-card">
      <p className="card-title">{name}</p>
      <img
        className="card-image"
        src={background_image}
        alt={name}
        title={name}
      />
      <div className="btn-container">
        <AddToButton
          collectionType="collection"
          games={games}
          correspondingGame={game}
          platform={platform}
          platformSlug={platformSlug}
        />
        <AddToButton
          collectionType="wishlist"
          games={games}
          correspondingGame={game}
          platform={platform}
          platformSlug={platformSlug}
        />
      </div>
    </div>
  );
}

export default GameCard;
