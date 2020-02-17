#!/bin/bash

FILE="./.env"

if [[ $TRAVIS_BRANCH == 'feature-sprint3-mattyplo-test' ]]; then
cat <<EOM >$FILE
REACT_APP_NOT_SECRET_CODE=FEATURE
EOM
    echo "=========== $TRAVIS_BRANCH ENV ==========="
    cat $FILE
elif [[ $TRAVIS_BRANCH == 'master' ]]; then
cat <<EOM >$FILE
REACT_APP_SOME_SERVICE=development
EOM
    echo "=========== $TRAVIS_BRANCH ENV ==========="
    cat $FILE
else
    exit 0
fi
