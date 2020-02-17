#!/bin/bash

# create a new .env file in the UI directory
FILE="./UI/.env"

# Set the API endpoint based upon the branch being pushed
if [[ $TRAVIS_BRANCH == 'development' ]]; then
cat <<EOM >$FILE
REACT_APP_API_ENDPOINT=https://api.2edusite.com/dev/
EOM
    echo "=========== $TRAVIS_BRANCH ENV ==========="
    cat $FILE
elif [[ $TRAVIS_BRANCH == 'master' ]]; then
cat <<EOM >$FILE
REACT_APP_API_ENDPOINT=https://api.2edusite.com/prod/
EOM
    echo "=========== $TRAVIS_BRANCH ENV ==========="
    cat $FILE
else
    exit 0
fi
