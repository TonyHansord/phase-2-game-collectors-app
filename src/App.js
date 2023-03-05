import React, { useEffect, useState } from 'react';
import { Route, Switch } from 'react-router-dom';
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
  const [searchPage, setSearchPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [gameCollection, setGameCollection] = useState([]);
  const [wishlist, setWishlist] = useState([]);

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

  function updateCollection() {
    fetch(`${Constants.jsonDB}/collection`)
      .then((res) => res.json())
      .then((collection) => {
        setGameCollection(collection);
      });
  }

  function updateWishlist() {
    fetch(`${Constants.jsonDB}/wishlist`)
      .then((res) => res.json())
      .then((collection) => {
        setWishlist(collection);
      });
  }

  useEffect(() => {
    updateCollection();
  }, []);

  useEffect(() => {
    updateWishlist();
  }, []);

  useEffect(() => {
    fetch(
      `https://api.rawg.io/api/games?key=${process.env.REACT_APP_API_KEY}&search=${searchQuery}&page=${searchPage}&page_size=40`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data.results);
        setSearchResults(data.results);
      });
  }, [searchQuery, searchPage]);

  return (
    <div className="App">
      <Switch>
        <Route exact path="/search">
          <PlatformBar
            platforms={platformList}
            childPlatforms={childPlatforms}
            clickHandler={handleDisplayPlatformResults}
            setSearchQuery={setSearchQuery}
          />
          <SearchContainer
            data={searchResults}
            setGame={setSelectedGame}
            page={searchPage}
            setPage={setSearchPage}
            title={'Results of ' + searchQuery}
          />
        </Route>
        <Route path={`/platform/:platform`}>
          <PlatformBar
            platforms={platformList}
            childPlatforms={childPlatforms}
            clickHandler={handleDisplayPlatformResults}
            renderGames={setSelectedPlatform}
            setSearchQuery={setSearchQuery}
          />
          <ResultsContainer
            selectedPlatform={selectedPlatform}
            setGame={setSelectedGame}
            collection={gameCollection}
            wishlist={wishlist}
          />
        </Route>
        <Route path={`/game/:game`}>
          <PlatformBar
            platforms={platformList}
            childPlatforms={childPlatforms}
            clickHandler={handleDisplayPlatformResults}
            setSearchQuery={setSearchQuery}
          />
          <GameInfo
            selectedGame={selectedGame}
            gameCollection={gameCollection}
            wishlist={wishlist}
            updateCollection={updateCollection}
            updateWishlist={updateWishlist}
          />
        </Route>
        <Route exact path="/">
          <PlatformBar
            platforms={platformList}
            childPlatforms={childPlatforms}
            clickHandler={handleDisplayPlatformResults}
            setSearchQuery={setSearchQuery}
          />
          <SearchContainer
            data={searchResults}
            setGame={setSelectedGame}
            page={searchPage}
            setPage={setSearchPage}
            title="Popular Games"
          />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
