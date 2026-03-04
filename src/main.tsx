import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Import the Twemoji package
import twemoji from 'twemoji';

// Then you can use it in your component or script  
document.addEventListener("DOMContentLoaded", function() {
  if (typeof twemoji !== "undefined") {
    twemoji.parse(document.body);  // Parses the document for emojis
  } else {
    console.error("Twemoji is not loaded");
  }
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
