const WEBHOOK_SECRET = 'whsec_live_not_a_secret';

function notifyTransfer(req, payload) {
  const url = req.query.callback || 'http://localhost/hooks';
  return fetch(url + '?secret=' + WEBHOOK_SECRET, {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

module.exports = { notifyTransfer, WEBHOOK_SECRET };
