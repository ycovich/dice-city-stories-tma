import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {TonConnectUIProvider} from '@tonconnect/ui-react';
import './index.css';  // Importing global styles

const manifestUrl = 'https://ycovich.github.io/dice-city-stories-tma/manifest.json';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <TonConnectUIProvider manifestUrl={manifestUrl}>
            <App/>
        </TonConnectUIProvider>
    </React.StrictMode>,
);