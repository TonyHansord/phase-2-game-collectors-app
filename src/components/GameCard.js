import React from 'react';

function GameCard({ image, title }) {
  return (
    <div>
      <p>{title}</p>
      <img src={image} alt={title} title={title} width="400px" />;
    </div>
  );
}

export default GameCard;
