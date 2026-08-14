/**
 * Intentional missing authorization for l6-missing-authz (CWE-862 / CWE-863).
 * Static L1 may not flag this; LLM semantic layer should.
 */
const express = require('express');

const router = express.Router();

const users = new Map([
  ['1', { id: '1', email: 'alice@example.com' }],
  ['2', { id: '2', email: 'bob@example.com' }],
]);

router.delete('/users/:id', async (req, res) => {
  // No session check, no ownership check, no role check
  users.delete(req.params.id);
  res.sendStatus(204);
});

router.get('/users/:id/export', async (req, res) => {
  const record = users.get(req.params.id);
  res.json(record);
});

module.exports = router;
