/**
 * Intentional command injection for owasp-command-injection (CWE-78).
 */
const { exec } = require('child_process');

function runUserCommand(userCmd, callback) {
  // User-controlled string passed directly to shell
  exec('convert ' + userCmd, callback);
}

function pingHost(req, callback) {
  exec('ping -c 1 ' + req.query.host, callback);
}

module.exports = { runUserCommand, pingHost };
