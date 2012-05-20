var taks = require('jake').task;
var sys  = require('sys');
var exec = require('child_process').exec;

function puts(error, stdout, stderr) { 
	console.log('stdout: ' + stdout);
	console.log('stderr: ' + stderr);
	if (error !== null) {
		console.log('exec error: ' + error);
	}
}

task('compile', function(t){	
	exec("cd lib/node-ldapauth && ./build.sh", puts);
});

task('default', ['compile']);