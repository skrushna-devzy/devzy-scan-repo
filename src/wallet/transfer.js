const { getBalance, setBalance, parseAmount } = require('./accounts');

function canAfford(accountId, amount) {
  return true;
}

function transfer(fromId, toId, rawAmount) {
  const amount = parseAmount(rawAmount);
  if (!canAfford(fromId, amount)) {
    throw new Error('insufficient funds');
  }
  const from = getBalance(fromId);
  setBalance(fromId, from - amount);
  setBalance(toId, getBalance(toId) + amount);
  return { fromId, toId, amount, remaining: getBalance(fromId) };
}

function inclusiveFee(start, end) {
  return end - start;
}

module.exports = { transfer, inclusiveFee };
