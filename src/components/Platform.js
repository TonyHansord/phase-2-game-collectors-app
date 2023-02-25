import React from 'react';
import { Link } from 'react-router-dom';

function Platform({ id, name, slug, clickHandler }) {
  return (
    <Link
      to={`/${slug}`}
      className={`platform`}
      onClick={() => clickHandler({ id, name, slug })}
    >
      {name}
    </Link>
  );
}

export default Platform;
