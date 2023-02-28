import React from 'react';
import { useState, useEffect } from 'react';
import GameCard from './GameCard';

function Results({ collectionType, platform, resultsPage }) {
  const [gameList, setGameList] = useState([]);

  useEffect(() => {
    function renderGames(games) {
      const gameCards = games.map((game) => {
        return <GameCard key={game.id} game={game} platform={platform} />;
      });
      setGameList(gameCards);
      console.log(games);
    }

    switch (collectionType) {
      case 'all':
        fetch(
          `https://api.rawg.io/api/games?key=${process.env.REACT_APP_API_KEY}&platforms=${platform.id}&page=${resultsPage}&page_size=40&ordering=name`
        )
          .then((res) => res.json())
          .then((games) => {
            renderGames(games.results);
          });

        break;
      default:
        fetch(`http://localhost:3000/${collectionType}/${platform.id}`)
          .then((res) => res.json())
          .then((results) => {
            renderGames(results.games);
            console.log(results);
          });
    }
  }, []);

  return <div id="results">{gameList}</div>;
}
export default Results;
