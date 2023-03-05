import React from 'react';
import GameCard from './GameCard';
import { SearchResults } from './SearchResults';

function SearchContainer({ data, setGame, page, setPage, title }) {
  console.log('in search container');

  const gameCards = data.map((game) => {
    return <GameCard key={game.id} game={game} setGame={setGame} />;
  });

  return (
    <div id="search-container">
      <h1>{title}</h1>
      <SearchResults cards={gameCards} />
      <div id="page-buttons">
        <button onClick={() => setPage(page - 1)}>Previous</button>
        <p>{page}</p>
        <button onClick={() => setPage(page + 1)}>Next</button>
      </div>
    </div>
  );
}

export default SearchContainer;
