#!/bin/bash


# Open appropriate URL in the default web browser
URL="http://localhost:1999/"

# Detect OS and use appropriate open command
if command -v xdg-open > /dev/null; then
	xdg-open "$URL"
elif command -v open > /dev/null; then
	open "$URL"
else
	echo "Please open $URL manually. No supported browser opener found."
	exit 1
fi
