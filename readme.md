
## Notes
Application preview can be accessed using this [Link](https://giphy-explorer.azurewebsites.net/)


Design idea taken from [Dribble](https://dribbble.com/shots/5815691-Grid-List-View-Switch),  [Dribble](https://dribbble.com/shots/4216362-Nox-Influencer-2)

## Structure
```
├── public - meta files
│   ├── icons
│   └── manifest.json
├── server.js - simple server
├── src
│   ├── app - App specific components, services and utils
│   │   ├── components
│   │   │   ├── App
│   │   │   ├── Giphy
│   │   │   │   ├── Card
│   │   │   │   └── List
│   │   │   └── Header
│   │   ├── model
│   │   │   └── giphy - Giphy api types, generated using quicktype.io
│   │   └── services
│   │       └── GiphyService
│   ├── common - Common components and utils, ideally should be in separate package
│   │   ├── components 
│   │   │   ├── Button
│   │   │   ├── InifiniteScrollList
│   │   │   ├── Input
│   │   │   └── Switch
│   ├── index.tsx - Entry point
│   ├── service-worker.js - Simple shell caching service worker
│   └── styles - scss global styles, includes several mixins from bootstrap(only grid specific)
└── webpack.config.js
```
## Scripts

### `npm run build`

Creates a production build with prerendering and css inlining. Also includes a service worker.

### `npm run test`
### `npm run test:w`

Runs jest to execute unit and enzyme tests.

### `npm run start`

Runs dev server in watch mode with module replacement.


### `npm run tslint`
### `npm run tslint:fix`

Runs linting

### `npm run ci`
Simple CI pipeline script
