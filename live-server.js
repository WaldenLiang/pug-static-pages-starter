var liveServer = require('live-server')

var params = {
  port: 8080, // Set the server port. Defaults to 8080.
  host: 'localhost', // Set the address to bind to. Defaults to 0.0.0.0 or process.env.IP.
  root: './dist', // Set root directory that's being served. Defaults to cwd.
  open: true, // When false, it won't load your browser by default.
  wait: 1000, // Waits for all changes, before reloading. Defaults to 0 sec.
  logLevel: 2, // 0 = errors only, 1 = some, 2 = lots
}

liveServer.start(params)
