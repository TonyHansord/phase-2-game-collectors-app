import React from 'react';
import Platform from './Platform';

function ParentPlatform({ id, name, platforms, clickHandler }) {
  const sortedPlatforms = [...platforms].sort((a, b) => {
    if (a['name'] < b['name']) {
      return -1;
    } else if (a['name'] > b['name']) {
      return 1;
    } else {
      return 0;
    }
  });

  const platformItems = sortedPlatforms.map(({ id, name }) => (
    <Platform key={id} id={id} name={name} clickHandler={clickHandler} />
  ));

  return (
    <details className="platform">
      <summary>
        <p>{name}</p>
      </summary>
      {platformItems}
    </details>
  );
}

export default ParentPlatform;
