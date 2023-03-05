import React, { useState } from 'react';
import CollectionSelect from './CollectionSelect';
import Results from './Results';

function ResultsContainer({ selectedPlatform, setGame, collection, wishlist }) {
  const [selectedCollection, setSelectedCollection] = useState('all');
  const [resultsPage, setResultsPage] = useState(1);
  const [platformInCollection, setPlatformInCollection] = useState(false);

  console.log(collection);
  console.log(wishlist);

  console.log(selectedPlatform);

  function handleCollectionChange(collectionType) {
    const collectionObj =
      collectionType !== 'all' && collectionType === 'collection'
        ? collection
        : wishlist;

    console.log(collectionObj);

    const isInCollection = collectionObj.find(
      (platform) => selectedPlatform.slug === platform.platform_name
    );

    console.log(isInCollection);

    if (isInCollection) {
      setSelectedCollection(collectionType);
    }
  }

  return (
    <div id="results-container">
      <h1>{selectedPlatform.name}</h1>

      <CollectionSelect clickHandler={handleCollectionChange} />
      <Results
        collectionType={selectedCollection}
        platform={selectedPlatform}
        resultsPage={resultsPage}
        setGame={setGame}
      ></Results>

      <div id="page-buttons">
        <button onClick={() => setResultsPage(resultsPage - 1)}>
          Previous
        </button>
        <p>{resultsPage}</p>
        <button onClick={() => setResultsPage(resultsPage + 1)}>Next</button>
      </div>
    </div>
  );
}

export default ResultsContainer;
