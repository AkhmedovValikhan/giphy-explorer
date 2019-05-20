import { injector } from 'propin';
import * as React from 'react';
import { hydrate, render } from 'react-dom';
import { App } from './app/components/App';
import { GiphyService } from './app/services/GiphyService/GiphyService';

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

export default function() {
    injector.bind(GiphyService).toInstance({
        trending: () => Promise.resolve([]),
    } as Partial<GiphyService> as GiphyService);
    render(<App />, document.getElementById('root'));
}

function initializeInjector() {
    injector.bind(GiphyService).toInstance(new GiphyService(UBER_API_KEY));
}

function initializeServiceWorker() {
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/sw.js');
        });
    }
}
