import React, { useEffect, useState } from 'react';
import { Route, Switch, useParams } from 'react-router-dom';
import './App.css';
import PlatformBar from './components/PlatformBar/PlatformBar';
import * as Constants from './data/constants';
import ResultsContainer from './components/ResultsSection/ResultsContainer';
import SearchContainer from './components/ResultsSection/SearchContainer';
import GameInfo from './components/GamePage/GameInfo';

function App() {
  const [platformList, setPlatformList] = useState([]);
  const [selectedPlatform, setSelectedPlatform] = useState({});
  const [searchResults, setSearchResults] = useState([]);
  const [childPlatforms, setChildPlatforms] = useState([]);
  const [selectedGame, setSelectedGame] = useState({});

  useEffect(() => {
    fetch(
      `https://api.rawg.io/api/platforms/lists/parents?key=${process.env.REACT_APP_API_KEY}&ordering=name`
    )
      .then((res) => res.json())
      .then((platformData) => {
        const filteredPlatforms = platformData.results.filter(
          (parent) => !Constants.excludedPlatforms.includes(parent.name)
        );

        let allPlatforms = filteredPlatforms
          .map((parent) => {
            let platforms = [];
            if (parent.platforms) {
              platforms = parent.platforms.reduce((acc, child) => {
                acc.push(child);
                return acc;
              }, []);
            }

            return platforms;
          })
          .flatMap((platform) => {
            return platform;
          });

        setChildPlatforms(allPlatforms);
        console.log(allPlatforms);
        setPlatformList(filteredPlatforms);
      });
  }, []);

  function handleDisplayPlatformResults({ id, name, slug }) {
    setSelectedPlatform({ id, name, slug });
  }

  function handleSearchResults(data) {
    console.log('running handleSearchResults');
    setSearchResults(data);
  }

  return (
    <div className="App">
      <Switch>
        <Route exact path="/search">
          <PlatformBar
            platforms={platformList}
            childPlatforms={childPlatforms}
            clickHandler={handleDisplayPlatformResults}
            handleSearchResults={handleSearchResults}
          />
          <SearchContainer data={searchResults} setGame={setSelectedGame} />
        </Route>
        <Route path={`/platform/:platform`}>
          <PlatformBar
            platforms={platformList}
            childPlatforms={childPlatforms}
            clickHandler={handleDisplayPlatformResults}
            handleSearchResults={handleSearchResults}
          />
          <ResultsContainer
            selectedPlatform={selectedPlatform}
            setGame={setSelectedGame}
          />
        </Route>
        <Route path={`/game/:game`}>
          <PlatformBar
            platforms={platformList}
            childPlatforms={childPlatforms}
            clickHandler={handleDisplayPlatformResults}
            handleSearchResults={handleSearchResults}
          />
          <GameInfo selectedGame={selectedGame} />
        </Route>
        <Route exact path="/">
          <PlatformBar
            platforms={platformList}
            childPlatforms={childPlatforms}
            clickHandler={handleDisplayPlatformResults}
            handleSearchResults={handleSearchResults}
          />
          <ResultsContainer
            selectedPlatform={selectedPlatform}
            setGame={setSelectedGame}
          />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
