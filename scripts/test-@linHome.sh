#!/bin/bash

BASE_DIR=`dirname $0`

echo ""
echo "Starting Testacular Server (http://vojtajina.github.com/testacular)"
echo "-------------------------------------------------------------------"

export PHANTOMJS_BIN=/home/ziekrage/Apps/phantomjs-1.8.2-linux-x86_64/bin/phantomjs

testacular start $BASE_DIR/../config/testacular.conf.js $*
