import React, { useEffect, useState } from 'react';
import GameCard from './GameCard';

function ResultsContainer({ selectedPlatform }) {
  const [gameList, setGameList] = useState([]);

  useEffect(() => {
    fetch(
      `https://api.rawg.io/api/games?key=${process.env.REACT_APP_API_KEY}&platforms=${selectedPlatform.id}&page_size=40&ordering=-rating`
    )
      .then((res) => res.json())
      .then((games) => {
        const gameCards = games.results.map((game) => {
          return (
            <GameCard
              key={game.id}
              image={game.background_image}
              title={game.name}
            />
          );
        });
        setGameList(gameCards);
      });
  }, [selectedPlatform.id]);

  return (
    <div id="results-container">
      <h1>{selectedPlatform.name}</h1>
      <div id="results">{gameList}</div>
      <div id="page-buttons">
        <button>Previous</button>
        <button>Next</button>
      </div>
    </div>
  );
}

export default ResultsContainer;
