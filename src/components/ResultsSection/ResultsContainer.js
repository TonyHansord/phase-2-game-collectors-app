import React, { useState } from 'react';
import CollectionSelect from './CollectionSelect';
import Results from './Results';
import PageButtons from './PageButtons';

function ResultsContainer({ selectedPlatform, setGame, collection, wishlist }) {
  const [selectedCollection, setSelectedCollection] = useState('all');
  const [resultsPage, setResultsPage] = useState(1);
  const [collectionIsEmpty, setCollectionIsEmpty] = useState(false);

  function handleCollectionChange(collectionType) {
    switch (collectionType) {
      case 'collection':
        setSelectedCollection('collection');
        const isInCollection = collection.some(
          (platform) => selectedPlatform.slug === platform.platform_name
        );
        if (isInCollection) {
          setCollectionIsEmpty(false);
        } else {
          setCollectionIsEmpty(true);
        }
        break;
      case 'wishlist':
        setSelectedCollection('wishlist');
        const isInWishlist = wishlist.some(
          (platform) => selectedPlatform.slug === platform.platform_name
        );
        if (isInWishlist) {
          setCollectionIsEmpty(false);
        } else {
          setCollectionIsEmpty(true);
        }
        break;
      default:
        setSelectedCollection('all');
        setCollectionIsEmpty(false);
        break;
    }
  }

  const renderResults = () => {
    return (
      <Results
        collectionType={selectedCollection}
        platform={selectedPlatform}
        resultsPage={resultsPage}
        setGame={setGame}
      ></Results>
    );
  };
  return (
    <div id="results-container">
      <h1 className="results-title">{selectedPlatform.name}</h1>

      <CollectionSelect clickHandler={handleCollectionChange} />
      {collectionIsEmpty ? null : renderResults()}
      {selectedCollection === 'all' ? (
        <PageButtons page={resultsPage} setPage={setResultsPage} />
      ) : null}
    </div>
  );
}

export default ResultsContainer;
