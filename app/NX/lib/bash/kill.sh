#!/bin/bash
# Robustly kill any process using port 1999 (default dev port)

PORT=1999
if [[ "$OSTYPE" == "darwin"* ]]; then
	PID=$(lsof -ti tcp:$PORT)
elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
	PID=$(lsof -ti tcp:$PORT)
else
	echo "Unsupported OS: $OSTYPE"
	exit 1
fi

if [ -n "$PID" ]; then
	echo "Killing process on port $PORT (PID: $PID)"
	kill -9 $PID
	echo "Process killed."
else
	echo "No process found on port $PORT."
fi
