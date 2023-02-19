import React, { useState } from 'react';
import './App.css';
import ParentPlatform from './components/ParentPlatform';
import GameCard from './components/GameCard';

function App({ platforms: parentPlatforms }) {
  const [visibleGames, setVisibleGames] = useState([]);

  function handlePlatformClick(id) {
    console.log(id);

    fetch(
      `https://api.rawg.io/api/games?key=${process.env.REACT_APP_API_KEY}&platforms=${id}&page_size=40&ordering=-rating`
    )
      .then((res) => res.json())
      .then((games) => {
        console.log(games.results);
        setVisibleGames(games.results);
      });
  }

  const platformList = parentPlatforms.map(({ id, name, platforms }) => {
    return (
      <ParentPlatform
        key={id}
        id={id}
        name={name}
        platforms={platforms}
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
              image={game.background_image}
              title={game.name}
            />
          );
        })}
      </div>
    </div>
  );
}

export default App;
