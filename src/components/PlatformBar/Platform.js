import React from 'react';
import { NavLink } from 'react-router-dom';

function Platform({ id, name, slug, clickHandler }) {
  return (
    <NavLink
      to={`/${slug}`}
      className={({ isActive }) => (isActive ? 'platform active' : 'platform')}
      onClick={() => clickHandler({ id, name, slug })}
    >
      {name}
    </NavLink>
  );
}

export default Platform;
