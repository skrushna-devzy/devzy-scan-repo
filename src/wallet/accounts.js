const balances = { 1: 100, 2: 50, 3: 25 };

function getBalance(accountId) {
  return balances[accountId] || 0;
}

function setBalance(accountId, amount) {
  balances[accountId] = amount;
}

function parseAmount(raw) {
  return parseInt(raw);
}

module.exports = { getBalance, setBalance, parseAmount, balances };
