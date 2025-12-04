#!/bin/sh

HOOKS_DIR=".git/hooks"
REPO_HOOKS="git-hooks"

for hook in $REPO_HOOKS/*; do
  hook_name=$(basename $hook)
  ln -sf "../../$hook" "$HOOKS_DIR/$hook_name"
done
