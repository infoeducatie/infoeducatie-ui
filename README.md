# infoeducatie-ui
[![Build Status](https://travis-ci.org/infoeducatie/infoeducatie-ui.svg?branch=master)](https://travis-ci.org/infoeducatie/infoeducatie-ui) [![Dependency Status](https://gemnasium.com/infoeducatie/infoeducatie-ui.svg)](https://gemnasium.com/infoeducatie/infoeducatie-ui)

React frontend for our [backend API](https://github.com/infoeducatie/infoeducatie-api). This will replace our [existing website](http://infoeducatie.ro/).

## Setup

```
npm install
npm start
```

## Technologies used

- ES6 - the new Javascript standard
- Webpack - module bundler
- React - the best UI framework, written by Facebook
- Bootstrap - reusable UI elements from Twitter
- LESS - pre-processor for CSS
- Mochai, Chai - unit tests
- dependencies are in [`package.json`](https://github.com/infoeducatie/infoeducatie-react/blob/master/package.json)

## Folder layout

- `build` - Javascript and CSS bundles
- `src`
  - `components` - React components and LESS files for each component
  - `lib` - Helper libraries
  - `mixins` - React mixins
  - `main.jsx` - Main entry point with the router
- `index.production.html` - Index file w/ settings for production
- `index.stagine.html` - Index file w/ settings for staging
- `index.development.html` - Index file w/ settings for development
- `Procfile` - The command in this file is used by Heroku to run the server
- `app.json` - Manifest file for Heroku that defines how your code should be built and bootstrapped into a live application
- `build.sh` - Used by the npm build targets. Copies the right index file in the build folder and creates a bundle based on the environment provided as parameter
- `autodeploy.sh` - Checks out and deploys the latest release

## Commands

- `gulp` - lints the code
- `npm run build` - bundles the code for production deploying
- `npm test` - run tests using PhantomJS
- `npm run test-debug` - run tests using Google Chrome and enable js debugger

### Supported browsers

We don't support versions lower than IE10 because we use [flexbox](http://caniuse.com/#feat=flexbox).
