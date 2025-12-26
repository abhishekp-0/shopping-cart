import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { Theme ,ThemePanel} from '@radix-ui/themes';
import "@radix-ui/themes/styles.css";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
        <Theme accentColor='amber'>
          <App />
        </Theme>
    </BrowserRouter>
  </React.StrictMode>
);