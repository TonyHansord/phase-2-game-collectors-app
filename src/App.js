import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import ParentPlatform from './components/ParentPlatform';
import * as Constants from './data/constants';
import ResultsContainer from './components/ResultsContainer';

function App() {
  const [platformList, setPlatformList] = useState([]);
  const [selectedPlatform, setSelectedPlatform] = useState({
    id: 79,
    name: 'SNES',
    slug: 'snes',
  });

  useEffect(() => {
    fetch(
      `https://api.rawg.io/api/platforms/lists/parents?key=${process.env.REACT_APP_API_KEY}&ordering=name`
    )
      .then((res) => res.json())
      .then((platformData) => {
        const filteredPlatforms = platformData.results.filter(
          (parent) => !Constants.excludedPlatforms.includes(parent.name)
        );

        const parentPlatformList = filteredPlatforms.map(
          ({ id, name, slug, platforms }) => {
            return (
              <ParentPlatform
                key={id}
                id={id}
                name={name}
                slug={slug}
                platforms={platforms}
                clickHandler={handleDisplayPlatformResults}
                selectedPlatformHandler={handleDisplayPlatformResults}
              />
            );
          }
        );

        setPlatformList(parentPlatformList);
      });
  }, []);

  function handleDisplayPlatformResults({ id, name, slug }) {
    setSelectedPlatform({ id, name, slug });
  }

  return (
    <div className="App">
      <Router>
        <Route path="/:platform">
          <div id="platform-bar">{platformList}</div>
          <ResultsContainer selectedPlatform={selectedPlatform} />
        </Route>
        <Route exact path="/">
          <div id="platform-bar">{platformList}</div>
          <ResultsContainer selectedPlatform={selectedPlatform} />
        </Route>
      </Router>
    </div>
  );
}

export default App;
