#!/bin/sh

# Fixing permission issues
chown -R searx:searx /usr/local/searx/searx/templates/penguin
chown -R searx:searx /usr/local/searx/searx/static/themes/penguin

/usr/local/searx/dockerfiles/docker-entrypoint.sh
