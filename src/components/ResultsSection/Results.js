import React from 'react';
import { useState, useEffect } from 'react';
import GameCard from './GameCard';
import { jsonDB } from '../../data/constants';

function Results({ collectionType, platform, resultsPage, setGame }) {
  const [gameList, setGameList] = useState([]);

  useEffect(() => {
    function renderGames(games) {
      const gameCards = games.map((game) => {
        return <GameCard key={game.id} game={game} setGame={setGame} />;
      });
      setGameList(gameCards);
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
        fetch(`${jsonDB}/${collectionType}/${platform.id}`)
          .then((res) => res.json())
          .then((results) => {
            renderGames(results.games);
          });
    }
  }, [collectionType, platform, resultsPage, setGame]);

  return <div id="results">{gameList}</div>;
}
export default Results;
