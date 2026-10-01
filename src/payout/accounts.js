const balances = { 1: 400, 2: 80, 3: 10 };

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
