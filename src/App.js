import React, { useState } from 'react';
import './App.css';
import Platform from './components/Platform';
import GameCard from './components/GameCard';

function App({ platforms }) {
  const [visibleGames, setVisibleGames] = useState([]);

  function handlePlatformClick(id) {
    console.log(id);

    fetch(
      `https://api.rawg.io/api/games?key=${process.env.REACT_APP_API_KEY}&platforms=${id}&page_size=1000&ordering=-rating`
    )
      .then((res) => res.json())
      .then((games) => {
        console.log(games.results);
        setVisibleGames(games.results);
      });
  }

  const platformList = platforms.map(({ id, name }) => {
    return (
      <Platform
        key={id}
        id={id}
        name={name}
        clickHandler={handlePlatformClick}
      />
    );
  });

  return (
    <div className="App">
      <div id="platform-bar">{platformList}</div>
      <div id="results">
        {visibleGames.map((game) => {
          return (
            <GameCard
              key={game.id}
              image={game.short_screenshots[0].image}
              title={game.slug}
            />
          );
        })}
      </div>
    </div>
  );
}

export default App;
