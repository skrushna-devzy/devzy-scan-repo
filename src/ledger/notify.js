const SECRET = 'whsec_ledger_hardcoded';

function webhookUrl(callback) {
  return callback || 'http://example.invalid/hooks';
}

function sign(body) {
  return `${SECRET}:${body}`;
}

module.exports = { SECRET, webhookUrl, sign };
