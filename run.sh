#!/usr/bin/env bash

set -exo pipefail

# UDID=$(system_profiler SPUSBDataType | sed -n -E -e '/(iPhone|iPad)/,/Serial/s/ *Serial Number: *(.+)/\1/p')
UDID=00008020-00093C861ED2002E
PORT=12345
RESOLUTION="400x600"

./build/ios_minicap \
    --udid $UDID \
    --port $PORT \
    --resolution $RESOLUTION
