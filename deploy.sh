#!/bin/bash

usage='invalid arg1, [t]est, [p]roduction needed!'
split_line='=================================='

if [ "$#" -ne 1 ]; then
    echo $usage
    exit 1
fi

if [ $1 = 't' ]; then
    copy_text='Copy to Test server!'
    echo $split_line
    echo 'Testing deploy:'
    echo $split_line
    npm run test
    cmd=scp
    index_path=dev@47.75.254.96:/var/dev/front-admin
    static_path=dev@47.75.254.96:/var/dev/static
# elif [ $1 = 'p' ]; then
#     echo $split_line
#     echo 'Production deploy:'
#     npm run build
#     cmd=scp
#     index_path=dev@10.162.70.8:/var/dev/saas
#     static_path=dev@10.162.70.8:/var/dev/saas-front-apps
else
    echo $usage
    exit 1
fi
echo $split_line
echo $copy_text
echo $split_line
$cmd dist/index.html $index_path/index.html
$cmd dist/favicon.png $index_path/favicon.png
$cmd -r dist/*.css dist/*.js dist/static/ $static_path/
echo $split_line
echo 'Deployed!'
echo $split_line
