#!/bin/bash

if [ "$APP_ENV" == "" ]; then
  APP_ENV="production"
fi

if [ "$APP_ENV" != "staging" ] && [ "$APP_ENV" != "production" ]; then
  echo "Invalid app environment. Options: staging, production"
  exit 1
fi

if [ "$NODE_ENV" == "" ]; then
  export NODE_ENV="production"
fi

set -x

if [ -d ".git" ]; then
  VER=`git rev-parse --short HEAD`
else
  VER=`date +%s`
fi

mkdir -p build
cat index.${APP_ENV}.html | sed "s/GIT_HASH/$VER/g" >  build/index.html
./node_modules/webpack/bin/webpack.js -p --config webpack.production.js
