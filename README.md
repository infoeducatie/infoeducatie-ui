# infoeducatie-ui

[![Build Status](https://travis-ci.org/infoeducatie/infoeducatie-ui.svg?branch=master)](https://travis-ci.org/infoeducatie/infoeducatie-ui)

React web frontend for our [backend API](https://github.com/infoeducatie/infoeducatie-api).


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
- `index.staging.html` - Index file w/ settings for staging
- `index.development.html` - Index file w/ settings for development
- `Procfile` - The command in this file is used by Heroku to run the server
- `app.json` - Manifest file for Heroku that defines how your code should be built and bootstrapped into a live application
- `build.sh` - Used by the npm build targets. Copies the right index file in the build folder and creates a bundle based on the environment provided as parameter
- `autodeploy.sh` - Checks out and deploys the latest release
- `server.*.js` - Script that spins up an Express server.
- `webpack.*.js` - Configuration for Webpack.
- `Gulpfile.js` - Project tasks. Currently we have linting.
- `karma*.config.js` - Configuration for unit tests.


## Setup

```
npm install
npm start
```


## Commands

- `gulp` - lints the code
- `npm run build` - bundles the code for production deploying
- `npm test` - run tests using PhantomJS
- `npm run test-debug` - run tests using Google Chrome and enable js debugger

### Docker

There are two docker images built from the source. A production one and a staging one. They are published on [Docker Hub](https://hub.docker.com/r/infoeducatie/infoeducatie-ui/).

When new code is pushed to any of the two branches the corresponding images are built.

### Supported browsers

We don't support versions lower than IE10 because we use [flexbox](http://caniuse.com/#feat=flexbox) in a small part of the homepage.
