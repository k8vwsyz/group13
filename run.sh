docker run \
  -u node \
  --rm \
  -it \
  --name next_js \
  --mount type=bind,source=$(pwd)/app,target=/app/ \
  -p 4000:3000 \
  -w /app/ \
  node \
  /bin/bash