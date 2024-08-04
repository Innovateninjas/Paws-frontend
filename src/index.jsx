/**
 * Import React library from 'react' module.
 * @type {import('react')}
 */
import React from 'react';

/**
 * Import ReactDOM library from 'react-dom/client' module.
 * @type {import('react-dom/client')}
 */
import ReactDOM from 'react-dom/client';

/**
 * Import CSS file from './index.css'.
 */
import './index.css';

/**
 * Import App component from './App'.
 * @type {import('./App')}
 */
import App from './App';

/**
 * Import reportWebVitals function from './reportWebVitals'.
 * @type {import('./reportWebVitals')}
 */
import reportWebVitals from './reportWebVitals';

/**
 * Create a root element using ReactDOM.createRoot() method.
 * @type {import('react-dom/client').Root}
 */
const root = ReactDOM.createRoot(document.getElementById('root'));

/**
 * Render the App component inside the root element.
 */
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

/**
 * Check if 'serviceWorker' is available in the navigator object.
 */
if ('serviceWorker' in navigator) {
  /**
   * Wait for the service worker to be ready.
   */
  navigator.serviceWorker.ready.then(() => {
    /**
     * Register the service worker using navigator.serviceWorker.register() method.
     * @param {string} '%PUBLIC_URL%/service-worker.js' - The URL of the service worker file.
     */
    navigator.serviceWorker.register('%PUBLIC_URL%/service-worker.js')
      .then((registration) => {
        /**
         * Log a success message when the service worker is registered.
         * @param {string} registration.scope - The scope of the registered service worker.
         */
        console.log('Service Worker registered with scope:', registration.scope);
      })
      .catch((error) => {
        /**
         * Log an error message when the service worker registration fails.
         * @param {Error} error - The error object.
         */
        console.error('Service Worker registration failed:', error);
      });
  });
}

/**
 * Call the reportWebVitals function to start measuring performance in the app.
 */
reportWebVitals();
