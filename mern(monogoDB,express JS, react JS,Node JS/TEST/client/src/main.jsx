import React from 'react'; // Import React
import { createRoot } from 'react-dom/client'; // Import createRoot from react-dom/client
import App from './App'; // Import the App component
import './index.css'; // Import the CSS file (if it exists)

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);