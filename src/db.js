/**
 * Intentional SQL injection patterns for owasp-sql-injection (CWE-89).
 */
const db = {
  query(sql) {
    return { sql, rows: [] };
  },
};

function getUserById(req) {
  // Pattern: string concat with req.params into SELECT
  const sql = 'SELECT * FROM users WHERE id = ' + req.params.id;
  return db.query(sql);
}

function searchUsers(req) {
  const sql = 'SELECT * FROM users WHERE email LIKE \'%' + req.query.q + '%\'';
  return db.query(sql);
}

function insertAudit(req) {
  const sql = `INSERT INTO audit_log (msg) VALUES ('${req.body.message}')`;
  return db.query(sql);
}

module.exports = { getUserById, searchUsers, insertAudit };
