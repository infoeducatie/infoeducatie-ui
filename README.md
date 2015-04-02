# infoeducatie-react

React frontend for our [backend API](https://github.com/infoeducatie/infoeducatie-api).
The rest of dependencies are in [`package.json`](https://github.com/infoeducatie/infoeducatie-react/blob/master/package.json).

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

## Folder layout

- `build` - Javascript and CSS bundles
- `src`
  - `components` - React components and LESS files for each component
  - `lib` - Helper libraries
  - `mixins` - React mixins
- `main.{jsx, less} - Main entry point with the router.

## Commands

- `gulp` - lints the code
- `npm run build` - bundles the code for deploying
