#!/bin/sh
git stash
git checkout gh-pages
git rebase master
git checkout master
git stash pop
