#!/bin/bash

if [ $# -ne 1 ]; then
  echo "./build.sh [stage|prod]"
  exit 1
fi

ENV=$1

set -x
rm -rf build
mkdir -p build
cat index.${ENV}.html | sed "s/GIT_HASH/`git rev-parse --short HEAD`/g" >  build/index.html
./node_modules/webpack/bin/webpack.js -p --config webpack.stage-prod.config.js
