#!/bin/sh
rm -rf ./chrome-plugin neetcode-random-chrome.zip
mkdir chrome-plugin
cp dialog.js icon.png model.js popup.html Privacy\ Policy.txt README.md chrome-plugin/
jq '.manifest_version = 3' manifest.json > ./chrome-plugin/manifest.json
zip -j neetcode-random-chrome.zip ./chrome-plugin/*