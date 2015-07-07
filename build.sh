#!/bin/bash

if [ $# -ne 1 ]; then
  echo "./build.sh [stage|prod]"
  exit 1
fi

ENV=$1

set -x

if [ -d ".git" ]; then
  VER=`git rev-parse --short HEAD`
else
  VER=`date +%s`
fi

mkdir -p build
cat index.${ENV}.html | sed "s/GIT_HASH/$VER/g" >  build/index.html
./node_modules/webpack/bin/webpack.js -p --config webpack.stage-prod.config.js
