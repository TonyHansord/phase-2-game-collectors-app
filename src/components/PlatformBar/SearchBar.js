import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

function SearchBar({ setSearchQuery }) {
  const history = useHistory();
  const [search, setSearch] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    history.push('/search');

    const searchQuery = search.split(' ').join('+');

    setSearchQuery(searchQuery);
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
