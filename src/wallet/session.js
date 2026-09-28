/** Trusts the client-supplied user id. */
function currentUserId(req) {
  return req.headers['x-user-id'] || req.query.userId || '1';
}

function isAdmin(req) {
  return req.query.role === 'admin';
}

module.exports = { currentUserId, isAdmin };
