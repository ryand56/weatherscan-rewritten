#!/bin/sh

echo "Check that we have vars"
test -n "$IP_API_KEY"
test -n "$WEATHER_API_KEY"

find /app/.next \( -type d -name .git -prune \) -o -type f -print0 | xargs -0 sed -i "s#APP_NEXT_PUBLIC_IP_API_KEY#$NEXT_PUBLIC_IP_API_KEY#g"
find /app/.next \( -type d -name .git -prune \) -o -type f -print0 | xargs -0 sed -i "s#APP_NEXT_PUBLIC_WEATHER_API_KEY#$NEXT_PUBLIC_WEATHER_API_KEY#g"

echo "Starting NextJs"
exec "$@"