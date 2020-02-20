#! /bin/bash

branch=feature-sprint3-deya-property_id-put
# This extracts the end of branch from the third '-'
# This saves the extraction to the path_raw variable.
path_raw=$( echo $branch | cut -d'-' -f4- )

# replace '-' with '/' and '_' with '/'
path_raw_no_dashes=$( tr '-' '/' <<<$path_raw )
path=$( tr '_' '/' <<<$path_raw_no_dashes )
echo $path
