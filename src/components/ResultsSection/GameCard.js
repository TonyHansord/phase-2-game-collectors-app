import React from 'react';
import AddToButton from './AddToButton';

function GameCard({ game, platform, games }) {
  const { name, background_image } = game;
  const gameImage =
    background_image !== null ? (
      <img
        className="card-image"
        src={background_image}
        alt={name}
        title={name}
      />
    ) : (
      <div className="card-image-missing">
        <h1>{name}</h1>
      </div>
    );

  return (
    <div className="game-card">
      <p className="card-title">{name}</p>
      {gameImage}
      {/* <div className="btn-container">
        <AddToButton
          collectionType="collection"
          games={games}
          correspondingGame={game}
          platform={platform}
        />
        <AddToButton
          collectionType="wishlist"
          games={games}
          correspondingGame={game}
          platform={platform}
        />
      </div> */}
    </div>
  );
}

export default GameCard;
