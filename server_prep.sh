#!/bin/bash

source ./set_env.sh $1

sudo npm install 
sudo chown -R ubuntu:ubuntu .
grunt prep