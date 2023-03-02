import React, { useState } from 'react';
import GameCard from './GameCard';

function SearchContainer({ data, setGame }) {
  console.log('in search container');
  console.log(data);
  const [page, setPage] = useState(1);

  const gameCards = data.map((game) => {
    return <GameCard key={game.id} game={game} setGame={setGame} />;
  });

  return (
    <div id="search-container">
      <h1>Search</h1>
      <div id="results">{gameCards}</div>
      <div id="page-buttons">
        <button onClick={() => setPage(page - 1)}>Previous</button>
        <p>{page}</p>
        <button onClick={() => setPage(page + 1)}>Next</button>
      </div>
    </div>
  );
}

export default SearchContainer;
