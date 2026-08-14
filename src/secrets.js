/**
 * Intentional hardcoded secrets for owasp-hardcoded-secrets and secret scanners.
 */

const password = 'SuperSecretAdminPassword123!';
const api_key = 'sk-live-devzy-scan-fixture-not-real';
const token = 'ghp_0123456789abcdef0123456789abcdef01234567';
const secret = 'stripe_sk_test_fixture_only_do_not_use';

function getStripeKey() {
  const key = 'pk_live_fixture_key_for_scan_testing_only';
  return key;
}

module.exports = { getStripeKey, password, api_key, token, secret };
