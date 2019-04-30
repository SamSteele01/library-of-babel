const cluster = require('cluster');
const app = require('./app').default;

const host = process.env.HOST || 'localhost';
const port = process.env.PORT || 8080;

// The master's job to spawn workers initially and when they die
if (cluster.isMaster) {

  // Get the number of processor cores
  var cpuCount = require('os').cpus().length;
  console.log('CPUCOUNT', cpuCount);

  // Create a worker for each CPU
  for (var i = 0; i < cpuCount; i += 1) {
    // limit to 4
    if (i === 4) break;
    cluster.fork();
  }

  // When a worker exits, fork a new one
  cluster.on('exit', function(worker) {
    console.log('Worker %d died', worker.id);
    cluster.fork();
  });

} else if (cluster.isWorker) {

  // Launch Node.js server
  const server = app.listen(port, host, () => {
    console.log(`Node.js API server is listening on http://${host}:${port}/`);
  });

  // Exit the process when there is an uncaught exception
  console.log('Worker %d running!', cluster.worker.id);
  process.on('uncaughtException', function() {
    console.log('Handled the exception here');
    process.exit(1);
  });

}
