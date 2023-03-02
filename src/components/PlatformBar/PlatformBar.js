import React, { useEffect } from 'react';
import ParentPlatform from './ParentPlatform';
import SearchBar from './SearchBar';
import { useParams, useHistory } from 'react-router-dom';

function PlatformBar({
  platforms,
  childPlatforms,
  clickHandler,
  handleSearchResults,
}) {
  const history = useHistory();

  const { platform } = useParams();

  useEffect(() => {
    console.log(`running useEffect in PlatformBar`);
    childPlatforms.forEach(({ id, name, slug }) => {
      if (slug === platform) {
        clickHandler({ id, name, slug });
        history.push(`/platform/${slug}`);
      }
    });
  }, [platform, childPlatforms, history, clickHandler]);

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
