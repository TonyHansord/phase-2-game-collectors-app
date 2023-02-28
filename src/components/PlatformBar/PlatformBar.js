import React from 'react';
import ParentPlatform from './ParentPlatform';
import SearchBar from './SearchBar';

function PlatformBar({ platforms, clickHandler, handleSearchResults }) {
  const platformList = platforms.map(({ id, name, platforms }) => (
    <ParentPlatform
      key={id}
      name={name}
      platforms={platforms}
      clickHandler={clickHandler}
    />
  ));

  return (
    <div id="platform-bar">
      <SearchBar handleSearchResults={handleSearchResults} />
      <React.Fragment>{platformList}</React.Fragment>
    </div>
  );
}

export default PlatformBar;
