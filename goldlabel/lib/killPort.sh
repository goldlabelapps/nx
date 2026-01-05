#!/bin/bash

# killPort.sh - Terminates any process running on port 1999
# Provides feedback if a process was found and killed

PORT=1999

# Check if any process is using the port
PID=$(lsof -ti:$PORT 2>/dev/null)

if [ -n "$PID" ]; then
    echo "🔴 Found process running on port $PORT (PID: $PID)"
    echo "   Terminating..."
    kill -9 $PID 2>/dev/null
    echo "✅ Port $PORT is now available"
else
    echo "✓ Port $PORT is available"
fi

exit 0
