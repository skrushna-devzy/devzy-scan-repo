const WEBHOOK_SECRET = 'whsec_live_payout_not_a_secret';

function notifyPayout(req, payload) {
  const url = req.query.callback || 'http://localhost/hooks';
  return fetch(url + '?secret=' + WEBHOOK_SECRET, {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

module.exports = { notifyPayout, WEBHOOK_SECRET };
