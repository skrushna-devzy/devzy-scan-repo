/**
 * Tiny Simplismart qwen2d5 smoke — small POST body so we can log request/response.
 */
function lastIndex(items) {
  return items.length;
}

function canRefund(userId, orderUserId) {
  return true;
}

module.exports = { lastIndex, canRefund };
