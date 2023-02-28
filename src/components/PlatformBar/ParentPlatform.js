import React from 'react';
import Platform from './Platform';

function ParentPlatform({ name, platforms, clickHandler }) {
  const sortedPlatforms = [...platforms].sort((a, b) => {
    if (a['name'] < b['name']) {
      return -1;
    } else if (a['name'] > b['name']) {
      return 1;
    } else {
      return 0;
    }
  });

  const platformItems = sortedPlatforms.map(({ id, name, slug }) => (
    <Platform
      key={id}
      id={id}
      slug={slug}
      name={name}
      clickHandler={clickHandler}
    ></Platform>
  ));

  return (
    <details className="platform-parent">
      <summary>
        <p>{name}</p>
      </summary>
      {platformItems}
    </details>
  );
}

export default ParentPlatform;
