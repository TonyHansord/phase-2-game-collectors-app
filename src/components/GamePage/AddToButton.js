import React, { useState } from 'react';
import { jsonDB } from '../../data/constants';

function AddToButton({
  collectionType,
  correspondingGame,
  platform,
  collection,
  inCollection,
  updateFunction,
}) {
  const { id, slug } = platform;

  const [inCollectionState, setInCollectionState] = useState(inCollection);

  function removeFromCollection() {
    setInCollectionState(false);
    fetch(`${jsonDB}/${collectionType}/${id}`)
      .then((res) => res.json())
      .then((res) => {
        const games = res.games;
        const updatedGames = games.filter(
          (game) => game.id !== correspondingGame.id
        );

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
            updateFunction();
          });
      });
  }

  function addToCollection() {
    setInCollectionState(true);
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
            updateFunction();
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
        })
          .then((response) => response.json())
          .then((data) => {
            console.log('Success:', data);
            updateFunction();
          });
      });
  }

  return (
    <button
      className={inCollectionState ? 'remove-btn' : 'add-to-btn'}
      id={collectionType}
      onClick={
        inCollection ? () => removeFromCollection() : () => addToCollection()
      }
    >
      {inCollectionState
        ? 'Remove from ' + collectionType
        : 'Add to ' + collectionType}
    </button>
  );
}

export default AddToButton;
