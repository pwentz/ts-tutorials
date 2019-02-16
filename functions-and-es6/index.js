var filewatcher = require('filewatcher');

var watcher = filewatcher();

// ... or a directory
watcher.add(__dirname);

watcher.on('change', function(file, stat) {
  console.log('File modified: %s', file);
  exec(file, function(err, data) {
    console.error(err)
  })
  if (!stat) console.log('deleted');
});

// watcher.removeAll()
