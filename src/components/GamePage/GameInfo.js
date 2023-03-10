import React from 'react';
import AddToButton from './AddToButton';

function GameInfo({
  selectedGame,
  games,
  gameCollection,
  wishlist,
  updateCollection,
  updateWishlist,
}) {
  const gamePlatforms = selectedGame.platforms.map(({ platform }) => {
    const gameInCollection = gameCollection.some((col) => {
      const platformInCollection = col.platform_name === platform.slug;

      if (platformInCollection) {
        const isInCollection = col.games.some(
          (game) => game.slug === selectedGame.slug
        );

        if (isInCollection) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    });

    const gameInWishlist = wishlist.some((col) => {
      const platformInCollection = col.platform_name === platform.slug;

      if (platformInCollection) {
        const isInCollection = col.games.some(
          (game) => game.slug === selectedGame.slug
        );

        if (isInCollection) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    });

    return (
      <div className="game-platform">
        <h1>{platform.name}</h1>
        <div className="btn-container">
          <AddToButton
            collectionType="collection"
            games={games}
            correspondingGame={selectedGame}
            platform={platform}
            inCollection={gameInCollection}
            updateFunction={updateCollection}
          />
          <AddToButton
            collectionType="wishlist"
            games={games}
            correspondingGame={selectedGame}
            platform={platform}
            inCollection={gameInWishlist}
            updateFunction={updateWishlist}
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
