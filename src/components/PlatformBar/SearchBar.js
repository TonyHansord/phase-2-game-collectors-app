import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

function SearchBar({ setSearchQuery, childPlatforms, setSearchPlatform }) {
  const history = useHistory();
  const [search, setSearch] = useState('');
  const [platform, setPlatform] = useState('all');

  const handleSubmit = (e) => {
    e.preventDefault();
    history.push('/search');

    const searchQuery = search.split(' ').join('+');

    setSearchQuery(searchQuery);
    setSearchPlatform(platform);
    setSearch('');
    setPlatform('all');
  };

  const handleTextChange = (e) => {
    setSearch(e.target.value);
  };

  const handlePlatformChange = (e) => {
    setPlatform(e.target.value);
  };

  const platformFilterOptions = childPlatforms.map((child) => {
    return <option value={child.id}>{child.name}</option>;
  });

  return (
    <div id="search-bar">
      <form onSubmit={handleSubmit}>
        <input
          className="search-bar-input"
          type="text"
          placeholder="Search game"
          onChange={handleTextChange}
          value={search}
        />
        <select
          className="search-bar-input"
          onChange={handlePlatformChange}
          value={platform}
        >
          <option value="all">All</option>
          {platformFilterOptions}
        </select>
        <button className="search-bar-input" type="submit">
          <i className="fa-solid fa-magnifying-glass"></i>
        </button>
      </form>
    </div>
  );
}

export default SearchBar;
