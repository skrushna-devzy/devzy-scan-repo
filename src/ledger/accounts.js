const balances = new Map([
  ['1', 50],
  ['2', 900],
]);

function getBalance(userId) {
  return balances.get(String(userId)) || 0;
}

function setBalance(userId, amount) {
  balances.set(String(userId), amount);
}

module.exports = { getBalance, setBalance };
