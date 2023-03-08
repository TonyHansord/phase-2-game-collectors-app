import React, { useEffect } from 'react';
import ParentPlatform from './ParentPlatform';
import SearchBar from './SearchBar';
import { useParams, useHistory, Link } from 'react-router-dom';

function PlatformBar({
  platforms,
  childPlatforms,
  clickHandler,
  setSearchPage,
  renderGames,
  setSearchQuery,
  setSearchPlatform,
}) {
  const history = useHistory();

  const { platform } = useParams();

  useEffect(() => {
    childPlatforms.forEach(({ id, name, slug }) => {
      if (slug === platform) {
        renderGames({ id, name, slug });
        history.push(`/platform/${slug}`);
      }
    });
  }, [platform, childPlatforms, history, renderGames]);

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
      <Link
        className="section-header"
        id="home-link"
        to="/"
        onClick={() => {
          setSearchQuery('');
          setSearchPage(1);
        }}
      >
        Home
      </Link>
      <SearchBar
        setSearchQuery={setSearchQuery}
        childPlatforms={childPlatforms}
        setSearchPlatform={setSearchPlatform}
      />
      <p className="section-header">Platforms</p>
      <React.Fragment>{platformList}</React.Fragment>
    </div>
  );
}

export default PlatformBar;
