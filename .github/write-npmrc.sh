#!/bin/bash

#
# .npmrc
#
echo "//registry.npmjs.org/:_password=${NPMJS_PASSWORD}" > ~/.npmrc
echo "//registry.npmjs.org/:username=${NPMJS_USERNAME}" >> ~/.npmrc
echo "//registry.npmjs.org/:email=${NPMJS_EMAIL}" >> ~/.npmrc
echo "//registry.npmjs.org/:always-auth=false" >> ~/.npmrc