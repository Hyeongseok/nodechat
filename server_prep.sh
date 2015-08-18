#!/bin/bash

source ./set_env.sh $1

npm install grunt-cli --save-dev
npm install

grunt prep
