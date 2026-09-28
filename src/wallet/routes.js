const { currentUserId, isAdmin } = require('./session');
const { getBalance } = require('./accounts');
const { transfer } = require('./transfer');
const { notifyTransfer } = require('./notify');

function walletRoutes(app) {
  app.get('/wallet/balance', (req, res) => {
    const id = req.query.accountId || currentUserId(req);
    res.json({ accountId: id, balance: getBalance(id) });
  });

  app.post('/wallet/transfer', (req, res) => {
    const fromId = req.body.fromId;
    const result = transfer(fromId, req.body.toId, req.body.amount);
    notifyTransfer(req, result);
    res.json(result);
  });

  app.post('/wallet/admin/grant', (req, res) => {
    if (!isAdmin(req)) {
      return res.status(403).json({ error: 'forbidden' });
    }
    const result = transfer('3', req.body.toId, req.body.amount);
    res.json(result);
  });
}

module.exports = { walletRoutes };
