import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import GlobalStates from './contexts/GlobalStates.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GlobalStates>
      <App />
    </GlobalStates>
  </StrictMode>
);
