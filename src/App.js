import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import PlatformBar from './components/PlatformBar/PlatformBar';
import * as Constants from './data/constants';
import ResultsContainer from './components/ResultsSection/ResultsContainer';
import SearchContainer from './components/ResultsSection/SearchContainer';

function App() {
  const [platformList, setPlatformList] = useState([]);
  const [selectedPlatform, setSelectedPlatform] = useState({});
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    fetch(
      `https://api.rawg.io/api/platforms/lists/parents?key=${process.env.REACT_APP_API_KEY}&ordering=name`
    )
      .then((res) => res.json())
      .then((platformData) => {
        const filteredPlatforms = platformData.results.filter(
          (parent) => !Constants.excludedPlatforms.includes(parent.name)
        );

        setPlatformList(filteredPlatforms);
      });
  }, []);

  function handleDisplayPlatformResults({ id, name, slug }) {
    setSelectedPlatform({ id, name, slug });
  }

  function handleSearchResults(data) {
    setSearchResults(data);
  }

  return (
    <div className="App">
      <Router>
        <Route path="/search">
          <PlatformBar
            platforms={platformList}
            clickHandler={handleDisplayPlatformResults}
            handleSearchResults={handleSearchResults}
          />
          <SearchContainer data={searchResults} />
        </Route>
        {/* <Route path="/:platform">
          <PlatformBar
            platforms={platformList}
            clickHandler={handleDisplayPlatformResults}
            handleSearchResults={handleSearchResults}
          />
          <ResultsContainer selectedPlatform={selectedPlatform} data={[]} />
        </Route>
        <Route exact path="/">
          <PlatformBar
            platforms={platformList}
            clickHandler={handleDisplayPlatformResults}
            handleSearchResults={handleSearchResults}
          />
          <ResultsContainer selectedPlatform={selectedPlatform} data={[]} />
        </Route> */}
      </Router>
    </div>
  );
}

export default App;
