import React from 'react';
import { useState, useEffect } from 'react';
import GameCard from './GameCard';
import { jsonDB } from '../../data/constants';

function Results({ collectionType, platform, resultsPage, setGame }) {
  const [gameList, setGameList] = useState([]);
  const [totalGames, setTotalGames] = useState(0);

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
          `https://api.rawg.io/api/games?key=${process.env.REACT_APP_API_KEY}&platforms=${platform.id}&page=${resultsPage}&page_size=40`
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
            console.log(results);
            setTotalGames(results.games.length);
            renderGames(results.games);
          });
    }
  }, [collectionType, platform, resultsPage, setGame]);

  return (
    <div>
      <div id="results">{gameList}</div>
      {collectionType === 'all' ? null : <h2>{totalGames} games</h2>}
    </div>
  );
}
export default Results;
