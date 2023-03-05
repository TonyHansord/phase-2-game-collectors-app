import React from 'react';
import AddToButton from '../ResultsSection/AddToButton';

function GameInfo({ selectedGame, games, gameCollection, wishlist }) {
  const gamePlatforms = selectedGame.platforms.map(({ platform }) => {
    console.log(platform.slug);

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

    console.log('game in collection = ' + gameInCollection);

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
          />
          <AddToButton
            collectionType="wishlist"
            games={games}
            correspondingGame={selectedGame}
            platform={platform}
            inCollection={gameInWishlist}
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
