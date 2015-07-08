#!/bin/bash
# This script should be periodicly run bya cron

git fetch &> /dev/null
tag=`git tag | egrep "^v[0-9.]*$" | sort | tail -n 1`

if [ -z $tag ]; then
  echo "No tag found"
  exit 1
fi

if [ `git show-ref $tag | cut -d ' ' -f1` == `git rev-parse HEAD` ]; then
  exit 0
fi

echo "Deploying tag ${tag}"

git reset --hard $tag
npm run build
