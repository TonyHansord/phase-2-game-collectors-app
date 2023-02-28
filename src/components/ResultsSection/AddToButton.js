import React from 'react';

function AddToButton({ collectionType, correspondingGame, platform }) {
  const { id, slug } = platform;

  function addToCollection() {
    fetch(`http://localhost:3000/${collectionType}/${id}`)
      .then((res) => res.json())
      .then((results) => {
        const games = results.games;
        const gameObj = {
          id: correspondingGame.id,
          slug: correspondingGame.slug,
          name: correspondingGame.name,
          background_image: correspondingGame.background_image,
        };

        const updatedGames = [...games, gameObj];

        fetch(`http://localhost:3000/${collectionType}/${id}`, {
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
          })
          .catch((error) => {
            console.error('Error:', error);
          });
      })
      .catch((error) => {
        console.error('Error:', error);
        fetch(`http://localhost:3000/${collectionType}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            id: platform,
            platform_name: slug,
            games: [
              {
                id: correspondingGame.id,
                slug: correspondingGame.slug,
                name: correspondingGame.name,
                background_image: correspondingGame.background_image,
              },
            ],
          }),
        });
      });
  }

  return (
    <button
      className="add-to-btn"
      id={collectionType}
      onClick={() => addToCollection()}
    >
      Add to {collectionType}
    </button>
  );
}

export default AddToButton;
