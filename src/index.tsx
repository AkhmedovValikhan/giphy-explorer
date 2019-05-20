import { injector } from 'propin';
import * as React from 'react';
import { hydrate, render } from 'react-dom';
import App from './app/App';
import { GiphyClient } from './app/services/GiphyService';

const UBER_API_KEY = 'CdRKiCMbTnt9CkZTZ0lGukSczk6iT4Z6';

if (!window.PRERENDER) {
    initializeInjector();
    const appRoot = document.getElementById('root');
    if (appRoot!.children.length) {
        hydrate(<App />, appRoot);
    } else {
        render(<App />, appRoot);
    }
    initializeServiceWorker();
}

export default function () {
    injector.bind(GiphyClient).toInstance({
        trending: () => Promise.resolve([]),
    } as Partial<GiphyClient> as GiphyClient);
    render(<App />, document.getElementById('root'));
}

function initializeInjector() {
    injector.bind(GiphyClient).toInstance(new GiphyClient(UBER_API_KEY));
}

function initializeServiceWorker() {
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/sw.js');
        });
    }
}
