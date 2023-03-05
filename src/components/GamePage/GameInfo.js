import React from 'react';
import AddToButton from '../ResultsSection/AddToButton';

function GameInfo({ selectedGame, games }) {
  console.log(`in GameInfo`);
  console.log(selectedGame);

  const gamePlatforms = selectedGame.platforms.map(({ platform }) => {
    return (
      <div className="game-platform" key={platform.id}>
        <h1>{platform.name}</h1>
        <div className="btn-container">
          <AddToButton
            collectionType="collection"
            games={games}
            correspondingGame={selectedGame}
            platform={platform}
          />
          <AddToButton
            collectionType="wishlist"
            games={games}
            correspondingGame={selectedGame}
            platform={platform}
          />
        </div>
      </div>
    );
  });

  return (
    <div className="game-info">
      <div className="game-header">
        <img
          className="game-image"
          src={selectedGame.background_image}
          alt={selectedGame.name}
        />
        <h1 className="game-title">{selectedGame.name}</h1>
      </div>
      <div className="game-platforms">{gamePlatforms}</div>
    </div>
  );
}

export default GameInfo;
