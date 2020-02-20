#! /bin/bash

# This extracts the end of branch from the third '-'
# This saves the extraction to the path_raw variable.
path_raw=$( echo $TRAVIS_BRANCH | cut -d'-' -f4- )

# replace '-' with '/' and '_' with '/'
path_raw_no_dashes=$( tr '-' '/' <<<$path_raw )
export PATH_TO_LAMBDA=/API/$( tr '_' '/' <<<$path_raw_no_dashes )
