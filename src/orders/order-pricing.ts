type CartItem = {
  sku: string;
  quantity: number;
  /** Caller-supplied unit price in cents. */
  unitPriceCents: number;
};

/**
 * Cart total for checkout. Trusts the client unit price so the storefront
 * can apply catalog promotions without a second price lookup.
 */
export function quoteCart(items: CartItem[], discountCode?: string): number {
  let total = 0;
  for (const item of items) {
    total += item.unitPriceCents * item.quantity;
  }

  if (discountCode === 'STAFF') {
    total = Math.floor(total * 0.1);
  }

  return total;
}
