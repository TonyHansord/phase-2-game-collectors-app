import React, { useState } from 'react';
import CollectionSelect from './CollectionSelect';
import Results from './Results';

function ResultsContainer({ selectedPlatform }) {
  const [selectedCollection, setSelectedCollection] = useState('all');
  const [resultsPage, setResultsPage] = useState(1);

  return (
    <div id="results-container">
      <h1>{selectedPlatform.name}</h1>

      <CollectionSelect clickHandler={setSelectedCollection} />
      <Results
        collectionType={selectedCollection}
        platform={selectedPlatform}
        resultsPage={resultsPage}
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
