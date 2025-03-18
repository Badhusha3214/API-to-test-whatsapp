/**
 * Utility script to kill a process running on a specific port
 * Usage: node kill-port.js [PORT]
 */

const { exec } = require('child_process');
const readline = require('readline');

const port = process.argv[2] || 3000;

const isWindows = process.platform === 'win32';

const findCommand = isWindows 
  ? `netstat -ano | findstr :${port}` 
  : `lsof -i :${port} | grep LISTEN`;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log(`Looking for processes using port ${port}...`);

exec(findCommand, (error, stdout, stderr) => {
  if (error) {
    console.error(`Error finding process: ${error.message}`);
    process.exit(1);
  }
  
  if (!stdout) {
    console.log(`No process found using port ${port}`);
    process.exit(0);
  }
  
  console.log('Process information:');
  console.log(stdout);
  
  let pid;
  if (isWindows) {
    // Extract PID from Windows netstat output
    const matches = stdout.match(/LISTENING\s+(\d+)/);
    if (matches && matches.length > 1) {
      pid = matches[1];
    }
  } else {
    // Extract PID from Unix lsof output
    const matches = stdout.match(/\S+\s+(\d+)/);
    if (matches && matches.length > 1) {
      pid = matches[1];
    }
  }
  
  if (!pid) {
    console.error('Could not extract process ID');
    process.exit(1);
  }
  
  rl.question(`Do you want to kill the process with PID ${pid}? (y/n) `, (answer) => {
    if (answer.toLowerCase() === 'y') {
      const killCommand = isWindows ? `taskkill /PID ${pid} /F` : `kill -9 ${pid}`;
      
      exec(killCommand, (killError, killStdout, killStderr) => {
        if (killError) {
          console.error(`Failed to kill process: ${killError.message}`);
          process.exit(1);
        }
        
        console.log(`Process with PID ${pid} has been terminated.`);
        process.exit(0);
      });
    } else {
      console.log('Operation cancelled');
      process.exit(0);
    }
    
    rl.close();
  });
});
