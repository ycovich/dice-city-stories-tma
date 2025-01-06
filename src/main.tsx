import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { TonConnectUIProvider } from '@tonconnect/ui-react';

// TODO Replace with your manifest URL after deploying to GitHub Pages
const manifestUrl = 'https://https://ycovich.github.io/dice-bot-tma/manifest.json';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <TonConnectUIProvider manifestUrl={manifestUrl}>
            <App />
        </TonConnectUIProvider>
    </React.StrictMode>,
);