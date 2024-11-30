import '@/sass/main.scss';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { I18nextProvider } from 'react-i18next';
import { HashRouter } from 'react-router-dom';
import App from './App.jsx';
import './i18n.js';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HashRouter>
      <I18nextProvider>
        <App />
      </I18nextProvider>
    </HashRouter>
  </StrictMode>,
);
