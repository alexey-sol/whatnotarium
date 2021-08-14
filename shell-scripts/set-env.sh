#!/bin/bash

# Helps to export stringified secrets as environment variables automatically
# (excluding those which start with "DEPLOY_" prefix). The solution is borrowed
# from [1].

# $1 argument is supposed to be stringified secrets object.

while read -rd $'' line
do
    if [[ $s != DEPLOY_* ]]; then
        export "$line"
    fi
done < <(jq -r <<< $1 'to_entries|map("\(.key)=\(.value)\u0000")[]')

# [1]. https://stackoverflow.com/a/48513046/10874193
