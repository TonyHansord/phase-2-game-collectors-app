import React from 'react';
import { useState, useEffect } from 'react';
import GameCard from './GameCard';

function Results({ collectionType, platformID, platformSlug, resultsPage }) {
  const [gameList, setGameList] = useState([]);

  useEffect(() => {
    function renderGames(games) {
      const gameCards = games.map((game) => {
        return (
          <GameCard
            key={game.id}
            game={game}
            platform={platformID}
            platformSlug={platformSlug}
          />
        );
      });
      setGameList(gameCards);
      console.log(games);
    }

    switch (collectionType) {
      case 'all':
        fetch(
          `https://api.rawg.io/api/games?key=${process.env.REACT_APP_API_KEY}&platforms=${platformID}&page=${resultsPage}&page_size=40&ordering=-rating`
        )
          .then((res) => res.json())
          .then((games) => {
            renderGames(games.results);
          });

        break;
      default:
        fetch(`http://localhost:3000/${collectionType}/${platformID}`)
          .then((res) => res.json())
          .then((results) => {
            renderGames(results.games);
            console.log(results);
          });
    }
  }, [collectionType, platformID, resultsPage]);

  return <div id="results">{gameList}</div>;
}
export default Results;
