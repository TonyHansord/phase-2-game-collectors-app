import React, { useState } from 'react';
import GameCard from './GameCard';

function SearchContainer(data) {
  console.log(data);
  const [page, setPage] = useState(1);

  const gameCards = data.data.map((game) => {
    return <GameCard key={game.id} game={game} />;
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
