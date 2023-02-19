import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import * as Constants from './data/constants';

fetch(
  `https://api.rawg.io/api/platforms/lists/parents?key=${process.env.REACT_APP_API_KEY}&ordering=name`
)
  .then((res) => res.json())
  .then((platformData) => {
    const filteredPlatforms = platformData.results.filter(
      (parent) => !Constants.excludedPlatforms.includes(parent.name)
    );
    const root = ReactDOM.createRoot(document.getElementById('root'));
    root.render(
      <React.StrictMode>
        <App platforms={filteredPlatforms} />
      </React.StrictMode>
    );
  });

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
