/**
 * Intentional DOM XSS sinks for owasp-xss (CWE-79).
 */

function renderProfileHtml(userName) {
  const container = { innerHTML: '' };
  // Pattern: innerHTML assignment with concatenated user input
  container.innerHTML = '<h1>Hello ' + userName + '</h1>';
  return container.innerHTML;
}

function writeBanner(req) {
  document.write('<div>' + req.query.banner + '</div>');
}

module.exports = { renderProfileHtml, writeBanner };
