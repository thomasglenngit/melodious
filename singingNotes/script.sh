#!/bin/bash
list=$(ls *mp3)
transformer=$(find . -name "*.mp3" -exec openssl base64 -A -in {} \;)
echo $transformer
echo $list

# find . -name "*.mp3" -exec openssl base64 -A -in {} ;
