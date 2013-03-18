#!/bin/bash

BASE_DIR=`dirname $0`

echo ""
echo "Starting Testacular Server (http://vojtajina.github.com/testacular)"
echo "-------------------------------------------------------------------"

export PHANTOMJS_BIN=/c/Program\ Files/phantomjs-1.8.2-windows/phantomjs.exe

testacular start $BASE_DIR/../config/testacular.conf.js $*
