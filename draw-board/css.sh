#!/bin/bash

# If no arguments passed, 
# go directly to css directory
if [ $# -eq 0 ]; then
   cd css
else
   cd $1/css
fi

# Ask for name of file here?
FILE=./style.scss

# Check if scss file exists and compile
if [ -f $FILE ]; then
   echo "File exists...compiling"
   npx sass --watch style.scss style.css
else 
   echo "File doesn't exist in $PWD"
fi
