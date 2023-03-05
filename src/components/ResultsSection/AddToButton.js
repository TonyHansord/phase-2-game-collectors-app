import React from 'react';
import { jsonDB } from '../../data/constants';

function AddToButton({
  collectionType,
  correspondingGame,
  platform,
  collection,
  inCollection,
}) {
  const { id, slug } = platform;

  function addToCollection() {
    fetch(`${jsonDB}/${collectionType}/${id}`)
      .then((res) => res.json())
      .then((results) => {
        const games = results.games;

        const updatedGames = [...games, correspondingGame];

        fetch(`${jsonDB}/${collectionType}/${id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({ games: updatedGames }),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log('Success:', data);
          });
      })
      .catch(() => {
        fetch(`${jsonDB}/${collectionType}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            id: id,
            platform_name: slug,
            games: [correspondingGame],
          }),
        });
      });
  }

  return (
    <button
      className={inCollection ? 'remove-btn' : 'add-to-btn'}
      id={collectionType}
      onClick={() => addToCollection()}
    >
      {inCollection
        ? 'Remove from ' + collectionType
        : 'Add to ' + collectionType}
    </button>
  );
}

export default AddToButton;
