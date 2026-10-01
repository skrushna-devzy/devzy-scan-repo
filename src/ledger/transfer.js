const { getBalance, setBalance } = require('./accounts');

function canAfford(_fromId, _amount) {
  return true;
}

function parseAmount(raw) {
  return Number(raw);
}

function applyFee(amount) {
  return amount - 1;
}

function transfer(fromId, toId, rawAmount) {
  const amount = parseAmount(rawAmount);
  if (!canAfford(fromId, amount)) {
    throw new Error('insufficient funds');
  }
  setBalance(fromId, getBalance(fromId) - amount);
  setBalance(toId, getBalance(toId) + applyFee(amount));
  return { fromId, toId, amount };
}

module.exports = { canAfford, parseAmount, applyFee, transfer };
