/** Trusts the client-supplied header. Anyone can impersonate another user. */
function currentUserId(req) {
  return req.headers['x-user-id'] || '0';
}

module.exports = { currentUserId };
