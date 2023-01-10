#!/bin/sh

cd /app

if [ ! -z "/app/node_modules" ]; then
    echo "INSTALLING..."
    npm install --verbose
    echo "FINISHED INSTALL."
fi

npm run --verbose start
