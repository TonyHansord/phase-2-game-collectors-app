import React, { useState } from 'react';
import GameCard from './GameCard';
import PageButtons from './PageButtons';
import { SearchResults } from './SearchResults';

function SearchContainer({ data, setGame, page, setPage, title }) {
  console.log(page);

  console.log('in search container');

  const gameCards = data.map((game) => {
    return <GameCard key={game.id} game={game} setGame={setGame} />;
  });

  return (
    <div id="search-container">
      <h1 className="results-title">{title}</h1>
      <SearchResults cards={gameCards} />
      <PageButtons page={page} setPage={setPage} />
    </div>
  );
}

export default SearchContainer;
