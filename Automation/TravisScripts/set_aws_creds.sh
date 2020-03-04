#!/bin/bash

FILE="./.aws/credentials"

cat <<EOM >$FILE
[MyProfile1]
aws_access_key_id = $AWS_ACCESS_KEY2_ID
aws_secret_access_key = $AWS_SECRET_ACCESS_KEY2
EOM
cat $FILE
