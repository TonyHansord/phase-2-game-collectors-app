import React from 'react';
import { useHistory } from 'react-router-dom';

function GameCard({ game, setGame }) {
  const { name, background_image, id } = game;
  const history = useHistory();

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

  function handleClick() {
    console.log(game);
    setGame(game);
    history.push(`/game/${id}`);
  }

  return (
    <div className="game-card" onClick={handleClick}>
      <p className="card-title">{name}</p>
      {gameImage}
    </div>
  );
}

export default GameCard;
