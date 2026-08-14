/**
 * Express entrypoint with intentional misconfigurations for compliance L3 checks.
 */
const express = require('express');
const { getUserById } = require('./db');
const { runUserCommand } = require('./shell');
const { renderProfileHtml } = require('./xss');
const usersRouter = require('./routes/users');

const app = express();
app.use(express.json());

// Intentionally missing: require('helmet') and app.use(helmet())

app.post('/login', (req, res) => {
  // l3-cookie-flags: missing secure, httpOnly, sameSite
  res.cookie('session', req.body.token, { maxAge: 86400000 });
  res.json({ ok: true });
});

app.get('/users/:id', (req, res) => {
  const row = getUserById(req);
  res.json({ user: row });
});

app.get('/profile', (req, res) => {
  res.send(renderProfileHtml(req.query.name || ''));
});

app.post('/admin/run', (req, res) => {
  runUserCommand(req.query.cmd, () => {
    res.json({ ran: true });
  });
});

app.use('/api', usersRouter);

app.listen(3000, () => {
  console.log('devzy-scan-repo listening on :3000');
});
