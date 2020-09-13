#!/bin/bash

# --------------------------------------------------------------------
# note:
# this file should be execute by runing `npm run deolpy` in the project root dir,
# or the `scp` command could not work as expected
# --------------------------------------------------------------------

branch=$(git rev-parse --abbrev-ref HEAD)
remoteIP="root@111.229.70.117"
remotePath="/data/hotdog_frontend"

echo -e "Deploying branch \033[33m$branch\033[0m."

# step 0: check for uncommitted changes
git status
if [[ ! (-z $(git status -s)) ]];
then
  echo -e "\033[31m !! Stash or commit your changes first. \033[0m"
  exit 1
fi

# step 1: push current branch to remote
echo 'Pushing branch to remote ...'
git push || exit 1

# step 2: upload assets
scp dist "$remoteIP:$remotePath" || exit 1
echo -e "\033[32m upload dir dist successfully. \033[0m"
