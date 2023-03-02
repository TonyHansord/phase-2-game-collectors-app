import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

function SearchBar({ handleSearchResults }) {
  const history = useHistory();
  const [search, setSearch] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    history.push('/search');

    const searchQuery = search.split(' ').join('+');

    fetch(
      `https://api.rawg.io/api/games?key=${process.env.REACT_APP_API_KEY}&search=${searchQuery}`
    )
      .then((res) => res.json())
      .then((results) => {
        handleSearchResults(results.results);
      });
  };

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div id="search-bar">
      <form onSubmit={handleSubmit}>
        <input
          className="search-bar-input"
          type="text"
          placeholder="Search game"
          onChange={handleChange}
          value={search}
        />
        <button className="search-bar-input" type="submit">
          <i className="fa-solid fa-magnifying-glass"></i>
        </button>
      </form>
    </div>
  );
}

export default SearchBar;
