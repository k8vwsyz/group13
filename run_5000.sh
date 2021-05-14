docker run \
  -u node \
  --rm \
  -it \
  --name socket_io_server \
  --mount type=bind,source=$(pwd)/app,target=/app/ \
  -p 5000:5000 \
  -w /app/ \
  node \
  /bin/bash