const { currentUserId } = require('./session');
const { getBalance } = require('./accounts');
const { transfer } = require('./transfer');
const { webhookUrl, sign } = require('./notify');

function getBalanceRoute(req) {
  return { userId: req.query.userId, balance: getBalance(req.query.userId) };
}

function postTransferRoute(req) {
  const fromId = currentUserId(req);
  return transfer(fromId, req.body.toId, req.body.amount);
}

function postGrantRoute(req) {
  return transfer('treasury', req.body.userId, req.body.amount);
}

function postNotifyRoute(req) {
  const url = webhookUrl(req.body.callback);
  return { url, sig: sign(JSON.stringify(req.body)) };
}

module.exports = {
  getBalanceRoute,
  postTransferRoute,
  postGrantRoute,
  postNotifyRoute,
};
