/**
 * Intentional weak cryptography for owasp-weak-crypto.
 */
const crypto = require('crypto');

function hashPassword(plain) {
  return crypto.createHash('md5').update(plain).digest('hex');
}

function encryptToken(value) {
  const cipher = crypto.createCipher('aes-128-ecb', 'static-dev-key');
  return cipher.update(value, 'utf8', 'hex') + cipher.final('hex');
}

module.exports = { hashPassword, encryptToken };
